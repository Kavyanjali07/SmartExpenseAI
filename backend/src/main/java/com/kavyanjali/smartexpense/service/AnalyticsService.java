package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.CategoryBreakdownDto;
import com.kavyanjali.smartexpense.dto.CurrentMonthTotalDto;
import com.kavyanjali.smartexpense.dto.MonthlySummaryDto;
import com.kavyanjali.smartexpense.model.Expense;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.ExpenseRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class AnalyticsService {

    private static final Logger logger =
            LoggerFactory.getLogger(AnalyticsService.class);

    private final ExpenseRepository expenseRepository;
    private final UserService userService;

    public AnalyticsService(
            ExpenseRepository expenseRepository,
            UserService userService) {

        this.expenseRepository = expenseRepository;
        this.userService = userService;
    }

    /**
     * Monthly spending summary grouped by month.
     */
    @Transactional(readOnly = true)
    public List<MonthlySummaryDto> getMonthlySummary(String username) {

        logger.debug("Generating monthly summary for user: {}", username);

        User user = userService.getUserByUsername(username);

        List<Expense> expenses =
                expenseRepository.findByUserIdOrderByExpenseDateAsc(user.getId());

        Map<String, MonthlySummaryDto> summaryMap = new LinkedHashMap<>();

        for (Expense expense : expenses) {

            String monthKey = String.format(
                    "%04d-%02d",
                    expense.getExpenseDate().getYear(),
                    expense.getExpenseDate().getMonthValue()
            );

            summaryMap.computeIfAbsent(
                    monthKey,
                    k -> new MonthlySummaryDto(k, BigDecimal.ZERO, 0L)
            );

            MonthlySummaryDto dto = summaryMap.get(monthKey);

            dto.setTotalAmount(dto.getTotalAmount().add(expense.getAmount()));
            dto.setExpenseCount(dto.getExpenseCount() + 1);
        }

        return new ArrayList<>(summaryMap.values());
    }

    /**
     * Breakdown of spending by category for the current month.
     */
    @Transactional(readOnly = true)
    public List<CategoryBreakdownDto> getCategoryBreakdown(String username) {

        logger.debug("Generating category breakdown for user: {}", username);

        LocalDate now = LocalDate.now();

        List<Expense> expenses =
                expenseRepository.findExpensesForMonth(
                        username,
                        now.getYear(),
                        now.getMonthValue()
                );

        Map<String, CategoryBreakdownDto> categoryMap = new HashMap<>();

        for (Expense expense : expenses) {

            categoryMap.computeIfAbsent(
                    expense.getCategory(),
                    c -> new CategoryBreakdownDto(c, BigDecimal.ZERO, 0L)
            );

            CategoryBreakdownDto dto = categoryMap.get(expense.getCategory());

            dto.setTotalAmount(dto.getTotalAmount().add(expense.getAmount()));
            dto.setExpenseCount(dto.getExpenseCount() + 1);
        }

        return categoryMap.values()
                .stream()
                .sorted((a, b) -> b.getTotalAmount().compareTo(a.getTotalAmount()))
                .toList();
    }

    /**
     * Total spending for the current month.
     */
    @Transactional(readOnly = true)
    public CurrentMonthTotalDto getCurrentMonthTotal(String username) {

        logger.debug("Calculating current month total for user: {}", username);

        LocalDate now = LocalDate.now();

        List<Expense> expenses =
                expenseRepository.findExpensesForMonth(
                        username,
                        now.getYear(),
                        now.getMonthValue()
                );

        BigDecimal total = BigDecimal.ZERO;
        long count = 0;

        for (Expense expense : expenses) {
            total = total.add(expense.getAmount());
            count++;
        }

        String month =
                String.format("%04d-%02d", now.getYear(), now.getMonthValue());

        return new CurrentMonthTotalDto(month, total, count);
    }
}