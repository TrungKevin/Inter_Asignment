package org.example.camunda.dto.request;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class AccessRequestDTO {
    private String requesterUsername;
    private String reason;

    private String departmentCode;
    private List<String> roles;

    private Map<String, Object> payload; // Chứa department, roles...
}