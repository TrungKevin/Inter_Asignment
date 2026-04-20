package org.example.service.loginstatus;

import lombok.RequiredArgsConstructor;
import org.example.entity.LoginLog;
import org.example.entity.LoginStatus;
import org.example.repository.LoginLogRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginLogService {
    private final LoginLogRepository loginLogRepository;

    public void recordLogin(String username, String email, LoginStatus status) {
        LoginLog log = LoginLog.builder()
                .username(username)
                .email(email)
                .loginTime(LocalDateTime.now())
                .status(status)
                .build();
        loginLogRepository.save(log);
    }

    // Hàm phục vụ cho Bước 5: Admin xem danh sách
    public List<LoginLog> getAllLogs() {
        return loginLogRepository.findAll();
    }
}
