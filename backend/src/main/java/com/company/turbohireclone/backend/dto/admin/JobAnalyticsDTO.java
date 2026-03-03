package com.company.turbohireclone.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobAnalyticsDTO {

    private Long jobId;
    private String jobTitle;
    private Long businessUnitId;
    private String jobStatus;

    private long totalCandidates;
    private long hiredCandidates;
    private long rejectedCandidates;
    private long activeCandidates;

    private long interviewsConducted;
}