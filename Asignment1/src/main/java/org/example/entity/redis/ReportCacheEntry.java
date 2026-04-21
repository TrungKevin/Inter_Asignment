package org.example.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Metadata cache trong Redis: map request export sang file đã render trên disk.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportCacheEntry {

    private String storedFileName;
    private String reportType;
    private String format;
    private String paramsHash;
    private long createdAtEpochMs;
    private long expiresAtEpochMs;
}
