package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class AccessRequestDetailResponse {
    private Long requestId;
    private String businessKey;
    private String processInstanceId;
    private String requesterUsername;
    private String departmentCode;
    private String status;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Map<String, Object> payload;
    private List<AccessRequestHistoryItemResponse> history;
    private List<AccessRequestLineItemResponse> lines;
}
