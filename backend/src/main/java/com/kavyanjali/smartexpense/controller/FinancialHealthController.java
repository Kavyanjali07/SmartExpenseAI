package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.FinancialHealthDto;
import com.kavyanjali.smartexpense.service.FinancialHealthService;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/financial-health")
public class FinancialHealthController {

    private final FinancialHealthService financialHealthService;

    public FinancialHealthController(FinancialHealthService financialHealthService) {
        this.financialHealthService = financialHealthService;
    }

    @GetMapping
    public FinancialHealthDto getHealth(Authentication authentication) {

        if (authentication == null
                || authentication.getName() == null
                || authentication.getName().isBlank()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        String username = authentication.getName();

        return financialHealthService.calculateScore(username);
    }
}
