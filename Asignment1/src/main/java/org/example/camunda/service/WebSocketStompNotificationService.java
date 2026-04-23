package org.example.camunda.service;

import lombok.RequiredArgsConstructor;
import org.example.camunda.dto.response.WebSocketNotificationEvent;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
//service này để gửi message qua STOMP over WebSocket
public class WebSocketStompNotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public void pushToUser(String username, WebSocketNotificationEvent payload) {
        if (username == null || username.isBlank()) {
            return;
        }
        simpMessagingTemplate.convertAndSendToUser(username, "/queue/notifications", payload);
    }

    public void pushToAdmins(WebSocketNotificationEvent payload) {
        simpMessagingTemplate.convertAndSend("/topic/admin-notifications", payload);
    }
}
