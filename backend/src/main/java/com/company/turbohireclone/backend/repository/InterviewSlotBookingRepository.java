package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.InterviewSlotBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterviewSlotBookingRepository extends JpaRepository<InterviewSlotBooking,Long> {
    Optional<InterviewSlotBooking> findByInterviewId(Long interviewId);

}
