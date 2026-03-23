package com.kavyanjali.smartexpense.dto;

import java.math.BigDecimal;

public class MonthlySummaryDto {

    private String month;
    private BigDecimal totalAmount;
    private Long expenseCount;

    public MonthlySummaryDto() {
    }

    public MonthlySummaryDto(String month, BigDecimal totalAmount, Long expenseCount) {
        this.month = month;
        this.totalAmount = totalAmount;
        this.expenseCount = expenseCount;
    }

    public MonthlySummaryDto(int year, int month, BigDecimal totalAmount, Long expenseCount) {
        this.month = String.format("%04d-%02d", year, month);
        this.totalAmount = totalAmount;
        this.expenseCount = expenseCount;
    }

    // Getters and Setters
    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getExpenseCount() {
        return expenseCount;
    }

    public void setExpenseCount(Long expenseCount) {
        this.expenseCount = expenseCount;
    }
}