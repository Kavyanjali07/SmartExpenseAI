package com.kavyanjali.smartexpense.dto;

import java.util.List;

public class FinancialHealthDto {

    private int score;
    private String status;
    private List<String> reasons;

    public FinancialHealthDto(int score, String status, List<String> reasons) {
        this.score = score;
        this.status = status;
        this.reasons = reasons;
    }

    public int getScore() {
        return score;
    }

    public String getStatus() {
        return status;
    }

    public List<String> getReasons() {
        return reasons;
    }
}