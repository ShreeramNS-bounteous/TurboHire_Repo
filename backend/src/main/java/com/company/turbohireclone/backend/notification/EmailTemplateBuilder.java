package com.company.turbohireclone.backend.notification;

import org.springframework.stereotype.Component;

@Component
public class EmailTemplateBuilder {

    public String buildRecruiterActivationEmail(String fullName,
                                                String email,
                                                String tempPassword) {

        return """
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color:#101828;">Recruiter Access Activated</h2>

                <p>Hi %s,</p>

                <p>Your role has been upgraded to <strong>Recruiter</strong>.</p>

                <div style="background:#f3f4f6;padding:15px;border-radius:8px;margin-top:15px;">
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Temporary Password:</strong> %s</p>
                </div>

                <p style="margin-top:20px;">
                    Please login and change your password immediately.
                </p>

                <a href="http://localhost:5173/login"
                   style="display:inline-block;
                          margin-top:15px;
                          padding:10px 20px;
                          background:#101828;
                          color:white;
                          text-decoration:none;
                          border-radius:6px;">
                    Login Now
                </a>

                <p style="margin-top:30px;font-size:12px;color:#666;">
                    Team BxA
                </p>
            </div>
            """.formatted(fullName, email, tempPassword);
    }

    public String buildShortlistedEmail(
            String fullName,
            String jobTitle,
            String portalUrl
    ) {
        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">🎉 Application Shortlisted</h2>

            <p>Hi %s,</p>

            <p>Congratulations! You have been shortlisted for the position of 
            <strong>%s</strong>.</p>

            <p>You can track your application progress using the candidate portal below:</p>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               View Candidate Portal
            </a>

            <p style="margin-top:25px;">
                We will notify you once the next stage is scheduled.
            </p>

            <p style="margin-top:30px;font-size:12px;color:#666;">
               Team BxA
            </p>
        </div>
    """.formatted(fullName, jobTitle, portalUrl);
    }

    public String buildCandidateInterviewScheduledEmail(
            String fullName,
            String roundName,
            String jobTitle,
            String dateTime,
            String portalUrl
    ) {
        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">Interview Scheduled</h2>

            <p>Hi %s,</p>

            <p>Your <strong>%s</strong> interview for the position 
            <strong>%s</strong> has been scheduled.</p>

            <p><strong>Date & Time:</strong> %s</p>

            <p>You can view details inside your portal:</p>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               View Candidate Portal
            </a>

            <p style="margin-top:25px;">
                Please be available 5 minutes before scheduled time.
            </p>

            <p style="margin-top:30px;font-size:12px;color:#666;">
                Team BxA
            </p>
        </div>
    """.formatted(fullName, roundName, jobTitle, dateTime, portalUrl);
    }

    public String buildInterviewerScheduledEmail(
            String interviewerName,
            String candidateName,
            String jobTitle,
            String roundName,
            String dateTime,
            String interviewDetailUrl
    ) {
        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">Interview Assigned</h2>

            <p>Hi %s,</p>

            <p>You have been assigned to conduct the 
            <strong>%s</strong> interview.</p>

            <div style="background:#f3f4f6;padding:15px;border-radius:8px;">
                <p><strong>Candidate:</strong> %s</p>
                <p><strong>Position:</strong> %s</p>
                <p><strong>Date & Time:</strong> %s</p>
            </div>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               View Interview Details
            </a>

            <p style="margin-top:30px;font-size:12px;color:#666;">
                Team BxA
            </p>
        </div>
    """.formatted(
                interviewerName,
                roundName,
                candidateName,
                jobTitle,
                dateTime,
                interviewDetailUrl
        );
    }

    public String buildStageAdvancedEmail(
            String candidateName,
            String jobTitle,
            String previousRound,
            String nextRound,
            String portalUrl
    ) {

        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">🚀 You're Moving Forward!</h2>

            <p>Hi %s,</p>

            <p>
                Congratulations! You have successfully cleared the
                <strong>%s</strong> for the position of
                <strong>%s</strong>.
            </p>

            <p>
                🎉 You are now progressing to the next stage:
                <strong>%s</strong>.
            </p>

            <p>
                Our recruitment team will schedule your next interview soon.
                You will receive another email with the details.
            </p>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               Track Your Application
            </a>

            <p style="margin-top:30px;font-size:12px;color:#666;">
                Team BxA
            </p>
        </div>
    """.formatted(
                candidateName,
                previousRound,
                jobTitle,
                nextRound,
                portalUrl
        );
    }

    public String buildCandidateHiredEmail(
            String candidateName,
            String jobTitle,
            String portalUrl
    ) {

        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">🎉 Congratulations!</h2>

            <p>Dear %s,</p>

            <p>
                We are delighted to inform you that you have been
                <strong>selected</strong> for the position of
                <strong>%s</strong>.
            </p>

            <p>
                Your performance throughout the interview process
                has been highly appreciated.
            </p>

            <p>
                Our HR team will contact you shortly with further
                onboarding details and next steps.
            </p>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               View Your Candidate Portal
            </a>

            <p style="margin-top:30px;">
                Welcome aboard! 🚀
            </p>

            <p style="margin-top:20px;font-size:12px;color:#666;">
                 Team BxA
            </p>
        </div>
    """.formatted(candidateName, jobTitle, portalUrl);
    }

    public String buildCandidateRejectedEmail(
            String candidateName,
            String jobTitle,
            String portalUrl
    ) {

        return """
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color:#101828;">Application Update</h2>

            <p>Dear %s,</p>

            <p>
                Thank you for taking the time to interview for the position of
                <strong>%s</strong>.
            </p>

            <p>
                After careful consideration, we regret to inform you that
                we will not be moving forward with your application at this time.
            </p>

            <p>
                We truly appreciate the effort you put into the process
                and encourage you to apply again in the future.
            </p>

            <a href="%s"
               style="display:inline-block;
                      margin-top:15px;
                      padding:10px 20px;
                      background:#101828;
                      color:white;
                      text-decoration:none;
                      border-radius:6px;">
               View Application Status
            </a>

            <p style="margin-top:30px;">
                We wish you all the best in your continued career journey.
            </p>

            <p style="margin-top:20px;font-size:12px;color:#666;">
                TurboHire Team
            </p>
        </div>
    """.formatted(candidateName, jobTitle, portalUrl);
    }


}