package org.example.service.jasper.strategy;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Component
public class PdfReportExportStrategy implements ReportExportStrategy {

    @Override
    public String getFormat() {
        return "pdf";
    }

    @Override
    public byte[] export(List<JasperPrint> jasperPrints, List<String> sheetNames) throws Exception {
        for (JasperPrint jasperPrint : jasperPrints) {
            jasperPrint.setProperty("net.sf.jasperreports.default.pdf.font.name", "DejaVu Sans");
            jasperPrint.setProperty("net.sf.jasperreports.default.pdf.encoding", "Identity-H");
            jasperPrint.setProperty("net.sf.jasperreports.default.pdf.embedded", "true");
        }

        JRPdfExporter exporter = new JRPdfExporter();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrints));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));
        exporter.exportReport();
        return out.toByteArray();
    }
}
