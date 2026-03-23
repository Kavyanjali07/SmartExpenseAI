"use client";

import { Star, TrendingUp, Award, Zap } from "lucide-react";

interface AchievementProps {
  achievements: Array<{
    id: string;
    label: string;
    icon: "star" | "trend" | "award" | "zap";
    unlocked: boolean;
    progress?: number;
  }>;
}

export default function Achievements({ achievements }: AchievementProps) {
  const iconMap = {
    star: Star,
    trend: TrendingUp,
    award: Award,
    zap: Zap,
  };

  return (
    <div className="glass-card p-8 space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Achievements</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => {
          const IconComponent = iconMap[achievement.icon];
          const isUnlocked = achievement.unlocked;

          return (
            <button
              key={achievement.id}
              className={`glass-card p-6 flex flex-col items-center justify-center text-center space-y-3 border transition-all duration-300 group cursor-pointer hover:scale-110 animate-in ${
                isUnlocked
                  ? "border-cyan-400/40 hover:border-cyan-400/80"
                  : "border-gray-600/40 opacity-50"
              }`}
              style={{
                animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div
                className={`p-3 rounded-lg ${
                  isUnlocked
                    ? "bg-gradient-to-br from-cyan-500/30 to-purple-500/30"
                    : "bg-gray-600/20"
                } group-hover:from-cyan-500/50 group-hover:to-purple-500/50 transition-all`}
              >
                <IconComponent
                  size={24}
                  className={isUnlocked ? "text-cyan-300" : "text-gray-500"}
                />
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-300">
                  {achievement.label}
                </p>
                {achievement.progress !== undefined && !isUnlocked && (
                  <div className="mt-2 w-full h-1 bg-gray-600/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all"
                      style={{
                        width: `${Math.min(achievement.progress, 100)}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              {isUnlocked && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
