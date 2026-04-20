package org.example.camunda.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dept_id")
    private Long id;

    @Column(name = "dept_code", nullable = false, unique = true)
    private String deptCode;

    @Column(name = "dept_name")
    private String deptName;

    @Column(name = "manager_username")
    private String managerUsername;

    @Column(name = "director_username")
    private String directorUsername;
}
