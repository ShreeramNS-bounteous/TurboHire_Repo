package com.company.turbohireclone.backend.dto.interviewer;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InterviewerNavbarDto {

    private Long userId;
    private String fullName;
    private String email;
    private String expertise;
    private int experienceYears;
}

