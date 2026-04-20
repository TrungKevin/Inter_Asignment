package org.example.service;

import lombok.RequiredArgsConstructor;

import org.example.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.example.entity.User;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public Optional<User> findByUserName(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean validateUser(String username, String rawPassword) {

        Optional<User> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) return false;

        User user = userOpt.get();
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

}
