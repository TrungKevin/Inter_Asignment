# WebSocket/SSE Notification Flow (theo code hiện tại)

Tài liệu này mô tả đầy đủ luồng realtime notification gồm SSE + STOMP/WebSocket.

Code chính:
- `src/main/java/org/example/camunda/controller/WebSocketNotificationController.java`
- `src/main/java/org/example/camunda/service/WebSocketSseNotificationService.java`
- `src/main/java/org/example/camunda/controller/WebSocketStompNotificationController.java`
- `src/main/java/org/example/camunda/service/WebSocketStompNotificationService.java`
- `src/main/java/org/example/camunda/service/AccessRequestService.java`
- `src/main/java/org/example/service/jasper/ReportOrchestrationService.java`

## 1) Kênh SSE cho notification theo user

## 1.1 Stream endpoint
- Class: `WebSocketNotificationController`
- Hàm: `stream(Authentication authentication)`
- Endpoint: `GET /api/notifications/webSocket/stream`
- Produces: `text/event-stream`
- Tác dụng:
  - Resolve username từ auth/JWT.
  - Đăng ký emitter qua `webSocketSseNotificationService.subscribe(username)`.

## 1.2 Quản lý emitter + push event
- Class: `WebSocketSseNotificationService`
- Field:
  - `emittersByUsername: Map<String, List<SseEmitter>>`
- Hàm:
  - `subscribe(username)`
    - tạo `SseEmitter` timeout 30 phút.
    - add vào map theo username.
    - gắn callback `onCompletion/onTimeout/onError` để remove emitter.
    - gửi event handshake `websocket-connected`.
  - `pushToUser(username, payload)`
    - push event `websocket-notification` tới toàn bộ emitter của user.
    - emitter lỗi sẽ bị remove.
  - `removeEmitter(...)`
    - dọn emitter chết để tránh leak map.

Ý nghĩa:
- SSE phù hợp stream server -> client đơn giản, không cần full-duplex.

---

## 2) Kênh STOMP/WebSocket cho user/admin

## 2.1 Push service
- Class: `WebSocketStompNotificationService`
- Hàm:
  - `pushToUser(username, payload)` -> gửi `/user/{username}/queue/notifications`.
  - `pushToAdmins(payload)` -> broadcast `/topic/admin-notifications`.

## 2.2 MessageMapping controller (client gửi lên WS)
- Class: `WebSocketStompNotificationController`
- Hàm:
  - `userToAdmin(WebSocketSendRequest request, Authentication authentication)`
    - Mapping: `/app/notifications/user-to-admin`
    - Build event + sender.
    - Push lên admin topic.
  - `adminToUser(WebSocketSendRequest request, Authentication authentication)`
    - Mapping: `/app/notifications/admin-to-user`
    - Check quyền admin.
    - Bắt buộc `targetUsername`.
    - Push đúng user queue đích.

Ý nghĩa:
- STOMP phục vụ tương tác 2 chiều (client gửi sự kiện, server route tới đúng audience).

---

## 3) Điểm bắn notification trong business Camunda

## 3.1 Trong `AccessRequestService`

Hàm trung tâm:
- `pushWebSocketNotification(AccessRequest request, String type, String message)`

Cơ chế:
- Với user requester:
  - Push SSE qua `webSocketSseNotificationService.pushToUser(...)`
  - Push STOMP qua `webSocketStompNotificationService.pushToUser(...)`

Được gọi từ:
- `markNeedMoreInfo(...)`
- `markCounterProposed(...)`
- `markPendingApprovalAfterClarify(...)`
- `markPendingApprovalAfterCounterAccept(...)`
- `handleProvisionDecision(...)` (nhánh reject/provisioned/provision_failed)

Ngoài ra:
- `createRequestAndStartProcess(...)` push STOMP cho admin khi có request mới.
- `markPendingApprovalAfterCounterAccept(...)` push STOMP admin để duyệt vòng cuối.

## 3.2 Trong luồng Jasper async job
- Class: `ReportOrchestrationService`
- Các hàm:
  - `sendProgress(...)`
  - `sendCompleted(...)`
  - `sendFailed(...)`
- Kênh:
  - `convertAndSendToUser(createdBy, "/queue/report-jobs", event)`
- Ý nghĩa:
  - Frontend nhận realtime tiến độ export report theo từng job.

---

## 4) Phân biệt SSE và STOMP trong hệ thống hiện tại

- SSE (`WebSocketSseNotificationService`)
  - Một chiều server -> client.
  - Dễ tích hợp cho stream thông báo liên tục.
  - Dùng endpoint REST stream.

- STOMP (`WebSocketStompNotificationService`)
  - Hỗ trợ hai chiều qua WebSocket broker.
  - Có user destination (`/user/...`) và topic broadcast (`/topic/...`).
  - Dùng cho cả notify business và progress export job.

Hệ thống đang dùng song song:
- SSE để đảm bảo kênh nhận notification đơn giản và bền.
- STOMP để phục vụ các use case cần route linh hoạt user/admin và message từ client.

---

## 5) Danh sách class/hàm liên quan WebSocket/SSE

## 5.1 Controller
- `WebSocketNotificationController.stream(...)`
- `WebSocketStompNotificationController.userToAdmin(...)`
- `WebSocketStompNotificationController.adminToUser(...)`

## 5.2 Service realtime
- `WebSocketSseNotificationService.subscribe(...)`
- `WebSocketSseNotificationService.pushToUser(...)`
- `WebSocketSseNotificationService.removeEmitter(...)`
- `WebSocketStompNotificationService.pushToUser(...)`
- `WebSocketStompNotificationService.pushToAdmins(...)`

## 5.3 Business điểm phát sự kiện
- `AccessRequestService.pushWebSocketNotification(...)`
- `AccessRequestService.createRequestAndStartProcess(...)`
- `AccessRequestService.markNeedMoreInfo(...)`
- `AccessRequestService.markCounterProposed(...)`
- `AccessRequestService.markPendingApprovalAfterClarify(...)`
- `AccessRequestService.markPendingApprovalAfterCounterAccept(...)`
- `AccessRequestService.handleProvisionDecision(...)`
- `ReportOrchestrationService.sendProgress(...)`
- `ReportOrchestrationService.sendCompleted(...)`
- `ReportOrchestrationService.sendFailed(...)`

