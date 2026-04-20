[//]: # (# Kế hoạch triển khai: Access Request & Provisioning &#40;Camunda + IAM&#41;)

[//]: # ()
[//]: # (Tài liệu này là **lộ trình thực thi** cho luồng nghiệp vụ lớn tương đương **“giỏ hàng → thanh toán”** trong domain **User Management / IAM**: nhân sự xin **quyền / phòng ban / tài nguyên**, đi qua rule &#40;DMN&#41; và phê duyệt đa cấp, rồi **provision** Keycloak + DB + báo cáo.)

[//]: # ()
[//]: # (**Hiện trạng dự án &#40;xem `luong.md`&#41;:** Spring Boot modular monolith, `users` / `profiles` / `login_logs`, JWT Keycloak, đăng ký trực tiếp `POST /register` **tách** với user Keycloak trừ khi đồng bộ. **Không** tách microservice mới — nhúng Camunda trong cùng repo.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 1. Mục tiêu và phạm vi)

[//]: # ()
[//]: # (| Mục tiêu | Mô tả ngắn |)

[//]: # (|----------|------------|)

[//]: # (| Luồng “lớn” | Một **phiếu yêu cầu** chứa nhiều lựa chọn &#40;phòng ban + nhóm quyền&#41;, có **trạng thái nghiệp vụ** và **lịch sử phê duyệt**, nối `process_instance_id` với Camunda. |)

[//]: # (| Provision | Sau khi duyệt: **Service Task** gọi Keycloak &#40;gán role&#41; + cập nhật DB &#40;profile / trạng thái request&#41; + ghi log lịch sử. |)

[//]: # (| Báo cáo | JasperReports: **biên bản / phiếu cấp phát** theo `request_id`. |)

[//]: # (| Kiến trúc | Package `org.example.camunda` &#40;delegate, listener tùy chọn&#41;, BPMN/DMN trong `src/main/resources`. |)

[//]: # ()
[//]: # (**Ngoài phạm vi giai đoạn đầu &#40;có thể làm sau&#41;:** timer nhắc đổi mật khẩu, offboarding, bảng `user_resources` đầy đủ cho mọi tài nguyên — tránh làm song song khi luồng tạo/cấp quyền chưa ổn.)

[//]: # ()
[//]: # (---)

[//]: # ()
[//]: # (## 2. So sánh tư duy với E-commerce &#40;để bám scope&#41;)

[//]: # ()
[//]: # (| E-commerce | IAM &#40;luồng của bạn&#41; |)

[//]: # (|------------|---------------------|)

[//]: # (| Chọn sản phẩm | Chọn **phòng ban** + **nhóm quyền** &#40;và sau này: nhiều dòng trong một phiếu&#41;. |)

[//]: # (| Kiểm tra tồn kho / điều kiện | **DMN** hoặc rule: ví dụ Admin ngoài IT → bắt buộc thêm bước duyệt Giám đốc; thực tập chỉ Viewer. |)

[//]: # (| Giỏ hàng | **Phiếu `access_requests`** + &#40;mở rộng&#41; **`access_request_lines`**. |)

[//]: # (| Thanh toán | **Service Task**: Keycloak assign role + commit trạng thái DB. |)

[//]: # (| Lịch sử đơn | **`request_history`** + Camunda history &#40;task completed&#41;. |)

---

## 3. Chiến lược triển khai: làm theo **pha**, không làm hết một lần

### Baseline phiên bản (đã chốt theo mã nguồn hiện tại)

| Thành phần | Version chốt |
|-----------|---------------|
| Java | `21` |
| Spring Boot Parent | `3.2.4` |
| Camunda Starter | `7.20.0` |
| Thuộc tính Maven | ``<camunda.version>7.20.0</camunda.version>`` |

**Dependency đang dùng trong `pom.xml`:**

```xml
<camunda.version>7.20.0</camunda.version>
```

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-rest</artifactId>
  <version>${camunda.version}</version>
</dependency>

<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-webapp</artifactId>
  <version>${camunda.version}</version>
</dependency>

<dependency>
  <groupId>com.sun.xml.bind</groupId>
  <artifactId>jaxb-impl</artifactId>
  <version>4.0.3</version>
</dependency>
```

### Pha 0 — Chuẩn bị (bắt buộc trước khi vẽ BPMN phức tạp)

1. [x] Thêm dependency **Camunda Spring Boot Starter** (bản tương thích JDK/Spring Boot trong `pom.xml`).
2. [x] Cấu hình Camunda trong `application.yaml`: schema riêng hoặc prefix bảng Camunda (tránh đụng bảng app nếu cùng DB).
3. [x] Bật **Job Executor** (mặc định embedded thường đã có) — sau này cần cho timer; pha đầu có thể chưa dùng timer.
4. [x] Tạo package `org.example.camunda` (delegate, config Camunda nếu cần bean).
    camunda: Package tổng.

    camunda.delegate: Nơi chứa các class Java Delegate xử lý logic Keycloak/DB.
    
    camunda.service: Nơi chứa AccessRequestService để điều phối workflow.
    
    camunda.config: (Nếu cần) để cấu hình bean riêng cho Camunda.

**Trạng thái Pha 0:** [x] DONE

### Pha A — MVP “đủ demo transaction & async” (làm trước)

**BPMN tối thiểu:** `Start` → **một** `User Task` (ví dụ *Manager/Admin duyệt*) → **một** `Service Task` (Java Delegate: Keycloak + DB).

**Mục đích pha A:** chứng minh:

- `POST` tạo request + `startProcessInstanceByKey` + lưu `process_instance_id`, `business_key`.
- `GET` task list (Camunda REST hoặc `TaskService` qua wrapper API).
- `POST` complete task → chạy delegate → cập nhật `access_requests.status`.

**Transaction / lỗi Keycloak (hướng xử lý):**

- **Thực tế:** delegate trong Camunda thường chạy trong **transaction của engine**; gọi Keycloak là **HTTP ngoài** — không “rollback Keycloak” tự động nếu DB lỗi sau đó.
- **Pattern khuyến nghị cho MVP:**
  1. Trong delegate: gọi Keycloak trước hoặc sau tùy idempotency; nếu Keycloak **thành công** mà DB **lỗi** → ghi `status = PROVISION_FAILED`, log chi tiết, **compensation thủ công** hoặc job retry (pha sau).
  2. Hoặc: cập nhật DB `status` theo từng bước; nếu fail giữa chừng → trạng thái rõ ràng để admin xử lý (enterprise thường chấp nhận **saga nhẹ** thay vì một XA transaction).
- **Bài test “lớn” để báo cáo:** mô tả trong doc + 1 test integration/mock: Keycloak throw → process đánh dấu `FAILED`, không để silent success.

**Async:** Camunda job async (nếu bật trên task) cho phép trả response nhanh; pha A có thể **đồng bộ** delegate cho đơn giản, sau đó bật async nếu cần.

### Pha B — “Giỏ hàng” thật: nhiều quyền trên một phiếu

- Thêm bảng **`access_request_lines`** (mỗi dòng: `role_code`, `resource_type`, v.v.).
- BPMN: có thể một user task “submit” hoặc vẫn một luồng duyệt nhưng UI cho chọn nhiều line.
- Delegate: loop gán từng role; partial failure → ghi từng line `SUCCESS`/`FAILED`.

**Trạng thái Pha B:** [x] DONE

### Pha C — DMN + phê duyệt đa cấp

- Thêm **`departments`** (và `manager_id` hoặc map sang Keycloak group).
- File **DMN** quyết định: cần thêm user task “Giám đốc” hay “IT Security” hay chỉ một cấp.
- BPMN: `Business Rule Task` (DMN) → gateway → các nhánh user task tương ứng.

### Pha D — Báo cáo Jasper

- Template Jasper nhận tham số `request_id` (hoặc `process_instance_id`).
- Service đọc `access_requests` + `request_history` (+ lines nếu có) → fill report → API `GET` export PDF (role admin / auditor).

**Trạng thái Pha D:** [x] DONE

---

## 4. Thiết kế cơ sở dữ liệu

### 4.1. Bảng `access_requests` (lõi “tiến trình nghiệp vụ”)

| Cột | Kiểu gợi ý | Ý nghĩa |
|-----|------------|---------|
| `request_id` | UUID / BIGSERIAL PK | Id nghiệp vụ. |
| `business_key` | VARCHAR, UNIQUE | Khóa nối Camunda (`businessKey`), ví dụ `REQ-{uuid}` hoặc `username-{timestamp}`. |
| `process_instance_id` | VARCHAR, nullable lúc draft | Sau `startProcess` điền vào. |
| `requester_username` / `requester_id` | VARCHAR | Người gửi (JWT `sub` hoặc username). |
| `status` | ENUM / VARCHAR | `DRAFT`, `SUBMITTED`, `PENDING_APPROVAL`, `APPROVED`, `REJECTED`, `PROVISIONING`, `PROVISIONED`, `PROVISION_FAILED`, … |
| `payload` | JSONB / TEXT | Snapshot phòng ban + quyền xin (pha A dùng JSON là đủ; pha B chuẩn hóa xuống `access_request_lines`). |
| `created_at`, `updated_at` | TIMESTAMP | Audit thời gian. |
| `rejection_reason` | TEXT, nullable | Khi reject. |

**Quan hệ:** tùy chọn FK tới `users` nếu requester đã có tài khoản app; nếu luồng “xin trước khi có user”, có thể chỉ lưu email/username dự kiến trong `payload`.

### 4.2. Bảng `request_history` (audit trail phê duyệt)

| Cột | Ý nghĩa |
|-----|---------|
| `id` | PK |
| `request_id` | FK → `access_requests` |
| `actor_username` | Ai thực hiện |
| `action` | `SUBMIT`, `APPROVE`, `REJECT`, `PROVISION_START`, `PROVISION_OK`, `PROVISION_FAIL` |
| `comment` | Ghi chú |
| `created_at` | Thời điểm |

**Ghi chú:** Camunda history đã lưu task; bảng này phục vụ **báo cáo nội bộ** và UI không phụ thuộc hoàn toàn vào Camunda API.

### 4.3. Bảng `departments` (pha C / DMN)

| Cột | Ý nghĩa |
|-----|---------|
| `id` | PK |
| `code` | Mã phòng ban (IT, HR, SALES) — input DMN |
| `name` | Tên hiển thị |
| `manager_username` | Optional — gán candidate group cho user task |

### 4.4. Bảng `access_request_lines` (pha B — tùy chọn ngay từ đầu nếu muốn “lớn” sớm)

| Cột | Ý nghĩa |
|-----|---------|
| `line_id` | PK |
| `request_id` | FK |
| `role_code` | Ví dụ `VIEWER`, `EDITOR`, `ADMIN` |
| `department_code` | Snapshot |
| `provision_status` | `PENDING`, `OK`, `FAILED` |
| `error_message` | Nullable |

### 4.5. Script SQL mẫu (PostgreSQL — chỉnh tên schema nếu cần)

```sql
CREATE TABLE access_requests (
  request_id       BIGSERIAL PRIMARY KEY,
  business_key     VARCHAR(128) NOT NULL UNIQUE,
  process_instance_id VARCHAR(64),
  requester_username VARCHAR(128) NOT NULL,
  status           VARCHAR(32) NOT NULL,
  payload          JSONB,
  rejection_reason TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE request_history (
  id               BIGSERIAL PRIMARY KEY,
  request_id       BIGINT NOT NULL REFERENCES access_requests(request_id),
  actor_username   VARCHAR(128) NOT NULL,
  action           VARCHAR(32) NOT NULL,
  comment          TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_access_requests_status ON access_requests(status);
CREATE INDEX idx_access_requests_requester ON access_requests(requester_username);
```

`departments` / `access_request_lines` thêm khi vào pha B/C.

---

## 5. Cấu trúc package đề xuất (trong cùng project)

```
org.example.camunda
  config/          — (tuỳ) CamundaProcessEngineConfigurationCustomizer
  delegate/        — ProvisionAccessDelegate, ...
  dto/             — RequestPayload DTO map JSON
  service/         — AccessRequestService (tạo request, start process, đồng bộ status)
  repository/      — AccessRequestRepository, RequestHistoryRepository
```

**Không** tạo microservice mới: delegate `@Autowired` trực tiếp `UserService`, client Keycloak (sau khi hoàn thiện `IdentityClient` hoặc service admin tương đương `KeycloakForgotPasswordService`).

---

## 6. Hợp đồng API (REST) — hướng “theo trạng thái”

| Method | Path (gợi ý) | Vai trò |
|--------|----------------|--------|
| POST | `/api/access-requests` | Tạo bản ghi + (optional) `startProcessInstanceByKey` với `businessKey` = `business_key`. Body: department, roles[], lý do. |
| GET | `/api/access-requests/mine` | User xem phiếu của mình + `status` + có thể enrich “đang chờ bước nào” bằng query task Camunda theo `businessKey`. |
| GET | `/api/access-requests/{id}` | Chi tiết + history. |
| GET | `/api/camunda/tasks` | **Admin/Manager:** list task (filter theo `candidateGroup` / assignee khớp JWT). Implementation: `TaskService` hoặc REST Camunda. |
| POST | `/api/camunda/tasks/{taskId}/complete` | Body: `approved` boolean, `comment`. Gọi `taskService.complete` + variables (`approved`, …). |
| GET | `/api/access-requests/{id}/report` | (Pha D) Export PDF Jasper. |

**Bảo mật:** mở rộng `SecurityConfig`: chỉ role `admin` / `manager` complete task phù hợp; user thường chỉ `mine`.

**Trạng thái mục 6 (API Contract):** [x] DONE

---

## 7. BPMN & Camunda — checklist thực hiện

1. File `src/main/resources/processes/access-request.bpmn` (tên process key ví dụ `access-request`).
2. `User Task`: `candidateGroups` hoặc expression theo department (pha sau).
3. `Service Task`: implementation = Java class — `delegateExpression` hoặc `class` trỏ tới Spring bean (delegate phải là bean nếu dùng CDI/Spring).
4. Variables process: `requestId`, `businessKey`, `approved`, `payload` (hoặc chỉ id để delegate load DB).
5. **Idempotency:** nếu complete bị retry, delegate kiểm tra `status == PROVISIONED` thì skip gọi Keycloak lại.

**Trạng thái mục 7 (BPMN & Camunda):** [x] DONE

---

## 7.1. Hướng dẫn chi tiết Camunda Modeler (đủ để demo end-to-end)

### A. Chuẩn bị Modeler

1. Cài **Camunda Modeler 5.x**.
2. Mở project BPMN mới và lưu file vào:
   - `src/main/resources/processes/access-request.bpmn`
3. Đặt process:
   - `Process Name`: `Access Request Provisioning`
   - `Process Id` (key): `access-request`
   - Bật `Executable` = `true`

### B. Vẽ BPMN Pha A (MVP)

Vẽ đúng thứ tự sau:

1. **Start Event**  
   Tên: `Request Submitted`
2. **User Task**  
   Tên: `Manager Approve`  
   `Task Definition Key`: `manager_approve_task`
3. **Exclusive Gateway**  
   Tên: `Approved?`
4. Nhánh `approved == true`:
   - **Service Task** tên `Provision Access`
   - Cấu hình `Delegate Expression`: `${provisionAccessDelegate}`
5. Nhánh `approved == false`:
   - **End Event** tên `Request Rejected`
6. Sau Service Task:
   - **End Event** tên `Provision Done`

### C. Cấu hình điều kiện Gateway

- Sequence Flow nhánh duyệt:
  - `Condition Expression`: `${approved == true}`
- Sequence Flow nhánh từ chối:
  - `Condition Expression`: `${approved == false}`

### D. Candidate Group cho User Task

Trong `Manager Approve`:

- `Candidate Groups`: `admin,manager`

> Bản nâng cao (pha C): đổi thành expression theo department hoặc DMN output.

### E. Variables chuẩn dùng xuyên suốt

Khi `startProcess`, set tối thiểu:

- `requestId` (Long/String)
- `businessKey` (String)
- `requesterUsername` (String)
- `approved` (Boolean, để trống ở đầu hoặc mặc định false)

Khi complete task từ backend:

- Set `approved` (true/false)
- Set `comment` (optional)

### F. Deploy và kiểm tra trên app

1. Chạy Spring Boot app.
2. Camunda sẽ auto-deploy BPMN trong `resources/processes`.
3. Kiểm tra:
   - Cockpit: có process definition `access-request`
   - Tasklist: thấy task `Manager Approve` sau khi start instance.

---

## 7.2. Mapping BPMN sang code Spring Boot (mẫu triển khai)

### A. Delegate bean name phải khớp Modeler

Trong BPMN đã dùng `${provisionAccessDelegate}` thì trong code:

```java
@Component("provisionAccessDelegate")
@RequiredArgsConstructor
public class ProvisionAccessDelegate implements JavaDelegate {

  private final AccessRequestService accessRequestService;

  @Override
  public void execute(DelegateExecution execution) {
    Long requestId = ((Number) execution.getVariable("requestId")).longValue();
    Boolean approved = (Boolean) execution.getVariable("approved");
    String comment = (String) execution.getVariable("comment");
    accessRequestService.handleProvisionDecision(requestId, Boolean.TRUE.equals(approved), comment);
  }
}
```

### B. Service xử lý trạng thái nghiệp vụ

```java
@Service
@RequiredArgsConstructor
public class AccessRequestService {

  private final AccessRequestRepository accessRequestRepository;
  private final RequestHistoryRepository requestHistoryRepository;

  @Transactional
  public void handleProvisionDecision(Long requestId, boolean approved, String comment) {
    AccessRequest request = accessRequestRepository.findById(requestId)
        .orElseThrow(() -> new IllegalArgumentException("Request not found: " + requestId));

    if (!approved) {
      request.setStatus("REJECTED");
      request.setRejectionReason(comment);
      accessRequestRepository.save(request);
      saveHistory(requestId, "REJECT", comment);
      return;
    }

    request.setStatus("PROVISIONING");
    accessRequestRepository.save(request);
    saveHistory(requestId, "PROVISION_START", comment);

    // TODO: gọi Keycloak assign role tại đây

    request.setStatus("PROVISIONED");
    accessRequestRepository.save(request);
    saveHistory(requestId, "PROVISION_OK", "Provision completed");
  }

  private void saveHistory(Long requestId, String action, String comment) {
    RequestHistory history = RequestHistory.builder()
        .requestId(requestId)
        .action(action)
        .comment(comment)
        .build();
    requestHistoryRepository.save(history);
  }
}
```

### C. API start process

[//]: # (```java)

[//]: # (Map<String, Object> variables = new HashMap<>&#40;&#41;;)

[//]: # (variables.put&#40;"requestId", request.getRequestId&#40;&#41;&#41;;)

[//]: # (variables.put&#40;"businessKey", request.getBusinessKey&#40;&#41;&#41;;)

[//]: # (variables.put&#40;"requesterUsername", requester&#41;;)

[//]: # (runtimeService.startProcessInstanceByKey&#40;"access-request", request.getBusinessKey&#40;&#41;, variables&#41;;)

[//]: # (```)

[//]: # ()
[//]: # (### D. API complete task)

[//]: # ()
[//]: # (```java)

[//]: # (Map<String, Object> variables = new HashMap<>&#40;&#41;;)

[//]: # (variables.put&#40;"approved", body.approved&#40;&#41;&#41;;)

[//]: # (variables.put&#40;"comment", body.comment&#40;&#41;&#41;;)

[//]: # (taskService.complete&#40;taskId, variables&#41;;)
```

---

## 8. Tích hợp Keycloak & DB trong Delegate (logic khuyến nghị)

1. Đọc `requestId` từ execution variables.
2. Load `access_requests` → parse `payload` / lines.
3. Nếu `approved == false`: cập nhật `REJECTED`, ghi `request_history`, return.
4. Nếu `approved == true`:
   - Cập nhật `PROVISIONING` + history.
   - Gọi Keycloak Admin API: assign realm roles (theo role đã có trong realm).
   - Tạo/cập nhật `User`/`Profile` nếu luồng của bạn cần đồng bộ DB app (tránh trùng với `POST /register` — **quyết định rõ:** request chỉ provision Keycloak hay cả DB).
   - Thành công → `PROVISIONED`; lỗi → `PROVISION_FAILED`, lưu message, ném `BpmnError` hoặc để job retry tùy chính sách.

---

## 9. Angular (frontend)

1. **Màn “Tạo yêu cầu”:** form chọn phòng ban + quyền → POST `access-requests`.
2. **Màn “Yêu cầu của tôi”:** list + trạng thái.
3. **Màn “Task chờ xử lý” (admin/manager):** gọi API task list → nút Duyệt/Từ chối → complete.

Map JWT roles với route guard giống backend.

---

## 10. JasperReports — “Biên bản cấp phát”

1. Template `.jrxml`: header thông tin request, bảng lịch sử từ `request_history`, danh sách quyền (payload hoặc lines).
2. `ReportService` (đã có thư viện trong `pom`) thêm method `buildAccessRequestReport(requestId)`.
3. Endpoint trả `application/pdf` hoặc URL download.

---

## 11. Thứ tự công việc cụ thể (checklist cho bạn làm lần lượt)

- [x] **1.** Thêm Camunda vào `pom.xml` + config DB/schema.
- [ ] **2.** Chạy SQL tạo `access_requests`, `request_history`.
- [ ] **3.** Entity JPA + repository + `AccessRequestService` (tạo, cập nhật status, append history).
- [ ] **4.** Vẽ BPMN pha A trong Camunda Modeler (Start → Manager Approve → Gateway → Service Task delegate → End), deploy kèm app.
- [ ] **5.** Viết `ProvisionAccessDelegate` + test Keycloak fail/success.
- [x] **6.** Controller REST: create request, list tasks, complete task.
- [x] **7.** Cập nhật `SecurityConfig` + `@PreAuthorize` phù hợp.
- [x] **8.** Angular: 3 màn hình tối thiểu.
- [x] **9.** (Pha B backend DONE) `access_request_lines` + loop provisioning partial failure. (UI chọn nhiều quyền: làm sau nếu cần).
- [ ] **10.** (Tùy chọn sau) DMN + `departments` + gateway đa cấp duyệt.
- [x] **11.** (Tùy chọn sau) Jasper PDF theo `request_id`.

---

## 12. Rủi ro cần nắm (trình bày trong báo cáo / demo)

| Rủi ro | Cách nói / xử lý |
|--------|------------------|
| Không có distributed transaction Keycloak ↔ DB | Dùng trạng thái rõ + retry/compensation; ghi nhận `PROVISION_FAILED`. |
| Trùng luồng đăng ký cũ | Tách endpoint: “đăng ký trực tiếp” vs “xin cấp quyền”; document khi nào tạo user DB. |
| Task id không lưu làm PK nghiệp vụ | Theo dõi bằng `business_key` + `process_instance_id`; task id lấy từ Camunda khi cần. |

---

## 13. Liên kết tài liệu trong repo

- `luong.md` — mô tả luồng code hiện có (auth, profile, Keycloak).
- `plan.md` (file này) — kế hoạch mở rộng Camunda IAM.

---

*Bạn có thể đánh dấu từng mục checklist khi làm; khi cần chỉnh trực tiếp mã nguồn, dùng Agent mode trong IDE.*

Lưu ý: Khi xong mỗi chức năng muốn phát triển tiếp theo phải luôn view qua lại file plan.md này để ảm bảo luôn đi đúng ế hoạch( bước nào hoàn thành thì sẽ tự view qua và thêm dấu tích xanh)