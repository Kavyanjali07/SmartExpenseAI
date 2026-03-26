"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import BubbleChart from "@/components/charts/BubbleChart";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import MonthlyTrendChart from "@/components/charts/MonthlyTrendChart";
import AIInsights from "@/components/insights/AIInsights";
import AnomaliesTimeline from "@/components/timeline/AnomaliesTimeline";
import {
  getApiErrorMessage,
  getDashboardSummary,
  getMonthlyTrend,
  getCategoryDistribution,
  getInsights,
  type DashboardSummaryResponse,
  type Insight,
} from "@/services/api";

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const [sum, trend, dist, ins] = await Promise.all([
        getDashboardSummary(),
        getMonthlyTrend(),
        getCategoryDistribution(),
        getInsights(),
      ]);
      setSummary(sum);
      setMonthlyTrend(trend);
      setCategoryData(dist);
      setInsights(ins);
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load dashboard data."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const insightCards = insights.map((item, index) => {
    const type =
      item.message.toLowerCase().includes("anomaly")
        ? "alert"
        : index % 2 === 0
          ? "insight"
          : "optimization";
    return {
      id: String(index + 1),
      type,
      title: item.message.split(".")[0] || "Financial insight",
      description: item.message,
    };
  });

  const timelineEvents =
    insights.length > 0
      ? insights.slice(0, 6).map((item, index) => ({
          date: `Point ${index + 1}`,
          title: item.message.slice(0, 42),
          description: item.message,
          type: item.message.toLowerCase().includes("anomaly")
            ? ("anomaly" as const)
            : ("milestone" as const),
        }))
      : [
          {
            date: "Start",
            title: "Add your first expenses to view trend events",
            type: "milestone" as const,
          },
        ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center text-white tracking-wide">
            Financial Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-5 border border-white/10">
            <p className="text-xs text-gray-400">This Month Spend</p>
            <p className="text-2xl font-bold text-white mt-1">
              ₹{summary?.totalSpent ?? 0}
            </p>
          </div>
          <div className="glass-card p-5 border border-white/10">
            <p className="text-xs text-gray-400">Budget Remaining</p>
            <p className="text-2xl font-bold text-white mt-1">
              ₹{summary?.budgetRemaining ?? 0}
            </p>
          </div>
          <div className="glass-card p-5 border border-white/10">
            <p className="text-xs text-gray-400">Top Category</p>
            <p className="text-2xl font-bold text-white mt-1">
              {summary?.topCategory || "Not available"}
            </p>
          </div>
        </div>

        {loading && (
          <div className="glass-card p-8 text-center border border-white/10">
            <p className="text-cyan-300">Loading dashboard...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-6 border border-red-500/30 bg-red-500/10">
            <p className="text-red-200 font-medium">{error}</p>
            <button
              onClick={loadDashboardData}
              className="mt-4 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-100 hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="glass-card p-6 h-full border border-white/5">
              <BubbleChart data={categoryData} />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6 h-full border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">AI Insights</h3>
              </div>
              <AIInsights insights={insightCards as any} />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card p-6 flex-1 border border-white/5">
              <CategoryPieChart data={categoryData} />
            </div>

            <div className="glass-card p-6 flex-1 border border-white/5">
              <MonthlyTrendChart data={monthlyTrend} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <AnomaliesTimeline events={timelineEvents} />
        </div>
      </div>
    </DashboardLayout>
  );
}
