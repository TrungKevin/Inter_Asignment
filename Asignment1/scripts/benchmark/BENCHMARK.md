# Report Export Benchmark Guide

Script benchmark cho large export nằm tại `scripts/benchmark/Run-ReportBenchmark.ps1`.

## 1) Chuẩn bị dữ liệu test

- Tạo sẵn 3 mốc dữ liệu trong DB: `100k`, `500k`, `1m` user.
- Mỗi lần chạy benchmark chỉ giữ đúng một mốc dữ liệu (hoặc tách DB riêng theo dataset).
- Start ứng dụng bằng profile/config production-like.

## 2) Bật JVM GC log trước khi chạy

Ví dụ (PowerShell):

```powershell
$env:JAVA_TOOL_OPTIONS='-Xms2g -Xmx2g -Xlog:gc*:file=logs/gc.log:time,uptime,level,tags'
mvn spring-boot:run
```

## 3) Xác định PID của Java app

```powershell
Get-Process java | Select-Object Id, ProcessName, CPU, StartTime
```

Lấy `Id` tương ứng app backend và truyền vào `-AppPid`.

## 4) Chạy benchmark

### XLSX

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\benchmark\Run-ReportBenchmark.ps1 `
  -BaseUrl "http://localhost:8080" `
  -BearerToken "<ACCESS_TOKEN_ADMIN>" `
  -Format xlsx `
  -DatasetLabel 500k `
  -ConcurrencyList 1,2 `
  -Iterations 2 `
  -AppPid <JAVA_PID>
```

### PDF

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\benchmark\Run-ReportBenchmark.ps1 `
  -BaseUrl "http://localhost:8080" `
  -BearerToken "<ACCESS_TOKEN_ADMIN>" `
  -Format pdf `
  -DatasetLabel 100k `
  -ConcurrencyList 1,2 `
  -Iterations 2 `
  -AppPid <JAVA_PID>
```

## 5) Kết quả đầu ra

Mỗi lần chạy tạo thư mục:

- `benchmark-results/run-<dataset>-<format>-<timestamp>/summary.csv`
- `benchmark-results/run-<dataset>-<format>-<timestamp>/summary.json`
- File export thực tế và file metrics `.metrics.jsonl` cho từng request.

Các chỉ số chính:

- `durationMs` (thời gian mỗi request)
- `fileSizeMb` (dung lượng file xuất)
- `peakWorkingSetMb`, `avgWorkingSetMb` (RAM process Java)
- `cpuDeltaSeconds` (CPU process Java trong khoảng request)
- p50/p95 được in cuối mỗi lần chạy.

## 6) Kịch bản chuẩn đề xuất

- `100k`: chạy `xlsx`, `pdf` với concurrency `1,2,4`.
- `500k`: chạy `xlsx`, `pdf` với concurrency `1,2`.
- `1m`: chạy `xlsx` với concurrency `1,2`; `pdf` chỉ chạy `1` nếu bắt buộc nghiệp vụ.

## 7) Checklist sau benchmark

- Đối chiếu p50/p95 với SLA.
- Kiểm tra `logs/gc.log` để xem full GC/GC pause.
- Kiểm tra file output có mở được và dữ liệu đúng cột.
- Kiểm tra log app với prefix `large-export finished`.
- Ghi lại ngưỡng concurrency an toàn cho từng format.
