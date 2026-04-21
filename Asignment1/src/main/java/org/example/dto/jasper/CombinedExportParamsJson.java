package org.example.dto.jasper;

import lombok.Data;

import java.util.List;

/** Tham số lưu trong ExportJob.paramsJson — khớp logic ReportService.exportCombinedAdminReport. */
@Data
public class CombinedExportParamsJson {
    private List<String> tables;
    private List<String> usersColumns;
    private List<String> loginColumns;
}
