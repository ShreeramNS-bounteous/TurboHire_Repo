package com.company.turbohireclone.backend.dto.admin;

import lombok.Data;
import java.time.LocalDate;

@Data
public class JobAnalyticsFilterDTO {

    private Long businessUnitId;
    private Long recruiterId;

    private String jobStatus;
    private String jobTitleContains;

    private LocalDate createdAfter;
    private LocalDate createdBefore;
}