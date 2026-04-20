package org.example.camunda.repository;

import org.example.camunda.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Tìm phòng ban
    Optional<Department> findByDeptCode(String deptCode);
}
