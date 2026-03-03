package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.loginDto.LoginRequest;
import com.company.turbohireclone.backend.dto.loginDto.LoginResponse;
import com.company.turbohireclone.backend.dto.loginDto.SetNewPasswordRequest;
import com.company.turbohireclone.backend.security.util.SecurityUtils;
import com.company.turbohireclone.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return authService.login(
                request.getEmail(),
                request.getPassword()
        );
    }

    @PutMapping("/set-new-password")
    public void setNewPassword(@RequestBody SetNewPasswordRequest req) {

        Long userId = SecurityUtils.getCurrentUserId();

        authService.setNewPassword(userId, req.getNewPassword());
    }
}