"use client";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  type: "anomaly" | "transaction" | "milestone";
}

export default function AnomaliesTimeline({
  events,
}: {
  events: TimelineEvent[];
}) {
  const getTypeConfig = (type: string) => {
    if (type === "anomaly")
      return {
        color: "#ff006e",
        glow: "rgba(255,0,110,0.4)",
      };
    if (type === "transaction")
      return {
        color: "#00d4ff",
        glow: "rgba(0,212,255,0.4)",
      };
    return {
      color: "#7d5aff",
      glow: "rgba(125,90,255,0.4)",
    };
  };

  return (
    <div className="glass-card p-8 border border-white/5 relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-xl font-bold text-white">
            AI Detected Anomalies (Timeline)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            AI Detected Anomalies and Frequency
          </p>
        </div>
        <button className="text-gray-500 hover:text-white transition-colors">
          <span className="text-xl">⋮</span>
        </button>
      </div>

      {/* Horizontal Timeline */}
      <div className="relative pt-12 pb-8">
        {/* Main horizontal line */}
        <div
          className="absolute top-[48px] left-0 right-0 h-[1px]"
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.1) 85%, rgba(255,255,255,0) 100%)",
          }}
        />

        <div className="flex justify-between items-center relative">
          {events.map((event, index) => {
            const config = getTypeConfig(event.type);
            const isAnomaly = event.type === "anomaly";
            
            return (
              <div
                key={index}
                className="flex flex-col items-center relative group"
                style={{ flex: 1 }}
              >
                {/* Date/Label above */}
                <div className="absolute -top-10 text-center w-max">
                  <span className="text-[10px] text-gray-500 font-medium">
                    {event.date}
                  </span>
                </div>

                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 relative z-10 ${isAnomaly ? 'scale-125' : ''}`}
                  style={{
                    backgroundColor: config.color,
                    boxShadow: `0 0 10px ${config.glow}, 0 0 20px ${config.glow}`,
                  }}
                />

                {/* Title below */}
                <div className={`mt-6 text-center max-w-[120px] transition-all duration-300 ${isAnomaly ? 'bg-white/5 p-2 rounded-lg border border-white/10' : ''}`}>
                  <p className={`text-[11px] font-semibold leading-tight ${isAnomaly ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                    {event.title}
                  </p>
                </div>

                {/* Anomaly Tooltip style callout if anomaly */}
                {isAnomaly && (
                   <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-[#1a1c32] border border-pink-500/30 p-3 rounded-xl shadow-2xl w-48 z-20 pointer-events-none group-hover:scale-105 transition-transform">
                      <p className="text-[10px] font-bold text-pink-500 mb-1">Anomaly Detected</p>
                      <p className="text-[9px] text-gray-300 leading-snug">{event.description}</p>
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1c32] border-r border-b border-pink-500/30 rotate-45" />
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

