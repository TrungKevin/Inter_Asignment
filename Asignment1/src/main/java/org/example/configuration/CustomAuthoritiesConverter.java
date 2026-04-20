package org.example.configuration;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CustomAuthoritiesConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
    private final String REALM_ACCESS = "realm_access"; //đọc claim token được decode sẵn
    private final String ROLES = "roles";
    private final String ROLE_PREFIX = "ROLE_";

    @Override
    public Collection<GrantedAuthority> convert(Jwt source) {
        List<GrantedAuthority> authorities = new ArrayList<>();

        Map<String, Object> realmAccessMap = source.getClaimAsMap(REALM_ACCESS);
        if (realmAccessMap != null) {
            Object roles = realmAccessMap.get(ROLES);
            if (roles instanceof List<?> stringRoles) {
                authorities.addAll(
                        stringRoles.stream()
                                .filter(String.class::isInstance)
                                .map(String.class::cast)
                                .flatMap(role -> {
                                    // Tránh lỗi phân biệt hoa/thường giữa Keycloak role và @PreAuthorize hasRole(...)
                                    String raw = role.trim();
                                    String lower = raw.toLowerCase();
                                    return List.of(
                                            new SimpleGrantedAuthority(ROLE_PREFIX + raw),
                                            new SimpleGrantedAuthority(ROLE_PREFIX + lower)
                                    ).stream();
                                })
                                .collect(Collectors.toList())
                );
            }
        }

        // Fallback cho token không có realm_access.roles: dùng scope/scp
        String scope = source.getClaimAsString("scope");
        if (scope != null && !scope.isBlank()) {
            authorities.addAll(
                    List.of(scope.split(" ")).stream()
                            .filter(s -> !s.isBlank())
                            .map(s -> new SimpleGrantedAuthority("SCOPE_" + s))
                            .collect(Collectors.toList())
            );
        }

        return authorities;
    }
}
