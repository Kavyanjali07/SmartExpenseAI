package com.kavyanjali.smartexpense.dto;

import java.util.List;

public class InsightResponseDto {

    private List<InsightDto> insights;

    public InsightResponseDto(List<InsightDto> insights) {
        this.insights = insights;
    }

    public List<InsightDto> getInsights() {
        return insights;
    }
}