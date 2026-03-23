package com.kavyanjali.smartexpense.service.insight.analyzer;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.dto.MonthlySummaryDto;
import com.kavyanjali.smartexpense.service.AnalyticsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Analyzes spending trends and provides trend-based insights.
 */
@Component
public class TrendAnalyzer {

    private static final Logger logger = LoggerFactory.getLogger(TrendAnalyzer.class);

    private final AnalyticsService analyticsService;

    public TrendAnalyzer(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    public List<InsightDto> analyze(String username) {
        logger.info("Analyzing spending trends for user: {}", username);
        List<InsightDto> insights = new ArrayList<>();

        try {
            addSpendingTrendInsight(username, insights);
            addSpendingAdvice(username, insights);
        } catch (Exception e) {
            logger.error("Error analyzing trends for user: {}", username, e);
        }

        return insights;
    }

    private void addSpendingTrendInsight(String username, List<InsightDto> insights) {
        try {
            List<MonthlySummaryDto> monthlySummary = analyticsService.getMonthlySummary(username);

            if (monthlySummary == null || monthlySummary.size() < 2) {
                return;
            }

            MonthlySummaryDto latest = monthlySummary.get(monthlySummary.size() - 1);
            MonthlySummaryDto previous = monthlySummary.get(monthlySummary.size() - 2);

            if (latest.getTotalAmount() != null && previous.getTotalAmount() != null) {
                BigDecimal difference = latest.getTotalAmount().subtract(previous.getTotalAmount());
                String trend = difference.compareTo(BigDecimal.ZERO) > 0
                        ? "increased"
                        : "decreased";

                insights.add(new InsightDto(
                        "spending_trend",
                        "Your spending " + trend + " by " +
                                difference.abs() + " compared to last month"
                ));
            }
        } catch (Exception e) {
            logger.debug("Could not fetch monthly summary: {}", e.getMessage());
        }
    }

    private void addSpendingAdvice(String username, List<InsightDto> insights) {
        try {
            var currentMonth = analyticsService.getCurrentMonthTotal(username);

            if (currentMonth != null && currentMonth.getTotalAmount() != null) {
                if (currentMonth.getTotalAmount().compareTo(new BigDecimal("1000")) > 0) {
                    insights.add(new InsightDto(
                            "spending_advice",
                            "Consider reviewing your spending as it's higher than usual"
                    ));
                }
            }
        } catch (Exception e) {
            logger.debug("Could not fetch spending data for advice: {}", e.getMessage());
        }
    }
}
