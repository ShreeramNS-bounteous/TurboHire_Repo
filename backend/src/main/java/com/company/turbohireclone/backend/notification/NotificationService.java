package com.company.turbohireclone.backend.notification;

import com.company.turbohireclone.backend.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final EmailService emailService;
    private final EmailTemplateBuilder templateBuilder;

    public void notifyRecruiterActivated(String fullName,
                                         String email,
                                         String tempPassword) {

        String html = templateBuilder.buildRecruiterActivationEmail(
                fullName,
                email,
                tempPassword
        );

        emailService.sendHtmlEmail(
                email,
                "Your Recruiter Access is Activated",
                html
        );
    }

    public void notifyCandidateShortlisted(
            String fullName,
            String email,
            String jobTitle,
            String portalUrl
    ) {
        String html = templateBuilder.buildShortlistedEmail(
                fullName,
                jobTitle,
                portalUrl
        );

        emailService.sendHtmlEmail(
                email,
                "You Have Been Shortlisted 🎉",
                html
        );
    }

    public void notifyCandidateInterviewScheduled(
            String fullName,
            String email,
            String roundName,
            String jobTitle,
            String dateTime,
            String portalUrl
    ) {

        String html = templateBuilder.buildCandidateInterviewScheduledEmail(
                fullName,
                roundName,
                jobTitle,
                dateTime,
                portalUrl
        );

        emailService.sendHtmlEmail(
                email,
                "Interview Scheduled - " + roundName,
                html
        );
    }

    public void notifyInterviewerInterviewScheduled(
            String interviewerName,
            String interviewerEmail,
            String candidateName,
            String jobTitle,
            String roundName,
            String dateTime,
            String interviewDetailUrl
    ) {

        String html = templateBuilder.buildInterviewerScheduledEmail(
                interviewerName,
                candidateName,
                jobTitle,
                roundName,
                dateTime,
                interviewDetailUrl
        );

        emailService.sendHtmlEmail(
                interviewerEmail,
                "New Interview Assigned",
                html
        );
    }

    public void notifyCandidateStageAdvanced(
            String candidateName,
            String candidateEmail,
            String jobTitle,
            String previousRound,
            String nextRound,
            String portalUrl
    ) {

        String html = templateBuilder.buildStageAdvancedEmail(
                candidateName,
                jobTitle,
                previousRound,
                nextRound,
                portalUrl
        );

        emailService.sendHtmlEmail(
                candidateEmail,
                "Congratulations! You're Moving to the Next Round 🚀",
                html
        );
    }

    public void notifyCandidateHired(
            String candidateName,
            String candidateEmail,
            String jobTitle,
            String portalUrl
    ) {

        String html = templateBuilder.buildCandidateHiredEmail(
                candidateName,
                jobTitle,
                portalUrl
        );

        emailService.sendHtmlEmail(
                candidateEmail,
                "🎉 Congratulations! You’ve Been Selected",
                html
        );
    }

    public void notifyCandidateRejected(
            String candidateName,
            String candidateEmail,
            String jobTitle,
            String portalUrl
    ) {

        String html = templateBuilder.buildCandidateRejectedEmail(
                candidateName,
                jobTitle,
                portalUrl
        );

        emailService.sendHtmlEmail(
                candidateEmail,
                "Application Update – " + jobTitle,
                html
        );
    }
}
