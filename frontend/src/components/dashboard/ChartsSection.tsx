"use client";

import React from "react";
import { motion } from "framer-motion";
import CategoryPieChart from "../charts/CategoryPieChart";
import MonthlyTrendChart from "../charts/MonthlyTrendChart";
import { PieChart, LineChart, LayoutGrid } from "lucide-react";

interface ChartsSectionProps {
  categoryData: any[];
  monthlyTrend: any[];
}

export default function ChartsSection({ categoryData, monthlyTrend }: ChartsSectionProps) {
  return (
    <section id="charts" className="scroll-section relative py-32 lg:py-64">
      {/* Background Ambience */}
      <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-secondary/10 blur-[180px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full -z-10 animate-pulse [animation-duration:10s]" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-left max-w-2xl"
        >
           <span className="text-secondary text-xs font-bold uppercase tracking-[0.4em] mb-4 block">Analytical Core</span>
           <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white mb-6">Cross-Sectional <span className="text-secondary">Dynamics</span></h2>
           <p className="text-xl text-gray-500 font-light leading-relaxed">Multidimensional spending analysis across diverse categories and historical timeframes.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group"
          >
             <div className="glass-panel p-10 lg:p-14 rounded-[48px] border-white/5 relative overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                         <PieChart size={24} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold text-white tracking-tight">Distribution</h3>
                         <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mt-1">Spend Categories</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">
                      Live
                   </div>
                </div>
                <div className="h-[400px] w-full flex-1">
                  <CategoryPieChart data={categoryData} />
                </div>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="group"
          >
             <div className="glass-panel p-10 lg:p-14 rounded-[48px] border-white/5 relative overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="flex items-center justify-between mb-12">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20 flex items-center justify-center">
                         <LineChart size={24} />
                      </div>
                      <div>
                         <h3 className="text-2xl font-bold text-white tracking-tight">Evolution</h3>
                         <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.1em] mt-1">30-Day Trend</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em]">
                      Historic
                   </div>
                </div>
                <div className="h-[400px] w-full flex-1">
                  <MonthlyTrendChart data={monthlyTrend} />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
