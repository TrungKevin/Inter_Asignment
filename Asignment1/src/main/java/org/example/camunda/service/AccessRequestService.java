package org.example.camunda.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.delegate.BpmnError;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.example.camunda.dto.request.AccessRequestDTO;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.entity.AccessRequestLine;
import org.example.camunda.entity.Department;
import org.example.camunda.entity.RequestHistory;
import org.example.camunda.dto.response.WebSocketNotificationEvent;
import org.example.camunda.repository.AccessRequestLineRepository;
import org.example.camunda.repository.AccessRequestRepository;
import org.example.camunda.repository.DepartmentRepository;
import org.example.camunda.repository.RequestHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessRequestService {
    private static final String STATUS_PENDING_APPROVAL = "PENDING_APPROVAL";
    private static final String STATUS_NEED_MORE_INFO = "NEED_MORE_INFO";
    private static final String STATUS_COUNTER_PROPOSED = "COUNTER_PROPOSED";
    private static final String STATUS_REJECTED = "REJECTED";
    private static final String STATUS_PROVISIONING = "PROVISIONING";
    private static final String STATUS_PROVISIONED = "PROVISIONED";
    private static final String STATUS_PROVISION_FAILED = "PROVISION_FAILED";
    private static final String LINE_STATUS_SUCCESS = "SUCCESS";
    private static final String LINE_STATUS_FAILED = "FAILED";

    private final RuntimeService runtimeService;
    private final AccessRequestRepository repository;
    private final AccessRequestLineRepository lineRepository;
    private final DepartmentRepository departmentRepository;
    private final RequestHistoryRepository historyRepository;
    private final KeycloakProvisionService keycloakProvisionService;
    private final WebSocketSseNotificationService webSocketSseNotificationService;
    private final WebSocketStompNotificationService webSocketStompNotificationService;

    @Transactional
    public AccessRequest createRequestAndStartProcess(AccessRequestDTO dto) {
        String requester = normalizeRequester(dto); //Chuẩn hóa + validate tránh lưu dữ liệu bẩn/rỗng vào DB.
        String departmentCode = normalizeDepartmentCode(dto);//Lấy mã phòng ban, ưu tiên field chính,
        List<String> roles = normalizeRoles(dto);//Chuẩn hóa danh sách role (lọc null/rỗng),thống nhất format trước khi lưu + gửi vào workflow.
        Map<String, Object> payload = buildPayload(dto, departmentCode, roles);//payload là snapshot đầy đủ lúc tạo request.

        Department dept = departmentRepository.findByDeptCode(departmentCode)
                .orElseThrow(() -> new RuntimeException("Phòng ban không tồn tại: " + departmentCode));

        // 1. Lưu DB trước (cần PK); businessKey unique — tạm dùng khóa tạm rồi gán REQ-{requestId}
        String tempBusinessKey = "TEMP-" + UUID.randomUUID();

        AccessRequest request = AccessRequest.builder()//Dựng object request mới với trạng thái ban đầu PENDING_APPROVAL
                .businessKey(tempBusinessKey)
                .requesterUsername(requester)
                .departmentCode(departmentCode)
                .payload(payload)
                .status(STATUS_PENDING_APPROVAL)
                .build();

        request = repository.save(request);
        String businessKey = "REQ-" + request.getRequestId();
        request.setBusinessKey(businessKey);
        request = repository.save(request);

        // 2. Kích hoạt Camunda Engine
        Map<String, Object> variables = new HashMap<>();//Tạo bộ biến process cho Camunda.
        variables.put("department", departmentCode);
        variables.put("roleCount", roles.size());
        variables.put("manager", dept.getManagerUsername());
        variables.put("director", dept.getDirectorUsername());
        variables.put("admin", "admin");
        variables.put("requestId", request.getRequestId());
        variables.put("requester", requester);
        variables.put("requestedRoles", roles);
        variables.put("requestReason", dto.getReason());

        // "access-request" phải khớp với Process ID trong Modeler
        ProcessInstance pi = runtimeService.startProcessInstanceByKey("access-request", businessKey, variables);

        // 3. Lưu lại ID của Camunda để sau này truy vấn ngược
        request.setProcessInstanceId(pi.getId());
        request = repository.save(request);
        webSocketStompNotificationService.pushToAdmins(
                WebSocketNotificationEvent.builder()
                        .type("NEW_ACCESS_REQUEST")
                        .message("Co yeu cau cap quyen moi can xu ly.")
                        .requestId(request.getRequestId())
                        .status(request.getStatus())
                        .createdAt(LocalDateTime.now())
                        .sender("system")
                        .build());
        return request;
    }

    @Transactional(noRollbackFor = BpmnError.class)//“bộ xử lý quyết định cấp quyền” APPROVE / REJECT
    public void handleProvisionDecision(Long requestId, boolean approved, String comment) {
        AccessRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Request ID: " + requestId));

        // Idempotency: nếu request đã provision thành công trước đó thì bỏ qua lần retry complete task.
        if (STATUS_PROVISIONED.equals(request.getStatus())) {//nếu request đã provision thành công trước đó thì bỏ qua lần retry complete task.
            log.info("Skip provisioning because request already PROVISIONED. requestId={}", requestId);
            return;
        }

        if (!approved) {//nếu approved là false thì set status thành REJECTED
            request.setStatus(STATUS_REJECTED);
            request.setRejection_reason(comment);
            repository.save(request);
            saveHistory(requestId, "REJECT", comment);
            pushWebSocketNotification(request, "REJECTED", "Yeu cau cua ban da bi tu choi.");
            return;
        }

        request.setStatus(STATUS_PROVISIONING);
        repository.save(request);
        saveHistory(requestId, "PROVISION_START", comment);

        List<String> roles = extractRoleNames(request.getPayload());
        String resourceType = extractResourceType(request.getPayload());
        int successCount = 0;
        int failedCount = 0;

        if (roles.isEmpty()) {
            failedCount++;
            lineRepository.save(AccessRequestLine.builder()
                    .requestId(requestId)
                    .roleCode("N/A")
                    .resourceType(resourceType)
                    .provisionStatus(LINE_STATUS_FAILED)
                    .errorMessage("No roles provided in payload")
                    .build());
        }

        for (String role : roles) {
            try {
                keycloakProvisionService.assignRolesToUser(request.getRequesterUsername(), List.of(role));//gọi service để provision quyền tới Keycloak
                lineRepository.save(AccessRequestLine.builder()
                        .requestId(requestId)
                        .roleCode(role)
                        .resourceType(resourceType)
                        .provisionStatus(LINE_STATUS_SUCCESS)
                        .build());
                successCount++;//tăng số lượng quyền provision thành công
            } catch (Exception e) {
                String roleError = "Role " + role + " failed: " + e.getMessage();
                log.error("Provision role failed for requestId={}, role={}", requestId, role, e);
                lineRepository.save(AccessRequestLine.builder()
                        .requestId(requestId)
                        .roleCode(role)
                        .resourceType(resourceType)
                        .provisionStatus(LINE_STATUS_FAILED)
                        .errorMessage(roleError)
                        .build());
                failedCount++;
            }
        }

        if (failedCount == 0) { //đúng
            request.setStatus(STATUS_PROVISIONED);
            request.setRejection_reason(null);
            repository.save(request);
            saveHistory(requestId, "PROVISION_OK", "Provision completed. success=" + successCount);
            pushWebSocketNotification(request, "PROVISIONED", "Yeu cau cua ban da duoc cap quyen thanh cong.");
            return;
        }

        String summary = "Partial/failed provisioning. success=" + successCount + ", failed=" + failedCount;//tạo summary lỗi
        request.setStatus(STATUS_PROVISION_FAILED);
        request.setRejection_reason(summary);
        repository.save(request);
        saveHistory(requestId, "PROVISION_FAIL", summary);
        pushWebSocketNotification(request, "PROVISION_FAILED", "Yeu cau da duoc duyet nhung cap quyen that bai.");

        throw new BpmnError("PROVISION_ERROR", summary);
    }

    // Hàm phụ để lưu lịch sử (Audit Log)
    private void saveHistory(Long requestId, String action, String comment) {
        saveHistory(requestId, action, comment, "admin");
    }

    //hàm này để lưu lịch sử
    private void saveHistory(Long requestId, String action, String comment, String actorUsername) {
        RequestHistory history = RequestHistory.builder()
                .requestId(requestId)
                .actorUsername(actorUsername == null || actorUsername.isBlank() ? "system" : actorUsername)
                .action(action)
                .comment(comment)
                .build();
        historyRepository.save(history);
    }

    @Transactional
    public void markNeedMoreInfo(Long requestId, String comment) {//admin yêu cầu bổ sung thông tin
        AccessRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Request ID: " + requestId));
        request.setStatus(STATUS_NEED_MORE_INFO);
        request.setRejection_reason(comment);
        repository.save(request);
        saveHistory(requestId, "NEED_INFO", comment);
        pushWebSocketNotification(request, STATUS_NEED_MORE_INFO, "Admin yeu cau ban bo sung thong tin.");
    }

    //gửi thông tin chờ admin duyệt lại
    @Transactional
    public void markPendingApprovalAfterClarify(Long requestId, String comment) {
        AccessRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Request ID: " + requestId));
        request.setStatus(STATUS_PENDING_APPROVAL);
        request.setRejection_reason(null);
        repository.save(request);
        saveHistory(requestId, "CLARIFIED", comment);
        pushWebSocketNotification(request, STATUS_PENDING_APPROVAL, "Ban da gui bo sung thong tin, dang cho admin duyet lai.");
    }

    @Transactional
    public void markCounterProposed(Long requestId, String comment) {//action COUNTER_PROPOSAL
        AccessRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Request ID: " + requestId));
        request.setStatus(STATUS_COUNTER_PROPOSED);
        request.setRejection_reason(comment);
        repository.save(request);
        saveHistory(requestId, "COUNTER_PROPOSAL", comment);
        pushWebSocketNotification(request, STATUS_COUNTER_PROPOSED, "Admin da gui de xuat dieu chinh quyen, vui long xac nhan.");
    }

    //hàm này để xử lý khi user đồng ý counter
    @Transactional
    public void markPendingApprovalAfterCounterAccept(Long requestId, String userComment) {
        AccessRequest request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Request ID: " + requestId));
        request.setStatus(STATUS_PENDING_APPROVAL);
        request.setRejection_reason(null);
        repository.save(request);
        saveHistory(requestId, "USER_ACCEPTED_COUNTER",
                userComment == null ? "" : userComment,
                request.getRequesterUsername());
                //gửi notification qua sse và STOMP
        pushWebSocketNotification(request, STATUS_PENDING_APPROVAL,
                "Ban da dong y de xuat dieu chinh. Admin se xem xet lan cuoi truoc khi cap quyen.");
        webSocketStompNotificationService.pushToAdmins(
                WebSocketNotificationEvent.builder()
                        .type("USER_ACCEPTED_COUNTER_PENDING_ADMIN")
                        .message("User da dong y de xuat dieu chinh. Hay duyet (Approve) hoac tu choi phieu.")
                        .requestId(requestId)
                        .status(STATUS_PENDING_APPROVAL)
                        .createdAt(LocalDateTime.now())
                        .sender("system")
                        .build());
    }

    //hàm này để gửi notification qua sse và STOMP
    private void pushWebSocketNotification(AccessRequest request, String type, String message) {
        String username = request.getRequesterUsername();
        if (username == null || username.isBlank()) {
            return;
        }
        webSocketSseNotificationService.pushToUser(
                username,
                WebSocketNotificationEvent.builder()
                        .type(type)
                        .message(message)
                        .requestId(request.getRequestId())
                        .status(request.getStatus())
                        .createdAt(LocalDateTime.now())
                        .build()
        );
        webSocketStompNotificationService.pushToUser(
                username,
                WebSocketNotificationEvent.builder()
                        .type(type)
                        .message(message)
                        .requestId(request.getRequestId())
                        .status(request.getStatus())
                        .createdAt(LocalDateTime.now())
                        .sender("system")
                        .build()
        );
    }

    //hàm này để lấy danh sách role từ payload
    private List<String> extractRoleNames(Map<String, Object> payload) {
        if (payload == null) {
            return List.of();
        }
        Object rolesObj = payload.get("roles");
        if (!(rolesObj instanceof Collection<?> rolesCollection)) {
            return List.of();
        }

        List<String> roles = new ArrayList<>();
        for (Object item : rolesCollection) {
            if (item == null) {
                continue;
            }
            String role = Objects.toString(item, "").trim();
            if (!role.isEmpty()) {
                roles.add(role);
            }
        }
        return roles;
    }


    private String extractResourceType(Map<String, Object> payload) {//lấy resource type từ payload
        if (payload == null) {
            return "REALM_ROLE";
        }

        Object value = payload.get("resourceType");
        String resourceType = Objects.toString(value, "").trim();
        return resourceType.isEmpty() ? "REALM_ROLE" : resourceType;
    }

    //hàm này để chuẩn hóa requester username
    private String normalizeRequester(AccessRequestDTO dto) {
        String requester = Objects.toString(dto.getRequesterUsername(), "").trim();
        if (requester.isEmpty()) {
            throw new IllegalArgumentException("requesterUsername is required");
        }
        return requester;
    }

    //hàm này để chuẩn hóa department code
    private String normalizeDepartmentCode(AccessRequestDTO dto) {//tương thích nhiều client format
        String departmentCode = Objects.toString(dto.getDepartmentCode(), "").trim();
        if (departmentCode.isEmpty() && dto.getPayload() != null) {
            departmentCode = Objects.toString(dto.getPayload().get("department"), "").trim();
        }
        if (departmentCode.isEmpty()) {
            throw new IllegalArgumentException("departmentCode is required");
        }
        return departmentCode;
    }

    //hàm này để chuẩn hóa danh sách role
    private List<String> normalizeRoles(AccessRequestDTO dto) {
        List<String> roles = new ArrayList<>();
        if (dto.getRoles() != null) {
            for (String role : dto.getRoles()) {
                String value = Objects.toString(role, "").trim();
                if (!value.isEmpty()) {
                    roles.add(value);
                }
            }
        }
        if (roles.isEmpty()) {
            roles.addAll(extractRoleNames(dto.getPayload()));
        }
        return roles;
    }

    //tạo payload từ DTO để lưu vào DB
    private Map<String, Object> buildPayload(AccessRequestDTO dto, String departmentCode, List<String> roles) {
        Map<String, Object> payload = new HashMap<>();
        if (dto.getPayload() != null) {
            payload.putAll(dto.getPayload());
        }
        payload.put("department", departmentCode);
        payload.put("roles", roles);
        if (dto.getReason() != null && !dto.getReason().isBlank()) {
            payload.putIfAbsent("reason", dto.getReason());
        }
        return payload;
    }
}