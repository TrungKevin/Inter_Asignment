package org.example.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data// with google we can get the code and redirect uri
public class OAuth2CodeExchangeRequest {

    @NotBlank(message = "Code is required")
    private String code;

    @NotBlank(message = "Redirect URI is required")
    private String redirectUri;
}

