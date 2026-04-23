package org.example.service.jasper;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.example.camunda.dto.response.WebSocketNotificationEvent;
import org.example.dto.jasper.CombinedExportParamsJson;
import org.example.entity.jasper.ExportJob;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
//class này để gọi logic Jasper đã có để export report
public class ReportOrchestrationService {

    private final ReportService reportService;
    private final SimpMessagingTemplate messagingTemplate;

    
    public byte[] fetchAndRenderCombinedReport(ExportJob job, CombinedExportParamsJson params) throws Exception {
        sendProgress(job, 25, "PROCESSING");
        byte[] bytes = reportService.exportCombinedAdminReport(
                job.getFormat(),
                params.getTables(),
                params.getUsersColumns(),
                params.getLoginColumns()
        );
        sendProgress(job, 75, "PROCESSING");
        return bytes;
    }
    //hàm này để deliver report to storage
    public DeliveryResult deliverToStorage(ExportJob job, byte[] bytes, String storageDir) throws Exception {
        Path dir = Paths.get(storageDir);
        Files.createDirectories(dir);
        //lấy extension của file
        String ext = "pdf".equalsIgnoreCase(job.getFormat()) ? "pdf" : "xlsx";
        String fileName = job.getId() + "." + ext;
        Path file = dir.resolve(fileName);
        Files.write(file, bytes);
        return DeliveryResult.builder()
                .fileName(fileName)
                .downloadPath("/api/reports/jobs/" + job.getId() + "/download")
                .build();
    }

    //hàm này để send progress to client
    public void sendProgress(ExportJob job, int percent, String status) {
        WebSocketNotificationEvent event = WebSocketNotificationEvent.builder()
                .type("REPORT_EXPORT_PROGRESS")
                .message("Dang xuat bao cao: " + percent + "%")
                .status(status)
                .jobId(job.getId().toString())
                .percent(percent)
                .createdAt(LocalDateTime.now())
                .build();
        messagingTemplate.convertAndSendToUser(job.getCreatedBy(), "/queue/report-jobs", event);
    }

    public void sendCompleted(ExportJob job, String downloadPath) {
        WebSocketNotificationEvent event = WebSocketNotificationEvent.builder()
                .type("REPORT_EXPORT_COMPLETED")
                .message("Bao cao da san sang tai xuong.")
                .status("COMPLETED")
                .jobId(job.getId().toString())
                .percent(100)
                .downloadUrl(downloadPath)
                .createdAt(LocalDateTime.now())
                .build();
        messagingTemplate.convertAndSendToUser(job.getCreatedBy(), "/queue/report-jobs", event);
    }

    public void sendFailed(ExportJob job, String errorMessage) {
        WebSocketNotificationEvent event = WebSocketNotificationEvent.builder()
                .type("REPORT_EXPORT_FAILED")
                .message(errorMessage)
                .status("FAILED")
                .jobId(job.getId().toString())
                .createdAt(LocalDateTime.now())
                .build();
        messagingTemplate.convertAndSendToUser(job.getCreatedBy(), "/queue/report-jobs", event);
    }

    @Getter
    @Builder
    public static class DeliveryResult {
        private final String fileName;
        private final String downloadPath;
    }
}
