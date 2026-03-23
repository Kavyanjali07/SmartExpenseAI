package com.kavyanjali.smartexpense.dto;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public class BudgetRequestDto {

    @Min(value = 2000, message = "Budget must be at least 2000")
    private int year;

    @Min(value = 1, message = "Month must be between 1 and 12")
    @Max(value = 12, message = "Month must be between 1 and 12")
    private int month;

    @NotNull(message = "Monthly limit is required")
    @Positive(message = "Monthly limit must be positive")
    private BigDecimal monthlyLimit;

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
}