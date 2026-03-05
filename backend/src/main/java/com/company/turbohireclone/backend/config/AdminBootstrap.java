package com.company.turbohireclone.backend.config;

import com.company.turbohireclone.backend.entity.Role;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.repository.RoleRepository;
import com.company.turbohireclone.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminBootstrap {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    public void createAdminIfNotExists() {

        if (userRepository.count() == 0) {

            // 🔥 Fetch ADMIN role from DB
            Role adminRole = roleRepository.findByName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("ADMIN role not found in DB"));

            User admin = User.builder()
                    .fullName("Super Admin")
                    .email("admin@turbohire.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(adminRole)
                    .build();

            userRepository.save(admin);

            System.out.println("✅ Default Admin Created!");
        }
    }
}