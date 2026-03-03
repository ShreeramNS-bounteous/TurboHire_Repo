package com.company.turbohireclone.backend.dto.candidateJob;


import lombok.Data;

@Data
public class AddCandidateToPipelineRequest {

    private Long candidateId;
    private Long jobId;
    private Long buId;
}
