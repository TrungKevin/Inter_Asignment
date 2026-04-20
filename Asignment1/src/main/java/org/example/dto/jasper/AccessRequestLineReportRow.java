package org.example.dto.jasper;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AccessRequestLineReportRow {
  Long lineId;
  String roleCode;
  String resourceType;
  String provisionStatus;
  String errorMessage;
}
