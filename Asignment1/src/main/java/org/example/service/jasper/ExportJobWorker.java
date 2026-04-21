package org.example.service.jasper;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.jasper.CombinedExportParamsJson;
import org.example.dto.jasper.CreateExportJobRequest;
import org.example.entity.jasper.ExportJob;
import org.example.entity.jasper.ExportJobStatus;
import org.example.entity.redis.ReportCacheEntry;
import org.example.repository.ExportJobRepository;
import org.example.service.redis.ReportCacheService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class ExportJobWorker {//Chạy bất đồng bộ (@Async): đọc job, gọi logic Jasper đã có

    private final ExportJobRepository exportJobRepository;
    private final ReportOrchestrationService reportOrchestrationService;
    private final ObjectMapper objectMapper;
    private final ReportCacheService reportCacheService;

    @Value("${app.report.storage-dir}")
    private String storageDir;

    @Async("reportExportExecutor")
    public void runExportJob(UUID jobId) {//Gọi lại logic Jasper đã có
        ExportJob job = exportJobRepository.findById(jobId).orElse(null);
        if (job == null) {
            log.warn("Export job not found: {}", jobId);
            return;
        }

        job.setStatus(ExportJobStatus.PROCESSING);// Cập nhật trạng thái PROCESSING
        job.setPercent(5);
        exportJobRepository.save(job);// Lưu lại job
        reportOrchestrationService.sendProgress(job, 10, "PROCESSING");// Gửi sự kiện PROCESSING

        try {
            // Đọc params từ job
            CombinedExportParamsJson params = objectMapper.readValue(job.getParamsJson(), CombinedExportParamsJson.class);
            byte[] bytes = reportOrchestrationService.fetchAndRenderCombinedReport(job, params);
            ReportOrchestrationService.DeliveryResult deliveryResult = reportOrchestrationService.deliverToStorage(
                    job,
                    bytes,
                    storageDir
            );
            String fileName = deliveryResult.getFileName();

            job.setStatus(ExportJobStatus.COMPLETED);
            job.setStoredFileName(fileName);
            job.setPercent(100);
            job.setErrorMessage(null);
            exportJobRepository.save(job);
            saveCacheEntry(job, params, fileName);

            reportOrchestrationService.sendCompleted(job, deliveryResult.getDownloadPath());
        } catch (Exception e) {//Nếu lỗi thì cập nhật trạng thái FAILED
            log.error("Export job failed jobId={}", jobId, e);
            job.setStatus(ExportJobStatus.FAILED);
            job.setErrorMessage(truncateMessage(e.getMessage()));
            job.setPercent(null);
            exportJobRepository.save(job);
            reportOrchestrationService.sendFailed(job, truncateMessage(e.getMessage()));
        } finally {
            releaseRenderLock(job);
        }
    }

    private static String truncateMessage(String message) {//Cắt message nếu dài quá 1800 ký tự
        if (message == null) {
            return "Unknown error";
        }
        return message.length() > 1800 ? message.substring(0, 1800) + "..." : message;
    }

    //lưu cache entry vào Redis
    private void saveCacheEntry(ExportJob job, CombinedExportParamsJson params, String fileName) {
        try {
            //tạo request từ job
            CreateExportJobRequest request = new CreateExportJobRequest();
            request.setReportType(job.getReportType());
            request.setFormat(job.getFormat());
            request.setTables(params.getTables());
            request.setUsersColumns(params.getUsersColumns());
            request.setLoginColumns(params.getLoginColumns());

            String cacheKey = reportCacheService.buildCacheKey(request, job.getCreatedBy());//tạo cache key từ request
            Duration ttl = reportCacheService.defaultTtl();//lấy thời gian sống của cache
            long now = System.currentTimeMillis();//lấy thời gian hiện tại
            String paramsHash = extractHashPart(cacheKey);//lấy hash từ cache key

            ReportCacheEntry entry = ReportCacheEntry.builder()//tạo cache entry từ request
                    .storedFileName(fileName)
                    .reportType(job.getReportType().name())
                    .format(job.getFormat())
                    .paramsHash(paramsHash)
                    .createdAtEpochMs(now)
                    .expiresAtEpochMs(now + ttl.toMillis())
                    .build();
            reportCacheService.put(cacheKey, entry, ttl);
        } catch (Exception e) {
            // Không fail job export nếu Redis tạm thời lỗi.
            log.warn("Cannot save report cache for jobId={}", job.getId(), e);
        }
    }

    //lấy hash từ cache key
    private static String extractHashPart(String cacheKey) {
        int idx = cacheKey.lastIndexOf(':');
        if (idx < 0 || idx + 1 >= cacheKey.length()) {
            return cacheKey;
        }
        return cacheKey.substring(idx + 1);
    }

    //giải phóng lock render Redis
    private void releaseRenderLock(ExportJob job) {
        String cacheKey = job.getCacheKey();//lấy cache key từ job
        String lockToken = job.getRenderLockToken();//lấy lock token từ job
        if (cacheKey == null || cacheKey.isBlank() || lockToken == null || lockToken.isBlank()) {//nếu cache key hoặc lock token không hợp lệ thì return
            return;
        }
        try {
            reportCacheService.releaseRenderLock(cacheKey, lockToken);
        } catch (Exception e) {
            log.warn("Cannot release report render lock for jobId={}", job.getId(), e);
        }
    }
    
}
