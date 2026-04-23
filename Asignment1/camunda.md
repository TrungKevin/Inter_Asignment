# Camunda Flow (theo code hiện tại)

Tài liệu này mô tả toàn bộ luồng Camunda + business service liên quan trong project, bám sát code các file:
- `src/main/java/org/example/camunda/controller/AccessRequestController.java`
- `src/main/java/org/example/camunda/service/AccessRequestService.java`
- `src/main/java/org/example/camunda/service/AccessRequestQueryService.java`
- `src/main/java/org/example/camunda/controller/CamundaTaskController.java`
- `src/main/java/org/example/camunda/service/CamundaTaskApplicationService.java`
- `src/main/java/org/example/camunda/delegate/*.java`
- `src/main/java/org/example/camunda/service/AccessRequestNotificationService.java`

## A) Tạo yêu cầu cấp quyền ban đầu

## A.1 API submit request
- Class: `AccessRequestController`
- Hàm: `submitRequest(AccessRequestDTO dto)`
- Endpoint: `POST /api/access-requests` (hoặc `/submit`)
- Tác dụng:
  - Nhận payload từ client.
  - Gọi service trung tâm `createRequestAndStartProcess(...)`.
  - Trả lại bản ghi request đã tạo.

## A.2 Lưu DB + start process Camunda
- Class: `AccessRequestService`
- Hàm: `createRequestAndStartProcess(AccessRequestDTO dto)`

Các bước chi tiết:
1. Chuẩn hóa input:
   - `normalizeRequester(dto)`
   - `normalizeDepartmentCode(dto)`
   - `normalizeRoles(dto)`
   - `buildPayload(dto, departmentCode, roles)`
2. Kiểm tra phòng ban tồn tại qua `DepartmentRepository`.
3. Tạo bản ghi `AccessRequest` DB với trạng thái ban đầu:
   - `PENDING_APPROVAL`
   - business key tạm rồi đổi thành `REQ-{requestId}`.
4. Build biến Camunda:
   - `department`, `roleCount`, `manager`, `director`, `admin`
   - `requestId`, `requester`, `requestedRoles`, `requestReason`
5. Start process:
   - `runtimeService.startProcessInstanceByKey("access-request", businessKey, variables)`
6. Lưu `processInstanceId` ngược về DB.
7. Push thông báo admin có request mới qua STOMP.

Ý nghĩa:
- Đây là điểm khởi tạo đồng bộ giữa DB nghiệp vụ và engine workflow.

---

## B) Query danh sách request của user ("Yêu cầu của tôi")

## B.1 API danh sách của tôi
- Class: `AccessRequestController`
- Hàm: `getMyRequests(Authentication authentication)`
- Endpoint: `GET /api/access-requests/mine`
- Gọi: `AccessRequestQueryService.getMyRequests(...)`

## B.2 Business lấy list + map admin feedback
- Class: `AccessRequestQueryService`
- Hàm: `getMyRequests(...)`
- Logic:
  - Resolve username từ JWT (`preferred_username`) hoặc auth name.
  - Query `findByRequesterUsernameOrderByCreatedAtDesc`.
  - Map từng entity qua `toMineItem(...)`.

Hàm map DTO:
- `toMineItem(AccessRequest request)`
  - Chỉ set `adminFeedback` khi trạng thái:
    - `NEED_MORE_INFO`
    - `COUNTER_PROPOSED`

## B.3 API chi tiết 1 request
- Class: `AccessRequestController`
- Hàm: `getRequestDetail(Long id, Authentication authentication)`
- Endpoint: `GET /api/access-requests/{id}`
- Gọi: `AccessRequestQueryService.getRequestDetail(...)`

## B.4 Business chi tiết + check quyền
- Class: `AccessRequestQueryService`
- Hàm: `getRequestDetail(...)`
- Logic:
  - Load request theo ID.
  - Check quyền:
    - owner của request, hoặc
    - role `admin`/`auditor`
  - Load history:
    - `findByRequestIdOrderByCreatedAtAsc`
  - Load line provisioning:
    - `findByRequestIdOrderByLineIdAsc`
  - Map ra DTO:
    - `toHistoryItem(...)`
    - `toLineItem(...)`

---

## C) Query task Camunda (pending tasks)

## C.1 API lấy task
- Class: `CamundaTaskController`
- Hàm: `getPendingTasks(authentication, assignee, candidateGroup, requestId, taskDefinitionKey)`
- Endpoint: `GET /api/camunda/tasks`

## C.2 Business query + lọc key + map vars
- Class: `CamundaTaskApplicationService`
- Hàm: `getPendingTasks(...)`

Luồng:
1. Tạo `TaskQuery` theo `processDefinitionKey=access-request`, active.
2. Lọc theo:
   - `candidateGroup` hoặc
   - `assignee` hoặc
   - user hiện tại nếu không phải admin.
3. Nếu có `requestId` -> filter business key `REQ-{requestId}`.
4. Nếu có `taskDefinitionKey` -> lọc mềm qua `matchesTaskDefinitionKey(...)`
   (hỗ trợ alias key cũ/mới).
5. Map ra `TaskResponseDTO`, đọc thêm process variables bằng:
   - `readVariableAsString(...)`

Hàm phụ liên quan:
- `matchesTaskDefinitionKey(...)`
- `isAdminApproveTaskKey(...)`
- `isUserClarifyTaskKey(...)`
- `isUserCounterTaskKey(...)`
- `readVariableAsString(...)`

---

## D) Complete task (action chính của luồng)

## D.1 API complete task
- Class: `CamundaTaskController`
- Hàm: `completeTask(Authentication authentication, String taskId, TaskCompleteRequest request)`
- Endpoint: `POST /api/camunda/tasks/{taskId}/complete`
- Gọi service: `camundaTaskApplicationService.completeTask(...)`

## D.2 Business phân nhánh action
- Class: `CamundaTaskApplicationService`
- Hàm: `completeTask(String taskId, TaskCompleteRequest request, Authentication authentication)`

Luồng chi tiết:
1. Validate body khác null.
2. Load task runtime theo `taskId`.
3. Check quyền hoàn tất task:
   - `assertMayCompleteTask(...)`
4. Build map variables chung (`comment`, ...).
5. Phân nhánh theo task key:
   - Admin approve task:
     - action từ `normalizeAdminAction(...)`
     - set biến `action`, `adminComment`, và các cờ `approved`, `needMoreInfo`, `counterProposal`.
   - User clarify task:
     - set `action=CLARIFIED`, `clarified=true`, `userClarification`.
   - User counter response task:
     - bắt buộc `acceptCounter`
     - set `acceptCounter`, `approved`, comment/time.
6. `taskService.complete(taskId, variables)` trước.
7. Sync DB sau complete:
   - NEED_INFO -> `accessRequestService.markNeedMoreInfo(...)`
   - COUNTER_PROPOSAL -> `markCounterProposed(...)`
   - User clarify -> `markPendingApprovalAfterClarify(...)`
   - User accept counter -> `markPendingApprovalAfterCounterAccept(...)`

Ý nghĩa kiến trúc:
- Hoàn tất token BPMN trước, rồi mới sync DB nghiệp vụ để giảm lệch trạng thái engine/application.

## D.3 Check ai được phép complete
- Hàm: `assertMayCompleteTask(Task task, Authentication authentication)`
- Rule:
  - Admin được complete.
  - User thường không được complete admin approve task.
  - User task chỉ complete khi assignee khớp chính mình.

---

## Delegate là gì? Vì sao cần?

Trong code này, delegate là lớp Java triển khai `JavaDelegate`, được Camunda gọi tại Service Task.

Tác dụng delegate:
- Lấy process variables từ execution (`execution.getVariable(...)`).
- Gọi service nghiệp vụ thật của ứng dụng.
- Đẩy kết quả/lỗi về lại BPMN flow (qua exception/BpmnError).

Vì sao cần:
- Tách orchestration (BPMN model) khỏi business logic Java.
- BPMN dễ đọc, service dễ test độc lập.
- Dễ đổi luồng mà không phá business core.

Nói ngắn:
- BPMN = bản đồ luồng.
- Delegate = cầu nối để bản đồ gọi code Java thực thi.

---

## E) Nhánh admin action

## E.1 NEED_INFO
- Điểm set biến + complete:
  - `CamundaTaskApplicationService.completeTask(...)` nhánh admin action `NEED_INFO`.
- Sync DB + history + notify:
  - `AccessRequestService.markNeedMoreInfo(Long requestId, String comment)`
- Gửi mail:
  - Delegate `SendNeedInfoMailDelegate.execute(...)`
  - Service mail: `AccessRequestNotificationService.sendNeedInfoNotification(...)`

## E.2 COUNTER_PROPOSAL
- Điểm set biến:
  - `CamundaTaskApplicationService.completeTask(...)` nhánh `COUNTER_PROPOSAL`.
- Sync DB + history + notify:
  - `AccessRequestService.markCounterProposed(...)`
- Gửi mail:
  - `SendCounterProposalMailDelegate.execute(...)`
  - `AccessRequestNotificationService.sendCounterProposalNotification(...)`

## E.3 APPROVE / REJECT
- Set approved + complete task:
  - `CamundaTaskApplicationService.completeTask(...)`
- Xử lý cấp quyền/từ chối:
  - `ProvisionAccessDelegate.execute(...)` gọi
  - `AccessRequestService.handleProvisionDecision(requestId, approved, comment)`
- Gửi mail quyết định:
  - `SendDecisionMailDelegate.execute(...)`
  - `AccessRequestNotificationService.sendDecisionNotification(...)`

Chi tiết `handleProvisionDecision(...)`:
- Nếu reject: set `REJECTED`, save history, push notification.
- Nếu approve:
  - set `PROVISIONING`.
  - duyệt roles trong payload, gọi `keycloakProvisionService.assignRolesToUser(...)`.
  - lưu từng dòng kết quả vào `AccessRequestLine` (`SUCCESS`/`FAILED`).
  - tất cả thành công -> `PROVISIONED`.
  - có lỗi -> `PROVISION_FAILED`, ném `BpmnError("PROVISION_ERROR", ...)`.

---

## F) Nhánh user action

## F.1 User bổ sung thông tin (clarify)
- Nhận ở:
  - `CamundaTaskApplicationService.completeTask(...)` nhánh `isUserClarifyTaskKey`.
- Sync DB:
  - `AccessRequestService.markPendingApprovalAfterClarify(...)`
  - set lại trạng thái `PENDING_APPROVAL`, lưu history, push notify user.

## F.2 User phản hồi counter (accept/decline)
- Nhận ở:
  - `CamundaTaskApplicationService.completeTask(...)` nhánh `isUserCounterTaskKey`.
- Nếu user accept:
  - `AccessRequestService.markPendingApprovalAfterCounterAccept(...)`
  - trạng thái về `PENDING_APPROVAL`, push notify user + push admin topic để duyệt cuối.
- Nếu decline:
  - Camunda xử lý theo BPMN path bằng biến `acceptCounter=false`.

---

## G) Danh sách class/hàm liên quan Camunda để báo cáo

## G.1 Controller layer
- `AccessRequestController.submitRequest(...)`
- `AccessRequestController.getMyRequests(...)`
- `AccessRequestController.getRequestDetail(...)`
- `CamundaTaskController.getPendingTasks(...)`
- `CamundaTaskController.completeTask(...)`

## G.2 Service nghiệp vụ
- `AccessRequestService.createRequestAndStartProcess(...)`
- `AccessRequestService.handleProvisionDecision(...)`
- `AccessRequestService.markNeedMoreInfo(...)`
- `AccessRequestService.markCounterProposed(...)`
- `AccessRequestService.markPendingApprovalAfterClarify(...)`
- `AccessRequestService.markPendingApprovalAfterCounterAccept(...)`
- `AccessRequestService.pushWebSocketNotification(...)`
- `AccessRequestQueryService.getMyRequests(...)`
- `AccessRequestQueryService.getRequestDetail(...)`
- `CamundaTaskApplicationService.getPendingTasks(...)`
- `CamundaTaskApplicationService.completeTask(...)`
- `CamundaTaskApplicationService.assertMayCompleteTask(...)`

## G.3 Delegate
- `ProvisionAccessDelegate.execute(...)`
- `SendNeedInfoMailDelegate.execute(...)`
- `SendCounterProposalMailDelegate.execute(...)`
- `SendDecisionMailDelegate.execute(...)`

## G.4 Mail notification service
- `AccessRequestNotificationService.sendDecisionNotification(...)`
- `AccessRequestNotificationService.sendNeedInfoNotification(...)`
- `AccessRequestNotificationService.sendCounterProposalNotification(...)`

