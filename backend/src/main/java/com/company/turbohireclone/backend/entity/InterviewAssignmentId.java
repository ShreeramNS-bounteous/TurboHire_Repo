package com.company.turbohireclone.backend.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterviewAssignmentId implements Serializable {

    private Long interviewId;
    private Long interviewerUserId;
}
