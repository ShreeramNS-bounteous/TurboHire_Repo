package com.company.turbohireclone.backend.dto.admin;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String fullName;
    private String email;
    private String password;     // Required only for USER
    private String roleName;     // USER or RECRUITER
    private Long businessUnitId;
}