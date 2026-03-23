"use client";

import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  color: "cyan" | "purple" | "magenta" | "green";
  suffix?: string;
}

export default function AnimatedStatCard({
  label,
  value,
  icon,
  color,
  suffix = "",
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.floor(stepValue * currentStep));

      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const colorClasses = {
    cyan: "from-cyan-500/20 to-cyan-400/20",
    purple: "from-purple-500/20 to-purple-400/20",
    magenta: "from-magenta-500/20 to-magenta-400/20",
    green: "from-green-500/20 to-green-400/20",
  };

  const textClasses = {
    cyan: "text-cyan-300",
    purple: "text-purple-300",
    magenta: "text-magenta-300",
    green: "text-green-300",
  };

  return (
    <div className={`glass-card p-6 bg-gradient-to-br ${colorClasses[color]} border border-${color}-400/30`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
            {label}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>

      <div className={`text-4xl font-bold ${textClasses[color]} tabular-nums`}>
        {displayValue.toLocaleString()}
        {suffix && <span className="text-lg ml-1">{suffix}</span>}
      </div>

      <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 rounded-full`}
          style={{
            width: `${(displayValue / value) * 100}%`,
            animation: "slideRight 2s ease-out forwards",
          }}
        />
      </div>
    </div>
  );
}
