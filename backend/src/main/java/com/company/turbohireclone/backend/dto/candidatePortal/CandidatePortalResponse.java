package com.company.turbohireclone.backend.dto.candidatePortal;

import com.company.turbohireclone.backend.dto.candidate.CandidateProfileResponse;
import com.company.turbohireclone.backend.dto.interview.InterviewResponseDto;
import com.company.turbohireclone.backend.dto.offer.OfferResponse;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CandidatePortalResponse {

    private CandidateProfileResponse candidate;

    private String jobTitle;
    private String businessUnit;

    private String stage;
    private String status;

    private List<InterviewResponseDto> interviews;
    private OfferResponse offer;
}