package com.kavyanjali.smartexpense.dto;

import java.math.BigDecimal;

public class CategoryChartDto {

    private String category;
    private BigDecimal amount;

    public CategoryChartDto(String category, BigDecimal amount) {
        this.category = category;
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public BigDecimal getAmount() {
        return amount;
    }
}