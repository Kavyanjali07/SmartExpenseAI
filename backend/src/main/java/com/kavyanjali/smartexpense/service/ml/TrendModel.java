package com.kavyanjali.smartexpense.service.ml;

public class TrendModel {

    private final double previous;
    private final double latest;
    private final double trend;

    public TrendModel(double previous, double latest) {
        this.previous = previous;
        this.latest = latest;
        this.trend = latest - previous;
    }

    public double getPrevious() {
        return previous;
    }

    public double getLatest() {
        return latest;
    }

    public double getTrend() {
        return trend;
    }

    public double predictNext() {
        return latest + trend;
    }
}
