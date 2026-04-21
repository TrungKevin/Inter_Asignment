# Kế hoạch triển khai Kafka cho luồng Export Report (chi tiết từng bước)

Tài liệu này hướng dẫn thêm Kafka vào dự án hiện tại để thay thế dần cơ chế dispatch `@Async`,
nhưng vẫn giữ nguyên API/WS contract để Frontend không phải thay đổi lớn.

---

## 0) Mục tiêu và phạm vi

### Mục tiêu
- Chuyển bước **dispatch job** từ gọi trực tiếp worker sang **publish message Kafka**.
- Giữ nguyên endpoint:
  - `POST /api/reports/jobs`
  - `GET /api/reports/jobs/{jobId}`
  - `GET /api/reports/jobs/{jobId}/download`
- Giữ nguyên WebSocket progress:
  - `/user/queue/report-jobs`
- Đảm bảo **idempotent**: không render trùng khi message bị consume lại.

### Không đổi trong phase đầu
- Không bỏ Redis cache/lock.
- Không đổi schema API FE.
- Không bỏ luôn `@Async` ngay từ đầu (để fallback).

---

## 1) Hiện trạng trước khi thêm Kafka

- Backend đã có:
  - `ExportJobService` tạo job và xử lý cache-hit/lock.
  - `ExportJobWorker` xử lý render + save file + WS.
  - `ReportOrchestrationService` (facade) cho fetch/render/delivery/notify.
  - Redis cache + cleanup + lock chống race.
- Frontend đã chạy async flow:
  - create job, poll status, WS progress, download/preview.

=> Kiến trúc hiện tại rất phù hợp để chèn Kafka tại đúng 1 điểm dispatch.

---

## 2) Thiết kế Kafka đề xuất

### Topic
- Topic chính: `report.export.job.request.v1`
- (Tuỳ chọn) DLT: `report.export.job.request.dlt`

### Message key
- Ưu tiên: `cacheKey` (để cùng loại request đi cùng partition, giảm render trùng).
- Fallback: `jobId`.

### Message value (JSON)
- `eventId` (UUID)
- `jobId` (UUID)
- `createdBy`
- `cacheKey`
- `reportType`
- `format`
- `createdAt`
- `schemaVersion`

> Lưu ý: chỉ cần `jobId` là đủ vì consumer có thể đọc DB để lấy params đầy đủ.

---

## 3) Lộ trình triển khai theo phase (an toàn, có rollback)

## Phase 1 — Setup hạ tầng Kafka

### Bước 1: Thêm dependency
- [ ] Trong `pom.xml` thêm:
  - `spring-kafka`
  - `spring-kafka-test` (scope test)

### Bước 2: Thêm config `application.yaml`
- [ ] Thêm block:
  - `spring.kafka.bootstrap-servers`
  - producer serializer (String + JSON)
  - consumer deserializer + group-id
  - ack mode/retry cơ bản
- [ ] Thêm app config:
  - `app.report.dispatch-mode: async` (mặc định giữ luồng cũ)
  - `app.report.kafka.topic.export-job-request`

### Bước 3: Cấu hình class Kafka
- [ ] Tạo `KafkaReportExportConfig`:
  - `ProducerFactory`, `KafkaTemplate`
  - `ConsumerFactory`, `ConcurrentKafkaListenerContainerFactory`

### Bước 4: Chạy local Kafka
- [ ] Dùng Docker compose (Kafka + Zookeeper hoặc KRaft).
- [ ] Verify broker bằng lệnh create/list topic.

---

## Phase 2 — Producer + toggle dispatch mode

### Bước 5: Tạo event model + producer
- [ ] Tạo DTO event `ReportExportJobRequestedEvent`.
- [ ] Tạo service `ReportExportJobProducer.publish(...)`.

### Bước 6: Chèn producer vào `ExportJobService.createJob`
- [ ] Ở chỗ đang gọi worker trực tiếp:
  - nếu `dispatch-mode=async` -> giữ `exportJobWorker.runExportJob(...)`
  - nếu `dispatch-mode=kafka` -> publish Kafka event
- [ ] Không đổi response API (`202`, `jobId`, status).

### Bước 7: Test producer
- [ ] Gọi `POST /api/reports/jobs`.
- [ ] Verify message vào topic bằng consumer CLI.
- [ ] Job vẫn ở `PENDING` khi chưa có consumer xử lý.

---

## Phase 3 — Consumer xử lý job

### Bước 8: Tạo consumer (`@KafkaListener`)
- [ ] Tạo `ReportExportJobConsumer`.
- [ ] Khi nhận event:
  - đọc `jobId`
  - gọi lại logic xử lý hiện có (qua `ExportJobWorker`/`ReportOrchestrationService`)

### Bước 9: Tách core xử lý (nếu cần)
- [ ] Tránh phụ thuộc `@Async` trong path Kafka:
  - tạo method core sync (vd. `processJob(jobId)`)
  - `@Async` chỉ gọi wrapper khi mode cũ.

### Bước 10: Ack/retry cơ bản
- [ ] Chỉ ack sau khi update trạng thái DB thành `COMPLETED` hoặc `FAILED`.
- [ ] Bật retry/backoff cho lỗi tạm thời.

---

## Phase 4 — Idempotent + anti-duplicate

### Bước 11: Guard trạng thái job
- [ ] Nếu job đã `COMPLETED` -> skip.
- [ ] Nếu đang `PROCESSING` hợp lệ -> skip/return.
- [ ] Chỉ transition trạng thái hợp lệ.

### Bước 12: Kết hợp Redis lock hiện có
- [ ] Giữ `cacheKey` + `renderLockToken` như hiện tại.
- [ ] Nếu duplicate message tới:
  - lock không lấy được -> chờ cache/fallback như logic đang có.

### Bước 13: DLT (khuyến nghị)
- [ ] Cấu hình dead-letter topic cho message lỗi cứng (invalid payload).
- [ ] Tạo log/audit rõ ràng để manual reprocess.

---

## Phase 5 — Test chi tiết (bắt buộc trước cutover)

### Test A: Happy path
- [ ] `dispatch-mode=kafka`, tạo job mới.
- [ ] Kỳ vọng: `PENDING -> PROCESSING -> COMPLETED`, tải file OK.

### Test B: 2 admin cùng lúc
- [ ] 2 request cùng params gần đồng thời.
- [ ] Kỳ vọng: không crash, không render trùng.

### Test C: Cache hit
- [ ] request lần 2 trong TTL.
- [ ] Kỳ vọng: `COMPLETED` nhanh, không render nặng.

### Test D: WS + polling fallback
- [ ] đóng tab/mất WS.
- [ ] Kỳ vọng: `GET /jobs/{id}` vẫn theo dõi được.

### Test E: Duplicate consume mô phỏng
- [ ] publish cùng `jobId` 2 lần.
- [ ] Kỳ vọng: job xử lý an toàn, không sinh 2 file khác nhau.

---

## Phase 6 — Cutover + rollback plan

### Cutover
- [ ] Đổi default `app.report.dispatch-mode` từ `async` sang `kafka`.
- [ ] Theo dõi log/metric 24-48h.

### Rollback
- [ ] Nếu lỗi, đổi lại `dispatch-mode=async` và restart.
- [ ] Không cần đổi FE/API.

---

## 4) Ảnh hưởng Frontend

- FE hiện tại **không cần đổi contract** nếu BE giữ:
  - endpoint REST cũ
  - payload status (`jobId`, `status`, `percent`, `downloadPath`)
  - WS destination `/user/queue/report-jobs`

Khuyến nghị:
- Chuẩn hoá backend dùng 1 field download (`downloadPath` hoặc `downloadUrl`) để FE đỡ map 2 kiểu.

---

## 5) Checklist file dự kiến cần tạo/sửa (Backend)

- [ ] `pom.xml`
- [ ] `src/main/resources/application.yaml`
- [ ] `.../configuration/KafkaReportExportConfig.java`
- [ ] `.../dto/jasper/ReportExportJobRequestedEvent.java`
- [ ] `.../service/jasper/ReportExportJobProducer.java`
- [ ] `.../service/jasper/ReportExportJobConsumer.java`
- [ ] `.../service/jasper/ExportJobService.java` (switch dispatch by mode)
- [ ] `.../service/jasper/ExportJobWorker.java` (core process method if needed)

---

## 6) Gợi ý thứ tự commit

1. `chore: add kafka dependencies and base configuration`
2. `feat: add report export kafka producer and event model`
3. `feat: add kafka consumer for report export jobs`
4. `refactor: keep dual dispatch mode async/kafka behind feature flag`
5. `test: add manual validation notes for kafka export flow`

---

## 7) Tiêu chí hoàn thành

- [ ] `dispatch-mode=kafka` chạy ổn trên local.
- [ ] FE export/progress/download hoạt động như trước.
- [ ] Không render trùng trong test concurrent + duplicate.
- [ ] Có rollback nhanh về `async`.

