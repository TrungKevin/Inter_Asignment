package org.example.camunda.dto.request;

import lombok.Data;

/**
 * Body cho POST /api/camunda/tasks/{taskId}/complete.
 * Tùy task sẽ yêu cầu field khác nhau:
 * - admin task: action = APPROVE | REJECT | NEED_INFO | COUNTER_PROPOSAL
 * - user counter task: acceptCounter = true/false
 * {@code comment} là tùy chọn.
 */
@Data
public class TaskCompleteRequest {
    private Boolean approved;
    private String action;
    private Boolean acceptCounter;
    private String comment;
}
