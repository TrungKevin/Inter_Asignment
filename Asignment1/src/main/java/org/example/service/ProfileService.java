package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.dto.request.RegistrationRequest;
import org.example.dto.response.PagedProfilesResponse;
import org.example.dto.response.ProfileResponse;
import org.example.entity.Profile;
import org.example.entity.User;
import org.example.exception.AppException;
import org.example.exception.ErrorCode;
import org.example.repository.ProfileRepository;
import org.example.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    // final cố định không thay đổi 
    // static có thể thay đổi 
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ProfileResponse register(RegistrationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new AppException(ErrorCode.USERNAME_EXISTED);
        }

        User newUser = new User();
        newUser.setId(UUID.randomUUID().toString());
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setEmail(request.getEmail());
        Profile profile = Profile.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dob(request.getDob())
                .user(newUser)
                .build();

        newUser.setProfile(profile);
        User savedUser = userRepository.save(newUser);
        return toProfileResponse(savedUser.getProfile());
    }

    @PreAuthorize("hasRole('admin')")
    public PagedProfilesResponse getProfilesPage(Pageable pageable) {
        Page<Profile> page = profileRepository.findAllByOrderByUser_UsernameAsc(pageable);
        List<ProfileResponse> content = page.getContent().stream()
                .map(this::toProfileResponse)
                .toList();
        return PagedProfilesResponse.builder()
                .content(content)
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .page(page.getNumber())
                .size(page.getSize())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }

    @Transactional
    @PreAuthorize("hasRole('admin')")
    public void deleteUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.REQUEST_NOT_FOUND));
        userRepository.delete(user);
    }

    private ProfileResponse toProfileResponse(Profile profile) {
        return ProfileResponse.builder()
                .profileId(profile.getProfileId())
                .userId(profile.getUserId())
                .email(profile.getEmail())
                .username(profile.getUsername())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .dob(profile.getDob())
                .build();
    }
}
