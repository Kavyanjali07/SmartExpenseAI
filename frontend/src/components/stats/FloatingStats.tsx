"use client";

import { useEffect, useState } from "react";

interface FloatingStatsProps {
  stats: Array<{
    label: string;
    value: number;
    color: string;
  }>;
}

export default function FloatingStats({ stats }: FloatingStatsProps) {
  const [animatedValues, setAnimatedValues] = useState(
    stats.map(() => 0)
  );

  useEffect(() => {
    const duration = 2000;
    const steps = 60;

    const timers = stats.map((stat, index) => {
      const stepValue = stat.value / steps;
      let currentStep = 0;

      return setInterval(() => {
        currentStep++;
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = Math.floor(stepValue * currentStep);
          if (currentStep >= steps) {
            newValues[index] = stat.value;
          }
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timers[index]);
        }
      }, duration / steps);
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [stats]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`glass-card p-4 border border-${stat.color}-400/30 relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer`}
          style={{
            animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
          }}
        >
          {/* Animated background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
          />

          <div className="relative z-10">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">
              {stat.label}
            </p>
            <p className={`text-3xl font-bold text-${stat.color}-300 tabular-nums`}>
              {animatedValues[index].toLocaleString()}
            </p>
          </div>

          {/* Floating orbs */}
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 opacity-0 animate-pulse group-hover:opacity-100 transition-opacity" />
        </div>
      ))}

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
