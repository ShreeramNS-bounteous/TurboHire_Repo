package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.candidate.CandidateProfileResponse;
import com.company.turbohireclone.backend.dto.candidatePortal.CandidatePortalResponse;
import com.company.turbohireclone.backend.dto.candidatePortal.CandidateProfileUpdateRequest;
import com.company.turbohireclone.backend.dto.interview.InterviewResponseDto;
import com.company.turbohireclone.backend.dto.offer.OfferResponse;
import com.company.turbohireclone.backend.entity.*;
import com.company.turbohireclone.backend.exception.PortalException;
import com.company.turbohireclone.backend.repository.CandidatePortalTokenRepository;
import com.company.turbohireclone.backend.repository.CandidateProfileRepository;
import com.company.turbohireclone.backend.repository.InterviewRepository;
import com.company.turbohireclone.backend.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidatePortalService {

    private final CandidatePortalTokenRepository tokenRepository;
    private final InterviewRepository interviewRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final ResumeRepository resumeRepository;

    public CandidatePortalResponse getPortalByToken(String token) {

        CandidatePortalToken portalToken =
                tokenRepository.findByToken(token)
                        .orElseThrow(() -> new PortalException("INVALID_TOKEN"));

        try {

            if (portalToken.getFailedAttempts() >= 5) {
                throw new PortalException("ACCESS_BLOCKED");
            }

            if (portalToken.getExpiresAt().isBefore(LocalDateTime.now())) {
                throw new PortalException("TOKEN_EXPIRED");
            }

            CandidateJob cj = portalToken.getCandidateJob();

            Candidate candidate = cj.getCandidate();
            // =========================
            // FETCH PROFILE PROPERLY
            // =========================
            CandidateProfile profile =
                    candidateProfileRepository
                            .findByCandidateId(candidate.getId())
                            .orElse(null);

            // =========================
            // FETCH RESUME PROPERLY
            // =========================
            Resume resume =
                    resumeRepository
                            .findByCandidate_Id(candidate.getId())
                            .orElse(null);

            // =========================
            // REUSE DTO
            // =========================
            CandidateProfileResponse candidateDto =
                    CandidateProfileResponse.from(candidate, profile, resume);
            // =======================
            // INTERVIEWS (Full History)
            // =======================
            List<Interview> interviews =
                    interviewRepository.findByCandidateJob_Id(cj.getId());

            List<InterviewResponseDto> interviewDtos = interviews.stream()
                    .map(interview -> InterviewResponseDto.builder()
                            .id(interview.getId())
                            .candidateJobId(interview.getCandidateJob().getId())
                            .jobRoundId(interview.getRound().getId())
                            .roundName(interview.getRound().getRoundName())
                            .status(interview.getStatus().name())
                            .mode(interview.getMode().name())
                            .scheduledAt(
                                    interview.getScheduledAt() != null
                                            ? interview.getScheduledAt().toString()
                                            : null
                            )
                            .meetingUrl(interview.getMeetingUrl())
                            .attendanceStatus(
                                    interview.getAttendanceStatus() != null
                                            ? interview.getAttendanceStatus().name()
                                            : null
                            )
                            .decisionStatus(
                                    interview.getDecisionStatus() != null
                                            ? interview.getDecisionStatus().name()
                                            : null
                            )
                            .build()
                    )
                    .toList();

            // =======================
            // OFFER
            // =======================
            OfferResponse offerDto = null;
            if (cj.getOfferStatus() != null) {
                offerDto = OfferResponse.from(cj);
            }

            // =======================
            // FINAL RESPONSE
            // =======================
            return CandidatePortalResponse.builder()
                    .candidate(candidateDto)
                    .jobTitle(cj.getJob().getTitle())
                    .businessUnit(cj.getBusinessUnit().getName())
                    .stage(cj.getCurrentStage())
                    .status(cj.getStatus())
                    .interviews(interviewDtos)
                    .offer(offerDto)
                    .build();

        } catch (RuntimeException ex) {

            portalToken.setFailedAttempts(
                    portalToken.getFailedAttempts() + 1
            );

            throw ex;
        }
    }

    public CandidateProfileResponse updateProfile(
            String token,
            CandidateProfileUpdateRequest request
    ) {

        CandidatePortalToken portalToken =
                tokenRepository.findByToken(token)
                        .orElseThrow(() -> new PortalException("INVALID_TOKEN"));

        if (portalToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new PortalException("TOKEN_EXPIRED");
        }

        CandidateJob cj = portalToken.getCandidateJob();
        Candidate candidate = cj.getCandidate();

        CandidateProfile profile =
                candidateProfileRepository.findById(candidate.getId())
                        .orElseThrow(() ->
                                new RuntimeException("Profile not found")
                        );

        // 🔥 UPDATE FIELDS
        profile.setTotalExperience(request.getTotalExperience());
        profile.setSkills(request.getSkills());
        profile.setEducation(request.getEducation());
        profile.setCurrentCompany(request.getCurrentCompany());

        candidateProfileRepository.save(profile);

        Resume resume =
                resumeRepository.findByCandidate_Id(candidate.getId())
                        .orElse(null);

        return CandidateProfileResponse.from(candidate, profile, resume);
    }
}
