package com.kavyanjali.smartexpense.controller;

import com.kavyanjali.smartexpense.dto.CategoryChartDto;
import com.kavyanjali.smartexpense.dto.DashboardSummaryDto;
import com.kavyanjali.smartexpense.dto.MonthlyTrendDto;
import com.kavyanjali.smartexpense.service.DashboardService;
import com.kavyanjali.smartexpense.service.DevUserService;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final DevUserService devUserService;

    public DashboardController(DashboardService dashboardService,
                            DevUserService devUserService) {
        this.dashboardService = dashboardService;
        this.devUserService = devUserService;
    }

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary() {

        String username = devUserService.getDevUser().getUsername();

        return dashboardService.getDashboardSummary(username);
    }


    @GetMapping("/monthly-trend")
    public List<MonthlyTrendDto> getMonthlyTrend() {

        String username = devUserService.getDevUser().getUsername();

        return dashboardService.getMonthlyTrend(username);
    }

    @GetMapping("/category-distribution")
    public List<CategoryChartDto> getCategoryDistribution() {

        String username = devUserService.getDevUser().getUsername();

        return dashboardService.getCategoryDistribution(username);
    }
}