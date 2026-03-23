package com.kavyanjali.smartexpense.controller;
import com.kavyanjali.smartexpense.model.ExpenseSource;
import com.kavyanjali.smartexpense.dto.ExpenseRequestDto;
import com.kavyanjali.smartexpense.dto.ExpenseResponse;
import com.kavyanjali.smartexpense.model.Expense;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.service.ExpenseService;
import com.kavyanjali.smartexpense.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.bind.annotation.*;

import com.kavyanjali.smartexpense.service.DevUserService;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private static final Logger logger =
            LoggerFactory.getLogger(ExpenseController.class);

    private final ExpenseService expenseService;
    private final UserService userService;
    private final DevUserService devUserService;

    public ExpenseController(
            ExpenseService expenseService,
            UserService userService, DevUserService devUserService) {

        this.expenseService = expenseService;
        this.userService = userService;
        this.devUserService = devUserService;
    }

    /**
     * Create a new expense
     */
    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(
            @Valid @RequestBody ExpenseRequestDto request) {

        User user = getAuthenticatedUser();

        logger.info("Creating expense for user {}", user.getUsername());

        Expense expense = new Expense();
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setDescription(request.getDescription());
        expense.setExpenseDate(request.getExpenseDate());
        expense.setSourceType(ExpenseSource.MANUAL);

        Expense savedExpense =
                expenseService.createExpense(expense, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapToResponse(savedExpense));
    }

    /**
     * Get expenses with pagination
     */
    @GetMapping
        public ResponseEntity<List<ExpenseResponse>> getExpenses() {

        User user = devUserService.getDevUser();

        List<ExpenseResponse> responses =
                expenseService.getExpensesByUser(user)
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return ResponseEntity.ok(responses);
        }

    /**
     * Delete an expense
     */
    @DeleteMapping("/{expenseId}")
    public ResponseEntity<Void> deleteExpense(
            @PathVariable Long expenseId) {

        User user = getAuthenticatedUser();

        logger.info("Deleting expense {} for user {}", expenseId, user.getUsername());

        expenseService.deleteExpense(expenseId, user);

        return ResponseEntity.noContent().build();
    }

    /**
     * Extract authenticated user from security context
     */
    private User getAuthenticatedUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userService.getUserByUsername(authentication.getName());
    }

    /**
     * Convert entity to response DTO
     */
    private ExpenseResponse mapToResponse(Expense expense) {

        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getExpenseDate(),
                expense.getSourceType(),
                expense.getCreatedAt()
        );
    }
}