package org.example.camunda.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeycloakProvisionService {//service để provision quyền tới Keycloak

    private final RestClient.Builder restClientBuilder;

    @Value("${idp.url}")
    private String idpUrl;

    @Value("${idp.realm}")
    private String idpRealm;

    @Value("${idp.admin-realm:master}")
    private String adminRealm;

    @Value("${idp.admin-client-id:${idp.client-id}}")
    private String adminClientId;

    @Value("${idp.admin-client-secret:${idp.client-secret}}")
    private String adminClientSecret;

    //hàm này để gán quyền tới user
    public void assignRolesToUser(String username, List<String> roleNames) {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username is required for provisioning");
        }
        if (roleNames == null || roleNames.isEmpty()) {
            return;
        }

        String adminToken = getAdminAccessToken();//lấy admin token từ Keycloak
        String userId = findUserIdByUsername(adminToken, username);//lấy user id từ username
        if (userId == null) {//nếu user id không tồn tại thì throw exception
            throw new IllegalStateException("Keycloak user not found: " + username);
        }
        log.info("Resolved Keycloak user. username={}, userId={}", username, userId);

        // Ưu tiên cách gán quyền theo thực tế môi trường: add user vào group "Role"
        // (group này đã map sẵn realm role admin trên Keycloak).
        List<GroupRepresentation> resolvedGroups = resolveGroups(adminToken, roleNames);
        if (!resolvedGroups.isEmpty()) {//nếu có group thì gán group cho user
            try {
                addUserToGroups(adminToken, userId, resolvedGroups);
                if (userInAnyGroup(adminToken, userId, resolvedGroups)) {//nếu user đã nằm trong group thì return
                    log.info("Assigned groups for role provisioning. username={}, userId={}, roles={}, groups={}",
                            username,
                            userId,
                            roleNames,
                            resolvedGroups.stream().map(GroupRepresentation::name).toList());
                    return;
                }
                log.warn("Group assignment API call completed but membership was not observed. "
                        + "username={}, userId={}, roles={}, groups={}",
                        username,
                        userId,
                        roleNames,
                        resolvedGroups.stream().map(GroupRepresentation::name).toList());
            } catch (Exception ex) {
                if (isConflict(ex) && userInAnyGroup(adminToken, userId, resolvedGroups)) {
                    log.info("User already joined target groups. username={}, userId={}, roles={}, groups={}",
                            username,
                            userId,
                            roleNames,
                            resolvedGroups.stream().map(GroupRepresentation::name).toList());
                    return;
                }
                log.warn("Assign groups failed. username={}, userId={}, roles={}, groups={}, reason={}",
                        username,
                        userId,
                        roleNames,
                        resolvedGroups.stream().map(GroupRepresentation::name).toList(),
                        ex.getMessage());
            }
        }

        List<RoleRepresentation> resolvedRealmRoles = resolveRealmRoles(adminToken, roleNames);
        if (!resolvedRealmRoles.isEmpty()) {
            String mappingUrl = idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId + "/role-mappings/realm";
            try {
                restClientBuilder.build()
                        .post()
                        .uri(mappingUrl)
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(resolvedRealmRoles)
                        .retrieve()
                        .toBodilessEntity();
                return;
            } catch (Exception ex) {
                if (isConflict(ex)) {
                    if (userHasRealmRoles(adminToken, userId, roleNames)) {
                        log.info("Realm roles already assigned. username={}, roles={}", username, roleNames);
                        return;
                    }
                    log.warn("Got 409 on realm role assignment but user does not have required roles yet. "
                            + "username={}, roles={}", username, roleNames);
                }
                log.warn("Assign realm roles failed. username={}, roles={}, reason={}",
                        username, roleNames, ex.getMessage());
            }
        }

        String targetClientId = adminClientId;
        String targetClientUuid = findClientUuidByClientId(adminToken, targetClientId);
        if (targetClientUuid != null) {//nếu có client uuid thì gán client role cho user
            List<RoleRepresentation> resolvedClientRoles =
                    resolveClientRoles(adminToken, targetClientUuid, roleNames);
            if (!resolvedClientRoles.isEmpty()) {//nếu có client role thì gán client role cho user
                String mappingUrl = idpUrl + "/admin/realms/" + idpRealm
                        + "/users/" + userId + "/role-mappings/clients/" + targetClientUuid;
                try {
                    restClientBuilder.build()
                            .post()
                            .uri(mappingUrl)
                            .header("Authorization", "Bearer " + adminToken)
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(resolvedClientRoles)
                            .retrieve()
                            .toBodilessEntity();
                    return;
                } catch (Exception ex) {
                    if (isConflict(ex)) {//nếu lỗi là conflict thì gán client role cho user
                        if (userHasClientRoles(adminToken, userId, targetClientUuid, roleNames)) {
                            log.info("Client roles already assigned. username={}, roles={}, clientId={}",
                                    username, roleNames, targetClientId);
                            return;
                        }
                        log.warn("Got 409 on client role assignment but user does not have required roles yet. "
                                + "username={}, roles={}, clientId={}", username, roleNames, targetClientId);
                    }
                    log.warn("Assign client roles failed. username={}, roles={}, clientId={}, reason={}",
                            username, roleNames, targetClientId, ex.getMessage());
                }
            }
        }

        throw new IllegalStateException("No valid realm/client roles to assign for user: " + username
                + ". requested=" + roleNames + ", clientId=" + targetClientId
                + ". Also no matching Keycloak groups found.");
    }

    private String getAdminAccessToken() {//lấy admin token từ Keycloak
        var formData = new LinkedMultiValueMap<String, String>();
        formData.add("grant_type", "client_credentials");
        formData.add("client_id", adminClientId);
        formData.add("client_secret", adminClientSecret);

        TokenResponse tokenResponse = restClientBuilder.build()//tạo request để lấy admin token từ Keycloak
                .post()
                .uri(idpUrl + "/realms/" + adminRealm + "/protocol/openid-connect/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(formData)
                .retrieve()
                .body(TokenResponse.class);

        if (tokenResponse == null || tokenResponse.accessToken() == null || tokenResponse.accessToken().isBlank()) {//nếu không lấy được admin token thì throw exception
            throw new IllegalStateException("Cannot get admin token from Keycloak");
        }
        return tokenResponse.accessToken();//trả về admin token
    }

    //hàm này để lấy user id từ username
    private String findUserIdByUsername(String adminToken, String username) {//lấy user id từ username
        String url = UriComponentsBuilder//tạo request để lấy user id từ username
                .fromHttpUrl(idpUrl + "/admin/realms/" + idpRealm + "/users")
                .queryParam("username", username)
                .queryParam("exact", true)
                .toUriString();

        UserRepresentation[] users = restClientBuilder.build()//tạo request để lấy user id từ username
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(UserRepresentation[].class);

        if (users == null || users.length == 0) {//nếu không tìm thấy user thì lấy user id từ username loose
            return findUserIdByUsernameLoose(adminToken, username);//lấy user id từ username loose
        }
        for (UserRepresentation user : users) {//lấy user id từ user
            if (user != null
                    && user.username() != null
                    && user.username().equalsIgnoreCase(username)
                    && user.id() != null
                    && !user.id().isBlank()) {
                return user.id();
            }
        }
        return findUserIdByUsernameLoose(adminToken, username);
    }
    //hàm này để lấy user id từ username loose (không chính xác)
    private String findUserIdByUsernameLoose(String adminToken, String username) {//lấy user id từ username loose (không chính xác)
        String url = UriComponentsBuilder
                .fromHttpUrl(idpUrl + "/admin/realms/" + idpRealm + "/users")
                .queryParam("username", username)
                .toUriString();

        UserRepresentation[] users = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(UserRepresentation[].class);

        if (users == null || users.length == 0) {
            return null;
        }
        for (UserRepresentation user : users) {//lấy user id từ user
            if (user != null
                    && user.username() != null
                    && user.username().equalsIgnoreCase(username)
                    && user.id() != null
                    && !user.id().isBlank()) {
                return user.id();
            }
        }
        return users[0].id();
    }

    private List<RoleRepresentation> resolveRealmRoles(String adminToken, List<String> roleNames) {//lấy realm role từ role names
        Set<String> requested = roleNames.stream()//lấy role names từ list role names
                .filter(Objects::nonNull)
                .map(String::trim)//loại bỏ khoảng trắng
                .filter(s -> !s.isEmpty())
                .map(s -> s.toLowerCase(Locale.ROOT))
                .collect(java.util.stream.Collectors.toSet());
        if (requested.isEmpty()) {
            return List.of();
        }

        String url = idpUrl + "/admin/realms/" + idpRealm + "/roles";//tạo request để lấy realm role từ role names
        RoleRepresentation[] allRoles = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(RoleRepresentation[].class);

        if (allRoles == null || allRoles.length == 0) {
            return List.of();
        }

        //lấy realm role từ role names
        List<RoleRepresentation> matched = new ArrayList<>();
        for (RoleRepresentation role : allRoles) {
            if (role != null
                    && role.name() != null
                    && requested.contains(role.name().toLowerCase(Locale.ROOT))) {
                matched.add(role);
            }
        }
        return matched;
    }

    private String findClientUuidByClientId(String adminToken, String clientId) {//lấy client uuid từ client id
        if (clientId == null || clientId.isBlank()) {
            return null;
        }

        String url = UriComponentsBuilder
                .fromHttpUrl(idpUrl + "/admin/realms/" + idpRealm + "/clients")
                .queryParam("clientId", clientId.trim())
                .toUriString();

        ClientRepresentation[] clients = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(ClientRepresentation[].class);

        if (clients == null || clients.length == 0) {
            return null;
        }

        for (ClientRepresentation client : clients) {//lấy client uuid từ client
            if (client != null
                    && client.clientId() != null
                    && client.clientId().equalsIgnoreCase(clientId.trim())
                    && client.id() != null
                    && !client.id().isBlank()) {
                return client.id();
            }
        }
        return clients[0].id();
    }

    private List<RoleRepresentation> resolveClientRoles(//lấy client role từ client uuid và role names
            String adminToken,
            String clientUuid,
            List<String> roleNames) {
        Set<String> requested = roleNames.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.toLowerCase(Locale.ROOT))
                .collect(java.util.stream.Collectors.toSet());
        if (requested.isEmpty()) {
            return List.of();
        }

        String url = idpUrl + "/admin/realms/" + idpRealm + "/clients/" + clientUuid + "/roles";
        RoleRepresentation[] allRoles = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(RoleRepresentation[].class);

        if (allRoles == null || allRoles.length == 0) {
            return List.of();
        }

        List<RoleRepresentation> matched = new ArrayList<>();
        for (RoleRepresentation role : allRoles) {
            if (role != null
                    && role.name() != null
                    && requested.contains(role.name().toLowerCase(Locale.ROOT))) {
                matched.add(role);
            }
        }
        return matched;
    }

    private List<GroupRepresentation> resolveGroups(String adminToken, List<String> roleNames) {//lấy group từ role names
        Set<String> candidates = new LinkedHashSet<>();
        if (roleNames != null) {
            for (String roleName : roleNames) {
                String value = roleName == null ? "" : roleName.trim();
                if (!value.isEmpty()) {
                    candidates.add(value.toLowerCase(Locale.ROOT));
                }
            }
        }
        // Fallback thực tế theo ảnh user: group tổng tên "Role"
        candidates.add("role");

        //tạo request để lấy group từ role names
        GroupRepresentation[] rootGroups = restClientBuilder.build()
                .get()
                .uri(idpUrl + "/admin/realms/" + idpRealm + "/groups")
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(GroupRepresentation[].class);

        if (rootGroups == null || rootGroups.length == 0) {
            return List.of();
        }

        //lấy group từ role names để gán quyền cho user
        List<GroupRepresentation> flattened = new ArrayList<>();
        for (GroupRepresentation group : rootGroups) {
            flattenGroup(group, flattened);
        }

        //lấy group từ role names để gán quyền cho user
        List<GroupRepresentation> matched = new ArrayList<>();
        for (GroupRepresentation group : flattened) {
            if (group == null || group.id() == null || group.name() == null) {
                continue;
            }
            String normalizedName = group.name().trim().toLowerCase(Locale.ROOT);
            if (candidates.contains(normalizedName)) {
                matched.add(group);
            }
        }
        return matched;
    }

    //hàm này để gán group tới user
    private void addUserToGroups(String adminToken, String userId, List<GroupRepresentation> groups) {
        for (GroupRepresentation group : groups) {
            String url = idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId + "/groups/" + group.id();
            try {
                restClientBuilder.build()
                        .put()
                        .uri(url)
                        .header("Authorization", "Bearer " + adminToken)
                        .retrieve()
                        .toBodilessEntity();
            } catch (Exception ex) {
                if (isConflict(ex)) {
                    // idempotent behavior: user already in this group
                    continue;
                }
                throw ex;
            }
        }
    }

    //hàm này để kiểm tra xem có lỗi conflict không
    private boolean isConflict(Exception ex) {
        if (ex instanceof HttpClientErrorException clientError) {
            return clientError.getStatusCode() == HttpStatus.CONFLICT;
        }
        return false;
    }

    //hàm này để kiểm tra xem user có realm role không
    private boolean userHasRealmRoles(String adminToken, String userId, List<String> roleNames) {//kiểm tra xem user có realm role không
        Set<String> requested = normalizeRoles(roleNames);
        if (requested.isEmpty()) {
            return true;
        }

        //tạo request để lấy realm role từ user id
        String url = idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId + "/role-mappings/realm";
        RoleRepresentation[] assigned = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(RoleRepresentation[].class);

        Set<String> assignedNames = new LinkedHashSet<>();//lấy realm role từ user id
        if (assigned != null) {
            for (RoleRepresentation role : assigned) {
                if (role != null && role.name() != null) {
                    assignedNames.add(role.name().trim().toLowerCase(Locale.ROOT));
                }
            }
        }
        return assignedNames.containsAll(requested);
    }

    //hàm này để kiểm tra xem user có client role không
    private boolean userHasClientRoles(String adminToken, String userId, String clientUuid, List<String> roleNames) {//kiểm tra xem user có client role không
        Set<String> requested = normalizeRoles(roleNames);
        if (requested.isEmpty()) {
            return true;
        }

        //tạo request để lấy client role từ user id
        String url = idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId
                + "/role-mappings/clients/" + clientUuid;
        RoleRepresentation[] assigned = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(RoleRepresentation[].class);

        Set<String> assignedNames = new LinkedHashSet<>();
        if (assigned != null) {
            for (RoleRepresentation role : assigned) {
                if (role != null && role.name() != null) {
                    assignedNames.add(role.name().trim().toLowerCase(Locale.ROOT));
                }
            }
        }
        return assignedNames.containsAll(requested);
    }

    //hàm này để kiểm tra xem user có nằm trong group không
    private boolean userInAnyGroup(String adminToken, String userId, List<GroupRepresentation> groups) {
        Set<String> targetGroupIds = groups.stream()//lấy group id từ list group
                .filter(Objects::nonNull)
                .map(GroupRepresentation::id)
                .filter(Objects::nonNull)
                .collect(java.util.stream.Collectors.toSet());
        if (targetGroupIds.isEmpty()) {
            return false;
        }

        //tạo request để lấy group từ user id
        String url = idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId + "/groups";
        GroupRepresentation[] assigned = restClientBuilder.build()
                .get()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .retrieve()
                .body(GroupRepresentation[].class);

        if (assigned == null || assigned.length == 0) {
            return false;
        }
        for (GroupRepresentation group : assigned) {
            if (group != null && group.id() != null && targetGroupIds.contains(group.id())) {
                return true;
            }
        }
        return false;
    }

    private Set<String> normalizeRoles(List<String> roleNames) {//chuyển đổi role names thành lowercase
        if (roleNames == null) {
            return Set.of();
        }
        return roleNames.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(s -> s.toLowerCase(Locale.ROOT))
                .collect(java.util.stream.Collectors.toSet());
    }

    //hàm này để chuyển đổi group thành list
    private void flattenGroup(GroupRepresentation group, List<GroupRepresentation> collector) {//chuyển đổi group thành list
        if (group == null) {
            return;
        }
        collector.add(group);
        if (group.subGroups() == null || group.subGroups().isEmpty()) {
            return;
        }
        for (GroupRepresentation child : group.subGroups()) {//chuyển đổi group thành list
            flattenGroup(child, collector);
        }
    }

    //hàm này để lấy response token từ Keycloak
    private record TokenResponse(//response token từ Keycloak
            @JsonProperty("access_token")
            String accessToken
    ) {
    }

    //hàm này để lấy user representation từ Keycloak
    @JsonIgnoreProperties(ignoreUnknown = true)
    private record UserRepresentation(//user representation từ Keycloak
            String id,
            String username
    ) {
    }

    //hàm này để lấy role representation từ Keycloak
    @JsonIgnoreProperties(ignoreUnknown = true)
    private record RoleRepresentation(//role representation từ Keycloak
            String id,
            String name,
            @JsonProperty("composite")
            Boolean composite,
            @JsonProperty("clientRole")
            Boolean clientRole,
            Map<String, List<String>> attributes
    ) {
    }

    //hàm này để lấy client representation từ Keycloak để gán client role cho user
    @JsonIgnoreProperties(ignoreUnknown = true)
    private record ClientRepresentation(//client representation từ Keycloak
            String id,
            @JsonProperty("clientId")
            String clientId
    ) {
    }

    //hàm này để lấy group representation từ Keycloak để gán quyền group cho user
    @JsonIgnoreProperties(ignoreUnknown = true)
    private record GroupRepresentation(//group representation từ Keycloak
            String id,
            String name,
            @JsonProperty("subGroups")
            List<GroupRepresentation> subGroups
    ) {
    }
}
