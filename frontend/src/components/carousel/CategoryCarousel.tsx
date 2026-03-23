"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  data: Array<{
    category: string;
    amount: number;
  }>;
}

export default function CategoryCarousel({ data }: CategoryCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerView = 3;
  const totalItems = data?.length || 0;

  const next = () => {
    setStartIndex((prev) => (prev + 1) % totalItems);
  };

  const prev = () => {
    setStartIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const visibleItems = data.slice(startIndex, startIndex + itemsPerView).length < itemsPerView
    ? [
        ...data.slice(startIndex),
        ...data.slice(0, (startIndex + itemsPerView) % totalItems),
      ].slice(0, itemsPerView)
    : data.slice(startIndex, startIndex + itemsPerView);

  const colors = [
    { bg: "from-cyan-500 to-cyan-400", emoji: "🍔" },
    { bg: "from-purple-500 to-purple-400", emoji: "🚗" },
    { bg: "from-magenta-500 to-magenta-400", emoji: "🎬" },
    { bg: "from-green-500 to-green-400", emoji: "🛍️" },
    { bg: "from-orange-500 to-orange-400", emoji: "💰" },
    { bg: "from-pink-500 to-pink-400", emoji: "🏠" },
  ];

  const getColorForCategory = (index: number) => {
    return colors[index % colors.length];
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="glass-card p-8 space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Spending by Category</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 transition-all"
        >
          <ChevronLeft className="text-cyan-300" size={24} />
        </button>

        {/* Carousel Items */}
        <div className="grid grid-cols-3 gap-4 px-6">
          {visibleItems.map((item, idx) => {
            const colorIndex = data.findIndex((d) => d.category === item.category);
            const color = getColorForCategory(colorIndex);

            return (
              <div
                key={idx}
                className="glass-card p-6 border border-cyan-400/20 hover:border-cyan-400/60 transition-all duration-300 group hover:scale-105 cursor-pointer"
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${color.bg} flex items-center justify-center text-3xl mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all`}
                >
                  {color.emoji}
                </div>

                <p className="text-gray-400 text-sm mb-2">{item.category}</p>
                <p className="text-3xl font-bold gradient-text">₹{item.amount}</p>

                {/* Mini progress */}
                <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${color.bg} rounded-full`}
                    style={{
                      width: `${((item.amount / Math.max(...data.map((d) => d.amount))) *
                        100) || 0}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/40 hover:to-purple-500/40 transition-all"
        >
          <ChevronRight className="text-cyan-300" size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: Math.ceil(totalItems / itemsPerView) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index * itemsPerView)}
              className={`h-2 rounded-full transition-all ${
                index === Math.floor(startIndex / itemsPerView)
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 w-8"
                  : "bg-gray-600 w-2"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
}
