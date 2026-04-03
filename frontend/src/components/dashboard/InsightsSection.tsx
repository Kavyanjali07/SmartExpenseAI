"use client";

import React from "react";
import { motion } from "framer-motion";
import AIInsights from "../insights/AIInsights";
import AnomaliesTimeline from "../timeline/AnomaliesTimeline";
import { BrainCircuit, Activity, Sparkles, Filter } from "lucide-react";

interface InsightsSectionProps {
  insightCards: any[];
  timelineEvents: any[];
}

export default function InsightsSection({ insightCards, timelineEvents }: InsightsSectionProps) {
  return (
    <section id="insights" className="scroll-section relative py-32 lg:py-48 overflow-hidden">
      {/* Dynamic Aura Background */}
      <div className="absolute top-[30%] left-[5%] w-[800px] h-[800px] bg-accent/5 blur-[200px] rounded-full -z-10 animate-pulse" />
      <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-primary/10 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:grid md:grid-cols-12 gap-12 items-baseline px-4 lg:px-0"
        >
          <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-1">
                Cognitive Matrix
              </span>
            </div>
            <h2 className="text-5xl lg:text-8xl font-extrabold tracking-tighter text-white">Neural Insights</h2>
          </div>
          <div className="md:col-span-12 lg:col-span-4 border-l border-white/10 pl-8 pt-4">
             <p className="text-gray-500 font-light text-lg leading-relaxed">
               Advanced ML signals derived from graph analysis and category clustering to identify anomalous spending vectors.
             </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Main timeline - spanning 7 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-8 h-full"
          >
             <div className="glass-panel p-10 lg:p-14 rounded-[48px] border-white/5 relative bg-[#0F172A]/40 shadow-2xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                         <Activity size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white tracking-tight text-xl uppercase">Anomaly Detection</h3>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Timeline Signals</p>
                      </div>
                   </div>
                   <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
                      <Filter size={18} />
                   </button>
                </div>
                <div className="flex-1 w-full flex items-center custom-scrollbar overflow-x-auto">
                   <AnomaliesTimeline events={timelineEvents} />
                </div>
             </div>
          </motion.div>

          {/* AI Insights - spanning 5 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-8 h-full"
          >
             <div className="glass-panel p-10 lg:p-14 rounded-[48px] border-white/5 shadow-2xl relative group h-full flex flex-col">
                <div className="absolute top-8 right-8">
                  <Sparkles size={32} className="text-secondary/20 group-hover:text-secondary/50 transition-colors duration-500" />
                </div>
                <div className="space-y-4 mb-12">
                   <p className="text-secondary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-secondary/10 inline-block">Generated Intelligence</p>
                   <h3 className="text-3xl font-extrabold tracking-tight text-white line-clamp-2">Autonomous Behavioral Feedback</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                   <AIInsights insights={insightCards as any} />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
