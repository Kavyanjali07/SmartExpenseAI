package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.insight.InsightOrchestratorService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/insights")
public class InsightController {

    private static final Logger logger =
            LoggerFactory.getLogger(InsightController.class);

    private final InsightOrchestratorService insightOrchestratorService;

    public InsightController(InsightOrchestratorService insightOrchestratorService) {
        this.insightOrchestratorService = insightOrchestratorService;
    }

    @GetMapping("/monthly")
    public ResponseEntity<List<InsightDto>> getInsights() {

        try {
            String username = getUsername();

            logger.info("Fetching insights for user: {}", username);

            List<InsightDto> insights = insightOrchestratorService.generateInsights(username);
            return ResponseEntity.ok(insights);
            
        } catch (Exception e) {
            logger.error("Error fetching insights", e);
            return ResponseEntity.status(500).body(null);
        }
    }

    private String getUsername() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        if (auth == null
                || auth.getName() == null
                || auth.getName().isBlank()
                || "anonymousUser".equals(auth.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }

        return auth.getName();
    }
}
