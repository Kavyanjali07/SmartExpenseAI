package com.kavyanjali.smartexpense.service.insight.analyzer;

import com.kavyanjali.smartexpense.dto.CategoryBreakdownDto;
import com.kavyanjali.smartexpense.dto.CurrentMonthTotalDto;
import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.AnalyticsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Analyzes current month spending and top categories.
 */
@Component
public class SpendingAnalyzer {

    private static final Logger logger = LoggerFactory.getLogger(SpendingAnalyzer.class);

    private final AnalyticsService analyticsService;

    public SpendingAnalyzer(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    public List<InsightDto> analyze(String username) {
        logger.info("Analyzing spending patterns for user: {}", username);
        List<InsightDto> insights = new ArrayList<>();

        try {
            addMonthlySpendingInsight(username, insights);
            addTopCategoryInsight(username, insights);
        } catch (Exception e) {
            logger.error("Error analyzing spending for user: {}", username, e);
        }

        return insights;
    }

    private void addMonthlySpendingInsight(String username, List<InsightDto> insights) {
        try {
            CurrentMonthTotalDto currentMonth = analyticsService.getCurrentMonthTotal(username);

            if (currentMonth == null) {
                return;
            }

            if (currentMonth.getTotalAmount() != null) {
                insights.add(new InsightDto(
                        "spending_summary",
                        "You've spent " + currentMonth.getTotalAmount()
                                + " this month with " + currentMonth.getExpenseCount() + " expenses"
                ));
            }
        } catch (Exception e) {
            logger.debug("Could not fetch monthly spending: {}", e.getMessage());
        }
    }

    private void addTopCategoryInsight(String username, List<InsightDto> insights) {
        try {
            List<CategoryBreakdownDto> categoryBreakdown = analyticsService.getCategoryBreakdown(username);

            if (categoryBreakdown == null || categoryBreakdown.isEmpty()) {
                return;
            }

            CategoryBreakdownDto topCategory = categoryBreakdown.get(0);
            insights.add(new InsightDto(
                    "top_category",
                    "Your top spending category is \"" + topCategory.getCategory()
                            + "\" with " + topCategory.getTotalAmount()
            ));
        } catch (Exception e) {
            logger.debug("Could not fetch category breakdown: {}", e.getMessage());
        }
    }
}
