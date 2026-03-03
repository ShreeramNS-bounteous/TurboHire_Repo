package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.admin.AssignRoleRequest;
import com.company.turbohireclone.backend.dto.admin.CreateUserRequest;
import com.company.turbohireclone.backend.dto.admin.UserResponseDTO;
import com.company.turbohireclone.backend.entity.BusinessUnit;
import com.company.turbohireclone.backend.entity.Role;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.repository.BURepository;
import com.company.turbohireclone.backend.repository.RoleRepository;
import com.company.turbohireclone.backend.repository.UserRepository;
import com.company.turbohireclone.backend.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BURepository buRepository;

    // =====================================================
    // CREATE USER
    // =====================================================

    @PostMapping("/users")
    public Long createUser(@RequestBody CreateUserRequest request) {
        return adminService.createUser(request);
    }

    // =====================================================
    // GET ALL USERS
    // =====================================================

    @GetMapping("/users")
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> UserResponseDTO.builder()
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .roleName(user.getRole().getName())
                        .businessUnitId(user.getBusinessUnit().getId())
                        .businessUnitName(user.getBusinessUnit().getName())
                        .status(user.getStatus())
                        .build()
                )
                .toList();
    }

    // =====================================================
    // ASSIGN ROLE
    // =====================================================

    @PutMapping("/users/{userId}/assign-role")
    public void assignRole(
            @PathVariable Long userId,
            @RequestBody AssignRoleRequest request
    ) {
        adminService.assignRole(userId, request.getRoleName());
    }

    // =====================================================
    // GET ALL ROLES
    // =====================================================

    @GetMapping("/roles")
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    // =====================================================
    // GET ALL BUSINESS UNITS
    // =====================================================

    @GetMapping("/business-units")
    public List<BusinessUnit> getBusinessUnits() {
        return buRepository.findAll();
    }
}