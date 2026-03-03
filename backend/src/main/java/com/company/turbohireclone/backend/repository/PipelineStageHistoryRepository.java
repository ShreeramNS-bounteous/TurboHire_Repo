package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.PipelineStageHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PipelineStageHistoryRepository
        extends JpaRepository<PipelineStageHistory, Long> {

    // timeline for frontend
    List<PipelineStageHistory> findByCandidateJobId(Long candidateJobId);
}
