package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.CandidateJob;
import com.company.turbohireclone.backend.entity.InterviewFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewFeedbackRepository extends JpaRepository<InterviewFeedback, Long> {

    boolean existsByInterview_IdAndInterviewer_Id(Long interviewId, Long interviewerUserId);

    List<InterviewFeedback> findByInterview_CandidateJobAndInterview_Round_RoundOrderLessThan(
            CandidateJob candidateJob, Integer roundOrder);

    List<InterviewFeedback> findByInterview_CandidateJob_Candidate_Id(Long candidateId);

    Optional<InterviewFeedback> findByInterview_Id(Long interviewId);

    Optional<InterviewFeedback> findByInterview_IdAndInterviewer_Id(Long interviewId, Long interviewerId);



//    @Query("""
//            SELECT f FROM InterviewFeedback f
//            WHERE f.interviewer.id = :interviewerId
//            AND f.interview.status = 'SCHEDULED'
//            AND f.id IS NULL
//            """)
//    List<InterviewFeedback> findPendingFeedbackByInterviewer(Long interviewerId);
}
