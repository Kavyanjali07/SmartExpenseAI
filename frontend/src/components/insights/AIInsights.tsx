"use client";

import { AlertCircle, TrendingUp, Zap } from "lucide-react";

interface InsightItem {
  id: string;
  type: "alert" | "insight" | "optimization";
  title: string;
  description: string;
  severity?: "low" | "medium" | "high";
}

export default function AIInsights({ insights }: { insights: InsightItem[] }) {
  const getIcon = (type: string, severity?: string) => {
    if (severity === "high") return "🔴";
    if (severity === "medium") return "🟡";
    if (severity === "low") return "🟢";
    if (type === "alert") return "🚨";
    if (type === "insight") return "💡";
    return "⚡";
  };

  const getColor = (type: string, severity?: string) => {
    if (severity === "high") return "border-red-500/40 bg-red-500/5";
    if (severity === "medium") return "border-orange-500/40 bg-orange-500/5";
    if (severity === "low") return "border-green-500/40 bg-green-500/5";
    if (type === "alert") return "border-red-500/30 bg-red-500/5";
    if (type === "insight") return "border-cyan-500/30 bg-cyan-500/5";
    return "border-purple-500/30 bg-purple-500/5";
  };

  return (
    <div className="space-y-3">
      {insights.map((insight) => (
        <div
          key={insight.id}
          className={`glass-card p-4 border rounded-2xl transition-all hover:scale-105 ${getColor(
            insight.type,
            insight.severity
          )}`}
        >
          <div className="flex gap-3 items-start">
            <div className="text-2xl mt-1">{getIcon(insight.type, insight.severity)}</div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{insight.title}</p>
              <p className="text-gray-300 text-xs mt-1">{insight.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
