package org.example.repository;

import org.example.entity.jasper.ExportJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ExportJobRepository extends JpaRepository<ExportJob, UUID> {
}
