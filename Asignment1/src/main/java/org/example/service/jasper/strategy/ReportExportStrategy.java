package org.example.service.jasper.strategy;

import net.sf.jasperreports.engine.JasperPrint;

import java.util.List;
//interface này để export report cho từng định dạng
public interface ReportExportStrategy {

    String getFormat();

    byte[] export(List<JasperPrint> jasperPrints, List<String> sheetNames) throws Exception;
}
