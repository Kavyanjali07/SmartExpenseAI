package com.kavyanjali.smartexpense.dto;

import java.math.BigDecimal;

public class DashboardSummaryDto {

    private BigDecimal totalSpent;
    private String topCategory;
    private BigDecimal budgetRemaining;
    private long expenseCount;

    public DashboardSummaryDto(
            BigDecimal totalSpent,
            String topCategory,
            BigDecimal budgetRemaining,
            long expenseCount) {

        this.totalSpent = totalSpent;
        this.topCategory = topCategory;
        this.budgetRemaining = budgetRemaining;
        this.expenseCount = expenseCount;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public String getTopCategory() {
        return topCategory;
    }

    public BigDecimal getBudgetRemaining() {
        return budgetRemaining;
    }

    public long getExpenseCount() {
        return expenseCount;
    }
}