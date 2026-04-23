package org.example.service.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.jasper.CreateExportJobRequest;
import org.example.entity.redis.ReportCacheEntry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HexFormat;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
// class này để quản lý cache Redis cho report mục đích tránh người dùng render lại report nặng.
//tóm lại chỉ lưu metadata cache vào Redis, file thật được lưu trên disk.
public class ReportCacheService {

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    @Value("${app.report.cache.enabled:true}")
    private boolean cacheEnabled;

    @Value("${app.report.cache.key-prefix:report}")
    private String keyPrefix;

    @Value("${app.report.cache.ttl-minutes:10}")
    private long ttlMinutes;

    
    @Value("${app.report.cache.policy:shared-admin}")
    private String cachePolicy;

    @Value("${app.report.cache.lock.ttl-seconds:180}")
    private long lockTtlSeconds;


    public String buildCacheKey(CreateExportJobRequest request, String username) {
        String normalized = String.join("|",
                normalizeSimple(request.getReportType() == null ? null : request.getReportType().name()),
                normalizeSimple(request.getFormat()),
                normalizeList(request.getTables()),
                normalizeList(request.getUsersColumns()),
                normalizeList(request.getLoginColumns())
        );
        if ("per-user".equalsIgnoreCase(cachePolicy)) {//nếu cachePolicy là per-user thì thêm username vào cache key
            normalized = normalized + "|" + normalizeSimple(username);
        }
        String hash = sha256Hex(normalized);
        return keyPrefix + ":" + hash;
    }

    //đọc JSON từ Redis parse về ReportCacheEntry để kiểm tra xem có cache không
    public Optional<ReportCacheEntry> get(String cacheKey) {
        if (!cacheEnabled) {
            return Optional.empty();
        }
        String raw = redisTemplate.opsForValue().get(cacheKey);
        if (raw == null || raw.isBlank()) {
            return Optional.empty();
        }
        try {
            return Optional.of(objectMapper.readValue(raw, ReportCacheEntry.class));
        } catch (Exception e) {
            log.warn("Cannot parse redis cache entry for key={}", cacheKey, e);
            return Optional.empty();
        }
    }

    //ghi JSON vào Redis với TTL (duration là thời gian sống của cache)
    public void put(String cacheKey, ReportCacheEntry entry, Duration ttl) {
        if (!cacheEnabled) {
            return;
        }
        try {
            String raw = objectMapper.writeValueAsString(entry);
            //serialize entry thành JSON và ghi vào Redis với TTL
            Duration effectiveTtl = ttl == null ? Duration.ofMinutes(ttlMinutes) : ttl;
            evictPreviousReportCaches(cacheKey);
            redisTemplate.opsForValue().set(cacheKey, raw, effectiveTtl);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Cannot serialize report cache entry", e);
        }
    }

    public void evict(String cacheKey) {//xóa key khỏi Redis
        if (!cacheEnabled) {
            return;
        }
        redisTemplate.delete(cacheKey);
    }
    //kiểm tra xem cache còn sử dụng được không
    public boolean isReusable(ReportCacheEntry entry) {
        if (entry == null) {
            return false;
        }
        long now = System.currentTimeMillis();
        return entry.getStoredFileName() != null
                && !entry.getStoredFileName().isBlank()
                && entry.getExpiresAtEpochMs() > now;
    }

    //lấy thời gian sống của cache
    public Duration defaultTtl() {
        return Duration.ofMinutes(ttlMinutes);
    }
    
    public boolean isCacheEnabled() {
        return cacheEnabled;
    }
    //kiểm tra xem cache có bật không
    public Optional<String> tryAcquireRenderLock(String cacheKey) {
        if (!cacheEnabled) {
            return Optional.empty();
        }
        String lockKey = lockKey(cacheKey);
        String lockToken = UUID.randomUUID().toString();
        Boolean ok = redisTemplate.opsForValue().setIfAbsent(//setIfAbsent là set nếu không có, nếu có thì không set
                lockKey,
                lockToken,
                Duration.ofSeconds(lockTtlSeconds)
        );
        return Boolean.TRUE.equals(ok) ? Optional.of(lockToken) : Optional.empty();
    }

    //giải phóng lock render Redis
    public void releaseRenderLock(String cacheKey, String lockToken) {
        if (!cacheEnabled) {
            return;
        }
        String lockKey = lockKey(cacheKey);
        String currentToken = redisTemplate.opsForValue().get(lockKey);
        if (currentToken != null && currentToken.equals(lockToken)) {
            redisTemplate.delete(lockKey);
        }
    }

    private static String lockKey(String cacheKey) {
        return cacheKey + ":lock";
    }

    // Khi có report cache mới, xóa các report cache cũ để chỉ giữ bản mới nhất.
    private void evictPreviousReportCaches(String currentCacheKey) {
        String pattern = keyPrefix + ":*";
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys == null || keys.isEmpty()) {
            return;
        }

        List<String> staleKeys = keys.stream()
                .filter(key -> !key.endsWith(":lock"))
                .filter(key -> !key.equals(currentCacheKey))
                .toList();
        if (staleKeys.isEmpty()) {
            return;
        }

        Long deleted = redisTemplate.delete(staleKeys);
        log.debug("Evicted old report cache keys count={}", deleted == null ? 0 : deleted);
    }
    //chuẩn hóa value
    private static String normalizeSimple(String value) {
        if (value == null) {
            return "";
        }
        return value.trim().toLowerCase(Locale.ROOT);
    }
    //chuẩn hóa list
    private static String normalizeList(List<String> list) {
        if (list == null || list.isEmpty()) {
            return "";
        }
        List<String> normalized = new ArrayList<>();
        for (String item : list) {
            String v = normalizeSimple(item);
            if (!v.isBlank()) {
                normalized.add(v);
            }
        }
        return normalized.stream()
                .sorted(Comparator.naturalOrder())
                .collect(Collectors.joining(","));
    }

    //hash raw thành SHA-256 để lấy key cache nhằm tránh collision và sử dụng như một hash function 
    private static String sha256Hex(String raw) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(raw.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }
}
