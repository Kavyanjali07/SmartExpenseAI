"use client";

interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  type: "anomaly" | "transaction" | "milestone";
}

export default function AnomaliesTimeline({ events }: { events: TimelineEvent[] }) {
  const getTypeColor = (type: string) => {
    if (type === "anomaly") return "bg-red-500 shadow-red-500/50";
    if (type === "transaction") return "bg-cyan-500 shadow-cyan-500/50";
    return "bg-green-500 shadow-green-500/50";
  };

  const getTypeIcon = (type: string) => {
    if (type === "anomaly") return "⚠️";
    if (type === "transaction") return "💳";
    return "✓";
  };

  return (
    <div className="glass-card p-6 rounded-3xl">
      <h2 className="text-lg font-bold mb-6 gradient-text">AI Detected Anomalies (Timeline)</h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/30 via-purple-500/30 to-transparent" />

        {/* Events */}
        <div className="space-y-6 ml-20">
          {events.map((event, index) => (
            <div key={index} className="relative">
              {/* Dot */}
              <div
                className={`absolute -left-16 top-2 w-4 h-4 rounded-full ${getTypeColor(
                  event.type
                )} glow-cyan shadow-lg`}
              />

              {/* Content */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white flex items-center gap-2">
                    <span>{getTypeIcon(event.type)}</span>
                    {event.title}
                  </p>
                  <span className="text-xs text-cyan-300 font-mono">{event.date}</span>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-400">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
