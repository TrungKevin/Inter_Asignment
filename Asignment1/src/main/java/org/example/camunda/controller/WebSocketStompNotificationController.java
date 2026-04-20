package org.example.camunda.controller;

import lombok.RequiredArgsConstructor;
import org.example.camunda.dto.request.WebSocketSendRequest;
import org.example.camunda.dto.response.WebSocketNotificationEvent;
import org.example.camunda.service.WebSocketStompNotificationService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class WebSocketStompNotificationController {

    private final WebSocketStompNotificationService webSocketStompNotificationService;

    @MessageMapping("/notifications/user-to-admin")
    public void userToAdmin(WebSocketSendRequest request, Authentication authentication) {
        String sender = resolveUsername(authentication);
        WebSocketNotificationEvent event = WebSocketNotificationEvent.builder()
                .type(request.getType() == null || request.getType().isBlank() ? "USER_TO_ADMIN" : request.getType())
                .message(request.getMessage())
                .requestId(request.getRequestId())
                .status(request.getStatus())
                .createdAt(LocalDateTime.now())
                .sender(sender)
                .build();
        webSocketStompNotificationService.pushToAdmins(event);
    }

    @MessageMapping("/notifications/admin-to-user")
    public void adminToUser(WebSocketSendRequest request, Authentication authentication) {
        String sender = resolveUsername(authentication);
        if (!isAdmin(authentication)) {
            throw new IllegalArgumentException("Only admin can send admin-to-user websocket messages.");
        }
        if (request.getTargetUsername() == null || request.getTargetUsername().isBlank()) {
            throw new IllegalArgumentException("targetUsername is required for admin-to-user websocket messages.");
        }
        WebSocketNotificationEvent event = WebSocketNotificationEvent.builder()
                .type(request.getType() == null || request.getType().isBlank() ? "ADMIN_TO_USER" : request.getType())
                .message(request.getMessage())
                .requestId(request.getRequestId())
                .status(request.getStatus())
                .createdAt(LocalDateTime.now())
                .sender(sender)
                .build();
        webSocketStompNotificationService.pushToUser(request.getTargetUsername(), event);
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
        return "unknown";
    }

    private boolean isAdmin(Authentication authentication) {
        if (authentication == null || authentication.getAuthorities() == null) {
            return false;
        }
        return authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_admin".equalsIgnoreCase(a.getAuthority()));
    }
}
