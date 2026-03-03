package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.CandidateProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CandidateProfileRepository extends JpaRepository<CandidateProfile,Long> {
    Optional<CandidateProfile> findByCandidateId(Long candidateId);
}
