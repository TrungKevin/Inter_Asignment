package org.example.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Component
@RequiredArgsConstructor
public class WebSocketJwtChannelInterceptor implements ChannelInterceptor {

    private final JwtDecoder jwtDecoder;
    private final Converter<Jwt, Collection<GrantedAuthority>> customAuthoritiesConverter =
            new CustomAuthoritiesConverter();

    @Override
    public Message<?> preSend(@NonNull Message<?> message, @NonNull MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null || !StompCommand.CONNECT.equals(accessor.getCommand())) {
            return message;
        }

        String rawAuthHeader = resolveAuthorizationHeader(accessor);
        if (rawAuthHeader == null || rawAuthHeader.isBlank()) {
            return message;
        }

        String token = extractBearerToken(rawAuthHeader);
        if (token == null || token.isBlank()) {
            return message;
        }

        Jwt jwt = jwtDecoder.decode(token);
        String username = jwt.getClaimAsString("preferred_username");
        if (username == null || username.isBlank()) {
            username = jwt.getSubject();
        }

        Collection<GrantedAuthority> authorities = customAuthoritiesConverter.convert(jwt);
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        accessor.setUser(authentication);
        return message;
    }

    private String resolveAuthorizationHeader(StompHeaderAccessor accessor) {
        List<String> values = accessor.getNativeHeader("Authorization");
        if (values == null || values.isEmpty()) {
            values = accessor.getNativeHeader("authorization");
        }
        if (values == null || values.isEmpty()) {
            return null;
        }
        return values.getFirst();
    }

    private String extractBearerToken(String value) {
        String prefix = "Bearer ";
        if (!value.regionMatches(true, 0, prefix, 0, prefix.length())) {
            return null;
        }
        return value.substring(prefix.length()).trim();
    }
}
