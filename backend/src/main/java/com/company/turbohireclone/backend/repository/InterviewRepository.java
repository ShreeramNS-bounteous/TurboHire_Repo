package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.Interview;
import com.company.turbohireclone.backend.entity.CandidateJob;
import com.company.turbohireclone.backend.entity.JobRound;
import com.company.turbohireclone.backend.enums.AttendanceStatus;
import com.company.turbohireclone.backend.enums.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    boolean existsByCandidateJobAndRound(CandidateJob candidateJob, JobRound jobRound);

    List<Interview> findByCandidateJob_Candidate_Id(Long candidateId);

    List<Interview> findByCandidateJob_Job_Id(Long jobId);

    List<Interview> findByCandidateJob_Id(Long candidateJobId);

    boolean existsByCandidateJob_IdAndRound_RoundNameAndStatusIn(
            Long candidateJobId,
            String roundName,
            List<InterviewStatus> statuses
    );

    List<Interview> findByStatus(InterviewStatus status);

    long countByStatus(InterviewStatus status);

    long countByAttendanceStatus(AttendanceStatus attendanceStatus);

    @Query("""
SELECT r.roundOrder, r.roundName, COUNT(i)
FROM Interview i
JOIN i.round r
GROUP BY r.roundOrder, r.roundName
ORDER BY r.roundOrder
""")
    List<Object[]> countInterviewsByRoundOrder();



    @Query("""
        SELECT 
            YEAR(i.scheduledAt),
            MONTH(i.scheduledAt),
            COUNT(i)
        FROM Interview i
        WHERE i.scheduledAt IS NOT NULL
        GROUP BY YEAR(i.scheduledAt), MONTH(i.scheduledAt)
        ORDER BY YEAR(i.scheduledAt), MONTH(i.scheduledAt)
    """)
    List<Object[]> interviewsPerMonth();

    @Query("""
SELECT COUNT(c)
FROM CandidateJob c
WHERE c.status = 'IN_PROGRESS'
AND c.currentStage = 'SHORTLISTED'
AND NOT EXISTS (
    SELECT i FROM Interview i
    WHERE i.candidateJob = c
    AND i.round.roundOrder = 1
)
""")
    long countR1Pending();

}
