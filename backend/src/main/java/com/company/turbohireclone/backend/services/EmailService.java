package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.entity.EmailLog;
import com.company.turbohireclone.backend.repository.EmailLogRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailLogRepository emailLogRepository;

    @Async
    public void sendHtmlEmail(String to, String subject, String htmlBody) {

        EmailLog log = EmailLog.builder()
                .recipientEmail(to)
                .subject(subject)
                .createdAt(LocalDateTime.now())
                .build();

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);

            mailSender.send(message);

            log.setStatus("SENT");

        } catch (Exception e) {

            log.setStatus("FAILED");
            log.setErrorMessage(e.getMessage());
        }

        emailLogRepository.save(log);
    }
}