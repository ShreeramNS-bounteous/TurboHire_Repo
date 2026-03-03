package com.company.turbohireclone.backend.dto.admin;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalActiveJobs;
    private long totalPipeline;
    private long totalHired;
    private long totalRejected;

    private HiringFunnelDTO funnel;
    private InterviewMetricsDTO interviewMetrics;
    private TimeAnalyticsDTO timeAnalytics;

    private long r1Pending;

    // 🔥 NEW EXECUTIVE METRICS
    private double overallConversionRate;
    private long totalShortlisted;
    private double interviewsPerHire;
}