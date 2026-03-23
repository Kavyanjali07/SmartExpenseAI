package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.BudgetRequestDto;
import com.kavyanjali.smartexpense.dto.BudgetResponseDto;
import com.kavyanjali.smartexpense.enums.BudgetStatus;
import com.kavyanjali.smartexpense.model.Budget;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.BudgetRepository;
import com.kavyanjali.smartexpense.repository.ExpenseRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Service
public class BudgetService {

    private static final Logger log = LoggerFactory.getLogger(BudgetService.class);

    private static final BigDecimal EIGHTY_PERCENT = new BigDecimal("0.80");
    private static final BigDecimal HUNDRED_PERCENT = new BigDecimal("1.00");

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public BudgetService(
            BudgetRepository budgetRepository,
            ExpenseRepository expenseRepository,
            UserService userService) {

        this.budgetRepository = budgetRepository;
        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    @Transactional
    public BudgetResponseDto setOrUpdateBudget(String username, BudgetRequestDto requestDto) {

        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        log.info("Setting budget for user: {} | period: {}/{}", username, year, month);

        Budget budget = budgetRepository
                .findByUsernameAndYearAndMonth(username, year, month)
                .orElseGet(() -> {
                    Budget b = new Budget();
                    b.setUsername(username);
                    b.setYear(year);
                    b.setMonth(month);
                    return b;
                });

        budget.setMonthlyLimit(requestDto.getMonthlyLimit());
        budgetRepository.save(budget);

        return buildResponse(username, budget, year, month);
    }

    @Transactional(readOnly = true)
    public BudgetResponseDto getCurrentBudget(String username) {

        LocalDate now = LocalDate.now();
        int year = now.getYear();
        int month = now.getMonthValue();

        Budget budget = budgetRepository
                .findByUsernameAndYearAndMonth(username, year, month)
                .orElseThrow(() ->
                        new IllegalStateException("No budget set for current month.")
                );

        return buildResponse(username, budget, year, month);
    }

    private BudgetResponseDto buildResponse(
            String username,
            Budget budget,
            int year,
            int month) {

        User user = userService.getUserByUsername(username);

        BigDecimal totalSpent = expenseRepository
                .sumAmountByUserIdAndYearAndMonth(user.getId(), year, month);

        if (totalSpent == null) {
            totalSpent = BigDecimal.ZERO;
        }

        BigDecimal limit = budget.getMonthlyLimit();
        BigDecimal remaining = limit.subtract(totalSpent);
        BigDecimal percentage = computePercentage(totalSpent, limit);
        BudgetStatus status = computeStatus(percentage);

        return new BudgetResponseDto(
                year,
                month,
                limit,
                totalSpent,
                remaining,
                percentage,
                status
        );
    }

    private BigDecimal computePercentage(BigDecimal spent, BigDecimal limit) {

        if (limit.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return spent
                .divide(limit, 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
    }

    private BudgetStatus computeStatus(BigDecimal percentage) {

        BigDecimal ratio = percentage.divide(
                BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP);

        if (ratio.compareTo(EIGHTY_PERCENT) < 0) {
            return BudgetStatus.SAFE;
        } else if (ratio.compareTo(HUNDRED_PERCENT) <= 0) {
            return BudgetStatus.WARNING;
        } else {
            return BudgetStatus.EXCEEDED;
        }
    }

    public BudgetResponseDto getSpendingStatus(String username) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
}