package com.kavyanjali.smartexpense.service.insight.analyzer;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.AnalyticsService;
import com.kavyanjali.smartexpense.service.BudgetService;
import com.kavyanjali.smartexpense.service.ml.BehaviorAnalysisService;
import com.kavyanjali.smartexpense.service.ml.UserBehaviorType;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BehaviorAnalyzer {

    private final AnalyticsService analyticsService;
    private final BudgetService budgetService;
    private final BehaviorAnalysisService behaviorService;

    public BehaviorAnalyzer(
            AnalyticsService analyticsService,
            BudgetService budgetService,
            BehaviorAnalysisService behaviorService
    ) {
        this.analyticsService = analyticsService;
        this.budgetService = budgetService;
        this.behaviorService = behaviorService;
    }

    public List<InsightDto> analyze(String username) {

        var current = analyticsService.getCurrentMonthTotal(username);
        double spending = current.getTotalAmount().doubleValue();

        double budget = 0;
        try {
            budget = budgetService.getCurrentBudget(username)
                    .getMonthlyLimit().doubleValue();
        } catch (Exception ignored) {
        }

        double growth = 0.2; // temporary baseline
        boolean anomaly = false; // temporary baseline

        UserBehaviorType type = behaviorService.classify(
                spending, budget, anomaly, growth
        );

        return List.of(
                new InsightDto(
                        "BEHAVIOR",
                        generateMessage(type)
                )
        );
    }

    private String generateMessage(UserBehaviorType type) {

        return switch (type) {
            case SAVER -> "You are a disciplined saver with controlled spending.";
            case BALANCED -> "Your spending is balanced and within control.";
            case SPENDER -> "You tend to overspend and should monitor your budget.";
            case RISKY -> "Your financial behavior is risky. Immediate control needed.";
        };
    }
}
