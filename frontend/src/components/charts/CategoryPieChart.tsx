"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function CategoryPieChart({ data }: any) {
  const COLORS = ['#00d4ff', '#7d5aff', '#ff006e', '#00ff88', '#ffa500', '#ff00ff', '#00ffff'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-cyan-400/30">
          <p className="text-cyan-300 text-sm font-semibold">{payload[0].name}</p>
          <p className="text-purple-300 text-sm">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h2 className="text-lg font-semibold mb-4 gradient-text">Category Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            outerRadius={100}
            fill="#a78bfa"
          >
            {data?.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}