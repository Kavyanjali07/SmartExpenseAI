package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.FinancialHealthDto;
import com.kavyanjali.smartexpense.service.DevUserService;
import com.kavyanjali.smartexpense.service.FinancialHealthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/financial-health")
public class FinancialHealthController {

    private final FinancialHealthService financialHealthService;

    private final DevUserService devUserService;

    public FinancialHealthController(FinancialHealthService financialHealthService,
                                    DevUserService devUserService) {
        this.financialHealthService = financialHealthService;
        this.devUserService = devUserService;
    }

    @GetMapping
    public FinancialHealthDto getHealth() {

        String username = devUserService.getDevUser().getUsername();

        return financialHealthService.calculateScore(username);
    }
}