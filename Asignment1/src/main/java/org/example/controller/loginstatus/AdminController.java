package org.example.controller.loginstatus;

import lombok.RequiredArgsConstructor;
import org.example.dto.response.ApiResponse;
import org.example.entity.LoginLog;
import org.example.service.loginstatus.LoginLogService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('admin')") // Đảm bảo chỉ admin mới xem được
public class AdminController {
    private final LoginLogService loginLogService;

    @GetMapping("/login-logs") // chỉ trạng thái đăng nhập thành công hay không
    public ApiResponse<List<LoginLog>> getLoginLogs() {
        return ApiResponse.<List<LoginLog>>builder()
                .result(loginLogService.getAllLogs())
                .build();
    }
}