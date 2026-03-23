package com.kavyanjali.smartexpense.repository;

import com.kavyanjali.smartexpense.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {

    // Find a budget for a specific user and month
    Optional<Budget> findByUsernameAndYearAndMonth(String username, int year, int month);

    // Check if a budget exists for a user in a specific month
    boolean existsByUsernameAndYearAndMonth(String username, int year, int month);
}