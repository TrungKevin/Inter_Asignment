package org.example.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "login_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_id")
    private Long loginId;

    private String username;
    private String email;

    @Column(name = "login_time", nullable = false)
    private LocalDateTime loginTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LoginStatus status;
}