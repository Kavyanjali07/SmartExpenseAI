"use client";

import { useEffect, useState } from "react";

interface BudgetProgressProps {
  spent: number;
  budget: number;
  category?: string;
}

export default function BudgetProgress({
  spent,
  budget,
  category = "Overall",
}: BudgetProgressProps) {
  const [displaySpent, setDisplaySpent] = useState(0);
  const percentage = Math.min((spent / budget) * 100, 100);
  const remaining = Math.max(budget - spent, 0);

  useEffect(() => {
    const duration = 1500;
    const steps = 50;
    const stepValue = spent / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplaySpent(Math.floor(stepValue * currentStep));

      if (currentStep >= steps) {
        setDisplaySpent(spent);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [spent]);

  const getStatusColor = () => {
    if (percentage >= 100) return "from-red-500 to-red-600";
    if (percentage >= 80) return "from-orange-500 to-orange-600";
    if (percentage >= 50) return "from-yellow-500 to-yellow-600";
    return "from-green-500 to-green-600";
  };

  const getStatusText = () => {
    if (percentage >= 100) return "Over Budget";
    if (percentage >= 80) return "High Spending";
    if (percentage >= 50) return "Moderate Spending";
    return "Good Spending";
  };

  return (
    <div className="glass-card p-6 space-y-4 border border-cyan-400/20">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            {category} Budget
          </p>
          <p className="text-2xl font-bold gradient-text mt-2">₹{budget}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getStatusColor()} text-white`}
        >
          {getStatusText()}
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="space-y-2">
        <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`absolute h-full bg-gradient-to-r ${getStatusColor()} rounded-full transition-all duration-1500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
          <div
            className={`absolute h-full border-r-2 border-white/30`}
            style={{ left: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Stats Row */}
        <div className="flex justify-between text-xs">
          <span className="text-cyan-300 font-semibold">
            Spent: ₹{displaySpent.toLocaleString()}
          </span>
          <span className="text-gray-400">{percentage.toFixed(1)}%</span>
          <span className="text-green-300 font-semibold">
            Left: ₹{remaining.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Visual Breakdown */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-cyan-400/10">
        <div className="text-center">
          <p className="text-2xl font-bold text-cyan-300">
            {percentage.toFixed(0)}%
          </p>
          <p className="text-xs text-gray-400">Used</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-300">
            {(100 - percentage).toFixed(0)}%
          </p>
          <p className="text-xs text-gray-400">Remaining</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-magenta-300">₹{budget}</p>
          <p className="text-xs text-gray-400">Total</p>
        </div>
      </div>
    </div>
  );
}
