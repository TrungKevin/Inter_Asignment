package org.example.camunda.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponseDTO {
    private String taskId;
    private String taskName;
    private String taskDefinitionKey;
    private String processInstanceId;
    private String businessKey; // Dùng để map ngược lại bảng access_requests
    /** Username của người tạo request trong process variable `requester`. */
    private String requesterUsername;
    /** Lý do user nhập khi tạo request ban đầu. */
    private String requestReason;
    private String assignee;
    private LocalDateTime createdAt;
    /** Biến process: nội dung admin yêu cầu bổ sung (NEED_INFO). */
    private String adminComment;
    /** Biến process: đề xuất điều chỉnh quyền (COUNTER_PROPOSAL). */
    private String counterProposal;
    /** Biến process: nội dung user đã bổ sung thông tin. */
    private String userClarification;
    /** Biến process: thời điểm user gửi bổ sung thông tin (ISO-8601). */
    private String userClarificationAt;
    /** Biến process: phản hồi user cho đề xuất điều chỉnh. */
    private String userCounterComment;
    /** Biến process: thời điểm user phản hồi đề xuất (ISO-8601). */
    private String userCounterCommentAt;
}
