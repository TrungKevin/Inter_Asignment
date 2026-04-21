package org.example.entity.jasper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "export_jobs")
@Getter
@Setter
public class ExportJob {//Lưu từng lần export: ai tạo, trạng thái

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    /** Username Keycloak (preferred_username). */
    @Column(nullable = false, length = 255)
    private String createdBy;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ExportJobStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 64)
    private ReportExportJobType reportType;

    @Column(nullable = false, length = 16)
    private String format;

    /** JSON: tables, usersColumns, loginColumns — không chứa SQL tự do. */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String paramsJson;

    /** Tên file trong {@code app.report.storage-dir} (vd. uuid.pdf). */
    @Column(length = 512)
    private String storedFileName;

    @Column(length = 2000)
    private String errorMessage;

    @Column
    private Integer percent;

    @Column(length = 255)
    private String cacheKey;

    @Column(length = 64)
    private String renderLockToken;

    @PrePersist
    void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = Instant.now();
    }
}
