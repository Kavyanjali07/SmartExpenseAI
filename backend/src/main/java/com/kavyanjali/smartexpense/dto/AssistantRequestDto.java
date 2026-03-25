package com.kavyanjali.smartexpense.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

public class AssistantRequestDto {

    @NotBlank(message = "Question cannot be empty")
    @Size(max = 500, message = "Question too long")
    private String question;

    public AssistantRequestDto() {}

    @JsonProperty("query")
    public void setQuery(String query) {
        this.question = query;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}