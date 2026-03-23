package com.kavyanjali.smartexpense.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kavyanjali.smartexpense.dto.BudgetRequestDto;
import com.kavyanjali.smartexpense.dto.BudgetResponseDto;
import com.kavyanjali.smartexpense.service.BudgetService;

import jakarta.validation.Valid;

/**
 * REST controller for monthly budget management.
 *
 * Handles:
 *  - Budget creation / update
 *  - Budget retrieval
 *  - Spending status retrieval
 *
 * Authentication is enforced via JWT.
 */
@RestController
@RequestMapping("/budget")
public class BudgetController {

    private static final Logger logger =
            LoggerFactory.getLogger(BudgetController.class);

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    /**
     * Creates or updates the current month's budget.
     *
     * @param request budget request payload
     * @return updated budget response
     */
    @PostMapping
    public ResponseEntity<BudgetResponseDto> setBudget(
            @Valid @RequestBody BudgetRequestDto request) {

        String username = getAuthenticatedUsername();
        logger.info("Received budget set/update request from user: {}", username);

        BudgetResponseDto response =
                budgetService.setOrUpdateBudget(username, request);

        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves the current month's budget with full analysis.
     *
     * @return budget response
     */
    @GetMapping("/current")
    public ResponseEntity<BudgetResponseDto> getCurrentBudget() {

        String username = getAuthenticatedUsername();
        logger.info("Fetching current budget for user: {}", username);

        BudgetResponseDto response =
                budgetService.getCurrentBudget(username);

        return ResponseEntity.ok(response);
    }

    /**
     * Retrieves only the spending status (SAFE / WARNING / EXCEEDED)
     * for the current month.
     *
     * @return budget response (status field is primary)
     */
    @GetMapping("/status")
    public ResponseEntity<BudgetResponseDto> getSpendingStatus() {

        String username = getAuthenticatedUsername();
        logger.info("Fetching budget status for user: {}", username);

        BudgetResponseDto response =
                budgetService.getSpendingStatus(username);

        return ResponseEntity.ok(response);
    }

    /**
     * Extracts authenticated username from Spring Security context.
     */
    private String getAuthenticatedUsername() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}
