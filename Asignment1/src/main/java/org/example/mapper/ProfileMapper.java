package org.example.mapper;

import org.example.dto.response.ProfileResponse;
import org.example.dto.request.RegistrationRequest;
import org.example.entity.Profile;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {
    public Profile toProfile(RegistrationRequest request) {
        return Profile.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .dob(request.getDob())
                .build();
    }

    public ProfileResponse toProfileResponse(Profile profile) {
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
