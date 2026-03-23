package com.kavyanjali.smartexpense.service.insight.analyzer;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.BudgetService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Analyzes budget status and remaining balance.
 */
@Component
public class BudgetAnalyzer {

    private static final Logger logger = LoggerFactory.getLogger(BudgetAnalyzer.class);

    private final BudgetService budgetService;

    public BudgetAnalyzer(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    public List<InsightDto> analyze(String username) {
        logger.info("Analyzing budget for user: {}", username);
        List<InsightDto> insights = new ArrayList<>();

        try {
            var budget = budgetService.getCurrentBudget(username);

            if (budget != null && budget.getRemaining() != null) {
                BigDecimal remaining = budget.getRemaining();
                String budgetStatus = remaining.compareTo(BigDecimal.ZERO) > 0
                        ? "You have " + remaining + " remaining in your budget"
                        : "You have exceeded your budget by " + remaining.abs();

                insights.add(new InsightDto(
                        "budget_status",
                        budgetStatus
                ));
            }
        } catch (Exception e) {
            logger.debug("No budget set for user: {}", username);
        }

        return insights;
    }
}
