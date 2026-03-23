"use client";

import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function BubbleChart({ data }: any) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-cyan-400/30">
          <p className="text-cyan-300 text-sm font-semibold">{payload[0].payload.category}</p>
          <p className="text-purple-300 text-sm">₹{payload[0].payload.amount}</p>
          <p className="text-gray-400 text-xs">{payload[0].payload.frequency} transactions</p>
        </div>
      );
    }
    return null;
  };

  // Generate bubble data from categories
  const bubbleData = data?.map((item: any, idx: number) => ({
    category: item.category,
    amount: item.amount,
    frequency: Math.floor(Math.random() * 10) + 3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    fill: ["#00d4ff", "#7d5aff", "#ff006e", "#00ff88", "#ffa500"][idx % 5],
  })) || [];

  return (
    <div className="glass-card p-6 rounded-3xl col-span-2">
      <h2 className="text-lg font-bold mb-4 gradient-text flex items-center gap-2">
        <span>🫧</span> Spending Pattern Map
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(157, 123, 255, 0.1)" />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Pattern" 
            stroke="rgba(255, 255, 255, 0.3)"
            hide
          />
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Frequency" 
            stroke="rgba(255, 255, 255, 0.3)"
            hide
          />
          <ZAxis type="number" dataKey="amount" range={[100, 1000]} name="Amount" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 212, 255, 0.1)" }} />
          <Scatter name="Expenses" data={bubbleData} fill="#00d4ff" />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="mt-4 text-xs text-gray-400">
        📍 Bubble size = Amount | Position = Spending Pattern
      </div>
    </div>
  );
}
