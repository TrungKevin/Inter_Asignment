package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AccessRequestMineItemResponse {
    private Long requestId;
    private String businessKey;
    private String processInstanceId;
    private String requesterUsername;
    private String departmentCode;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    /**
     * Nội dung admin (bổ sung thông tin / đề xuất điều chỉnh), map từ rejection_reason khi status phù hợp.
     */
    private String adminFeedback;
}
