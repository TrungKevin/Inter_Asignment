package org.example.service.jasper;

import ar.com.fdvs.dj.core.DynamicJasperHelper;
import ar.com.fdvs.dj.core.layout.ClassicLayoutManager;
import ar.com.fdvs.dj.domain.DynamicReport;
import ar.com.fdvs.dj.domain.Style;
import ar.com.fdvs.dj.domain.builders.FastReportBuilder;
import ar.com.fdvs.dj.domain.constants.Font;
import ar.com.fdvs.dj.domain.constants.HorizontalAlign;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.fill.JRSwapFileVirtualizer;
import net.sf.jasperreports.engine.util.JRSwapFile;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import jakarta.annotation.PostConstruct;
import org.example.camunda.entity.AccessRequest;
import org.example.camunda.entity.AccessRequestLine;
import org.example.camunda.entity.RequestHistory;
import org.example.camunda.repository.AccessRequestLineRepository;
import org.example.camunda.repository.AccessRequestRepository;
import org.example.camunda.repository.RequestHistoryRepository;
import org.example.dto.jasper.AccessRequestHistoryReportRow;
import org.example.dto.jasper.AccessRequestLineReportRow;
import org.example.dto.jasper.LoginLogReportRow;
import org.example.dto.jasper.UserReportRow;
import org.example.entity.LoginLog;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.example.repository.LoginLogRepository;
import org.example.service.jasper.strategy.ReportExportStrategyResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

import javax.sql.DataSource;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    private final LoginLogRepository loginLogRepository;
    private final AccessRequestRepository accessRequestRepository;
    private final RequestHistoryRepository requestHistoryRepository;
    private final AccessRequestLineRepository accessRequestLineRepository;
    private final DataSource dataSource;
    private final ReportExportStrategyResolver reportExportStrategyResolver;

    private static final List<String> DEFAULT_COLUMNS = List.of(
            "username",
            "email",
            "first_name",
            "last_name",
            "dob"
    );
    private static final List<String> DEFAULT_LOGIN_LOG_COLUMNS = List.of(
            "login_id",
            "username",
            "email",
            "login_time",
            "status"
    );
    private static final Map<String, String> USER_CSV_COLUMN_SQL = buildUserCsvColumnSql();

    //biến cấu hình + biến trạng thái runtime
    @Value("${app.report.jdbc.fetch-size:1000}")
    private int largeExportFetchSize;
    @Value("${app.report.virtualizer.max-pages:100}")
    private int virtualizerMaxPagesInMemory;
    @Value("${app.report.virtualizer.block-size:4096}")
    private int virtualizerBlockSize;
    @Value("${app.report.virtualizer.min-grow-count:200}")
    private int virtualizerMinGrowCount;
    @Value("${app.report.virtualizer.swap-dir:${java.io.tmpdir}/jasper-swap}")
    private String virtualizerSwapDir;
    @Value("${app.report.concurrency.pdf-xlsx:2}")
    private int pdfXlsxConcurrencyLimit;
    @Value("${app.report.concurrency.acquire-timeout-seconds:30}")
    private long acquireTimeoutSeconds;

    private Semaphore pdfXlsxSemaphore;

    @PostConstruct
    void initConcurrencyGuards() {//khởi tạo giới hạn đồng thời cho export.
        pdfXlsxSemaphore = new Semaphore(Math.max(1, pdfXlsxConcurrencyLimit), true);//true

        //Bật fair mode (xếp hàng theo thứ tự đến trước xử lý trước), tránh request bị đói tài nguyên.
    }

    //xuất file PDF cho 1 task Yêu cầu Access Request
    public byte[] exportAccessRequestPdf(Long requestId) throws Exception {
        AccessRequest request = accessRequestRepository.findById(requestId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));

        List<RequestHistory> history = requestHistoryRepository.findByRequestIdOrderByCreatedAtAsc(requestId);
        List<AccessRequestLine> lines = accessRequestLineRepository.findByRequestIdOrderByLineIdAsc(requestId);

        List<AccessRequestHistoryReportRow> historyRows = history.stream()
                .map(this::toHistoryReportRow)
                .toList();
        List<AccessRequestLineReportRow> lineRows = lines.stream()
                .map(this::toLineReportRow)
                .toList();

        InputStream reportStream = getClass().getResourceAsStream("/reports/access_request_summary.jrxml");
        if (reportStream == null) {
            throw new AppException(ErrorCode.REPORT_TEMPLATE_NOT_FOUND);
        }

        JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);

        var parameters = new java.util.HashMap<String, Object>();
        parameters.put("p_requestId", request.getRequestId());
        parameters.put("p_businessKey", request.getBusinessKey());
        parameters.put("p_processInstanceId", request.getProcessInstanceId());
        parameters.put("p_requesterUsername", request.getRequesterUsername());
        parameters.put("p_departmentCode", request.getDepartmentCode());
        parameters.put("p_status", request.getStatus());
        parameters.put("p_rejectionReason", request.getRejection_reason());
        parameters.put("p_createdAt", formatDateTime(request.getCreatedAt()));
        parameters.put("p_updatedAt", formatDateTime(request.getUpdatedAt()));
        parameters.put("p_historyDataSource", new JRBeanCollectionDataSource(historyRows));
        parameters.put("p_linesDataSource", new JRBeanCollectionDataSource(lineRows));

        try (ReportVirtualizerContext virtualizerContext = createVirtualizerContext()) {
            parameters.put(JRParameter.REPORT_VIRTUALIZER, virtualizerContext.virtualizer());

            JasperPrint jasperPrint = JasperFillManager.fillReport(
                    jasperReport,
                    parameters,
                    new JREmptyDataSource(1)
            );

            applyPdfUnicodeProperties(jasperPrint);
            return JasperExportManager.exportReportToPdf(jasperPrint);
        }
    }

    public byte[] exportDynamicAllUsers(String format, List<String> selectedColumns) throws Exception {
        List<String> normalizedColumns = normalizeColumns(selectedColumns); // Bỏ cột rỗng/trùng.Nếu client không truyền cột
        try (ReportVirtualizerContext virtualizerContext = createVirtualizerContext()) {
            JasperPrint usersPrint = buildUsersPrint(
                    normalizedColumns,
                    "DANH SÁCH NGƯỜI DÙNG",
                    virtualizerContext.virtualizer()
            );

            if ("pdf".equalsIgnoreCase(format)) {//font/encoding để hiển thị Unicode
                applyPdfUnicodeProperties(usersPrint);
                return JasperExportManager.exportReportToPdf(usersPrint);
            }

            if ("xlsx".equalsIgnoreCase(format)) {
                return exportExcel(usersPrint);
            }
        }

        throw new IllegalArgumentException("Unsupported format: " + format);
    }

    //readOnly = true Hibernate sẽ tắt tính năng "Dirty Checking"
    //Giúp giảm bớt việc lưu giữ trạng thái của các Object User trong bộ nhớ đệm
    @Transactional(readOnly = true)
    //hàm xuất file lớn theo stream, giảm giữ dữ liệu trong RAM.
    public void streamDynamicAllUsers(String format, List<String> selectedColumns, OutputStream outputStream) throws IOException {
        String normalizedFormat = format == null ? "" : format.toLowerCase(Locale.ROOT);
        if (!isSupportedJasperFormat(normalizedFormat)) {
            throw new IllegalArgumentException("Unsupported format: " + format);
        }

        long startNano = System.nanoTime();
        withConcurrencyLimit(normalizedFormat, () -> {
            List<String> normalizedColumns = normalizeColumns(selectedColumns);
            try (ReportVirtualizerContext virtualizerContext = createVirtualizerContext()) {
                //đưa vào Virtualizer sẽ giới hạn: chỉ giữ lại một số trang nhất định trong RAM, nếu trang đó không cần thiết sẽ được xóa đi.
                //các trang còn lại sẽ được nén và đẩy xuống ổ cứng (swap).
                JasperPrint usersPrint = buildUsersPrint(
                        normalizedColumns,
                        "DANH SÁCH NGƯỜI DÙNG",
                        virtualizerContext.virtualizer()
                );

                if ("pdf".equals(normalizedFormat)) {
                    applyPdfUnicodeProperties(usersPrint);
                    //render được đẩy thẳng ra luồng phản hồi của mạng (Network socket) thông qua outputStream.
                    exportPdf(usersPrint, outputStream);
                } else {
                    exportExcel(usersPrint, outputStream);
                }
                outputStream.flush();
                logExportSummary("jasper-" + normalizedFormat, normalizedColumns.size(), -1L, startNano);
                return null;
            } catch (Exception exception) {
                throw new IOException("Failed to stream users Jasper report", exception);
            }
        });
    }

    //hàm này để validate params có hợp lệ không, chuyển đổi chữ hoa thành chữ thường.
    public void validateCombinedExportParameters(
            String format,
            List<String> tables,
            List<String> userColumns,
            List<String> loginLogColumns
    ) {
        //hàm này để validate params có hợp lệ không, chuyển đổi chữ hoa thành chữ thường.
        String normalizedFormat = format == null ? "" : format.toLowerCase(Locale.ROOT);
        if (!isSupportedJasperFormat(normalizedFormat)) {
            throw new IllegalArgumentException("Unsupported format: " + format);
        }
        //normalizedTables là danh sách bảng đã được chuẩn hóa
        List<String> normalizedTables = normalizeTables(tables);
        if (normalizedTables.contains("users")) {
            normalizeColumns(userColumns);
        }
        if (normalizedTables.contains("loginlogs")) {
            normalizeLoginLogColumns(loginLogColumns);
        }
    }

    public byte[] exportCombinedAdminReport(//hàm “combined report” cho admin: có thể gộp nhiều bảng vào 1 file
            String format,
            List<String> tables,
            List<String> userColumns,
            List<String> loginLogColumns
    ) throws Exception {
        //hàm này để xuất file lớn theo stream, giảm giữ dữ liệu trong RAM.
        List<String> normalizedTables = normalizeTables(tables);
        List<JasperPrint> jasperPrints = new ArrayList<>();
        List<String> sheetNames = new ArrayList<>();
        try (ReportVirtualizerContext virtualizerContext = createVirtualizerContext()) {
            JRVirtualizer virtualizer = virtualizerContext.virtualizer();

            if (normalizedTables.contains("users")) {// hóa input bảng cần xuất
                JasperPrint usersPrint = buildUsersPrint(
                        normalizeColumns(userColumns),
                        "BẢNG QUẢN LÝ USER",
                        virtualizer
                );// danh sách report đã được “fill” dữ liệu.
                jasperPrints.add(usersPrint);
                sheetNames.add("Users");
            }

            if (normalizedTables.contains("loginlogs")) {
                JasperPrint logPrint = buildLoginLogsPrint(
                        normalizeLoginLogColumns(loginLogColumns),
                        "BẢNG QUẢN LÝ TRẠNG THÁI ĐĂNG NHẬP",
                        virtualizer
                );
                jasperPrints.add(logPrint);
                sheetNames.add("LoginLogs");
            }

            if (jasperPrints.isEmpty()) {
                throw new IllegalArgumentException("At least one table must be selected");
            }

            return reportExportStrategyResolver.resolve(format).export(jasperPrints, sheetNames);
        }
    }

    //dựng layout động + gắn dữ liệu, rồi trả về JasperPrint/ Fill data
    private JasperPrint buildUsersPrint(List<String> normalizedColumns, String title, JRVirtualizer virtualizer) throws Exception {
        Style titleStyle = buildPdfStyle(16, true, HorizontalAlign.CENTER);
        Style headerStyle = buildPdfStyle(12, true, HorizontalAlign.CENTER);
        Style detailStyle = buildPdfStyle(11, false, HorizontalAlign.LEFT);

        FastReportBuilder drb = new FastReportBuilder();
        drb.setTitle(title);
        drb.setUseFullPageWidth(true);//cột giãn theo full chiều ngang trang
        drb.setPrintBackgroundOnOddRows(true);// tô nền xen kẽ dòng lẻ để dễ đọc.
        drb.setTitleStyle(titleStyle);
        drb.setDefaultStyles(null, null, headerStyle, detailStyle);

        for (String col : normalizedColumns) {//Dựng cột động theo input
            switch (col) {//Mỗi col từ request sẽ map sang 1 cột report.
                case "username" -> drb.addColumn("Username", "username", String.class.getName(), 35);
                case "email" -> drb.addColumn("Email", "email", String.class.getName(), 60);
                case "first_name" -> drb.addColumn("Họ", "first_name", String.class.getName(), 30);
                case "last_name" -> drb.addColumn("Tên", "last_name", String.class.getName(), 30);
                case "dob" -> drb.addColumn("Ngày sinh", "dob", String.class.getName(), 25);
                default -> throw new IllegalArgumentException("Invalid column: " + col);
            }
        }
        DynamicReport dr = drb.build();//tạo ra đối tượng DynamicReport (layout + metadata cột).

        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement statement = connection.prepareStatement(
                        buildUsersSqlQuery(normalizedColumns),//Tạo PreparedStatement bằng SQL động theo cột chọn
                        ResultSet.TYPE_FORWARD_ONLY,
                        ResultSet.CONCUR_READ_ONLY
                )
        ) {
            statement.setFetchSize(largeExportFetchSize);//set fetch size để đọc dữ liệu từ DB một lượng lớn một lần.
            try (ResultSet resultSet = statement.executeQuery()) {
                JRResultSetDataSource ds = new JRResultSetDataSource(resultSet);//bọc ResultSet thành JRResultSetDataSource.
                //gọi DynamicJasperHelper.generateJasperPrint(...) để tạo ra JasperPrint.
                return DynamicJasperHelper.generateJasperPrint(
                        dr,
                        new ClassicLayoutManager(),
                        ds,
                        buildVirtualizedReportParameters(virtualizer)
                );
            }
        }
    }

    //hàm này để dựng layout động + gắn dữ liệu, rồi trả về JasperPrint/ Fill data
    private JasperPrint buildLoginLogsPrint(List<String> columns, String title, JRVirtualizer virtualizer) throws Exception {
        Style titleStyle = buildPdfStyle(16, true, HorizontalAlign.CENTER);
        Style headerStyle = buildPdfStyle(12, true, HorizontalAlign.CENTER);
        Style detailStyle = buildPdfStyle(11, false, HorizontalAlign.LEFT);

        FastReportBuilder drb = new FastReportBuilder();
        drb.setTitle(title);
        drb.setUseFullPageWidth(true);
        drb.setPrintBackgroundOnOddRows(true);
        drb.setTitleStyle(titleStyle);
        drb.setDefaultStyles(null, null, headerStyle, detailStyle);

        for (String col : columns) {
            switch (col) {
                case "login_id" -> drb.addColumn("Login ID", "loginId", Long.class.getName(), 20);
                case "username" -> drb.addColumn("Username", "username", String.class.getName(), 35);
                case "email" -> drb.addColumn("Email", "email", String.class.getName(), 55);
                case "login_time" -> drb.addColumn("Login Time", "loginTime", String.class.getName(), 35);
                case "status" -> drb.addColumn("Status", "status", String.class.getName(), 20);
                default -> throw new IllegalArgumentException("Invalid login log column: " + col);
            }
        }

        List<LoginLogReportRow> rows = loginLogRepository.findAll().stream()//lấy dữ liệu từ DB
                .sorted(Comparator.comparing(LoginLog::getLoginTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .map(this::toLoginLogRow)
                .toList();

        JRBeanCollectionDataSource ds = new JRBeanCollectionDataSource(rows);
        DynamicReport dr = drb.build();
        return DynamicJasperHelper.generateJasperPrint(
                dr,
                new ClassicLayoutManager(),
                ds,
                buildVirtualizedReportParameters(virtualizer)
        );
    }

    //mapper helper trong ReportService: chuyển
    // Entity từ DB sang DTO row để đổ vào report
    private LoginLogReportRow toLoginLogRow(LoginLog log) {
        return new LoginLogReportRow(
                log.getLoginId(),
                log.getUsername(),
                log.getEmail(),
                log.getLoginTime() != null ? log.getLoginTime().toString() : null,
                log.getStatus() != null ? log.getStatus().name() : null
        );
    }

    private AccessRequestHistoryReportRow toHistoryReportRow(RequestHistory history) {
        return new AccessRequestHistoryReportRow(
                formatDateTime(history.getCreatedAt()),
                history.getActorUsername(),
                history.getAction(),
                history.getComment()
        );
    }

    private AccessRequestLineReportRow toLineReportRow(AccessRequestLine line) {
        return new AccessRequestLineReportRow(
                line.getLineId(),
                line.getRoleCode(),
                line.getResourceType(),
                line.getProvisionStatus(),
                line.getErrorMessage()
        );
    }

    private String formatDateTime(LocalDateTime value) {
        return value == null ? "" : value.format(DATE_TIME_FORMATTER);
    }

    private Style buildPdfStyle(int fontSize, boolean bold, HorizontalAlign align) {//tạo style dùng chung cho report
        Style style = new Style();
        style.setFont(new Font(fontSize, "DejaVu Sans", bold));
        style.setHorizontalAlign(align);
        return style;
    }

    private void applyPdfUnicodeProperties(JasperPrint jasperPrint) {//set thuộc tính Unicode trên JasperPrint
        jasperPrint.setProperty("net.sf.jasperreports.default.pdf.font.name", "DejaVu Sans");
        jasperPrint.setProperty("net.sf.jasperreports.default.pdf.encoding", "Identity-H");
        jasperPrint.setProperty("net.sf.jasperreports.default.pdf.embedded", "true");
    }

    //1 report, Trả về mảng byte để bạn tự gửi HTTP response / lưu DB / đính kèm email.
    private byte[] exportExcel(JasperPrint jasperPrint) throws Exception {//xuất Excel từ 1 report duy nhất
        JRXlsxExporter exporter = new JRXlsxExporter();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));

        SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
        configuration.setOnePagePerSheet(false);//không ép tách mỗi trang report thành sheet
        configuration.setRemoveEmptySpaceBetweenRows(true); //giảm dòng trống.
        configuration.setRemoveEmptySpaceBetweenColumns(true);//giảm cột trống.
        configuration.setDetectCellType(true);//Jasper cố nhận diện kiểu cell (number/date/text) tốt hơn.
        exporter.setConfiguration(configuration);

        exporter.exportReport();
        return out.toByteArray();
    }

    // ghi thẳng vào stream có sẵn (ví dụ HttpServletResponse.getOutputStream()), tránh tạo byte[] lớn trong RAM.
    private void exportExcel(JasperPrint jasperPrint, OutputStream outputStream) throws Exception {
        JRXlsxExporter exporter = new JRXlsxExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));

        SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
        configuration.setOnePagePerSheet(false);
        configuration.setRemoveEmptySpaceBetweenRows(true);
        configuration.setRemoveEmptySpaceBetweenColumns(true);
        configuration.setDetectCellType(true);
        exporter.setConfiguration(configuration);

        exporter.exportReport();
    }

    //Dùng cho nhiều report
    //Mỗi JasperPrint thành 1 sheet (setOnePagePerSheet(true)), có đặt tên sheet.
    private byte[] exportExcel(List<JasperPrint> jasperPrints, List<String> sheetNames) throws Exception {
        JRXlsxExporter exporter = new JRXlsxExporter();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrints));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));

        SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
        // Bắt buộc true để mỗi JasperPrint được xuất thành 1 sheet riêng.
        configuration.setOnePagePerSheet(true);
        configuration.setRemoveEmptySpaceBetweenRows(true);
        configuration.setRemoveEmptySpaceBetweenColumns(true);
        configuration.setDetectCellType(true);
        configuration.setSheetNames(sheetNames.toArray(new String[0]));
        exporter.setConfiguration(configuration);

        exporter.exportReport();
        return out.toByteArray();
    }

    //Nhận nhiều JasperPrint.
    //Jasper sẽ ghép (merge) các report thành 1 file PDF duy nhất theo thứ tự list
    private byte[] exportPdf(List<JasperPrint> jasperPrints) throws Exception {
        JRPdfExporter exporter = new JRPdfExporter();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrints));//Set input là list nhiều JasperPrint.
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));//Chỉ định output đổ vào out.
        exporter.exportReport();//Thực thi quá trình render + merge -> tạo PDF.
        return out.toByteArray();
    }

    //Nhận 1 JasperPrint.
    //Ghi trực tiếp ra OutputStream có sẵn
    private void exportPdf(JasperPrint jasperPrint, OutputStream outputStream) throws Exception {
        JRPdfExporter exporter = new JRPdfExporter();
        exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outputStream));
        exporter.exportReport();
    }

    //Chuẩn hóa cột input trước khi fill
    private List<String> normalizeColumns(List<String> selectedColumns) {
        if (selectedColumns == null || selectedColumns.isEmpty()) {
            return DEFAULT_COLUMNS;
        }

        Set<String> cols = new LinkedHashSet<>();
        for (String c : selectedColumns) {
            if (c == null) {
                continue;
            }
            String trimmed = c.trim();//trim() -> bỏ khoảng trắng đầu/cuối
            if (!trimmed.isEmpty()) {//!trimmed.isEmpty() -> chỉ giữ giá trị có nghĩa.
                cols.add(trimmed);
            }
        }

        if (cols.isEmpty()) {
            throw new IllegalArgumentException("At least one column must be selected");
        }

        return new ArrayList<>(cols);
    }

    // map parameters truyền vào Jasper-Khi report lớn,
    // Jasper không giữ toàn bộ trang trong RAM,
    // mà “swap” bớt ra disk/virtual storage.
    private Map<String, Object> buildVirtualizedReportParameters(JRVirtualizer virtualizer) {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put(JRParameter.REPORT_VIRTUALIZER, virtualizer);
        return parameters;
    }

    //admin chọn cột
    private String buildUsersSqlQuery(List<String> normalizedColumns) {
        List<String> projections = new ArrayList<>();
        for (String column : normalizedColumns) {
            String sqlProjection = USER_CSV_COLUMN_SQL.get(column);
            if (sqlProjection == null) {
                throw new IllegalArgumentException("Invalid column: " + column);
            }
            projections.add(sqlProjection + " AS " + column);
        }
        return "SELECT " + String.join(", ", projections) + " " +
                "FROM users u " +
                "LEFT JOIN profiles p ON p.user_id = u.id " +
                "ORDER BY u.username";
    }


    private static Map<String, String> buildUserCsvColumnSql() {
        Map<String, String> columns = new HashMap<>();
        columns.put("username", "u.username");
        columns.put("email", "u.email");
        columns.put("first_name", "p.first_name");
        columns.put("last_name", "p.last_name");
        columns.put("dob", "CAST(p.dob AS VARCHAR)");
        return Map.copyOf(columns);
    }

    //định dạng
    private boolean isSupportedJasperFormat(String format) {
        return "pdf".equals(format) || "xlsx".equals(format);
    }

    //Tránh nhiều request export nặng chạy cùng lúc làm
    private <T> T withConcurrencyLimit(String format, CheckedSupplier<T> supplier) throws IOException {
        boolean acquired;
        try {
            acquired = pdfXlsxSemaphore.tryAcquire(acquireTimeoutSeconds, TimeUnit.SECONDS);
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted while waiting for export slot", exception);
        }
        if (!acquired) {
            throw new IOException("Export queue is full. Please retry later.");
        }

        try {
            return supplier.get();
        } finally {
            pdfXlsxSemaphore.release();
        }
    }

    //theo dõi hiệu năng export chậm nhanh thế nào
    private void logExportSummary(String format, int columnCount, long rows, long startedNano) {
        //Lấy System.nanoTime() đổi sang milliseconds để biết export mất bao lâu
        long durationMs = (System.nanoTime() - startedNano) / 1_000_000L;
        double rowsPerSecond = rows > 0 && durationMs > 0
                ? (rows * 1000.0d) / durationMs
                : -1.0d;
        long usedHeapMb = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory())
                / (1024L * 1024L);
        if (rows >= 0) {
            log.info(
                    "large-export finished format={} columns={} rows={} durationMs={} rowsPerSec={} usedHeapMb={}",
                    format,
                    columnCount,
                    rows,
                    durationMs,
                    String.format(Locale.ROOT, "%.2f", rowsPerSecond),
                    usedHeapMb
            );
            return;
        }
        log.info(
                "large-export finished format={} columns={} durationMs={} usedHeapMb={}",
                format,
                columnCount,
                durationMs,
                usedHeapMb
        );
    }

    @FunctionalInterface
    private interface CheckedSupplier<T> {
        T get() throws IOException;
    }

    //giúp tránh hết bộ nhớ.
    private ReportVirtualizerContext createVirtualizerContext() {
        File swapDirectory = new File(virtualizerSwapDir);//nơi Jasper sẽ ghi file tạm.
        if (!swapDirectory.exists()) {
            swapDirectory.mkdirs();
        }
        JRSwapFile swapFile = new JRSwapFile(//tạo file tạm để lưu trữ dữ liệu trang đã render
                swapDirectory.getAbsolutePath(),
                virtualizerBlockSize,
                virtualizerMinGrowCount
        );
        JRSwapFileVirtualizer virtualizer = new JRSwapFileVirtualizer(//tạo virtualizer để quản lý việc swap file tạm.
                virtualizerMaxPagesInMemory,
                swapFile,
                true
        );
        return new ReportVirtualizerContext(virtualizer);
    }

    //một wrapper nhỏ để quản lý vòng đời virtualizer
    private record ReportVirtualizerContext(JRSwapFileVirtualizer virtualizer) implements AutoCloseable {
        @Override
        public void close() {
            virtualizer.cleanup();
//            close() gọi virtualizer.cleanup() để:
//            dọn dữ liệu swap tạm,
//            giải phóng tài nguyên I/O/disk,
//            tránh rò rỉ file tạm.
        }//một wrapper nhỏ để quản lý vòng đời virtualizer
    }

    //chuẩn hóa danh sách cột login log mà client gửi lên
    private List<String> normalizeLoginLogColumns(List<String> selectedColumns) {
        if (selectedColumns == null || selectedColumns.isEmpty()) {
            return DEFAULT_LOGIN_LOG_COLUMNS;
        }

        Set<String> cols = new LinkedHashSet<>();//không trùng giữ thứ tự người dùng truyền vào.

        for (String c : selectedColumns) {
            if (c == null) {
                continue;
            }
            String normalized = c.trim().toLowerCase();//Nghĩa là ép về chữ thường để xử lý input linh hoạt
            if (!normalized.isEmpty()) {
                cols.add(normalized);
            }
        }

        if (cols.isEmpty()) {
            throw new IllegalArgumentException("At least one login log column must be selected");
        }

        return new ArrayList<>(cols);
    }

    //chuẩn hóa + validate danh sách bảng cần export
    private List<String> normalizeTables(List<String> tables) {
        if (tables == null || tables.isEmpty()) {//Nếu client không truyền gì -> mặc định chỉ xuất bảng users.
            return List.of("users");
        }

        Set<String> allowed = Set.of("users", "loginlogs");//bảng hợp lệ.
        Set<String> normalized = new LinkedHashSet<>();// set để khoong trung giữ thứ tự truyền
        for (String table : tables) {
            if (table == null) {
                continue;
            }
            String item = table.trim().toLowerCase();
            if (item.isEmpty()) {
                continue;
            }
            if (!allowed.contains(item)) {
                throw new IllegalArgumentException("Invalid table: " + table);
            }
            normalized.add(item);
        }

        if (normalized.isEmpty()) {
            throw new IllegalArgumentException("At least one table must be selected");
        }

        return new ArrayList<>(normalized);
    }
}
