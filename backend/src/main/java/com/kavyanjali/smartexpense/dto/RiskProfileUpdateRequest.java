package com.kavyanjali.smartexpense.dto;

import com.kavyanjali.smartexpense.model.RiskProfile;

import jakarta.validation.constraints.NotNull;

public class RiskProfileUpdateRequest {

    @NotNull(message = "Risk profile is required")
    private RiskProfile riskProfile;

    // Constructors
    public RiskProfileUpdateRequest() {
    }

    public RiskProfileUpdateRequest(RiskProfile riskProfile) {
        this.riskProfile = riskProfile;
    }

    // Getters and Setters
    public RiskProfile getRiskProfile() {
        return riskProfile;
    }

    public void setRiskProfile(RiskProfile riskProfile) {
        this.riskProfile = riskProfile;
    }
}