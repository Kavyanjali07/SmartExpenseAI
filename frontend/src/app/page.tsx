"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import HeroSection from "@/components/dashboard/HeroSection";
import ChartsSection from "@/components/dashboard/ChartsSection";
import InsightsSection from "@/components/dashboard/InsightsSection";
import TransactionsSection from "@/components/dashboard/TransactionsSection";
import {
  getApiErrorMessage,
  getDashboardSummary,
  getMonthlyTrend,
  getCategoryDistribution,
  getInsights,
  getExpenses,
  type DashboardSummaryResponse,
  type Insight,
  type Expense,
} from "@/services/api";

export default function Home() {
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      const [sum, trend, dist, ins, exp] = await Promise.all([
        getDashboardSummary(),
        getMonthlyTrend(),
        getCategoryDistribution(),
        getInsights(),
        getExpenses(),
      ]);
      setSummary(sum);
      setMonthlyTrend(trend);
      setCategoryData(dist);
      setInsights(ins);
      setExpenses(exp);
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load dashboard data."));
    } finally {
      setTimeout(() => setLoading(false), 800); // Slight delay for smoother transition
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24">
           <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
           <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
           <div className="absolute inset-4 border-4 border-secondary/20 rounded-full" />
           <div className="absolute inset-4 border-4 border-b-secondary rounded-full animate-spin [animation-duration:1.5s]" />
        </div>
        <div className="flex flex-col items-center gap-2">
           <span className="text-white font-bold tracking-[0.3em] uppercase text-xs">Initializing Engine</span>
           <span className="text-gray-500 text-[10px] animate-pulse">Calibrating ML Models...</span>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full px-4">
          <div className="glass-panel p-6 border-red-500/30 bg-red-500/10 flex flex-col gap-4">
            <p className="text-red-200 font-medium">{error}</p>
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30 text-red-100 hover:bg-red-500/30 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Section 1: Hero */}
      <HeroSection categoryData={categoryData} summary={summary} />

      {/* Section 2: Analytics */}
      <ChartsSection categoryData={categoryData} monthlyTrend={monthlyTrend} />

      {/* Section 3: Intelligence */}
      <InsightsSection insightCards={insightCards} timelineEvents={timelineEvents} />

      {/* Section 4: Transactions */}
      <TransactionsSection expenses={expenses} />
      
    </DashboardShell>
  );
}
