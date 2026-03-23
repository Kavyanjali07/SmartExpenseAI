package com.kavyanjali.smartexpense.dto;

import java.util.ArrayList;
import java.util.List;

public class CsvImportResponse {

    private int totalRows;
    private int insertedRows;
    private int skippedRows;
    private List<String> errors;

    public CsvImportResponse() {
        this.errors = new ArrayList<>();
    }

    public CsvImportResponse(int totalRows, int insertedRows, int skippedRows) {
        this.totalRows = totalRows;
        this.insertedRows = insertedRows;
        this.skippedRows = skippedRows;
        this.errors = new ArrayList<>();
    }

    // Getters and Setters
    public int getTotalRows() {
        return totalRows;
    }

    public void setTotalRows(int totalRows) {
        this.totalRows = totalRows;
    }

    public int getInsertedRows() {
        return insertedRows;
    }

    public void setInsertedRows(int insertedRows) {
        this.insertedRows = insertedRows;
    }

    public int getSkippedRows() {
        return skippedRows;
    }

    public void setSkippedRows(int skippedRows) {
        this.skippedRows = skippedRows;
    }

    public List<String> getErrors() {
        return errors;
    }

    public void setErrors(List<String> errors) {
        this.errors = errors;
    }

    public void addError(String error) {
        this.errors.add(error);
    }
}