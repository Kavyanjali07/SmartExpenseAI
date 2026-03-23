package com.kavyanjali.smartexpense.dto;

import java.math.BigDecimal;

public class CategoryBreakdownDto {

    private String category;
    private BigDecimal totalAmount;
    private Long expenseCount;

    public CategoryBreakdownDto() {
    }

    public CategoryBreakdownDto(String category, BigDecimal totalAmount, Long expenseCount) {
        this.category = category;
        this.totalAmount = totalAmount;
        this.expenseCount = expenseCount;
    }

    // Getters and Setters
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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