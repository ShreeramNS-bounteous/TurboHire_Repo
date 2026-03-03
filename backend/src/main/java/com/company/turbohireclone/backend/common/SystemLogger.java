package com.company.turbohireclone.backend.common;

import com.company.turbohireclone.backend.entity.AuditLog;
import com.company.turbohireclone.backend.entity.HiringEvent;
import com.company.turbohireclone.backend.repository.AuditLogRepository;
import com.company.turbohireclone.backend.repository.HiringEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SystemLogger {

    private final AuditLogRepository auditLogRepository;
    private final HiringEventRepository hiringEventRepository;

    public void audit(
            Long actorUserId,
            String action,
            String entityType,
            Long entityId
    ) {
        AuditLog log = AuditLog.builder()
                .userId(actorUserId)
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .build();

        auditLogRepository.save(log);
    }

    public void hiringEvent(
            Long candidateId,
            Long jobId,
            Long buId,
            String eventType
    ) {
        HiringEvent event = HiringEvent.builder()
                .candidateId(candidateId)
                .jobId(jobId)
                .buId(buId)
                .eventType(eventType)
                .build();

        hiringEventRepository.save(event);
    }
}
