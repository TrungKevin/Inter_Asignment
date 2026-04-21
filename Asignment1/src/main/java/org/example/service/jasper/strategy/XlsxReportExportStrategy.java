package org.example.service.jasper.strategy;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsxReportConfiguration;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.util.List;

@Component
//class này để export report dạng XLSX
public class XlsxReportExportStrategy implements ReportExportStrategy {

    @Override
    public String getFormat() {
        return "xlsx";
    }

    @Override
    public byte[] export(List<JasperPrint> jasperPrints, List<String> sheetNames) throws Exception {
        JRXlsxExporter exporter = new JRXlsxExporter();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrints));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(out));

        SimpleXlsxReportConfiguration configuration = new SimpleXlsxReportConfiguration();
        configuration.setOnePagePerSheet(true);
        configuration.setRemoveEmptySpaceBetweenRows(true);
        configuration.setRemoveEmptySpaceBetweenColumns(true);
        configuration.setDetectCellType(true);
        configuration.setSheetNames(sheetNames.toArray(new String[0]));
        exporter.setConfiguration(configuration);

        exporter.exportReport();
        return out.toByteArray();
    }
}
