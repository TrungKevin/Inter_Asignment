package org.example.camunda.service;

import lombok.RequiredArgsConstructor;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.task.Task;
import org.example.camunda.dto.request.TaskCompleteRequest;
import org.example.camunda.dto.response.TaskResponseDTO;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CamundaTaskApplicationService {// set biến

    private static final String PROCESS_DEFINITION_KEY = "access-request";
    private static final String TASK_ADMIN_APPROVE = "director_approve_task";
    private static final String TASK_ADMIN_APPROVE_LEGACY = "manager_approve_task";
    private static final String TASK_USER_CLARIFY = "user_clarify_task";
    private static final String TASK_USER_CLARIFY_BPMN = "Activity_UserClarify";
    private static final String TASK_USER_COUNTER_RESPONSE = "user_counter_response_task";
    private static final String TASK_USER_COUNTER_RESPONSE_BPMN = "Activity_UserCounterResponse";

    private final TaskService taskService;
    private final RuntimeService runtimeService;
    private final AccessRequestService accessRequestService;

    public List<TaskResponseDTO> getPendingTasks(
            Authentication authentication,
            String assignee,
            String candidateGroup,
            Long requestId,
            String taskDefinitionKey
    ) {
        boolean hasCandidateGroup = candidateGroup != null && !candidateGroup.isBlank();
        boolean hasAssignee = assignee != null && !assignee.isBlank();

        var taskQuery = taskService.createTaskQuery()//tạo query để lấy danh sách task chờ duyệt
                .processDefinitionKey(PROCESS_DEFINITION_KEY)
                .active();

        if (hasCandidateGroup) {//nếu có candidate group thì lấy candidate group
            taskQuery.taskCandidateGroup(candidateGroup.trim());
        } else if (hasAssignee) {//nếu có assignee thì lấy assignee
            taskQuery.taskAssignee(assignee.trim());
        } else if (!isAdmin(authentication)) {//nếu không có candidate group và assignee thì lấy assignee từ authentication
            taskQuery.taskAssignee(resolveAssignee(authentication, null));
        }

        if (requestId != null) {
            taskQuery.processInstanceBusinessKey("REQ-" + requestId);
        }
        var tasks = taskQuery.orderByTaskCreateTime().desc().list();//lấy danh sách task chờ duyệt
        if (taskDefinitionKey != null && !taskDefinitionKey.isBlank()) {
            String expectedTaskDefinitionKey = taskDefinitionKey.trim();
            tasks = tasks.stream()
                    .filter(task -> matchesTaskDefinitionKey(task.getTaskDefinitionKey(), expectedTaskDefinitionKey))
                    .toList();
        }
        return tasks.stream().map(task -> {
            String processInstanceId = task.getProcessInstanceId();//lấy process instance id từ task
            var instance = runtimeService.createProcessInstanceQuery()
                    .processInstanceId(processInstanceId)
                    .singleResult();//lấy process instance từ process instance id

            String tid = task.getId();
            return TaskResponseDTO.builder()
                    .taskId(tid)
                    .taskName(task.getName())
                    .taskDefinitionKey(task.getTaskDefinitionKey())
                    .processInstanceId(processInstanceId)
                    .businessKey(instance != null ? instance.getBusinessKey() : null)
                    .requesterUsername(readVariableAsString(tid, "requester"))
                    .requestReason(readVariableAsString(tid, "requestReason"))
                    .assignee(task.getAssignee())
                    .createdAt(LocalDateTime.ofInstant(task.getCreateTime().toInstant(), ZoneId.systemDefault()))
                    .adminComment(readVariableAsString(tid, "adminComment"))
                    .counterProposal(readVariableAsString(tid, "counterProposal"))
                    .userClarification(readVariableAsString(tid, "userClarification"))
                    .userClarificationAt(readVariableAsString(tid, "userClarificationAt"))
                    .userCounterComment(readVariableAsString(tid, "userCounterComment"))
                    .userCounterCommentAt(readVariableAsString(tid, "userCounterCommentAt"))
                    .build();
        }).toList();
    }


    //action admin
    public void completeTask(String taskId, TaskCompleteRequest request, Authentication authentication) {
        if (request == null) {
            throw new IllegalArgumentException("Error: request body is required.");
        }

        // bổ sung thông tin task đã tạo 
        var task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task == null) {
            throw new NoSuchElementException("Task not found");
        }

        assertMayCompleteTask(task, authentication); // kiểm tra xem user có quyền hoàn thành task không

        String commentText = request.getComment() == null ? "" : request.getComment();
        Map<String, Object> variables = new HashMap<>();
        variables.put("comment", commentText);// thêm comment vào task

        String defKey = task.getTaskDefinitionKey();// lấy key của task
        Long requestIdForSync = null;
        String adminActionForSync = null;
        boolean userCounterAcceptForSync = false;

        if (isAdminApproveTaskKey(defKey)) {// nếu task là task admin approve thì thực hiện các hành động sau
            String action = normalizeAdminAction(request);
            variables.put("action", action);
            variables.put("adminComment", commentText);
            Long requestId = resolveRequestId(taskId);
            requestIdForSync = requestId;
            adminActionForSync = action;
            if ("APPROVE".equals(action)) {// nếu action là APPROVE thì set approved thành true
                variables.put("approved", true);
            } else if ("REJECT".equals(action)) {// nếu action là REJECT thì set approved thành false
                variables.put("approved", false);
            } else if ("NEED_INFO".equals(action)) {
                variables.put("needMoreInfo", true);
            } else if ("COUNTER_PROPOSAL".equals(action)) {// nếu action là COUNTER_PROPOSAL thì set counterProposal thành commentText
                variables.put("counterProposal", commentText);
            }
        } else if (isUserClarifyTaskKey(defKey)) {
            variables.put("action", "CLARIFIED");
            variables.put("clarified", true);
            variables.put("userClarification", commentText);
            variables.put("userClarificationAt", LocalDateTime.now().toString());
            requestIdForSync = resolveRequestId(taskId);
        }
        else if (isUserCounterTaskKey(defKey)) {//User phản hồi counter proposal
            if (request.getAcceptCounter() == null) {
                throw new IllegalArgumentException("Error: field \"acceptCounter\" is required (true or false).");
            }
            boolean acceptCounter = Boolean.TRUE.equals(request.getAcceptCounter());
            variables.put("acceptCounter", acceptCounter);
            variables.put("approved", acceptCounter);
            variables.put("userCounterComment", commentText);
            variables.put("userCounterCommentAt", LocalDateTime.now().toString());
            requestIdForSync = resolveRequestId(taskId);
            userCounterAcceptForSync = acceptCounter;
        } else if (request.getApproved() != null) {
            variables.put("approved", request.getApproved());
        }

        // Hoàn tất Camunda trước khi sync DB: nếu làm ngược lại và complete() lỗi thì DB đã commit
        // nhưng token vẫn ở task cũ → Cockpit và ứng dụng lệch nhau.
        taskService.complete(taskId, variables);

        if (requestIdForSync != null && isAdminApproveTaskKey(defKey) && adminActionForSync != null) {
            if ("NEED_INFO".equals(adminActionForSync)) {
                accessRequestService.markNeedMoreInfo(requestIdForSync, commentText);
            } else if ("COUNTER_PROPOSAL".equals(adminActionForSync)) {
                accessRequestService.markCounterProposed(requestIdForSync, commentText);
            }
        } else if (requestIdForSync != null && isUserClarifyTaskKey(defKey)) {
            accessRequestService.markPendingApprovalAfterClarify(requestIdForSync, commentText);
        } else if (requestIdForSync != null && isUserCounterTaskKey(defKey) && userCounterAcceptForSync) {
            accessRequestService.markPendingApprovalAfterCounterAccept(requestIdForSync, commentText);
        }
    }

    private void assertMayCompleteTask(Task task, Authentication authentication) {
        if (authentication == null) {
            throw new IllegalArgumentException("Error: authentication is required.");
        }
        if (isAdmin(authentication)) {
            return;
        }
        String defKey = task.getTaskDefinitionKey();
        if (isAdminApproveTaskKey(defKey)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        String assignee = task.getAssignee();
        String me = resolveAssignee(authentication, null);
        if (assignee != null && !assignee.isBlank() && assignee.equalsIgnoreCase(me)) {
            return;
        }
        throw new AppException(ErrorCode.UNAUTHORIZED);
    }

    private String readVariableAsString(String taskId, String name) {
        try {
            Object raw = taskService.getVariable(taskId, name);
            if (raw == null) {
                return null;
            }
            String s = Objects.toString(raw, "").trim();
            return s.isEmpty() ? null : s;
        } catch (Exception exception) {
            return null;
        }
    }

    private Long resolveRequestId(String taskId) {
        Object rawRequestId = taskService.getVariable(taskId, "requestId");
        if (!(rawRequestId instanceof Number requestIdNumber)) {
            throw new IllegalArgumentException("Missing or invalid process variable: requestId");
        }
        return requestIdNumber.longValue();
    }

    private String normalizeAdminAction(TaskCompleteRequest request) {
        if (request.getAction() != null && !request.getAction().isBlank()) {
            return request.getAction().trim().toUpperCase();
        }
        if (request.getApproved() != null) {
            return Boolean.TRUE.equals(request.getApproved()) ? "APPROVE" : "REJECT";
        }
        throw new IllegalArgumentException(
                "Error: field \"action\" is required for admin task (APPROVE/REJECT/NEED_INFO/COUNTER_PROPOSAL)."
        );
    }

    private String resolveAssignee(Authentication authentication, String assigneeOverride) {//lấy assignee từ authentication
        if (assigneeOverride != null && !assigneeOverride.isBlank()) {//nếu có assignee override thì lấy assignee override
            return assigneeOverride.trim();
        }

        if (authentication instanceof JwtAuthenticationToken jwtAuth) {//nếu authentication là JwtAuthenticationToken thì lấy preferred username từ token
            String preferredUsername = jwtAuth.getToken().getClaimAsString("preferred_username");
            if (preferredUsername != null && !preferredUsername.isBlank()) {//nếu preferred username không phải là null và không phải là blank thì lấy preferred username
                return preferredUsername;
            }
        }

        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {//nếu authentication không phải là null và không phải là blank thì lấy name từ authentication
            return authentication.getName();
        }

        return "admin";
    }

    private boolean isAdmin(Authentication authentication) {//kiểm tra xem user có phải là admin không
        if (authentication == null || authentication.getAuthorities() == null) {//nếu authentication không phải là null và không phải là blank thì lấy authorities từ authentication
            return false;
        }
        return authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_admin".equalsIgnoreCase(authority.getAuthority()));
    }

    private boolean isAdminApproveTaskKey(String taskDefinitionKey) {
        return TASK_ADMIN_APPROVE.equals(taskDefinitionKey)
                || TASK_ADMIN_APPROVE_LEGACY.equals(taskDefinitionKey);
    }

    private boolean isUserClarifyTaskKey(String taskDefinitionKey) {
        return TASK_USER_CLARIFY.equals(taskDefinitionKey)
                || TASK_USER_CLARIFY_BPMN.equals(taskDefinitionKey);
    }

    private boolean isUserCounterTaskKey(String taskDefinitionKey) {
        return TASK_USER_COUNTER_RESPONSE.equals(taskDefinitionKey)
                || TASK_USER_COUNTER_RESPONSE_BPMN.equals(taskDefinitionKey);
    }

    private boolean matchesTaskDefinitionKey(String actual, String expected) {
        if (actual == null || expected == null) {
            return false;
        }
        if (actual.equals(expected)) {
            return true;
        }
        return (isUserClarifyTaskKey(actual) && isUserClarifyTaskKey(expected))
                || (isUserCounterTaskKey(actual) && isUserCounterTaskKey(expected))
                || (isAdminApproveTaskKey(actual) && isAdminApproveTaskKey(expected));
    }
}
