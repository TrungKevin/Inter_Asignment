package org.example.camunda.controller;

import lombok.RequiredArgsConstructor;
import org.example.camunda.service.WebSocketSseNotificationService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/notifications/webSocket")
@RequiredArgsConstructor
//SSE 
public class WebSocketNotificationController {

    private final WebSocketSseNotificationService webSocketSseNotificationService;

    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @PreAuthorize("isAuthenticated()")
    public SseEmitter stream(Authentication authentication) {
        return webSocketSseNotificationService.subscribe(resolveUsername(authentication));
    }

    private String resolveUsername(Authentication authentication) {
        if (authentication instanceof JwtAuthenticationToken jwtAuthenticationToken) {
            String preferredUsername = jwtAuthenticationToken.getToken().getClaimAsString("preferred_username");
            if (preferredUsername != null && !preferredUsername.isBlank()) {
                return preferredUsername;
            }
        }
        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }
        throw new IllegalArgumentException("Cannot resolve username from authentication");
    }
}
