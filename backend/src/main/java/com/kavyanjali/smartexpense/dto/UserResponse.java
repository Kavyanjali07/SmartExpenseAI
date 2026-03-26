package com.kavyanjali.smartexpense.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kavyanjali.smartexpense.model.RiskProfile;

import java.time.LocalDateTime;

public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String fullName;
    private RiskProfile riskProfile;
    private Double monthlyIncome;
    private Double monthlyBudget;
    private String primaryGoal;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    // Constructors
    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String username,
            String email,
            String fullName,
            RiskProfile riskProfile,
            Double monthlyIncome,
            Double monthlyBudget,
            String primaryGoal,
            LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.fullName = fullName;
        this.riskProfile = riskProfile;
        this.monthlyIncome = monthlyIncome;
        this.monthlyBudget = monthlyBudget;
        this.primaryGoal = primaryGoal;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public RiskProfile getRiskProfile() {
        return riskProfile;
    }

    public void setRiskProfile(RiskProfile riskProfile) {
        this.riskProfile = riskProfile;
    }

    public Double getMonthlyIncome() {
        return monthlyIncome;
    }

    public void setMonthlyIncome(Double monthlyIncome) {
        this.monthlyIncome = monthlyIncome;
    }

    public Double getMonthlyBudget() {
        return monthlyBudget;
    }

    public void setMonthlyBudget(Double monthlyBudget) {
        this.monthlyBudget = monthlyBudget;
    }

    public String getPrimaryGoal() {
        return primaryGoal;
    }

    public void setPrimaryGoal(String primaryGoal) {
        this.primaryGoal = primaryGoal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
