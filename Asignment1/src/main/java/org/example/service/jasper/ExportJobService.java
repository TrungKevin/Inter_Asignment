package org.example.service.jasper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.example.dto.jasper.CombinedExportParamsJson;
import org.example.dto.jasper.CreateExportJobRequest;
import org.example.dto.jasper.ExportJobDownloadResult;
import org.example.dto.jasper.ExportJobStatusResponse;
import org.example.entity.jasper.ExportJob;
import org.example.entity.jasper.ExportJobStatus;
import org.example.entity.jasper.ReportExportJobType;
import org.example.entity.redis.ReportCacheEntry;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.example.repository.ExportJobRepository;
import org.example.service.redis.ReportCacheService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExportJobService {

    private final ExportJobRepository exportJobRepository;
    private final ReportService reportService;
    private final ObjectMapper objectMapper;
    private final ExportJobWorker exportJobWorker;
    private final ReportCacheService reportCacheService;

    @Value("${app.report.storage-dir}")
    private String storageDir;

    @Value("${app.report.cache.lock.wait-timeout-ms:120000}")
    private long lockWaitTimeoutMs;

    @Value("${app.report.cache.lock.poll-interval-ms:500}")
    private long lockPollIntervalMs;

    // hàm tạo job: validate params, build cache key, check cache, create job, run export
    public ExportJobStatusResponse createJob(String username, CreateExportJobRequest request) {
        if (request.getReportType() != ReportExportJobType.ADMIN_COMBINED) {//chỉ cho phép reportType là ADMIN_COMBINED
            throw new IllegalArgumentException("Unsupported reportType: " + request.getReportType());
        }

        reportService.validateCombinedExportParameters(//kiểm tra params có hợp lệ không
                request.getFormat(),
                request.getTables(),
                request.getUsersColumns(),
                request.getLoginColumns()
        );

        CombinedExportParamsJson params = new CombinedExportParamsJson();//tạo params từ request
        params.setTables(request.getTables());
        params.setUsersColumns(request.getUsersColumns());
        params.setLoginColumns(request.getLoginColumns());

        String paramsJson;
        try {
            paramsJson = objectMapper.writeValueAsString(params);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Cannot serialize export params", e);
        }

        //kiểm tra cache
        String normalizedFormat = request.getFormat().toLowerCase(Locale.ROOT);
        String cacheKey = reportCacheService.buildCacheKey(request, username);
        var cachedEntry = reportCacheService.get(cacheKey);//kiểm tra xem có cache không
        if (cachedEntry.isPresent()) {
            ExportJob cacheHitJob = tryCreateCompletedJobFromCache(//nếu có cache thì tạo job từ cache
                    username,
                    request.getReportType(),
                    normalizedFormat,
                    paramsJson,
                    cacheKey,
                    cachedEntry.get()
            );
            if (cacheHitJob != null) {
                return toResponse(cacheHitJob);//trả về response từ job thành công
            }
        }

        //cố lấy lock render Redis
        Optional<String> lockToken = reportCacheService.tryAcquireRenderLock(cacheKey);
        if (lockToken.isEmpty()) {
            ExportJob cacheHitAfterWait = waitForCacheHit(
                    username,
                    request.getReportType(),
                    normalizedFormat,
                    paramsJson,
                    cacheKey
            );
            if (cacheHitAfterWait != null) {
                return toResponse(cacheHitAfterWait);
            }
            // fallback khi timeout: cố lấy lock lại 1 lần trước khi tạo job mới
            lockToken = reportCacheService.tryAcquireRenderLock(cacheKey);
        }

        ExportJob job = new ExportJob();//nếu không có cache thì tạo job mới
        job.setCreatedBy(username);
        job.setStatus(ExportJobStatus.PENDING);
        job.setReportType(request.getReportType());
        job.setFormat(normalizedFormat);
        job.setParamsJson(paramsJson);
        job.setPercent(0);
        lockToken.ifPresent(job::setRenderLockToken);
        job.setCacheKey(cacheKey);

        job = exportJobRepository.save(job);//lưu job vào database
        exportJobWorker.runExportJob(job.getId());

        return toResponse(job);
    }

    private ExportJob tryCreateCompletedJobFromCache(//nếu có cache thì tạo job từ cache
            String username,
            ReportExportJobType reportType,
            String format,
            String paramsJson,
            String cacheKey,
            ReportCacheEntry entry
    ) {
        if (!reportCacheService.isReusable(entry)) {//nếu cache không còn sử dụng được thì xóa khỏi Redis
            reportCacheService.evict(cacheKey);
            return null;
        }
        Path cachedFile = Paths.get(storageDir).resolve(entry.getStoredFileName());//lấy đường dẫn file từ cache
        if (!Files.isRegularFile(cachedFile)) {//nếu file không tồn tại thì xóa khỏi Redis
            reportCacheService.evict(cacheKey);
            return null;
        }

        ExportJob completedJob = new ExportJob();//tạo job mới từ cache
        completedJob.setCreatedBy(username);
        completedJob.setStatus(ExportJobStatus.COMPLETED);
        completedJob.setReportType(reportType);
        completedJob.setFormat(format);
        completedJob.setParamsJson(paramsJson);
        completedJob.setStoredFileName(entry.getStoredFileName());
        completedJob.setPercent(100);
        completedJob.setErrorMessage(null);
        return exportJobRepository.save(completedJob);
    }

    private ExportJob waitForCacheHit(//chờ cache hit trong khoảng thời gian timeout
            String username,
            ReportExportJobType reportType,
            String format,
            String paramsJson,
            String cacheKey
    ) {
        long deadline = System.currentTimeMillis() + lockWaitTimeoutMs;//lấy thời gian deadline
        while (System.currentTimeMillis() < deadline) {
            Optional<ReportCacheEntry> cachedEntry = reportCacheService.get(cacheKey);
            if (cachedEntry.isPresent()) {
                ExportJob cacheHitJob = tryCreateCompletedJobFromCache(//nếu có cache thì tạo job từ cache
                        username,
                        reportType,
                        format,
                        paramsJson,
                        cacheKey,
                        cachedEntry.get()
                );
                if (cacheHitJob != null) {//nếu có job thì trả 
                    return cacheHitJob;
                }
            }
            try {
                Thread.sleep(lockPollIntervalMs);//chờ interval giữa các lần kiểm tra
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return null;
            }
        }
        return null;
    }

    @Transactional(readOnly = true)//đọc job từ database
    public ExportJobStatusResponse getJobForUser(UUID jobId, String username) {
        ExportJob job = exportJobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));//nếu job không tồn tại thì throw exception
        if (!job.getCreatedBy().equals(username)) {//nếu job không phải là của user hiện tại thì throw exception
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        return toResponse(job);//trả về response từ job
    }

    @Transactional(readOnly = true)
    public ExportJob requireJobForDownload(UUID jobId, String username) {
        ExportJob job = exportJobRepository.findById(jobId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        if (!job.getCreatedBy().equals(username)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        //nếu job không phải là COMPLETED hoặc không có file thì throw exception
        if (job.getStatus() != ExportJobStatus.COMPLETED || job.getStoredFileName() == null) {
            throw new AppException(ErrorCode.REQUEST_NOT_FOUND);
        }
        return job;//trả về job
    }

    @Transactional(readOnly = true)
    public ExportJobDownloadResult prepareDownload(UUID jobId, String username) {
        ExportJob job = requireJobForDownload(jobId, username);
        Path path = Paths.get(storageDir).resolve(job.getStoredFileName());
        if (!Files.isRegularFile(path)) {
            throw new AppException(ErrorCode.REQUEST_NOT_FOUND);
        }
        //trả về kết quả download
        return ExportJobDownloadResult.builder()
                .resource(new FileSystemResource(path.toFile()))
                .contentType(mediaTypeForFormat(job.getFormat()))
                .attachmentFileName(job.getStoredFileName())
                .build();
    }

    private static String mediaTypeForFormat(String format) {//trả về media type từ format
        if ("pdf".equalsIgnoreCase(format)) {
            return MediaType.APPLICATION_PDF_VALUE;
        }
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }

    private ExportJobStatusResponse toResponse(ExportJob job) {//trả về response từ job
        String downloadPath = null;
        if (job.getStatus() == ExportJobStatus.COMPLETED && job.getStoredFileName() != null) {
            downloadPath = "/api/reports/jobs/" + job.getId() + "/download";
        }
        return ExportJobStatusResponse.builder()//trả về response từ job
                .jobId(job.getId())
                .status(job.getStatus())
                .reportType(job.getReportType())
                .format(job.getFormat())
                .percent(job.getPercent())
                .errorMessage(job.getErrorMessage())
                .downloadPath(downloadPath)
                .build();
    }
}
