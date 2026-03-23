package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.*;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class FinancialHealthService {

    private final AnalyticsService analyticsService;
    private final BudgetService budgetService;

    public FinancialHealthService(
            AnalyticsService analyticsService,
            BudgetService budgetService) {

        this.analyticsService = analyticsService;
        this.budgetService = budgetService;
    }

    public FinancialHealthDto calculateScore(String username) {

        int score = 100;
        List<String> reasons = new ArrayList<>();

        CurrentMonthTotalDto current =
                analyticsService.getCurrentMonthTotal(username);

        BigDecimal monthlyLimit = BigDecimal.ZERO;

        try {
            var budget = budgetService.getCurrentBudget(username);
            monthlyLimit = budget.getMonthlyLimit();
        } catch (Exception ignored) {
            reasons.add("No monthly budget set");
        }

        if (monthlyLimit.compareTo(BigDecimal.ZERO) > 0) {

            if (current.getTotalAmount().compareTo(monthlyLimit) > 0) {
                score -= 40;
                reasons.add("You exceeded your monthly budget");
            } else {
                reasons.add("You are within your monthly budget");
            }
        }

        List<CategoryBreakdownDto> categories =
                analyticsService.getCategoryBreakdown(username);

        if (!categories.isEmpty() && current.getTotalAmount().compareTo(BigDecimal.ZERO) > 0) {

            BigDecimal topCategoryAmount = categories.get(0).getTotalAmount();

            if (topCategoryAmount.compareTo(
                    current.getTotalAmount().multiply(BigDecimal.valueOf(0.6))) > 0) {

                score -= 20;
                reasons.add("Spending heavily concentrated in one category");
            } else {
                reasons.add("Spending distribution is balanced");
            }
        }

        List<MonthlySummaryDto> monthly =
                analyticsService.getMonthlySummary(username);

        if (monthly.size() >= 2) {

            MonthlySummaryDto last = monthly.get(monthly.size() - 1);
            MonthlySummaryDto previous = monthly.get(monthly.size() - 2);

            if (last.getTotalAmount().compareTo(previous.getTotalAmount()) > 0) {
                score -= 10;
                reasons.add("Spending increased compared to last month");
            } else {
                reasons.add("Spending decreased compared to last month");
            }
        }

        String status;

        if (score >= 80) {
            status = "GOOD";
        } else if (score >= 60) {
            status = "MODERATE";
        } else {
            status = "POOR";
        }

        return new FinancialHealthDto(score, status, reasons);
    }
}