package org.example.repository;

import org.example.dto.Identity.TokenExchangeParam;
import org.example.dto.Identity.TokenExchangeResponse;
import org.example.dto.Identity.UserCreationParam;
import org.springframework.http.ResponseEntity;

public interface IdentityClient {
    TokenExchangeResponse exchangeToken(TokenExchangeParam exchangeParam);
    ResponseEntity<?> createUser(String token, UserCreationParam userCreationParam);
}