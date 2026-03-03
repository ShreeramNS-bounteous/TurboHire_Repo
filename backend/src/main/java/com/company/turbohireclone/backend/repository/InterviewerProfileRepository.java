package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.InterviewerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterviewerProfileRepository extends JpaRepository<InterviewerProfile,Long> {
    Optional<InterviewerProfile> findByUserId(Long userId);
    List<InterviewerProfile> findByUserIdIn(List<Long> userIds);

}
