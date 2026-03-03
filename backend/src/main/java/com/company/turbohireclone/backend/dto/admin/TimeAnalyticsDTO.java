package com.company.turbohireclone.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeAnalyticsDTO {
    private List<MonthlyTrendPointDTO> hiresPerMonth;
    private List<MonthlyTrendPointDTO> candidatesPerMonth;
    private List<MonthlyTrendPointDTO> interviewsPerMonth;
}
