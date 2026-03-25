package com.kavyanjali.smartexpense.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kavyanjali.smartexpense.dto.AssistantRequestDto;
import com.kavyanjali.smartexpense.dto.AssistantResponseDto;
import com.kavyanjali.smartexpense.service.AssistantService;
import com.kavyanjali.smartexpense.service.DevUserService;

@RestController
@RequestMapping("/assistant")
public class AssistantController {

    private final AssistantService assistantService;
    private final DevUserService devUserService;

    public AssistantController(
            AssistantService assistantService,
            DevUserService devUserService) {

        this.assistantService = assistantService;
        this.devUserService = devUserService;
    }

    @PostMapping("/ask")
    public AssistantResponseDto ask(
            Authentication authentication,
            @RequestBody AssistantRequestDto request) {

        String username = (authentication != null)
                ? authentication.getName()
                : devUserService.getDevUser().getUsername();

        String answer =
                assistantService.answerQuestion(username, request.getQuestion());

        return new AssistantResponseDto(answer);
    }

    @PostMapping("/query")
    public AssistantResponseDto query(
            Authentication authentication,
            @RequestBody AssistantRequestDto request) {

        String username = (authentication != null)
                ? authentication.getName()
                : devUserService.getDevUser().getUsername();

        String response =
                assistantService.processAIQuery(username, request.getQuestion());

        return new AssistantResponseDto(response);
    }
}