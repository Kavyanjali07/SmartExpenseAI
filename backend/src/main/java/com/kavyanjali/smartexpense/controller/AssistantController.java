package com.kavyanjali.smartexpense.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kavyanjali.smartexpense.dto.AssistantRequestDto;
import com.kavyanjali.smartexpense.dto.AssistantResponseDto;
import com.kavyanjali.smartexpense.service.AssistantService;

@RestController
@RequestMapping("/assistant")
public class AssistantController {

    private final AssistantService assistantService;

    public AssistantController(AssistantService assistantService) {
        this.assistantService = assistantService;
    }

    @PostMapping("/ask")
    public AssistantResponseDto ask(
            Authentication authentication,
            @RequestBody AssistantRequestDto request) {

        String username = authentication.getName();

        String answer =
                assistantService.answerQuestion(username, request.getQuestion());

        return new AssistantResponseDto(answer);
    }

    @PostMapping("/query")
    public AssistantResponseDto query(
            Authentication authentication,
            @RequestBody AssistantRequestDto request) {

        String username = authentication.getName();

        String response =
                assistantService.processAIQuery(username, request.getQuestion());

        return new AssistantResponseDto(response);
    }
}