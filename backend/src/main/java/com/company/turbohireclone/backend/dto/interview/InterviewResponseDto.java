package com.company.turbohireclone.backend.dto.interview;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterviewResponseDto {

    private Long id;
    private Long candidateJobId;
    private Long jobRoundId;

    private String roundName;

    private String status;
    private String mode;

    private String scheduledAt;
    private String meetingUrl;

    private String attendanceStatus;
    private String decisionStatus;
}