package com.company.turbohireclone.backend.dto.job;

import lombok.Data;

@Data
public class CreateJobRequest {

    private String title;
    private Long buId;
    private String department;
    private Integer experienceMin;
    private Integer experienceMax;
    private String location;
}
