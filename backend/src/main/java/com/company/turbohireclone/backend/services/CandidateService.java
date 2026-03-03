package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.common.SystemLogger;
import com.company.turbohireclone.backend.dto.candidate.CandidateSimpleDto;
import com.company.turbohireclone.backend.entity.Candidate;
import com.company.turbohireclone.backend.entity.CandidateProfile;
import com.company.turbohireclone.backend.entity.Resume;
import com.company.turbohireclone.backend.repository.CandidateProfileRepository;
import com.company.turbohireclone.backend.repository.CandidateRepository;
import com.company.turbohireclone.backend.repository.ResumeRepository;
import com.company.turbohireclone.backend.dto.candidate.CandidateProfileResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final ResumeRepository resumeRepository;
    private final SystemLogger systemLogger;

    // WRITE
    public Long createCandidate(Candidate candidate, CandidateProfile profile, Resume resume, Long actorUserId) {

        candidateRepository.save(candidate);

        profile.setCandidate(candidate);
        candidateProfileRepository.save(profile);

        resume.setCandidate(candidate);
        resumeRepository.save(resume);

        systemLogger.audit(actorUserId, "CREATE_CANDIDATE", "CANDIDATE", candidate.getId());
        return candidate.getId();
    }

    // READ
    public Candidate getCandidate(Long candidateId) {
        return candidateRepository.findById(candidateId).orElseThrow();
    }

    @Transactional(readOnly = true)
    public CandidateProfileResponse getCandidateProfile(Long candidateId) {

        Candidate candidate = candidateRepository
                .findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found"));

        CandidateProfile profile = candidateProfileRepository
                .findById(candidateId)
                .orElse(null);

        Resume resume = resumeRepository
                .findByCandidate_Id(candidateId)
                .orElse(null);

        return CandidateProfileResponse.from(candidate, profile, resume);
    }



    public Resume getResume(Long candidateId) {
        return resumeRepository.findByCandidate_Id(candidateId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
    }

    @Transactional(readOnly = true)
    public List<CandidateSimpleDto> getAvailableCandidatesForJob(Long jobId) {

        return candidateRepository
                .findAvailableCandidatesForJob(jobId)
                .stream()
                .map(c -> new CandidateSimpleDto(
                        c.getId(),
                        c.getFullName(),
                        c.getEmail(),
                        c.getPhone()
                ))
                .toList();
    }



    // READ
    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }




    // UPDATE
    public void updateCandidate(Candidate candidate, Long actorUserId) {
        candidateRepository.save(candidate);
        systemLogger.audit(actorUserId, "UPDATE_CANDIDATE", "CANDIDATE", candidate.getId());
    }
}
