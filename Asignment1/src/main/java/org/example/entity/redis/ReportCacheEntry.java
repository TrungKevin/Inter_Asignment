package org.example.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//class này để lưu metadata cache trong Redis
public class ReportCacheEntry {

    private String storedFileName;
    private String reportType;
    private String format;
    private String paramsHash;
    private long createdAtEpochMs;
    private long expiresAtEpochMs;
}
