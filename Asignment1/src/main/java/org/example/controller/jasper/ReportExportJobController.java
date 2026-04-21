package org.example.controller.jasper;

import lombok.RequiredArgsConstructor;
import org.example.dto.jasper.CreateExportJobRequest;
import org.example.dto.jasper.ExportJobDownloadResult;
import org.example.dto.jasper.ExportJobStatusResponse;
import org.example.dto.response.ApiResponse;
import org.example.service.jasper.ExportJobService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportExportJobController {

    private final ExportJobService exportJobService;

    @PostMapping("/jobs")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<ApiResponse<ExportJobStatusResponse>> createExportJob(
            @Valid @RequestBody CreateExportJobRequest request,
            Authentication authentication
    ) {
        String username = resolveUsername(authentication);
        ExportJobStatusResponse result = exportJobService.createJob(username, request);
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(ApiResponse.<ExportJobStatusResponse>builder()
                        .code(1000)
                        .result(result)
                        .build());
    }

    @GetMapping("/jobs/{jobId}")
    @PreAuthorize("hasRole('admin')")
    public ApiResponse<ExportJobStatusResponse> getExportJob(
            @PathVariable UUID jobId,
            Authentication authentication
    ) {
        String username = resolveUsername(authentication);
        ExportJobStatusResponse result = exportJobService.getJobForUser(jobId, username);
        return ApiResponse.<ExportJobStatusResponse>builder()
                .code(1000)
                .result(result)
                .build();
    }

    @GetMapping("/jobs/{jobId}/download")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<Resource> downloadExportJob(
            @PathVariable UUID jobId,
            Authentication authentication
    ) {
        String username = resolveUsername(authentication);
        ExportJobDownloadResult download = exportJobService.prepareDownload(jobId, username);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + download.getAttachmentFileName() + "\"")
                .contentType(MediaType.parseMediaType(download.getContentType()))
                .body(download.getResource());
    }

    private String resolveUsername(Authentication authentication) {
        if (authentication instanceof JwtAuthenticationToken jwtAuthenticationToken) {
            String preferredUsername = jwtAuthenticationToken.getToken().getClaimAsString("preferred_username");
            if (preferredUsername != null && !preferredUsername.isBlank()) {
                return preferredUsername;
            }
        }
        if (authentication != null && authentication.getName() != null && !authentication.getName().isBlank()) {
            return authentication.getName();
        }
        return "unknown";
    }
}
