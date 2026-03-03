package com.company.turbohireclone.backend.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private String roleName;
    private Long businessUnitId;
    private String businessUnitName;
    private String status;
}