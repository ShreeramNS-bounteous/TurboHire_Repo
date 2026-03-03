package com.company.turbohireclone.backend.controller;

import com.company.turbohireclone.backend.dto.candidate.CandidateProfileResponse;
import com.company.turbohireclone.backend.dto.candidatePortal.CandidatePortalResponse;
import com.company.turbohireclone.backend.dto.candidatePortal.CandidateProfileUpdateRequest;
import com.company.turbohireclone.backend.services.CandidatePortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/candidate-portal")
@RequiredArgsConstructor
public class CandidatePortalController {

    private final CandidatePortalService portalService;

    @GetMapping
    public CandidatePortalResponse getPortal(
            @RequestParam String token
    ) {
        return portalService.getPortalByToken(token);
    }

    @PostMapping("/profile")
    public CandidateProfileResponse updateProfileByToken(
            @RequestParam String token,
            @RequestBody CandidateProfileUpdateRequest request
    ) {
        return portalService.updateProfile(token, request);
    }
}
