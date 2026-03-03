package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.CandidatePortalToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidatePortalTokenRepository
        extends JpaRepository<CandidatePortalToken, Long> {

    Optional<CandidatePortalToken> findByToken(String token);

    Optional<CandidatePortalToken> findByCandidateJob_Id(Long candidateJobId);
}

