package com.kavyanjali.smartexpense.service.ml;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PredictionService {

    public double predictNext(List<Double> monthlyTotals) {

        if (monthlyTotals == null || monthlyTotals.isEmpty()) {
            return 0;
        }

        if (monthlyTotals.size() < 2) {
            return monthlyTotals.get(0);
        }

        double latest = monthlyTotals.get(monthlyTotals.size() - 1);
        double previous = monthlyTotals.get(monthlyTotals.size() - 2);

        TrendModel trendModel = new TrendModel(previous, latest);
        return trendModel.predictNext();
    }
}
