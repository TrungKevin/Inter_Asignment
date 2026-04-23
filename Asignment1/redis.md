# Redis Cache Flow cho Export Report

Tài liệu này mô tả đúng vai trò Redis trong luồng export report hiện tại.

Code chính:
- `src/main/java/org/example/service/redis/ReportCacheService.java`
- `src/main/java/org/example/service/jasper/ExportJobService.java`
- `src/main/java/org/example/service/jasper/ExportJobWorker.java`
- `src/main/java/org/example/entity/redis/ReportCacheEntry.java`
- `src/main/resources/application.yaml`

## 1) Redis làm gì và không làm gì

- Redis **không lưu binary file báo cáo** (`.pdf/.xlsx`).
- File thật được lưu trên disk tại `app.report.storage-dir` (mặc định `${java.io.tmpdir}/report-exports`).
- Redis chỉ lưu metadata/map:
  - Với bộ tham số export X -> file nào đã render sẵn.

Mô hình đúng:
- Redis: chỉ mục/cache + lock chống render trùng.
- Disk: file nặng thật.
- DB `export_jobs`: lịch sử job, quyền tải, trạng thái.

---

## 2) Luồng runtime thực tế

## 2.1 Lần export đầu tiên (cache miss)
1. Admin gọi `POST /api/reports/jobs`.
2. `ExportJobService.createJob(...)`:
   - validate params.
   - build cache key.
   - không thấy cache.
   - tạo job `PENDING`.
3. `ExportJobWorker.runExportJob(...)` render Jasper.
4. Worker ghi file vào storage-dir với tên `{jobId}.pdf` hoặc `{jobId}.xlsx`.
5. Worker lưu cache Redis:
   - key: `report:{sha256(...)}`
   - value: JSON `ReportCacheEntry`.
6. Job DB cập nhật `COMPLETED`.

## 2.2 Lần export sau cùng tham số (cache hit trong TTL)
1. `ExportJobService.createJob(...)` build cùng cache key.
2. `reportCacheService.get(cacheKey)` trả entry.
3. Kiểm tra:
   - entry còn hạn (`expiresAtEpochMs > now`),
   - file vật lý còn tồn tại trên disk.
4. Nếu hợp lệ:
   - tạo mới 1 `ExportJob` nhưng trạng thái `COMPLETED` ngay,
   - set `storedFileName` theo cache,
   - trả `downloadPath` ngay.
5. Không render Jasper lại, không query DB nặng lại.

---

## 3) Class/hàm chi tiết

## 3.1 `ReportCacheService` (service lõi Redis)

### Build key
- `buildCacheKey(CreateExportJobRequest request, String username)`
  - Chuẩn hóa reportType/format/tables/usersColumns/loginColumns.
  - List được sort trước khi hash để key không phụ thuộc thứ tự input.
  - Nếu policy `per-user` thì append username vào input hash.
  - Hash SHA-256 -> key dạng `{keyPrefix}:{hash}`.

Hàm chuẩn hóa phụ:
- `normalizeSimple(...)`
- `normalizeList(...)`
- `sha256Hex(...)`

### Read/Write cache
- `get(cacheKey)`:
  - đọc `opsForValue().get(...)`,
  - parse JSON -> `ReportCacheEntry`.
- `put(cacheKey, entry, ttl)`:
  - serialize JSON và set Redis kèm TTL.
- `evict(cacheKey)`:
  - xóa key khi entry hỏng/hết giá trị.
- `isReusable(entry)`:
  - check `storedFileName` hợp lệ + chưa hết hạn.

### Lock chống race render
- `tryAcquireRenderLock(cacheKey)`:
  - lock key: `{cacheKey}:lock`
  - dùng `setIfAbsent` + TTL lock.
  - trả `lockToken` nếu lock thành công.
- `releaseRenderLock(cacheKey, lockToken)`:
  - chỉ release khi token hiện tại trùng token đã cấp (tránh unlock nhầm).

## 3.2 `ReportCacheEntry` (model metadata Redis)
- Field:
  - `storedFileName`
  - `reportType`
  - `format`
  - `paramsHash`
  - `createdAtEpochMs`
  - `expiresAtEpochMs`

Ý nghĩa:
- Đủ dữ liệu để xác nhận file tái sử dụng được trong TTL.

## 3.3 `ExportJobService` (orchestrate cache lookup)

Hàm chính: `createJob(...)`
- Validate request.
- Build `cacheKey`.
- Cache hit:
  - `tryCreateCompletedJobFromCache(...)`.
- Cache miss:
  - thử lock (`tryAcquireRenderLock`),
  - nếu lock bận thì `waitForCacheHit(...)` polling chờ worker khác render.
- Sau timeout, retry lock một lần trước khi tạo job mới.

Hàm quan trọng:
- `tryCreateCompletedJobFromCache(...)`
  - check reusability + check file còn trên disk.
  - nếu stale -> evict Redis.
- `waitForCacheHit(...)`
  - poll theo `lock.poll-interval-ms` đến `lock.wait-timeout-ms`.

## 3.4 `ExportJobWorker` (save cache sau render)
- `runExportJob(...)`
  - render xong -> `saveCacheEntry(...)`.
  - cuối cùng luôn `releaseRenderLock(...)`.
- `saveCacheEntry(...)`
  - build lại request từ job + params.
  - lấy `cacheKey`.
  - tính TTL `defaultTtl`.
  - ghi `ReportCacheEntry` vào Redis.

---

## 4) Cấu hình Redis/report cache trong `application.yaml`

- `spring.data.redis.host`
- `spring.data.redis.port`

Nhóm `app.report.cache.*`:
- `enabled`: bật/tắt cache.
- `ttl-minutes`: TTL cho cache entry.
- `key-prefix`: prefix key.
- `policy`: `shared-admin` hoặc `per-user`.
- `lock.ttl-seconds`: TTL lock render.
- `lock.wait-timeout-ms`: thời gian tối đa chờ cache hit khi lock bận.
- `lock.poll-interval-ms`: chu kỳ polling cache.

---

## 5) Vì sao cần Redis + disk + DB cùng lúc

- Chỉ Redis:
  - phải nhét binary file lớn vào RAM Redis -> tốn tài nguyên, không phù hợp.
- Chỉ disk:
  - khó tra nhanh "tham số này đã có file chưa".
- Bộ ba hiện tại:
  - Redis tra cứu nhanh + lock chống race.
  - Disk chứa file nặng.
  - DB giữ lịch sử job và quyền truy cập.

Đây là thiết kế hợp lý cho luồng export có thể nặng và nhiều user/admin chạy lại cùng tham số.

---

## 6) Ý nghĩa và tác dụng của Redis trong dự án của bạn

Phần này giải thích theo góc nhìn thực tế vận hành, không chỉ ở mức "có cache".

## 6.1 Ý nghĩa chính của Redis trong bài toán export Jasper

- Redis đóng vai trò "bộ nhớ ngắn hạn tốc độ cao" để nhớ kết quả export đã có sẵn.
- Mục tiêu cốt lõi: tránh render lại report nặng khi yêu cầu giống nhau lặp lại trong thời gian ngắn.
- Redis giúp backend ra quyết định rất nhanh:
  - Có thể tái sử dụng file nào?
  - Có tiến trình nào đang render cùng bộ tham số không?

Nói ngắn:
- Redis = lớp điều phối nhanh (fast coordination layer) cho export.
- Disk = nơi chứa file thật.
- DB = nơi lưu lịch sử nghiệp vụ dài hạn.

## 6.2 Tác dụng trực tiếp về hiệu năng

- Giảm tải CPU:
  - Không phải chạy lại Jasper fill/export cho cùng dữ liệu và cùng tham số.
- Giảm tải DB:
  - Tránh query lớn lặp lại nhiều lần khi nhiều admin tải cùng loại báo cáo.
- Giảm thời gian phản hồi:
  - Cache hit có thể trả job `COMPLETED` gần như ngay lập tức.
- Tăng độ ổn định hệ thống:
  - Hạn chế tình trạng nhiều job nặng đè lên nhau gây nghẽn tài nguyên.

## 6.3 Tác dụng về concurrency và chống race condition

Redis trong dự án không chỉ cache mà còn dùng lock:
- `tryAcquireRenderLock(...)` đảm bảo tại một thời điểm chỉ một worker render một "signature" báo cáo.
- Request đến sau có thể:
  - chờ cache hit,
  - hoặc nhận lại kết quả đã render xong.

Lợi ích:
- Tránh render trùng nhiều lần cùng 1 nội dung.
- Tránh lãng phí tài nguyên khi có nhiều admin bấm export cùng lúc.
- Tránh trạng thái "đua ghi file" không cần thiết.

## 6.4 Tác dụng về trải nghiệm người dùng

- Với cache hit:
  - User nhận kết quả nhanh, cảm giác hệ thống phản hồi tốt.
- Với cache miss:
  - Job vẫn chạy chuẩn qua worker, có thể theo dõi trạng thái.
- Với lock:
  - Không bị cảnh "mỗi user một job nặng giống hệt nhau cùng chạy", dễ gây chậm toàn hệ thống.

=> Trải nghiệm tổng thể ổn định hơn, nhất là khi số lượng admin tăng.

## 6.5 Tác dụng về chi phí vận hành

- Giảm tài nguyên compute cho các lần export trùng.
- Giảm nguy cơ phải scale sớm chỉ vì tải lặp lại không cần thiết.
- Hạn chế bùng nổ I/O và memory ở các khung giờ có nhiều thao tác báo cáo.

Đây là lợi ích rõ khi lên production, dù dữ liệu ban đầu chưa quá lớn.

## 6.6 Vì sao không dùng DB làm cache thay Redis

Có thể lưu metadata cache vào DB, nhưng Redis phù hợp hơn vì:
- Đọc/ghi key-value nhanh hơn cho workload lookup ngắn hạn.
- TTL native đơn giản, tự hết hạn.
- Cơ chế lock bằng `SET NX EX` rất phù hợp bài toán chống render trùng.
- Giảm thêm áp lực cho DB nghiệp vụ.

DB trong kiến trúc này nên tập trung cho:
- lịch sử job,
- truy vết nghiệp vụ,
- phân quyền truy cập tải file.

## 6.7 Nếu tắt Redis thì chuyện gì xảy ra

Khi `app.report.cache.enabled=false`:
- Hệ thống vẫn chạy được (không phụ thuộc cứng Redis để render).
- Nhưng sẽ mất các lợi ích:
  - không reuse nhanh báo cáo trùng,
  - không lock chống render trùng,
  - dễ tăng tải DB/CPU khi nhiều request giống nhau.

Tức là:
- Redis không phải "bắt buộc để chạy",
- nhưng rất quan trọng để chạy "mượt, ổn định, tiết kiệm tài nguyên".
