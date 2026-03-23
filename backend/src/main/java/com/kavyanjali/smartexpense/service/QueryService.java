package com.kavyanjali.smartexpense.service;

import com.kavyanjali.smartexpense.dto.InsightDto;
import com.kavyanjali.smartexpense.service.insight.InsightOrchestratorService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueryService {

    private final InsightOrchestratorService insightOrchestratorService;

    public QueryService(InsightOrchestratorService insightOrchestratorService) {
        this.insightOrchestratorService = insightOrchestratorService;
    }

    /**
     * Format insights to readable text format
     */
    public String formatInsights(List<InsightDto> insights) {
        return insights.stream()
                .map(i -> "- " + i.getMessage())
                .collect(Collectors.joining("\n"));
    }

    /**
     * Build prompt for AI assistant with user query and financial data
     */
    public String buildPrompt(String query, String insightsText) {
        return """
You are a financial assistant.

Rules:
- Use only given data
- Be clear and concise
- Mention numbers
- No generic advice

User Query:
%s

Financial Data:
%s

Explain clearly.
""".formatted(query, insightsText);
    }

    /**
     * Process user query by combining insights and building prompt
     */
    public String processQuery(String query, String username) {
        // Step 1: Get insights
        List<InsightDto> insights =
                insightOrchestratorService.generateInsights(username);

        // Step 2: Convert insights to text
        String insightsText = formatInsights(insights);

        // Step 3: Build prompt
        String prompt = buildPrompt(query, insightsText);

        // For now, return the prompt to test
        return prompt;
    }
}
