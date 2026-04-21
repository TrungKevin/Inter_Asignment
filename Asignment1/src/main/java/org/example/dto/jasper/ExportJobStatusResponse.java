package org.example.dto.jasper;

import lombok.Builder;
import lombok.Data;
import org.example.entity.jasper.ExportJobStatus;
import org.example.entity.jasper.ReportExportJobType;

import java.util.UUID;

@Data
@Builder
public class ExportJobStatusResponse {
    private UUID jobId;
    private ExportJobStatus status;
    private ReportExportJobType reportType;
    private String format;
    private Integer percent;
    private String errorMessage;
    /** Đường dẫn tương đối để tải file khi COMPLETED (client nối với base URL API). */
    private String downloadPath;
}
