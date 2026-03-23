"use client";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  primaryStat: {
    value: number | string;
    label: string;
  };
  secondaryStat: {
    value: number | string;
    label: string;
  };
}

export default function HeroBanner({
  title,
  subtitle,
  primaryStat,
  secondaryStat,
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden glass-card p-8 md:p-12 mb-8">
      {/* Animated background gradients */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl animate-float opacity-50" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: "-2s" }} />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
          {title}
        </h1>
        <p className="text-gray-400 text-lg mb-8">{subtitle}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-8">
          <div className="glass-card p-6 border border-cyan-400/30">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
              {primaryStat.label}
            </p>
            <p className="text-4xl md:text-5xl font-bold gradient-text tabular-nums">
              {primaryStat.value}
            </p>
          </div>

          <div className="glass-card p-6 border border-purple-400/30">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
              {secondaryStat.label}
            </p>
            <p className="text-4xl md:text-5xl font-bold text-purple-300 tabular-nums">
              {secondaryStat.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
