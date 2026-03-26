package com.kavyanjali.smartexpense.controller;

import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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

        String username = getAuthenticatedUsername(authentication);

        String answer =
                assistantService.answerQuestion(username, request.getQuestion());

        return new AssistantResponseDto(answer);
    }

    @PostMapping("/query")
    public AssistantResponseDto query(
            Authentication authentication,
            @RequestBody AssistantRequestDto request) {

        String username = getAuthenticatedUsername(authentication);

        String response =
                assistantService.processAIQuery(username, request.getQuestion());

        return new AssistantResponseDto(response);
    }

    private String getAuthenticatedUsername(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return authentication.getName();
    }
}
