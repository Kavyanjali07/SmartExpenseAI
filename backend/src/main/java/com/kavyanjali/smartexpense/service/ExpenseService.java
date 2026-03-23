package com.kavyanjali.smartexpense.service;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.kavyanjali.smartexpense.exception.ResourceNotFoundException;
import com.kavyanjali.smartexpense.exception.UnauthorizedOperationException;
import com.kavyanjali.smartexpense.model.Expense;
import com.kavyanjali.smartexpense.model.User;
import com.kavyanjali.smartexpense.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private static final Logger logger =
            LoggerFactory.getLogger(ExpenseService.class);

    private final ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    /**
     * Creates a new expense for a user.
     */
    @Transactional
    public Expense createExpense(Expense expense, User user) {

        logger.info("Creating expense for user: {}", user.getUsername());

        // Normalize category to avoid dupli
        // cates like Food/food/FOOD
        if (expense.getCategory() != null) {
            expense.setCategory(
                expense.getCategory().substring(0,1).toUpperCase() +
                expense.getCategory().substring(1).toLowerCase()
            );
        }
        if (expense.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Expense amount must be positive");
        }

        // Associate expense with user
        expense.setUser(user);

        Expense savedExpense = expenseRepository.save(expense);

        logger.info("Expense created successfully with ID: {}", savedExpense.getId());

        return savedExpense;
    }

    /**
     * Retrieves all expenses for a user.
     */
    public List<Expense> getExpensesByUser(User user) {

        logger.debug("Fetching expenses for user: {}", user.getUsername());

        return expenseRepository.findByUserId(user.getId());
    }

    /**
     * Retrieves paginated expenses for a user.
     */
    public Page<Expense> getExpensesByUser(User user, Pageable pageable) {

        logger.debug("Fetching paginated expenses for user: {}", user.getUsername());

        return expenseRepository.findByUserId(user.getId(), pageable);
    }

    /**
     * Deletes an expense if it belongs to the user.
     */
    @Transactional
    public void deleteExpense(Long expenseId, User user) {

        logger.info("Attempting to delete expense ID: {} for user: {}",
                expenseId, user.getUsername());

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Expense", "id", expenseId));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new UnauthorizedOperationException("delete", "expense");
        }

        expenseRepository.delete(expense);

        logger.info("Expense ID {} deleted successfully", expenseId);
    }
}