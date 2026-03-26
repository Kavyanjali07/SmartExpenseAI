"use client";

import { Target, Triangle, Wallet } from "lucide-react";

interface InsightItem {
  id: string;
  type: "alert" | "insight" | "optimization";
  title: string;
  description: string;
  severity?: "low" | "medium" | "high";
}

export default function AIInsights({ insights }: { insights: InsightItem[] }) {
  const getConfig = (type: string) => {
    if (type === "insight") {
      return {
        icon: <Target size={18} />,
        color: "#00d4ff",
        bgColor: "rgba(0, 212, 255, 0.05)",
        borderColor: "rgba(0, 212, 255, 0.1)",
      };
    }
    if (type === "alert") {
      return {
        icon: <Triangle size={18} />,
        color: "#ff006e",
        bgColor: "rgba(255, 0, 110, 0.05)",
        borderColor: "rgba(255, 0, 110, 0.1)",
      };
    }
    return {
      icon: <Wallet size={18} />,
      color: "#7d5aff",
      bgColor: "rgba(125, 90, 255, 0.05)",
      borderColor: "rgba(125, 90, 255, 0.1)",
    };
  };

  return (
    <div className="flex flex-col gap-4">
      {insights.length === 0 && (
        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-sm text-gray-300">
            No insights yet. Add a few expenses to generate personalized suggestions.
          </p>
        </div>
      )}
      {insights.map((insight, idx) => {
        const config = getConfig(insight.type);
        return (
          <div
            key={insight.id}
            className="flex flex-col gap-3 p-5 rounded-2xl border transition-all hover:bg-white/5"
            style={{
              background: config.bgColor,
              borderColor: config.borderColor,
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ 
                  color: config.color, 
                  borderColor: config.borderColor,
                  background: "rgba(255,255,255,0.02)"
                }}
              >
                {config.icon}
              </div>
              <h4 className="font-bold text-white text-sm flex-1 leading-tight">
                {insight.title}
              </h4>
            </div>
            
            <p className="text-gray-400 text-xs leading-relaxed pl-1">
              {insight.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
