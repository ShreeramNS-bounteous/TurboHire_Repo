package com.company.turbohireclone.backend.dto.candidate;

import lombok.Data;

@Data
public class UpdateCandidateRequest {

    private String fullName;
    private String phone;
    private String status;
}
