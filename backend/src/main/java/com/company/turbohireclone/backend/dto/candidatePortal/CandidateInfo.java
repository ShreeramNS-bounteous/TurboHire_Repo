package com.company.turbohireclone.backend.dto.candidatePortal;

import lombok.*;

@Getter
@Builder
public class CandidateInfo {

    private Long id;
    private String fullName;
    private String email;
    private String phone;

    private CandidateProfileDto profile;
}
