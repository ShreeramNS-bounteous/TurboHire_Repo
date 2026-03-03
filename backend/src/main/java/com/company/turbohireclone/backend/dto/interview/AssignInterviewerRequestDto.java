package com.company.turbohireclone.backend.dto.interview;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignInterviewerRequestDto {
    private Long interviewerUserId;
}
