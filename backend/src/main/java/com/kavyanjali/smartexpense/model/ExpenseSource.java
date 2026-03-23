package com.kavyanjali.smartexpense.model;

public enum ExpenseSource {
    MANUAL("Manually entered by user"),
    CSV("Imported from CSV file"),
    API("Imported via external API integration");

    private final String description;

    ExpenseSource(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static ExpenseSource fromString(String value) {
        if (value == null) {
            return null;
        }
        
        for (ExpenseSource source : ExpenseSource.values()) {
            if (source.name().equalsIgnoreCase(value)) {
                return source;
            }
        }
        
        throw new IllegalArgumentException("Invalid expense source: " + value + 
            ". Valid values are: MANUAL, CSV, API");
    }
}