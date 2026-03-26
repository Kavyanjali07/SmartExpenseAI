package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.CategoryChartDto;
import com.kavyanjali.smartexpense.dto.DashboardSummaryDto;
import com.kavyanjali.smartexpense.dto.MonthlyTrendDto;
import com.kavyanjali.smartexpense.service.DashboardService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary(Authentication authentication) {

        String username = getAuthenticatedUsername(authentication);

        return dashboardService.getDashboardSummary(username);
    }


    @GetMapping("/monthly-trend")
    public List<MonthlyTrendDto> getMonthlyTrend(Authentication authentication) {

        String username = getAuthenticatedUsername(authentication);

        return dashboardService.getMonthlyTrend(username);
    }

    @GetMapping("/category-distribution")
    public List<CategoryChartDto> getCategoryDistribution(Authentication authentication) {

        String username = getAuthenticatedUsername(authentication);

        return dashboardService.getCategoryDistribution(username);
    }

    private String getAuthenticatedUsername(Authentication authentication) {
        if (authentication == null
                || authentication.getName() == null
                || authentication.getName().isBlank()
                || "anonymousUser".equals(authentication.getName())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
        }
        return authentication.getName();
    }
}
