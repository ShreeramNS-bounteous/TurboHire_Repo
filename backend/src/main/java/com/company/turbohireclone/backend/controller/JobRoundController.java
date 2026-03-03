package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.entity.JobRound;
import com.company.turbohireclone.backend.services.JobRoundService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs/{jobId}/rounds")
@RequiredArgsConstructor
public class JobRoundController {

    private final JobRoundService jobRoundService;

    /**
     * HR creates job rounds
     */
    @PostMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public Long createRound(
            @PathVariable Long jobId,
            @RequestBody JobRound request
    ) {
        return jobRoundService.createRound(
                jobId,
                request.getRoundName(),
                request.getRoundOrder(),
                request.getEvaluationTemplateCode() // 🔥 NEW
        );

    }

    /**
     * HR views all rounds of a job
     */
    @GetMapping
    @PreAuthorize("hasRole('RECRUITER')")
    public List<JobRound> getRounds(@PathVariable Long jobId) {
        return jobRoundService.getRoundsForJob(jobId);
    }
}
