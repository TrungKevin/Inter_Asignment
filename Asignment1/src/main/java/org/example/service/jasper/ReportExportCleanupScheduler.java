package org.example.service.jasper;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.FileTime;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

@Component
@Slf4j
public class ReportExportCleanupScheduler {

    @Value("${app.report.storage-dir}")
    private String storageDir;

    @Value("${app.report.cleanup.enabled:true}")
    private boolean cleanupEnabled;

    @Value("${app.report.cleanup.retention-hours:24}")
    private long retentionHours;

    //chạy dọn file export theo fixedDelay (mặc định 30 phút)
    @Scheduled(
            fixedDelayString = "${app.report.cleanup.fixed-delay-ms:1800000}",
            initialDelayString = "${app.report.cleanup.initial-delay-ms:60000}"
    )
    public void cleanupOldExportFiles() {
        if (!cleanupEnabled) {
            return;
        }

        Path dir = Paths.get(storageDir);//lấy đường dẫn storage
        if (!Files.isDirectory(dir)) {
            return;
        }

        Instant cutoff = Instant.now().minus(Duration.ofHours(retentionHours));//lấy thời gian cutoff
        AtomicInteger deletedCount = new AtomicInteger(0);//đếm số file đã xóa
        AtomicLong deletedBytes = new AtomicLong(0L);//đếm số byte đã xóa

        try (Stream<Path> files = Files.list(dir)) {//lấy danh sách file trong storage
            files.filter(Files::isRegularFile).forEach(path -> tryDeleteIfExpired(path, cutoff, deletedCount, deletedBytes));
        } catch (IOException e) {
            log.warn("Cannot scan export storage directory: {}", dir, e);
            return;
        }

        if (deletedCount.get() > 0) {//nếu có file đã xóa thì log
            log.info(
                    "report-export cleanup completed deletedFiles={} freedBytes={} retentionHours={}",
                    deletedCount.get(),
                    deletedBytes.get(),
                    retentionHours
            );
        }
    }

    //xóa file nếu đã hết hạn
    private void tryDeleteIfExpired(Path path, Instant cutoff, AtomicInteger deletedCount, AtomicLong deletedBytes) {
        try {
            FileTime lastModified = Files.getLastModifiedTime(path);//lấy thời gian sửa đổi của file
            if (lastModified.toInstant().isAfter(cutoff)) {
                return;
            }
            long size = Files.size(path);
            Files.deleteIfExists(path);
            deletedCount.incrementAndGet();
            deletedBytes.addAndGet(size);
        } catch (IOException e) {
            log.warn("Cannot delete old export file: {}", path, e);
        }
    }
}
