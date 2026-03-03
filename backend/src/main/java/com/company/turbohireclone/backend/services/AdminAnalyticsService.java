package com.company.turbohireclone.backend.services;

import com.company.turbohireclone.backend.dto.admin.*;

public interface AdminAnalyticsService {

    AdminDashboardResponse getFullDashboard();

    HiringFunnelDTO getHiringFunnel();

    InterviewMetricsDTO getInterviewMetrics();

    TimeAnalyticsDTO getTimeAnalytics();
}