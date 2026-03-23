"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BubbleChart from "@/components/charts/BubbleChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import MonthlyTrendChart from "@/components/charts/MonthlyTrendChart";
import AIInsights from "@/components/insights/AIInsights";
import AnomaliesTimeline from "@/components/timeline/AnomaliesTimeline";
import AnimatedStatCard from "@/components/stats/AnimatedStatCard";
import {
  getDashboardSummary,
  getFinancialHealth,
  getMonthlyTrend,
  getCategoryDistribution,
  getInsights,
  getExpenses,
} from "@/services/api";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [summary, setSummary] = useState<any>(null);
  const [health, setHealth] = useState<any>(null);
  const [trend, setTrend] = useState([]);
  const [categories, setCategories] = useState([]);
  const [insights, setInsights] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [summaryData, healthData, trendData, categoryData, insightsData, expensesData] = await Promise.all([
        getDashboardSummary(),
        getFinancialHealth(),
        getMonthlyTrend(),
        getCategoryDistribution(),
        getInsights(),
        getExpenses(),
      ]);

      setSummary(summaryData);
      setHealth(healthData);
      setTrend(trendData);
      setCategories(categoryData);
      setInsights(insightsData);
      setExpenses(expensesData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Format insights for AI Insights component
  const aiInsightsData = insights.map((insight: any, idx: number) => {
    const types: Array<"alert" | "insight" | "optimization"> = ["alert", "insight", "optimization"];
    const severities: Array<"low" | "medium" | "high"> = ["high", "medium", "low"];
    
    return {
      id: `insight-${idx}`,
      type: types[idx % 3],
      title: insight.message?.split(".")[0] || "Financial Insight",
      description: insight.message || "",
      severity: severities[idx % 3],
    };
  });

  // Format timeline events
  const timelineEvents = expenses?.slice(0, 5).map((exp: any, idx: number) => {
    const types: Array<"anomaly" | "transaction" | "milestone"> = ["anomaly", "transaction", "milestone"];
    
    return {
      date: exp.expenseDate,
      title: `High Dining Expense (Aug ${13 + idx})`,
      description: `Detected a ${exp.category} expense of ₹${exp.amount}`,
      type: types[idx % 2] as "anomaly" | "transaction" | "milestone",
    };
  }) || [];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={28} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">SMART AI</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Personal Finance Assistant</p>
            <p className="text-cyan-300 font-semibold">Active Monitoring</p>
          </div>
        </div>

        {/* Main Content: Bubble Chart | AI Insights | Category Distribution */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Bubble Chart */}
          {categories.length > 0 && <BubbleChart data={categories} />}

          {/* Middle: AI Insights Column */}
          <div className="col-span-4 space-y-6">
            <div className="glass-card p-6 rounded-3xl">
              <h2 className="text-lg font-bold mb-4 gradient-text">AI Insights</h2>
              <AIInsights insights={aiInsightsData.slice(0, 3)} />
            </div>
          </div>

          {/* Right: Category Distribution */}
          {categories.length > 0 && (
            <div className="col-span-3">
              <h2 className="text-lg font-bold mb-4 gradient-text block">Category Distribution</h2>
              <CategoryPieChart data={categories} />
            </div>
          )}
        </div>

        {/* Bottom Section: Stats and Timeline */}
        <div className="grid grid-cols-12 gap-6">
          {/* Stats Row */}
          <div className="col-span-3 space-y-4">
            <div>
              <p className="text-gray-400 text-xs mb-2">Recurring Spending Identified</p>
              <p className="text-3xl font-bold text-cyan-300">
                ₹{summary?.totalSpent || 0}
              </p>
            </div>
          </div>

          {/* Category Overview Bar Chart */}
          {trend.length > 0 && (
            <div className="col-span-6">
              <MonthlyTrendChart data={trend} />
            </div>
          )}

          {/* Gems/Stats */}
          <div className="col-span-3 space-y-3">
            <div className="glass-card p-4 rounded-xl border border-cyan-400/20">
              <p className="text-gray-400 text-xs">Budget Optimization</p>
              <p className="text-2xl font-bold text-purple-300">
                {health?.score || 85}%
              </p>
            </div>
            <div className="glass-card p-4 rounded-xl border border-cyan-400/20">
              <p className="text-gray-400 text-xs">Remaining Budget</p>
              <p className="text-2xl font-bold text-green-300">
                ₹{summary?.budgetRemaining || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {timelineEvents.length > 0 && <AnomaliesTimeline events={timelineEvents} />}
      </div>
    </DashboardLayout>
  );
}