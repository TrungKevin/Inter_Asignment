package org.example.camunda.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AccessRequestReportDTO {
    // Header Info
    private Long requestId;
    private String businessKey;
    private String requester;
    private String department;
    private String status;
    private String description;
    private String createdAt;

    // Danh sách con (Sub-lists)
    private List<HistoryRow> history;
    private List<LineRow> lines;

    @Data
    @AllArgsConstructor
    public static class HistoryRow {
        private String time;
        private String actor;
        private String action;
        private String comment;
    }

    @Data
    @AllArgsConstructor
    public static class LineRow {
        private String roleCode;
        private String resource;
        private String status;
    }
}
