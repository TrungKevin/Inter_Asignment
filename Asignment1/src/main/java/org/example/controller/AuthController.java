package org.example.controller;


import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;
import org.example.dto.Identity.TokenExchangeResponse;
import org.example.dto.request.LoginRequest;
import org.example.dto.request.OAuth2CodeExchangeRequest;
import org.example.dto.response.ApiResponse;
import org.example.dto.response.UserResponse;
import org.example.entity.LoginStatus;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.example.service.KeycloakForgotPasswordService;
import org.example.service.UserService;
import org.example.service.loginstatus.LoginLogService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
import org.example.dto.request.ForgotPasswordRequest;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final RestClient.Builder restClientBuilder;
    private final KeycloakForgotPasswordService keycloakForgotPasswordService;
    private final LoginLogService loginLogService;

    @Value("${idp.url}")
    private String idpUrl;
    @Value("${idp.realm}")
    private String idpRealm;
    @Value("${idp.client-id}")
    private String clientId;
    @Value("${idp.client-secret}")
    private String clientSecret;

    @GetMapping("/users/{username}")
    public UserResponse getUser(@PathVariable String username) {
        return userService.findByUserName(username)
                .map(user -> new UserResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail()
                ))
                .orElse(null);
    }

    @PostMapping("/auth/validate")// login
    public ApiResponse<TokenExchangeResponse> validate(@RequestBody LoginRequest loginRequest) {
        var formData = new LinkedMultiValueMap<String, String>();
        formData.add("grant_type", "password");
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("username", loginRequest.getUsername());
        formData.add("password", loginRequest.getPassword());

        TokenExchangeResponse tokenResponse;
        try {
            tokenResponse = restClientBuilder.build()
                    .post()
                    .uri(idpUrl + "/realms/" + idpRealm + "/protocol/openid-connect/token")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(formData)
                    .retrieve()
                    .body(TokenExchangeResponse.class);
            String email = resolveEmailByUsername(loginRequest.getUsername());
            safeRecordLogin(loginRequest.getUsername(), email, LoginStatus.SUCCESS);
        } catch (Exception exception) {
            String email = resolveEmailByUsername(loginRequest.getUsername());
            safeRecordLogin(loginRequest.getUsername(), email, LoginStatus.FAILED);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return ApiResponse.<TokenExchangeResponse>builder()
                .result(tokenResponse)
                .build();
    }

    @PostMapping("/auth/forgot-password")
    public ApiResponse<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        keycloakForgotPasswordService.sendResetPasswordEmail(request.getEmail());
        return ApiResponse.<Void>builder()
                .message("If the account exists, a reset email has been sent.")
                .build();
    }

    @PostMapping("/auth/oauth2/exchange")// lấy trạng thái theo dõi from google
    public ApiResponse<TokenExchangeResponse> exchangeAuthorizationCode(
            @Valid @RequestBody OAuth2CodeExchangeRequest request
    ) {
        var formData = new LinkedMultiValueMap<String, String>(); // cbi body add gửi lên keycloak
        formData.add("grant_type", "authorization_code");
        formData.add("code", request.getCode());
        formData.add("redirect_uri", request.getRedirectUri());
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);

        TokenExchangeResponse tokenResponse;// gọi token enpoint xử lý kết quả
        try {
            tokenResponse = restClientBuilder.build()
                    .post()
                    .uri(idpUrl + "/realms/" + idpRealm + "/protocol/openid-connect/token")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body(formData)
                    .retrieve()
                    .body(TokenExchangeResponse.class);
            safeRecordLogin(null, null, LoginStatus.SUCCESS);
        } catch (Exception exception) {
            safeRecordLogin(null, null, LoginStatus.FAILED);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return ApiResponse.<TokenExchangeResponse>builder()// trả thành công
                .result(tokenResponse)
                .build();
    }

    //safeRecordLogin = “cố gắng ghi log; có lỗi thì thôi, đừng làm fail request auth”
    private void safeRecordLogin(String username, String email, LoginStatus status) {
        try {
            loginLogService.recordLogin(username, email, status);
        } catch (Exception ignored) {
            
        }
    }

    private String resolveEmailByUsername(String username) {
        if (username == null || username.isBlank()) {//null or khoảng trắng
            return null;
        }
        return userService.findByUserName(username)
                .map(user -> user.getEmail())
                .orElse(null);
    }
}