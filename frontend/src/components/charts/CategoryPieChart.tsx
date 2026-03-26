"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CATEGORY_COLORS: Record<string, string> = {
  "Dining Out": "#00d4ff",
  Groceries: "#ff006e",
  Travel: "#7d5aff",
  Shopping: "#3b82f6",
  Others: "#10b981",
};

const DUMMY_DATA = [
  { category: "Dining Out", amount: 32 },
  { category: "Groceries", amount: 24 },
  { category: "Travel", amount: 18 },
  { category: "Shopping", amount: 14 },
  { category: "Others", amount: 12 },
];

export default function CategoryPieChart({ data }: { data?: any[] }) {
  const chartData = data && data.length > 0 ? data : DUMMY_DATA;
  const total = chartData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex flex-col h-full">
       <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            Category Distribution
          </h2>
          <p className="text-[10px] text-gray-500 mt-0.5">(Pie/Donut Chart)</p>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">⋮</button>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={5}
              strokeWidth={0}
            >
              {chartData.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={CATEGORY_COLORS[entry.category] || "#00d4ff"} 
                  className="outline-none"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#1a1c32', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Floating Percentages (Approximate position matching image labels) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           {/* This is a simplification; for exact matching we'd use a custom Label component in Recharts */}
        </div>
      </div>

      {/* Right/Bottom Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {chartData.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[item.category] || "#00d4ff" }} />
              <span className="text-gray-500 font-medium">{item.category}</span>
            </div>
            <span className="text-white font-bold">{Math.round((item.amount / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}