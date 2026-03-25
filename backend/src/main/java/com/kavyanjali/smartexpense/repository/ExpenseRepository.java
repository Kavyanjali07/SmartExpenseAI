package com.kavyanjali.smartexpense.repository;

import com.kavyanjali.smartexpense.model.Expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Fetch all expenses for a user
    List<Expense> findByUserId(Long userId);

    // Fetch expenses sorted by date
    List<Expense> findByUserIdOrderByExpenseDateAsc(Long userId);

    // Pagination support
    Page<Expense> findByUserId(Long userId, Pageable pageable);

    // CSV deduplication (global)
    boolean existsBySourceReference(String sourceReference);

    // CSV deduplication (per user)
    boolean existsByUserIdAndSourceReference(Long userId, String sourceReference);

    // Find existing references in batch
    @Query("""
        SELECT e.sourceReference
        FROM Expense e
        WHERE e.sourceReference IN :refs
    """)
    List<String> findExistingSourceReferences(@Param("refs") List<String> refs);

    /*
     * Fetch all expenses for a user in a specific month
     * Used for insight engine (spike detection, AI analysis)
     */
    @Query(value = """
        SELECT e.* FROM expenses e
        JOIN users u ON e.user_id = u.id
        WHERE u.username = :username
        AND YEAR(e.expense_date) = :year
        AND MONTH(e.expense_date) = :month
    """, nativeQuery = true)
    List<Expense> findExpensesForMonth(
            @Param("username") String username,
            @Param("year") int year,
            @Param("month") int month
    );

    @Query("""
        SELECT e
        FROM Expense e
        WHERE e.user.username = :username
        AND e.expenseDate >= :startDate
    """)
    List<Expense> findRecentExpenses(
            @Param("username") String username,
            @Param("startDate") LocalDate startDate
    );

    /*
     * Sum of expenses for a user in a month
     * Used by analytics engine
     */
    @Query(value = """
        SELECT COALESCE(SUM(e.amount), 0)
        FROM expenses e
        WHERE e.user_id = :userId
        AND YEAR(e.expense_date) = :year
        AND MONTH(e.expense_date) = :month
    """, nativeQuery = true)
    BigDecimal sumAmountByUserIdAndYearAndMonth(
            @Param("userId") Long userId,
            @Param("year") int year,
            @Param("month") int month
    );
}