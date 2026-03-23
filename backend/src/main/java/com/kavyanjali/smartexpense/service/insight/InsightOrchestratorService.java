package com.kavyanjali.smartexpense.service.insight;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.insight.analyzer.BudgetAnalyzer;
import com.kavyanjali.smartexpense.service.insight.analyzer.RecurringAnalyzer;
import com.kavyanjali.smartexpense.service.insight.analyzer.SpendingAnalyzer;
import com.kavyanjali.smartexpense.service.insight.analyzer.TrendAnalyzer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Orchestrates insight generation by delegating to specialized analyzers.
 * Each analyzer is responsible for a specific aspect of financial analysis.
 */
@Service
public class InsightOrchestratorService {

    private static final Logger logger = LoggerFactory.getLogger(InsightOrchestratorService.class);

    private final SpendingAnalyzer spendingAnalyzer;
    private final BudgetAnalyzer budgetAnalyzer;
    private final TrendAnalyzer trendAnalyzer;
    private final RecurringAnalyzer recurringAnalyzer;

    public InsightOrchestratorService(
            SpendingAnalyzer spendingAnalyzer,
            BudgetAnalyzer budgetAnalyzer,
            TrendAnalyzer trendAnalyzer,
            RecurringAnalyzer recurringAnalyzer) {

        this.spendingAnalyzer = spendingAnalyzer;
        this.budgetAnalyzer = budgetAnalyzer;
        this.trendAnalyzer = trendAnalyzer;
        this.recurringAnalyzer = recurringAnalyzer;
    }

    /**
     * Generate comprehensive insights for a user by running all analyzers.
     *
     * @param username the username to generate insights for
     * @return list of insights from all analyzers
     */
    public List<InsightDto> generateInsights(String username) {
        logger.info("Generating insights for user: {}", username);
        List<InsightDto> insights = new ArrayList<>();

        try {
            insights.addAll(spendingAnalyzer.analyze(username));
            insights.addAll(budgetAnalyzer.analyze(username));
            insights.addAll(trendAnalyzer.analyze(username));
            insights.addAll(recurringAnalyzer.analyze(username));

            logger.info("Generated {} total insights for user: {}", insights.size(), username);
        } catch (Exception e) {
            logger.error("Error generating insights for user: {}", username, e);
            insights.add(new InsightDto(
                    "error",
                    "Unable to generate insights: " + e.getMessage()
            ));
        }

        return insights;
    }
}
