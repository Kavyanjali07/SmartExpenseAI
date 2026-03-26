package com.kavyanjali.smartexpense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public class ProfileUpdateRequest {

    @PositiveOrZero(message = "Income must be zero or positive")
    private Double income;

    @PositiveOrZero(message = "Budget must be zero or positive")
    private Double budget;

    @NotBlank(message = "Goal is required")
    private String goal;

    public ProfileUpdateRequest() {
    }

    public Double getIncome() {
        return income;
    }

    public void setIncome(Double income) {
        this.income = income;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }

    public String getGoal() {
        return goal;
    }

    public void setGoal(String goal) {
        this.goal = goal;
    }
}
