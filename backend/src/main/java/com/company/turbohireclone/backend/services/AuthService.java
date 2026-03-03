package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.loginDto.LoginResponse;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.repository.UserRepository;
import com.company.turbohireclone.backend.security.jwt.JwtTokenProvider;
import com.company.turbohireclone.backend.security.model.AuthUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository; // 🔥 add this
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(String email, String password) {

        // 1️⃣ Authenticate user
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(email, password)
                );

        AuthUser authUser = (AuthUser) authentication.getPrincipal();

        // 2️⃣ Generate JWT
        String token = jwtTokenProvider.generateToken(
                authUser.getUserId(),
                authUser.getEmail(),
                authUser.getRole(),
                authUser.getBuId()
        );

        // 3️⃣ Fetch full user from DB to get passwordTemporary flag
        User user = userRepository.findById(authUser.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 4️⃣ Return both token + flag
        return new LoginResponse(
                token,
                user.getPasswordTemporary()
        );
    }

    public void setNewPassword(Long userId, String newPassword) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 Important validation
        if (!Boolean.TRUE.equals(user.getPasswordTemporary())) {
            throw new RuntimeException("Password change not allowed");
        }

        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new RuntimeException("NEW_PASSWORD_CANNOT_BE_OLD");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        user.setPasswordTemporary(false); // 🔥 REMOVE FLAG

        userRepository.save(user);
    }
}