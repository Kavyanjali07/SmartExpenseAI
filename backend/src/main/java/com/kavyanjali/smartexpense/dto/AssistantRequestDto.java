package com.kavyanjali.smartexpense.dto;

import jakarta.validation.constraints.*;

public class AssistantRequestDto {

    @NotBlank(message = "Question cannot be empty")
    @Size(max = 500, message = "Question too long")
    private String question;

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}