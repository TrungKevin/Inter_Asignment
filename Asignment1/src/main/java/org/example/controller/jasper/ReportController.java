package org.example.controller.jasper;

import org.example.service.jasper.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
//dùng cho xuất report trực tiếp (sync): gọi API là server render
// tải report ngay trong 1 request
public class ReportController {

    @Autowired
    private ReportService reportService;

    // ADMIN PAGE: chỉ admin mới được xuất toàn bộ danh sách user
    @GetMapping("/users-db/all/{format}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<byte[]> getAllUsersReport(
            @PathVariable String format,
            @RequestParam(name = "columns", required = false) String columns
    ) {
        try {
            List<String> selectedColumns = parseColumns(columns);
            return buildResponse(format, selectedColumns);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/users-db/large/{format}")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<StreamingResponseBody> streamLargeUsersJasper(
            @PathVariable String format,
            @RequestParam(name = "columns", required = false) String columns
    ) {
        String fileExtension = format.toLowerCase();
        String contentType;
        if ("pdf".equals(fileExtension)) {//kiểm tra extension file để xác định content type
            contentType = "application/pdf";
        } else if ("xlsx".equals(fileExtension)) {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else {
            return ResponseEntity.badRequest().build();
        }

        List<String> selectedColumns = parseColumns(columns);//parse query param columns thành List<String>
        String fileName = "Large_Users_Report_" + System.currentTimeMillis() + "." + fileExtension;
        StreamingResponseBody stream =
                outputStream -> reportService.streamDynamicAllUsers(fileExtension, selectedColumns, outputStream);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(stream);
    }

    @GetMapping("/admin/combined/{format}")
    @PreAuthorize("hasRole('admin')")//endpoint để admin xuất báo cáo tổng hợp
    public ResponseEntity<byte[]> getCombinedAdminReport(
            @PathVariable String format,
            @RequestParam(name = "tables", required = false) String tables,
            @RequestParam(name = "usersColumns", required = false) String usersColumns,
            @RequestParam(name = "loginColumns", required = false) String loginColumns
    ) {
        try {
            List<String> selectedTables = parseColumns(tables);
            List<String> selectedUserColumns = parseColumns(usersColumns);
            List<String> selectedLoginColumns = parseColumns(loginColumns);

            byte[] reportContent = reportService.exportCombinedAdminReport(
                    format.toLowerCase(),
                    selectedTables,
                    selectedUserColumns,
                    selectedLoginColumns
            );
            return buildFileResponse(format, reportContent, "Combined_Admin_Report_");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/access-requests/{requestId}/pdf")
    @PreAuthorize("hasAnyRole('admin', 'auditor')")
    public ResponseEntity<byte[]> getAccessRequestReport(@PathVariable Long requestId) throws Exception {
        byte[] pdfContents = reportService.exportAccessRequestPdf(requestId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(
                ContentDisposition.attachment()
                        .filename("AccessRequest_" + requestId + ".pdf")
                        .build()
        );

        return ResponseEntity.ok()
                .headers(headers)
                .body(pdfContents);
    }

    //hàm này dùng để xây dựng response cho report all users
    private ResponseEntity<byte[]> buildResponse(String format, List<String> selectedColumns) throws Exception {
        byte[] reportContent;
        String contentType;
        String fileExtension = format.toLowerCase();

        if ("pdf".equals(fileExtension)) {
            reportContent = reportService.exportDynamicAllUsers(fileExtension, selectedColumns);
            contentType = "application/pdf";
        } else if ("xlsx".equals(fileExtension)) {
            reportContent = reportService.exportDynamicAllUsers(fileExtension, selectedColumns);
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else {
            return ResponseEntity.badRequest().build();
        }

        return buildFileResponse(fileExtension, reportContent, "All_Users_Report_");
    }

    private ResponseEntity<byte[]> buildFileResponse(
            String format,
            byte[] reportContent,
            String fileNamePrefix
    ) {
        String fileExtension = format.toLowerCase();//Chuẩn hóa extension Đưa về lowercase để xử lý thống nhất
        String contentType;//Xác định Content-Type
        if ("pdf".equals(fileExtension)) {
            contentType = "application/pdf";
        } else if ("xlsx".equals(fileExtension)) {
            contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        } else {
            return ResponseEntity.badRequest().build();
        }

        //Dùng timestamp để:
        //tránh trùng tên,
        //tiện phân biệt các lần tải.
        String fileName = fileNamePrefix + System.currentTimeMillis() + "." + fileExtension;
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(reportContent);
    }

    private List<String> parseColumns(String columns) {//Hàm này dùng để parse query param dạng chuỗi thành List<String> cột.
        if (columns == null || columns.isBlank()) {
            return null;//không chọn cột cụ thể
        }

        return Arrays.stream(columns.split(","))//tách chuỗi theo dấu phẩy.
                .map(String::trim)//xóa khoảng trắng đầu/cuối mỗi phần tử.
                .filter(s -> !s.isEmpty())
                .collect(Collectors.toList());//gom lại thành danh sách.
    }
}