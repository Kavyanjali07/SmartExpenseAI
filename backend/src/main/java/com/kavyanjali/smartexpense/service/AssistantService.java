package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssistantService {

    private final AnalyticsService analyticsService;
    private final BudgetService budgetService;
    private final QueryService queryService;

    public AssistantService(
            AnalyticsService analyticsService,
            BudgetService budgetService,
            QueryService queryService) {

        this.analyticsService = analyticsService;
        this.budgetService = budgetService;
        this.queryService = queryService;
    }

    public String answerQuestion(String username, String question) {

        String q = question.toLowerCase();

        if (q.contains("how much") && q.contains("spend")) {

            CurrentMonthTotalDto total =
                    analyticsService.getCurrentMonthTotal(username);

            return "You spent ₹" + total.getTotalAmount() +
                    " in " + total.getMonth() + ".";
        }

        if (q.contains("highest") && q.contains("category")) {

            List<CategoryBreakdownDto> categories =
                    analyticsService.getCategoryBreakdown(username);

            if (!categories.isEmpty()) {

                CategoryBreakdownDto top = categories.get(0);

                return "Your highest spending category is " +
                        top.getCategory() +
                        " with ₹" +
                        top.getTotalAmount();
            }

            return "You have no expenses yet.";
        }

        if (q.contains("budget")) {

            var budget = budgetService.getCurrentBudget(username);

            return "You have ₹" + budget.getRemaining() +
                    " remaining in your monthly budget.";
        }

        return "I couldn't understand the question. Try asking about spending, categories, or budget.";
    }

    /**
     * Process query with AI-enhanced prompt building from insights
     */
    public String processAIQuery(String username, String query) {
        return queryService.processQuery(query, username);
    }
}