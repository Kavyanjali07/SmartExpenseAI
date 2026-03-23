package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.CategoryBreakdownDto;
import com.kavyanjali.smartexpense.dto.CurrentMonthTotalDto;
import com.kavyanjali.smartexpense.dto.MonthlySummaryDto;
import com.kavyanjali.smartexpense.service.AnalyticsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/analytics")
public class AnalyticsController {

    private static final Logger log =
            LoggerFactory.getLogger(AnalyticsController.class);

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    /**
     * Monthly spending summary
     */
    @GetMapping("/monthly")
    public ResponseEntity<List<MonthlySummaryDto>> getMonthlySummary() {

        String username = getUsername();

        log.info("Fetching monthly summary for user: {}", username);

        List<MonthlySummaryDto> response =
                analyticsService.getMonthlySummary(username);

        return ResponseEntity.ok(response);
    }

    /**
     * Category breakdown of expenses
     */
    @GetMapping("/categories")
    public ResponseEntity<List<CategoryBreakdownDto>> getCategoryBreakdown() {

        String username = getUsername();

        log.info("Fetching category breakdown for user: {}", username);

        List<CategoryBreakdownDto> response =
                analyticsService.getCategoryBreakdown(username);

        return ResponseEntity.ok(response);
    }

    /**
     * Current month total spending
     */
    @GetMapping("/current-month")
    public ResponseEntity<CurrentMonthTotalDto> getCurrentMonthTotal() {

        String username = getUsername();

        log.info("Fetching current month total for user: {}", username);

        CurrentMonthTotalDto response =
                analyticsService.getCurrentMonthTotal(username);

        return ResponseEntity.ok(response);
    }

    /**
     * Extract authenticated username from JWT security context
     */
    private String getUsername() {

        Authentication auth =
                SecurityContextHolder.getContext().getAuthentication();

        return auth.getName();
    }
}