"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getApiErrorMessage, getInsights, type Insight } from "@/services/api";
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function InsightsPage() {

  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not load insights."));
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (index: number) => {
    const icons = [Lightbulb, TrendingUp, AlertCircle, CheckCircle];
    return icons[index % icons.length];
  };

  const getInsightColor = (index: number) => {
    const colors = [
      { bg: "from-cyan-500/20 to-cyan-400/20", text: "text-cyan-300", icon: "cyan" },
      { bg: "from-green-500/20 to-green-400/20", text: "text-green-300", icon: "green" },
      { bg: "from-orange-500/20 to-orange-400/20", text: "text-orange-300", icon: "orange" },
      { bg: "from-purple-500/20 to-purple-400/20", text: "text-purple-300", icon: "purple" },
    ];
    return colors[index % colors.length];
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">AI Financial Insights</h1>
          <p className="text-gray-400">Smart recommendations powered by machine learning</p>
        </div>

        {loading && (
          <div className="glass-card p-8 text-center">
            <p className="text-cyan-300 animate-pulse">Analyzing your spending patterns...</p>
          </div>
        )}

        {error && (
          <div className="glass-card p-5 border border-red-500/30 bg-red-500/10">
            <p className="text-red-200">{error}</p>
            <button
              onClick={loadInsights}
              className="mt-3 px-4 py-2 rounded-lg border border-red-400/30 text-red-100 hover:bg-red-500/20"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && insights.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-400 mb-2">No insights available yet</p>
            <p className="text-sm text-gray-500">Add more expenses to get personalized recommendations</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">

          {insights.map((insight, index) => {
            const IconComponent = getInsightIcon(index);
            const colors = getInsightColor(index);
            
            return (
              <div
                key={index}
                className="glass-card p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
              >
                <div className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComponent className={`${colors.text}`} size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-base leading-relaxed">{insight.message}</p>
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </DashboardLayout>
  );
}
