"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ExpenseCarouselItem = {
  category: string;
  amount: number;
  description?: string;
  expenseDate?: string;
};

export default function ExpenseCarousel({ data }: { data?: ExpenseCarouselItem[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % (data?.length || 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + (data?.length || 1)) % (data?.length || 1));
  };

  if (!data || data.length === 0) return null;

  const currentExpense = data[current];

  return (
    <div className="glass-card p-8 overflow-hidden">
      <h2 className="text-2xl font-bold gradient-text mb-6">Recent Expenses</h2>

      <div className="relative h-48 flex items-center justify-between">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-10 p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
        >
          <ChevronLeft className="text-cyan-300" size={28} />
        </button>

        {/* Carousel Content */}
        <div className="flex-1 mx-12 text-center">
          <div className="glass-card p-8 space-y-4 border border-cyan-400/40 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-3xl">
                {currentExpense?.category === "Food"
                  ? "🍔"
                  : currentExpense?.category === "Transport"
                  ? "🚗"
                  : currentExpense?.category === "Entertainment"
                  ? "🎬"
                  : currentExpense?.category === "Shopping"
                  ? "🛍️"
                  : "💰"}
              </div>
              <div>
                <p className="text-gray-400 text-xs">Category</p>
                <p className="text-2xl font-bold text-cyan-300">
                  {currentExpense?.category}
                </p>
              </div>
            </div>

            <div className="border-t border-cyan-400/20 pt-4">
              <p className="text-gray-400 text-xs mb-1">Amount</p>
              <p className="text-4xl font-bold gradient-text">
                ₹{currentExpense?.amount}
              </p>
            </div>

            <p className="text-sm text-gray-300 italic">
              &quot;{currentExpense?.description}&quot;
            </p>

            <p className="text-xs text-gray-500">
              {currentExpense?.expenseDate}
            </p>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-10 p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 transition-all duration-300"
        >
          <ChevronRight className="text-cyan-300" size={28} />
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 w-8"
                : "bg-gray-600 w-2 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
