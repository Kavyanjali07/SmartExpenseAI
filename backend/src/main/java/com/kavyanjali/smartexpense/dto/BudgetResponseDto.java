package com.kavyanjali.smartexpense.dto;

import com.kavyanjali.smartexpense.enums.BudgetStatus;

import java.math.BigDecimal;

/**
 * Response DTO representing a user's monthly budget analysis.
 *
 * Contains:
 *  - Configured monthly limit
 *  - Total spent amount
 *  - Remaining amount
 *  - Percentage consumed
 *  - Budget status (SAFE / WARNING / EXCEEDED)
 */
public class BudgetResponseDto {

    private int year;
    private int month;

    private BigDecimal monthlyLimit;
    private BigDecimal totalSpent;
    private BigDecimal remaining;
    private BigDecimal spentPercentage;

    private BudgetStatus status;

    public BudgetResponseDto() {
    }

    public BudgetResponseDto(
            int year,
            int month,
            BigDecimal monthlyLimit,
            BigDecimal totalSpent,
            BigDecimal remaining,
            BigDecimal spentPercentage,
            BudgetStatus status) {

        this.year = year;
        this.month = month;
        this.monthlyLimit = monthlyLimit;
        this.totalSpent = totalSpent;
        this.remaining = remaining;
        this.spentPercentage = spentPercentage;
        this.status = status;
    }

    // ---------------- Getters & Setters ----------------

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public BigDecimal getMonthlyLimit() {
        return monthlyLimit;
    }

    public void setMonthlyLimit(BigDecimal monthlyLimit) {
        this.monthlyLimit = monthlyLimit;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }

    public BigDecimal getRemaining() {
        return remaining;
    }

    public void setRemaining(BigDecimal remaining) {
        this.remaining = remaining;
    }

    public BigDecimal getSpentPercentage() {
        return spentPercentage;
    }

    public void setSpentPercentage(BigDecimal spentPercentage) {
        this.spentPercentage = spentPercentage;
    }

    public BudgetStatus getStatus() {
        return status;
    }

    public void setStatus(BudgetStatus status) {
        this.status = status;
    }
}
