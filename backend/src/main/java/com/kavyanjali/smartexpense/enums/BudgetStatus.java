package com.kavyanjali.smartexpense.enums;

/**
 * Represents the spending status of a user's monthly budget.
 *
 * Thresholds:
 *   SAFE     → spent < 80% of budget
 *   WARNING  → spent >= 80% and <= 100% of budget
 *   EXCEEDED → spent > 100% of budget
 */
public enum BudgetStatus {
    SAFE,
    WARNING,
    EXCEEDED
}