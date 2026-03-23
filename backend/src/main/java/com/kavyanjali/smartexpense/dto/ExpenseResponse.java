package com.kavyanjali.smartexpense.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kavyanjali.smartexpense.model.ExpenseSource;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


public class ExpenseResponse {

    private Long id;
    private BigDecimal amount;
    private String category;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expenseDate;
    private ExpenseSource sourceType;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    // Constructors
    public ExpenseResponse() {
    }

    public ExpenseResponse(Long id, BigDecimal amount, String category, String description,
                           LocalDate expenseDate, ExpenseSource sourceType, LocalDateTime createdAt) {
        this.id = id;
        this.amount = amount;
        this.category = category;
        this.description = description;
        this.expenseDate = expenseDate;
        this.sourceType = sourceType;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public ExpenseSource getSourceType() {
        return sourceType;
    }

    public void setSourceType(ExpenseSource sourceType) {
        this.sourceType = sourceType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}