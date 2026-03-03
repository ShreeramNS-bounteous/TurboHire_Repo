package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.admin.CreateUserRequest;
import com.company.turbohireclone.backend.entity.BusinessUnit;
import com.company.turbohireclone.backend.entity.Role;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.notification.NotificationService;
import com.company.turbohireclone.backend.repository.BURepository;
import com.company.turbohireclone.backend.repository.RoleRepository;
import com.company.turbohireclone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationService notificationService;
    private final BURepository businessUnitRepository;

    // =====================================================
    // 1️⃣ CREATE USER (ADMIN CONTROLLED)
    // =====================================================

    public Long createUser(CreateUserRequest req) {

        // 🔹 Validate role
        Role role = roleRepository.findByName(req.getRoleName())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // 🔹 Validate Business Unit
        BusinessUnit businessUnit = businessUnitRepository
                .findById(req.getBusinessUnitId())
                .orElseThrow(() -> new RuntimeException("Business Unit not found"));

        // 🔹 Prevent duplicate email
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String encodedPassword;
        boolean isTemporary = false;

        // 🔹 Role based logic
        if ("RECRUITER".equalsIgnoreCase(role.getName())) {

            // Generate temporary password
            String tempPassword = generateTemporaryPassword();

            encodedPassword = passwordEncoder.encode(tempPassword);
            isTemporary = true;

            // Send activation email
            notificationService.notifyRecruiterActivated(
                    req.getFullName(),
                    req.getEmail(),
                    tempPassword
            );

        } else {
            // USER / EMPLOYEE
            encodedPassword = passwordEncoder.encode(req.getPassword());
        }

        // 🔹 Create user
        User user = User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .password(encodedPassword)
                .passwordTemporary(isTemporary)
                .role(role)
                .businessUnit(businessUnit)
                .status("ACTIVE")
                .build();

        userRepository.save(user);

        return user.getId();
    }

    // =====================================================
    // 2️⃣ ASSIGN / CHANGE ROLE (OPTIONAL FUTURE USE)
    // =====================================================

    public void assignRole(Long userId, String roleName) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);

        // If switching to RECRUITER → generate temp password
        if ("RECRUITER".equalsIgnoreCase(role.getName())) {

            String tempPassword = generateTemporaryPassword();

            user.setPassword(passwordEncoder.encode(tempPassword));
            user.setPasswordTemporary(true);

            notificationService.notifyRecruiterActivated(
                    user.getFullName(),
                    user.getEmail(),
                    tempPassword
            );
        }

        userRepository.save(user);
    }

    // =====================================================
    // 3️⃣ TEMP PASSWORD GENERATOR
    // =====================================================

    private String generateTemporaryPassword() {

        String chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

        StringBuilder password = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 10; i++) {
            password.append(
                    chars.charAt(random.nextInt(chars.length()))
            );
        }

        return password.toString();
    }
}