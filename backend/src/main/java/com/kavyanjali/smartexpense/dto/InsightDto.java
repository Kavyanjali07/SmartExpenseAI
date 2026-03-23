package com.kavyanjali.smartexpense.dto;

public class InsightDto {

    private String type;
    private String message;

    public InsightDto(String type, String message) {
        this.type = type;
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public String getMessage() {
        return message;
    }
}