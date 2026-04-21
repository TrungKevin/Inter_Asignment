package org.example.dto.jasper;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.example.entity.jasper.ReportExportJobType;

import java.util.List;

@Data
public class CreateExportJobRequest {

    @NotNull
    private ReportExportJobType reportType;

    @NotBlank
    private String format;

    private List<String> tables;
    private List<String> usersColumns;
    private List<String> loginColumns;
}
