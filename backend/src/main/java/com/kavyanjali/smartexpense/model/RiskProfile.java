package com.kavyanjali.smartexpense.model;

public enum RiskProfile {
    CONSERVATIVE("Conservative - Prefers low risk, stable returns"),
    MODERATE("Moderate - Balanced approach to risk and returns"),
    AGGRESSIVE("Aggressive - High risk tolerance for higher potential returns");

    private final String description;

    RiskProfile(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static RiskProfile fromString(String value) {
        if (value == null) {
            return null;
        }
        
        for (RiskProfile profile : RiskProfile.values()) {
            if (profile.name().equalsIgnoreCase(value)) {
                return profile;
            }
        }
        
        throw new IllegalArgumentException("Invalid risk profile: " + value + 
            ". Valid values are: CONSERVATIVE, MODERATE, AGGRESSIVE");
    }
}