package org.example.dto.jasper;

import lombok.Builder;
import lombok.Getter;
import org.springframework.core.io.Resource;

@Getter
@Builder
public class ExportJobDownloadResult {//gói kết quả download: file, media type, tên file

    private final Resource resource;
    private final String contentType;
    private final String attachmentFileName;
}
