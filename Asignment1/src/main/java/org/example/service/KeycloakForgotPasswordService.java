package org.example.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeycloakForgotPasswordService {

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

    @Value("${idp.client-id}")
    private String loginClientId;

    @Value("${app.frontend-url:http://localhost:4200}")
    private String frontendUrl;

    public void sendResetPasswordEmail(String email) {
        try {// lưu trong storage
            String adminToken = getAdminAccessToken();
            String userId = findUserIdByEmail(adminToken, email);
            if (userId == null) {
                return;
            }
            executeActionsEmail(adminToken, userId);
        } catch (Exception ex) {
            // Keep response generic to avoid user enumeration.
            log.warn("Forgot password flow failed for email={}", email, ex);
        }
    }

    private String getAdminAccessToken() {//yêu cầu Bearer token của client có quyền admin
        var formData = new LinkedMultiValueMap<String, String>();
        formData.add("grant_type", "client_credentials");
        formData.add("client_id", adminClientId);
        formData.add("client_secret", adminClientSecret);

        TokenResponse tokenResponse = restClientBuilder.build()
                .post()
                .uri(idpUrl + "/realms/" + adminRealm + "/protocol/openid-connect/token")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(formData)
                .retrieve()
                .body(TokenResponse.class);

        if (tokenResponse == null || tokenResponse.accessToken() == null || tokenResponse.accessToken().isBlank()) {
            throw new IllegalStateException("Cannot get admin token from Keycloak");
        }

        return tokenResponse.accessToken();
    }

    private String findUserIdByEmail(String adminToken, String email) {//API execute-actions-email cần userId, không nhận trực tiếp email. 
        String url = UriComponentsBuilder
                .fromHttpUrl(idpUrl + "/admin/realms/" + idpRealm + "/users")
                .queryParam("email", email)
                .queryParam("exact", true)
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

        return users[0].id();
    }

    private void executeActionsEmail(String adminToken, String userId) {
        String url = UriComponentsBuilder
                .fromHttpUrl(idpUrl + "/admin/realms/" + idpRealm + "/users/" + userId + "/execute-actions-email")
                .queryParam("client_id", loginClientId)
                .queryParam("redirect_uri", frontendUrl + "/login")
                .queryParam("lifespan", 900)
                .toUriString();

        restClientBuilder.build()
                .put()
                .uri(url)
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(List.of("UPDATE_PASSWORD"))
                .retrieve()
                .toBodilessEntity();
    }

    private record TokenResponse(
            @JsonProperty("access_token")
            String accessToken
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private record UserRepresentation(
            String id,
            String email,
            String username
    ) {
    }
}
