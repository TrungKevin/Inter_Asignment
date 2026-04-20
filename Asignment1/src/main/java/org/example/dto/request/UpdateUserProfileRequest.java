package org.example.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateUserProfileRequest {
    private String fullname;
    private String address;
    private LocalDate dob;
    private String email;

}