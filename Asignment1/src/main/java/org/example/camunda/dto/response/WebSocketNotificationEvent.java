package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WebSocketNotificationEvent {
    private String type;
    private String message;
    private Long requestId;
    private String status;
    private LocalDateTime createdAt;
    private String sender;
}
