# Jasper Report Flow (theo code hiện tại)

Tài liệu này mô tả chi tiết luồng Jasper trong project, bám sát code đang chạy trong các file:
- `src/main/java/org/example/controller/jasper/ReportController.java`
- `src/main/java/org/example/service/jasper/ReportService.java`
- `src/main/java/org/example/controller/jasper/ReportExportJobController.java`
- `src/main/java/org/example/service/jasper/ExportJobService.java`
- `src/main/java/org/example/service/jasper/ExportJobWorker.java`
- `src/main/java/org/example/service/jasper/ReportOrchestrationService.java`

## 1) Nhận request + parse cấu hình

## 1.1 Entry point đồng bộ (sync)
- Class: `ReportController`
- Base API: `/api/reports`

Các API chính:
- `getAllUsersReport(format, columns)` -> `GET /users-db/all/{format}`
  - Parse `columns` qua `parseColumns(String)` thành `List<String>`.
  - Gọi `buildResponse(...)` -> gọi `reportService.exportDynamicAllUsers(...)`.
- `streamLargeUsersJasper(format, columns)` -> `GET /users-db/large/{format}`
  - Parse `columns` qua `parseColumns(String)`.
  - Dùng `StreamingResponseBody`, gọi `reportService.streamDynamicAllUsers(...)`.
  - Mục tiêu: xuất file lớn theo stream, giảm giữ dữ liệu trong RAM.
- `getCombinedAdminReport(format, tables, usersColumns, loginColumns)` -> `GET /admin/combined/{format}`
  - Parse từng chuỗi query param bằng `parseColumns(...)`.
  - Gọi `reportService.exportCombinedAdminReport(...)`.
- `getAccessRequestReport(requestId)` -> `GET /access-requests/{requestId}/pdf`
  - Gọi `reportService.exportAccessRequestPdf(requestId)`.

Hàm parse query param:
- `parseColumns(String columns)`:
  - Nếu null/blank -> trả `null`.
  - Split theo dấu phẩy, trim, lọc rỗng -> trả `List<String>`.
  - Ý nghĩa: chuẩn hóa input HTTP trước khi vào Service.

## 1.2 Entry point bất đồng bộ job (async)
- Class: `ReportExportJobController`
- API:
  - `createExportJob(...)` -> `POST /api/reports/jobs`
  - `getExportJob(...)` -> `GET /api/reports/jobs/{jobId}`
  - `downloadExportJob(...)` -> `GET /api/reports/jobs/{jobId}/download`

Luồng:
- `createExportJob` resolve username từ `Authentication`, gọi `exportJobService.createJob(...)`.
- Trả trạng thái `202 ACCEPTED` + payload job status.

---

## 2) Chuẩn hóa/validate input trước khi fill

Class chính: `ReportService`

## 2.1 Chuẩn hóa cột users
- Hàm: `normalizeColumns(List<String> selectedColumns)`
- Tác dụng:
  - Nếu không truyền cột -> dùng `DEFAULT_COLUMNS` gồm:
    - `username`, `email`, `first_name`, `last_name`, `dob`
  - Loại null/rỗng, giữ thứ tự và loại trùng bằng `LinkedHashSet`.
  - Nếu sau lọc rỗng hoàn toàn -> ném lỗi `IllegalArgumentException`.

## 2.2 Chuẩn hóa cột login logs
- Hàm: `normalizeLoginLogColumns(List<String> selectedColumns)`
- Tác dụng:
  - Nếu không truyền -> dùng `DEFAULT_LOGIN_LOG_COLUMNS`:
    - `login_id`, `username`, `email`, `login_time`, `status`
  - Trim + lowercase + remove empty + loại trùng.
  - Validate không rỗng.

## 2.3 Chuẩn hóa bảng cần xuất
- Hàm: `normalizeTables(List<String> tables)`
- Tác dụng:
  - Nếu không truyền -> default `["users"]`.
  - Allowed table: `users`, `loginlogs`.
  - Lowercase + loại rỗng + loại trùng + validate tên bảng.
  - Nếu danh sách cuối cùng rỗng -> ném lỗi.

## 2.4 Validate tổng hợp cho API job
- Hàm: `validateCombinedExportParameters(format, tables, userColumns, loginLogColumns)`
- Tác dụng:
  - Validate format phải thuộc `pdf` hoặc `xlsx`.
  - Validate bảng + cột tương ứng theo bảng.
  - Dùng ở `ExportJobService.createJob(...)` trước khi tạo job async.

---

## 3) Fill data đã tách 2 cơ chế

## 3.A Users report (đã đổi sang JDBC ResultSet trực tiếp)

Các hàm chính:
- `exportDynamicAllUsers(...)`
- `streamDynamicAllUsers(...)`
- `buildUsersPrint(...)`
- `buildUsersSqlQuery(...)`

Luồng chi tiết:
1. Normalize columns bằng `normalizeColumns`.
2. Tạo virtualizer context bằng `createVirtualizerContext`.
3. `buildUsersPrint(...)`:
   - Dựng layout động bằng DynamicJasper (`FastReportBuilder`), chỉ add cột đã chọn.
   - Mapping cột chọn -> field report:
     - `username`, `email`, `first_name`, `last_name`, `dob`
   - Dựng SQL động bằng `buildUsersSqlQuery(normalizedColumns)`:
     - Select projection theo map `USER_CSV_COLUMN_SQL`.
     - Query từ `users u LEFT JOIN profiles p ON p.user_id = u.id`.
   - Lấy `Connection` từ `DataSource`.
   - Tạo `PreparedStatement` `TYPE_FORWARD_ONLY`, `CONCUR_READ_ONLY`.
   - Set `fetchSize` từ cấu hình `app.report.jdbc.fetch-size`.
   - Execute query -> `ResultSet`.
   - Bọc bằng `JRResultSetDataSource` (không qua DTO/Bean).
   - Gọi `DynamicJasperHelper.generateJasperPrint(...)` ra `JasperPrint`.
4. Export theo format:
   - PDF: `applyPdfUnicodeProperties(...)` rồi `JasperExportManager.exportReportToPdf(...)`.
   - XLSX: `exportExcel(...)` dùng `JRXlsxExporter`.

Kết luận nhánh users:
- `DB (JDBC/DataSource) -> JRResultSetDataSource -> DynamicJasper -> JasperPrint`

## 3.B Login logs report (vẫn kiểu bean collection)

Hàm chính: `buildLoginLogsPrint(...)`

Luồng:
1. Normalize login columns.
2. Dựng layout dynamic theo cột chọn.
3. `loginLogRepository.findAll()`.
4. Sort và map entity `LoginLog` -> DTO `LoginLogReportRow` qua `toLoginLogRow(...)`.
5. Bọc `JRBeanCollectionDataSource`.
6. Gọi `DynamicJasperHelper.generateJasperPrint(...)`.

Kết luận nhánh login logs:
- `Repository -> DTO -> JRBeanCollectionDataSource -> DynamicJasper -> JasperPrint`

---

## 4) Virtualizer + quản lý tài nguyên khi fill

## 4.1 Tạo virtualizer
- Hàm: `createVirtualizerContext()`
- Cơ chế:
  - Tạo thư mục swap theo `app.report.virtualizer.swap-dir`.
  - Tạo `JRSwapFile`.
  - Tạo `JRSwapFileVirtualizer` với:
    - `max-pages`
    - `block-size`
    - `min-grow-count`

## 4.2 Gắn virtualizer vào report parameters
- Hàm: `buildVirtualizedReportParameters(JRVirtualizer virtualizer)`
- Đặt vào key `JRParameter.REPORT_VIRTUALIZER`.

## 4.3 Cleanup tài nguyên
- `ReportVirtualizerContext` là `AutoCloseable`.
- Dùng `try-with-resources` trong các luồng export.
- `close()` gọi `virtualizer.cleanup()`.
- Ý nghĩa: giải phóng swap file/tài nguyên, tránh leak khi export lớn.

---

## 5) Export output (PDF/XLSX) + gộp template

## 5.1 PDF 1 report
- Hàm: `exportPdf(JasperPrint, OutputStream)` hoặc `JasperExportManager.exportReportToPdf(...)`.
- Unicode:
  - `applyPdfUnicodeProperties(...)` set:
    - `net.sf.jasperreports.default.pdf.font.name=DejaVu Sans`
    - `encoding=Identity-H`
    - `embedded=true`

## 5.2 XLSX 1 report
- Hàm: `exportExcel(JasperPrint)` hoặc `exportExcel(JasperPrint, OutputStream)`
- Dùng `JRXlsxExporter`.
- Config:
  - `onePagePerSheet=false`
  - `removeEmptySpaceBetweenRows=true`
  - `removeEmptySpaceBetweenColumns=true`
  - `detectCellType=true`

## 5.3 Combined report (nhiều JasperPrint)
- Hàm: `exportCombinedAdminReport(...)`
- Có thể tạo nhiều `JasperPrint`:
  - users print
  - login logs print
- Xuất cuối dùng strategy:
  - `reportExportStrategyResolver.resolve(format).export(jasperPrints, sheetNames)`
- Ý nghĩa:
  - PDF: merge nhiều print thành 1 file.
  - XLSX: mỗi print thành 1 sheet (đặt tên sheet tương ứng).

---

## 6) Nhánh dữ liệu lớn stream

Hàm: `streamDynamicAllUsers(String format, List<String> selectedColumns, OutputStream outputStream)`

Điểm kỹ thuật:
- Chuẩn hóa format, reject format không hợp lệ.
- Giới hạn đồng thời bằng semaphore qua `withConcurrencyLimit(...)`.
  - Acquire timeout theo `app.report.concurrency.acquire-timeout-seconds`.
- Flow fill giống users JDBC:
  - normalize -> virtualizer -> `buildUsersPrint(...)`.
- Export ghi thẳng ra `OutputStream`:
  - Không cần giữ full `byte[]` trong memory.
- Có log hiệu năng qua `logExportSummary(...)`.

---

## 7) Luồng async export job (kèm cache) trong Jasper module

## 7.1 Tạo job
- Class: `ExportJobService`
- Hàm: `createJob(username, request)`

Các bước:
1. Chỉ nhận `reportType=ADMIN_COMBINED`.
2. Validate toàn bộ params bằng `ReportService.validateCombinedExportParameters(...)`.
3. Serialize params thành JSON (`paramsJson`).
4. Build cache key qua `reportCacheService.buildCacheKey(...)`.
5. Cache hit:
   - `tryCreateCompletedJobFromCache(...)` kiểm tra entry còn reusable và file thực trên disk còn tồn tại.
   - Nếu hợp lệ -> tạo job `COMPLETED` ngay, trả luôn download path.
6. Cache miss:
   - Thử acquire Redis render lock.
   - Nếu chưa lock được -> `waitForCacheHit(...)` polling chờ worker khác render xong.
   - Timeout thì retry lock 1 lần.
7. Tạo job mới `PENDING`, lưu `cacheKey`, `renderLockToken`.
8. Gọi `exportJobWorker.runExportJob(jobId)` (async).

## 7.2 Worker render
- Class: `ExportJobWorker`
- Hàm: `runExportJob(UUID jobId)`

Các bước:
1. Set job `PROCESSING`, gửi progress.
2. Đọc params JSON -> gọi orchestration:
   - `reportOrchestrationService.fetchAndRenderCombinedReport(...)`
3. Ghi file ra storage dir:
   - `reportOrchestrationService.deliverToStorage(...)`
4. Update job `COMPLETED`, set `storedFileName`.
5. Save cache entry Redis qua `saveCacheEntry(...)`.
6. Push event completed qua websocket.
7. Nếu lỗi:
   - set `FAILED`, lưu `errorMessage`, push failed event.
8. `finally`: release render lock Redis.

## 7.3 Điều phối render + lưu file + push progress
- Class: `ReportOrchestrationService`
- Hàm:
  - `fetchAndRenderCombinedReport(...)`: gọi `reportService.exportCombinedAdminReport(...)`.
  - `deliverToStorage(...)`: ghi file vào `app.report.storage-dir` với tên `{jobId}.{ext}`.
  - `sendProgress(...)`, `sendCompleted(...)`, `sendFailed(...)`: đẩy trạng thái qua STOMP user queue.

---

## 8) Danh sách hàm quan trọng theo nhóm

## 8.1 API/controller layer
- `ReportController.parseColumns(...)`
- `ReportController.getAllUsersReport(...)`
- `ReportController.streamLargeUsersJasper(...)`
- `ReportController.getCombinedAdminReport(...)`
- `ReportController.getAccessRequestReport(...)`
- `ReportExportJobController.createExportJob(...)`
- `ReportExportJobController.getExportJob(...)`
- `ReportExportJobController.downloadExportJob(...)`

## 8.2 Normalize/validate
- `ReportService.normalizeColumns(...)`
- `ReportService.normalizeLoginLogColumns(...)`
- `ReportService.normalizeTables(...)`
- `ReportService.validateCombinedExportParameters(...)`
- `ReportService.isSupportedJasperFormat(...)`

## 8.3 Fill/build print
- `ReportService.buildUsersPrint(...)`
- `ReportService.buildUsersSqlQuery(...)`
- `ReportService.buildLoginLogsPrint(...)`
- `ReportService.buildVirtualizedReportParameters(...)`
- `ReportService.createVirtualizerContext(...)`

## 8.4 Mapping DTO/report row
- `ReportService.toLoginLogRow(...)`
- `ReportService.toHistoryReportRow(...)`
- `ReportService.toLineReportRow(...)`
- `ReportService.formatDateTime(...)`

## 8.5 Export binary
- `ReportService.exportDynamicAllUsers(...)`
- `ReportService.streamDynamicAllUsers(...)`
- `ReportService.exportCombinedAdminReport(...)`
- `ReportService.exportAccessRequestPdf(...)`
- `ReportService.exportExcel(...)` (3 overload)
- `ReportService.exportPdf(...)` (2 overload)
- `ReportService.applyPdfUnicodeProperties(...)`

## 8.6 Concurrency/monitoring
- `ReportService.withConcurrencyLimit(...)`
- `ReportService.logExportSummary(...)`
- `ReportService.initConcurrencyGuards(...)`

## 8.7 Async job/caching integration
- `ExportJobService.createJob(...)`
- `ExportJobService.tryCreateCompletedJobFromCache(...)`
- `ExportJobService.waitForCacheHit(...)`
- `ExportJobWorker.runExportJob(...)`
- `ExportJobWorker.saveCacheEntry(...)`
- `ExportJobWorker.releaseRenderLock(...)`

---

## 9) Cấu hình chính ảnh hưởng Jasper

Trong `application.yaml`:
- `app.report.jdbc.fetch-size`
- `app.report.virtualizer.max-pages`
- `app.report.virtualizer.block-size`
- `app.report.virtualizer.min-grow-count`
- `app.report.virtualizer.swap-dir`
- `app.report.concurrency.pdf-xlsx`
- `app.report.concurrency.acquire-timeout-seconds`
- `app.report.storage-dir`
- `app.report.cleanup.*`

Ý nghĩa tổng thể:
- Điều khiển hiệu năng truy vấn/fill/export.
- Bảo vệ memory khi report lớn.
- Giới hạn số request export nặng chạy đồng thời.
- Quản lý nơi lưu file và vòng đời file export.
