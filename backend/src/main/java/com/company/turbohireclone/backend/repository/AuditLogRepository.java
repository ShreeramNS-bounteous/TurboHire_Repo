package com.company.turbohireclone.backend.repository;

import com.company.turbohireclone.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {}
