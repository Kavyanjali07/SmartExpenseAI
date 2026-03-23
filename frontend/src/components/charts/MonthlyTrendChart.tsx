"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function MonthlyTrendChart({ data }: any) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-cyan-400/30">
          <p className="text-cyan-300 text-sm font-semibold">{payload[0].payload.month}</p>
          <p className="text-purple-300 text-sm">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h2 className="text-lg font-semibold mb-4 gradient-text">Monthly Spending Trend</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(157, 123, 255, 0.1)" />
          <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.4)" />
          <YAxis stroke="rgba(255, 255, 255, 0.4)" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            type="monotone"
            dataKey="total"
            fill="url(#colorGradient)"
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#7d5aff" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}