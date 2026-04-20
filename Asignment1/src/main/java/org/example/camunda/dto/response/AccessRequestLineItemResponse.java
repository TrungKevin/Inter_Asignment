package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AccessRequestLineItemResponse {
    private Long lineId;
    private String roleCode;
    private String resourceType;
    private String provisionStatus;
    private String errorMessage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
