# Luồng xử lý logic — Assignment1 (Spring Boot)

Tài liệu mô tả **đường đi code** (file → file) cho các chức năng đang có trong repo.  
**Lưu ý:** Cấu hình nhạy cảm (DB, Keycloak client secret) nằm trong `src/main/resources/application.yaml` — không ghi chi tiết tại đây.

---

## 1. Khởi động ứng dụng

| Thứ tự | File / thành phần | Vai trò |
|--------|-------------------|---------|
| 1 | `src/main/java/org/example/Main.java` | `@SpringBootApplication` — entry point, nạp context Spring Boot. |
| 2 | `src/main/resources/application.yaml` | Cấu hình datasource PostgreSQL, OAuth2 Resource Server JWT (`issuer-uri`), Keycloak `idp.*`, `app.frontend-url`, `server.port`. |
| 3 | Spring Boot auto-config | Tự cấu hình JPA (do có `spring-boot-starter-data-jpa`), Security OAuth2 Resource Server, `RestClient.Builder` (dùng trong controller/service). |

---

## 2. Lớp bảo mật toàn cục (JWT + phân quyền)

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `configuration/SecurityConfig.java` | Định nghĩa `SecurityFilterChain`: endpoint public vs cần JWT; bật OAuth2 Resource Server JWT; tắt CSRF; đăng ký `JwtAuthenticationConverter` + `PasswordEncoder`. |
| 2 | `configuration/CustomAuthoritiesConverter.java` | Đọc claim `realm_access.roles` từ JWT, map thành `GrantedAuthority` dạng `ROLE_<role>` và `ROLE_<role_lower>` để khớp `@PreAuthorize("hasRole('admin')")`. |
| 3 | `configuration/JwtAuthenticationEntryPoint.java` | Khi request thiếu/sai JWT → trả JSON `ApiResponse` với mã lỗi `UNAUTHENTICATED` (ErrorCode). |
| 4 | `exception/ErrorCode.java` | Định nghĩa mã lỗi HTTP + business code (ví dụ `UNAUTHENTICATED`, `UNAUTHORIZED`). |

**Luồng request có Bearer token:**  
HTTP → `SecurityFilterChain` → `BearerTokenAuthenticationFilter` → decode JWT theo `issuer-uri` → `CustomAuthoritiesConverter` → nếu endpoint cần auth thì kiểm tra role/scope.

---

## 3. CORS (cho frontend gọi API)

| File | Vai trò |
|------|---------|
| `configuration/CorsConfiguration.java` | Bean `CorsFilter`: cho phép mọi origin/method/header (cấu hình dev). |

---

## 4. Đăng ký tài khoản + profile (PostgreSQL)

**Endpoint:** `POST /register`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/ProfileController.java` | Nhận body `RegistrationRequest`, gọi `ProfileService.register`. |
| 2 | `dto/request/RegistrationRequest.java` | DTO đầu vào (validation nếu có annotation). |
| 3 | `service/ProfileService.java` | Kiểm tra trùng username → tạo `User` + `Profile` (quan hệ 1-1), mã hóa mật khẩu bằng `PasswordEncoder`, `userRepository.save`. |
| 4 | `repository/UserRepository.java` | JPA: `findByUsername`, `save`, `findAll`. |
| 5 | `entity/User.java`, `entity/Profile.java` | Entity JPA map bảng `users`, `profiles`. |
| 6 | `dto/response/ProfileResponse.java` | DTO trả về cho client. |
| 7 | `mapper/ProfileMapper.java` | **Hiện có** nhưng `ProfileService` **không inject/dùng**; mapping đang làm trực tiếp trong `ProfileService.toProfileResponse`. |

**Lưu ý:** Đăng ký này là **user trong DB ứng dụng**, khác với user trong Keycloak (trừ khi bạn đồng bộ thủ công).

---

## 5. Lấy danh sách profile (cần role admin + JWT)

**Endpoint:** `GET /profiles`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/ProfileController.java` | Gọi `profileService.getAllProfiles()`. |
| 2 | `service/ProfileService.java` | `@PreAuthorize("hasRole('admin')")` — load tất cả user, map sang `ProfileResponse`. |
| 3 | `configuration/CustomAuthoritiesConverter.java` + JWT Keycloak | Role `admin` trong token phải map được thành authority mà `hasRole('admin')` hiểu được. |
| 4 | `repository/UserRepository.java` | `findAll()`. |

---

## 6. Tra cứu user theo username (public)

**Endpoint:** `GET /api/users/{username}`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/AuthController.java` | Path variable `username` → `UserService.findByUserName`. |
| 2 | `service/UserService.java` | `UserRepository.findByUsername`. |
| 3 | `dto/response/UserResponse.java` | Trả id, username, email (có thể `null` nếu không tìm thấy — theo code hiện tại). |

---

## 7. Đăng nhập qua Keycloak (Resource Owner Password — backend proxy)

**Endpoint:** `POST /api/auth/validate`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/AuthController.java` | Build form `grant_type=password`, `client_id`, `client_secret`, `username`, `password`. |
| 2 | `dto/request/LoginRequest.java` | username/password từ client. |
| 3 | HTTP client | `RestClient` POST tới `{idp.url}/realms/{idp.realm}/protocol/openid-connect/token`. |
| 4 | `dto/Identity/TokenExchangeResponse.java` | Map JSON token response (snake_case → camelCase). |
| 5 | `exception/AppException.java` + `ErrorCode.java` | Lỗi gọi Keycloak → `UNAUTHENTICATED`. |

---

## 8. Đổi authorization code lấy token (Google / OIDC redirect — backend proxy)

**Endpoint:** `POST /api/auth/oauth2/exchange`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/AuthController.java` | Nhận `OAuth2CodeExchangeRequest` (`code`, `redirectUri`). |
| 2 | `dto/request/OAuth2CodeExchangeRequest.java` | Body request. |
| 3 | HTTP client | `grant_type=authorization_code` + `code` + `redirect_uri` + `client_id` + `client_secret` → Keycloak token endpoint (cùng URL như luồng 7). |
| 4 | `dto/Identity/TokenExchangeResponse.java` | Kết quả token. |

---

## 9. Quên mật khẩu (gửi email reset qua Keycloak Admin API)

**Endpoint:** `POST /api/auth/forgot-password`

| Thứ tự | File | Vai trò |
|--------|------|---------|
| 1 | `controller/AuthController.java` | Nhận `ForgotPasswordRequest` (email), gọi service. |
| 2 | `dto/request/ForgotPasswordRequest.java` | Validate email. |
| 3 | `service/KeycloakForgotPasswordService.java` | (1) `client_credentials` lấy admin token — (2) `GET /admin/realms/{realm}/users?email=...` — (3) `PUT .../execute-actions-email` với action `UPDATE_PASSWORD`. |
| 4 | `application.yaml` | `idp.url`, `idp.realm`, `idp.admin-*`, `idp.client-id` (client FE trong query), `app.frontend-url` (redirect sau reset). |

**Phản hồi:** luôn message chung (tránh lộ user có tồn tại hay không); lỗi Keycloak được log, không ném chi tiết ra client.

---

## 10. Xử lý lỗi tập trung

| File | Vai trò |
|------|---------|
| `exception/GlobalExceptionHandler.java` | `@ControllerAdvice`: `AppException` → mã theo `ErrorCode`; validation → `MethodArgumentNotValidException`; `Exception` chung → `UNCATEGORIZED_EXCEPTION`. |
| `exception/AppException.java` | Wrapper lỗi nghiệp vụ. |
| `exception/ErrorNormalize.java` | (nếu có dùng) hỗ trợ chuẩn hóa lỗi — kiểm tra khi mở rộng. |

---

## 11. Thư viện đã thêm (chưa gắn luồng cụ thể trong code hiện tại)

| Thành phần | Ghi chú |
|------------|---------|
| `pom.xml` — `jasperreports`, `poi-ooxml` | Phục vụ báo cáo / Excel sau này; **chưa có** controller/service gọi trực tiếp trong các file Java đã liệt kê. |

---

## 12. File / interface chưa có luồng hoàn chỉnh trong runtime

| File | Ghi chú |
|------|---------|
| `repository/IdentityClient.java` | Interface client gọi identity — **không thấy** class `@Component` impl trong repo. |
| `dto/request/UpdateUserProfileRequest.java` | DTO có **chưa** có endpoint controller tương ứng. |

---

## Tóm tắt endpoint → file chính

| HTTP | Path | Controller | Service / thành phần chính |
|------|------|------------|---------------------------|
| POST | `/register` | `ProfileController` | `ProfileService` → `UserRepository` |
| GET | `/profiles` | `ProfileController` | `ProfileService` (+ JWT + `@PreAuthorize`) |
| GET | `/api/users/{username}` | `AuthController` | `UserService` → `UserRepository` |
| POST | `/api/auth/validate` | `AuthController` | `RestClient` → Keycloak token |
| POST | `/api/auth/oauth2/exchange` | `AuthController` | `RestClient` → Keycloak token |
| POST | `/api/auth/forgot-password` | `AuthController` | `KeycloakForgotPasswordService` → Keycloak Admin API |

---

*Cập nhật theo cấu trúc mã nguồn trong `src/main/java/org/example` tại thời điểm tạo tài liệu.*
