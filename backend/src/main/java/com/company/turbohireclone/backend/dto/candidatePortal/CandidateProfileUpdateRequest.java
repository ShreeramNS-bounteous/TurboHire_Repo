package com.company.turbohireclone.backend.dto.candidatePortal;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class CandidateProfileUpdateRequest {

    private Double totalExperience;
    private List<String> skills;
    private Map<String, Object> education;
    private String currentCompany;
}