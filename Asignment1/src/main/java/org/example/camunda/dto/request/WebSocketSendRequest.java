package org.example.camunda.dto.request;

import lombok.Data;

@Data
public class WebSocketSendRequest {
    private String type;
    private String message;
    private Long requestId;
    private String status;
    private String targetUsername;
}
