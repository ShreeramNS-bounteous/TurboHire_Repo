package com.company.turbohireclone.backend.dto.interview;

import com.company.turbohireclone.backend.enums.AttendanceStatus;
import com.company.turbohireclone.backend.enums.DecisionStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompletedInterviewDto {

    private Long interviewId;

    private String candidateName;
    private String candidateEmail;

    private String jobTitle;
    private String roundName;

    private String interviewerName;

    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private AttendanceStatus attendanceStatus;

    private boolean feedbackSubmitted;

    private Integer rating;
    private String recommendation;
    private boolean hasNextRound;
    private DecisionStatus decisionStatus;

}
