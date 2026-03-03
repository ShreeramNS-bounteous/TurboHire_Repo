package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume,Long> {

    Optional<Resume> findByCandidate_Id(Long candidateId);
}
