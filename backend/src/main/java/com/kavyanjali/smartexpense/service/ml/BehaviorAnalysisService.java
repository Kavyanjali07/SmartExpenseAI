package com.kavyanjali.smartexpense.service.ml;

import org.springframework.stereotype.Service;

@Service
public class BehaviorAnalysisService {

    public UserBehaviorType classify(
            double totalSpending,
            double budget,
            boolean anomaly,
            double growthRate
    ) {

        if (totalSpending < budget * 0.6 && !anomaly) {
            return UserBehaviorType.SAVER;
        }

        if (totalSpending <= budget && growthRate < 0.1) {
            return UserBehaviorType.BALANCED;
        }

        if (totalSpending > budget && growthRate < 0.3) {
            return UserBehaviorType.SPENDER;
        }

        return UserBehaviorType.RISKY;
    }
}
