package org.example.controller;

import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.example.dto.request.RegistrationRequest;
import org.example.dto.response.ApiResponse;
import org.example.dto.response.PagedProfilesResponse;
import org.example.dto.response.ProfileResponse;
import org.example.service.ProfileService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProfileController {
    ProfileService profileService;

    @PostMapping("/register")
    ApiResponse<ProfileResponse> register(@RequestBody @Valid RegistrationRequest request) {
        return ApiResponse.<ProfileResponse>builder()
                .result(profileService.register(request))
                .build();
    }

    @GetMapping("/profiles")
    ApiResponse<PagedProfilesResponse> getProfiles(
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ApiResponse.<PagedProfilesResponse>builder()
                .result(profileService.getProfilesPage(pageable))
                .build();
    }

    @DeleteMapping("/profiles/{userId}")
    ApiResponse<Void> deleteUser(@PathVariable String userId) {
        profileService.deleteUserById(userId);
        return ApiResponse.<Void>builder().build();
    }
}