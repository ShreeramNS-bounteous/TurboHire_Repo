package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.common.SystemLogger;
import com.company.turbohireclone.backend.dto.interviewFeedback.SubmitFeedbackRequestDto;
import com.company.turbohireclone.backend.entity.Interview;
import com.company.turbohireclone.backend.entity.InterviewFeedback;
import com.company.turbohireclone.backend.entity.User;
import com.company.turbohireclone.backend.enums.DecisionStatus;
import com.company.turbohireclone.backend.enums.InterviewStatus;
import com.company.turbohireclone.backend.repository.InterviewFeedbackRepository;
import com.company.turbohireclone.backend.repository.InterviewRepository;
import com.company.turbohireclone.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class InterviewFeedbackService {

    private final InterviewFeedbackRepository feedbackRepository;
    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    private final SystemLogger systemLogger;

    /**
     * Submit feedback for an interview
     */
    @Transactional
    public void submitFeedback(Long interviewId,
                               SubmitFeedbackRequestDto request,
                               Long actorUserId) {

        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        if (interview.getStatus() != InterviewStatus.COMPLETED) {
            throw new RuntimeException("Interview must be completed before feedback");
        }

        User interviewer = userRepository.findById(actorUserId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 CHECK IF FEEDBACK ALREADY EXISTS
        Optional<InterviewFeedback> existingFeedback =
                feedbackRepository.findByInterview_IdAndInterviewer_Id(
                        interviewId,
                        actorUserId
                );

        InterviewFeedback feedback;

        if (existingFeedback.isPresent()) {
            // 🔁 UPDATE MODE
            feedback = existingFeedback.get();
        } else {
            // 🆕 CREATE MODE
            feedback = new InterviewFeedback();
            feedback.setInterview(interview);
            feedback.setInterviewer(interviewer);
        }

        // COMMON FIELDS (both insert & update)
        feedback.setRating(request.getRating());
        feedback.setRecommendation(request.getRecommendation());
        feedback.setComments(request.getComments());

        feedbackRepository.save(feedback);

        // Only set these once (optional but clean)
        interview.setFeedbackSubmitted(true);
        interview.setDecisionStatus(DecisionStatus.PENDING_DECISION);
        interviewRepository.save(interview);
    }


    /**
     * Get feedback from previous rounds for the same candidate
     */
    @Transactional(readOnly = true)
    public List<InterviewFeedback> getPreviousRoundFeedback(Long interviewId) {
        Interview interview = interviewRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));

        return feedbackRepository.findByInterview_CandidateJobAndInterview_Round_RoundOrderLessThan(
                interview.getCandidateJob(),
                interview.getRound().getRoundOrder()

        );
    }

    /**
     * Get all feedback for a candidate
     */
    @Transactional(readOnly = true)
    public List<InterviewFeedback> getFeedbackForCandidate(Long candidateId) {
        return feedbackRepository.findByInterview_CandidateJob_Candidate_Id(candidateId);
    }

    /**
     * Get all feedback for a specific interview
     */
//    @Transactional(readOnly = true)
//    public List<InterviewFeedback> getFeedbackForInterview(Long interviewId) {
//        return feedbackRepository.findByInterview_Id(interviewId);
//    }

    /**
     * Get pending feedback for a specific interviewer
     * (interviews where this interviewer is assigned but feedback not yet submitted)
     */
//    @Transactional(readOnly = true)
//    public List<InterviewFeedback> getPendingFeedback(Long interviewerUserId) {
//        // Implemented using a custom repository method
//        return feedbackRepository.findPendingFeedbackByInterviewer(interviewerUserId);
//    }
}
