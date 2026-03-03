package com.company.turbohireclone.backend.dto.interviewFeedback;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmitFeedbackRequestDto {

    private Integer rating;
    private String recommendation; // HIRE / REJECT / HOLD
    private String comments;
}

