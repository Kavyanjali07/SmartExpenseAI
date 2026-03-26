"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";

type BubblePoint = {
  category: string;
  amount: number;
  x: number;
  y: number;
  size?: string;
};

type BubbleChartTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: BubblePoint }>;
};

type CustomLabelProps = {
  x?: number;
  y?: number;
  payload?: BubblePoint;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const CATEGORY_COLORS: Record<string, string> = {
  "Dining Out": "#00d4ff",
  Groceries: "#7d5aff",
  Travel: "#ff006e",
  Shopping: "#3b82f6",
  Utilities: "#10b981",
  Subscriptions: "#f59e0b",
  Entertainment: "#ec4899",
};

const DUMMY_DATA: BubblePoint[] = [
  { category: "Dining Out", amount: 850, x: 80, y: 550, size: "Large" },
  { category: "Travel", amount: 600, x: 30, y: 450, size: "Large" },
  { category: "Groceries", amount: 550, x: 50, y: 380, size: "Large" },
  { category: "Dining Out", amount: 350, x: 75, y: 420 },
  { category: "Travel", amount: 400, x: 35, y: 320 },
  { category: "Groceries", amount: 250, x: 55, y: 250 },
  { category: "Utilities", amount: 200, x: 65, y: 180 },
  { category: "Shopping", amount: 150, x: 45, y: 280 },
  { category: "Entertainment", amount: 100, x: 90, y: 220 },
  { category: "Dining Out", amount: 120, x: 15, y: 200 },
  { category: "Groceries", amount: 90, x: 25, y: 150 },
];

function BubbleChartTooltip({ active, payload }: BubbleChartTooltipProps) {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-[#1a1c32] border border-white/10 p-3 rounded-xl shadow-2xl">
        <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider">{d.category}</p>
        <p className="text-white text-lg font-bold">₹{d.amount}</p>
        <p className="text-gray-500 text-[10px] mt-0.5">Frequency: {d.size || "Regular"}</p>
      </div>
    );
  }
  return null;
}

const CustomLabel = (props: CustomLabelProps) => {
  const { x, y, payload } = props || {};
  if (!payload || payload.size !== "Large") return null;
  if (typeof x !== "number" || typeof y !== "number") return null;

  const category =
    typeof payload.category === "string" ? payload.category : "";
  if (!category) return null;
  
  return (
    <g>
       <text 
         x={x} 
         y={y - 20} 
         fill="#fff" 
         textAnchor="middle" 
         fontSize={9} 
         fontWeight="bold"
         className="pointer-events-none drop-shadow-md"
       >
         {category.toUpperCase()}
       </text>
       <text 
         x={x} 
         y={y - 5} 
         fill="#fff" 
         textAnchor="middle" 
         fontSize={10} 
         fontWeight="bold"
         className="pointer-events-none drop-shadow-md"
       >
         ₹{payload.amount}
       </text>
    </g>
  );
};

export default function BubbleChart({ data }: { data?: BubblePoint[] }) {
  const chartData = data && data.length > 0 ? data : DUMMY_DATA;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white leading-tight">
            Spending Pattern Map <span className="text-gray-500 text-sm font-normal">(Bubble Chart)</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Dynamic bubble: position, date and frequency
          </p>
        </div>
        <button className="text-gray-500 hover:text-white">⋮</button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-gray-500 font-medium">{cat}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 40, right: 40, bottom: 20, left: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(255,255,255,0.03)" 
              vertical={false} 
            />
            <XAxis 
              type="number" 
              dataKey="x" 
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              ticks={[10, 25, 40, 55, 70, 85, 100]}
              tickFormatter={(val) => MONTHS[Math.floor(val/15)] || ""}
              label={{ value: 'Date', position: 'bottom', offset: 0, fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              axisLine={false}
              tickLine={false}
              stroke="rgba(255,255,255,0.1)"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
              label={{ value: 'Spending Amount', angle: -90, position: 'insideLeft', offset: 10, fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
            />
            <ZAxis type="number" dataKey="amount" range={[100, 4000]} />
            <Tooltip content={<BubbleChartTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
            <Scatter name="Expenses" data={chartData}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={CATEGORY_COLORS[entry.category] || "#00d4ff"} 
                  fillOpacity={0.6}
                  stroke={CATEGORY_COLORS[entry.category] || "#00d4ff"}
                  strokeWidth={1}
                />
              ))}
              <LabelList content={<CustomLabel />} />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
