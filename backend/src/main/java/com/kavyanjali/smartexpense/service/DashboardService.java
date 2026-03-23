package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.*;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    private final AnalyticsService analyticsService;
    private final BudgetService budgetService;

    public DashboardService(
            AnalyticsService analyticsService,
            BudgetService budgetService) {

        this.analyticsService = analyticsService;
        this.budgetService = budgetService;
    }

    public DashboardSummaryDto getDashboardSummary(String username) {

        CurrentMonthTotalDto current =
                analyticsService.getCurrentMonthTotal(username);

        List<CategoryBreakdownDto> categories =
                analyticsService.getCategoryBreakdown(username);

        String topCategory = categories.isEmpty()
                ? "None"
                : categories.get(0).getCategory();

        BigDecimal remainingBudget = BigDecimal.ZERO;

        try {
            var budget = budgetService.getCurrentBudget(username);
            remainingBudget = budget.getRemaining();
        } catch (Exception ignored) {
            // No budget set → remaining stays 0
        }

        return new DashboardSummaryDto(
                current.getTotalAmount(),
                topCategory,
                remainingBudget,
                current.getExpenseCount()
        );
    }

    public List<MonthlyTrendDto> getMonthlyTrend(String username) {

        List<MonthlySummaryDto> summary =
                analyticsService.getMonthlySummary(username);

        return summary.stream()
                .map(s -> new MonthlyTrendDto(
                        s.getMonth(),
                        s.getTotalAmount()
                ))
                .toList();
    }

    public List<CategoryChartDto> getCategoryDistribution(String username) {

        List<CategoryBreakdownDto> categories =
                analyticsService.getCategoryBreakdown(username);

        return categories.stream()
                .map(c -> new CategoryChartDto(
                        c.getCategory(),
                        c.getTotalAmount()
                ))
                .toList();
    }
}