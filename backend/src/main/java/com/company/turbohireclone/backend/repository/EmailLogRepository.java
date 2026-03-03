package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {
}