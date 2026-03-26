"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const BAR_COLORS = ["#00d4ff", "#7d5aff"];

const DUMMY_DATA = [
  { month: "Jan", current: 350, avg: 220 },
  { month: "Feb", current: 280, avg: 240 },
  { month: "Mar", current: 300, avg: 260 },
  { month: "Apr", current: 380, avg: 320 },
  { month: "May", current: 310, avg: 280 },
  { month: "Jun", current: 240, avg: 220 },
];

export default function MonthlyTrendChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : DUMMY_DATA;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            Expense Categories Overview
          </h2>
          <p className="text-[10px] text-gray-500 mt-0.5">
            Current month vs. average spending
          </p>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">⋮</button>
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(255, 255, 255, 0.1)"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.1)"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400]}
            />
            <Tooltip 
              contentStyle={{ background: '#1a1c32', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            />
            <Bar
              dataKey="current"
              fill={BAR_COLORS[0]}
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
            <Bar
              dataKey="avg"
              fill={BAR_COLORS[1]}
              radius={[4, 4, 0, 0]}
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}