package com.company.turbohireclone.backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "email_logs")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipientEmail;

    private String subject;

    private String status; // SENT / FAILED

    private LocalDateTime createdAt;

    private String errorMessage;
}