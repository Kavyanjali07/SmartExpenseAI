package com.kavyanjali.smartexpense.service.insight.analyzer;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.dto.MonthlyTrendDto;
import com.kavyanjali.smartexpense.service.AnalyticsService;
import com.kavyanjali.smartexpense.service.ml.PredictionService;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PredictionAnalyzer {

    private final AnalyticsService analyticsService;
    private final PredictionService predictionService;

    public PredictionAnalyzer(
            AnalyticsService analyticsService,
            PredictionService predictionService) {

        this.analyticsService = analyticsService;
        this.predictionService = predictionService;
    }

    public List<InsightDto> analyze(String username) {

        List<MonthlyTrendDto> trend = analyticsService.getMonthlyTrend(username);

        List<Double> totals = trend.stream()
                .map(t -> t.getAmount().doubleValue())
                .toList();

        double prediction = predictionService.predictNext(totals);

        return List.of(
                new InsightDto(
                        "PREDICTION",
                        "You are likely to spend ₹" + (int) Math.round(prediction) + " next month"
                )
        );
    }
}
