package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AccessRequestHistoryItemResponse {
    private Long id;
    private String actorUsername;
    private String action;
    private String comment;
    private LocalDateTime createdAt;
}
