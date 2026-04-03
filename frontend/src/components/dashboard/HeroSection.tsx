"use client";

import React from "react";
import { motion } from "framer-motion";
import BubbleChart from "../charts/BubbleChart";
import { TrendingUp, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  categoryData: any[];
  summary: any;
}

export default function HeroSection({ categoryData, summary }: HeroSectionProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section id="hero" className="scroll-section relative py-32 lg:py-48">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content & Stats */}
          <div className="lg:col-span-5 space-y-12 order-2 lg:order-1">
            <motion.div {...fadeInUp} className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                <Sparkles size={16} className="text-secondary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Next-Gen Intelligence</span>
              </div>
              
              <h1 className="hero-title text-white">
                Core <br />
                <span className="text-secondary">Dynamics</span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-md leading-relaxed font-light">
                Autonomous financial tracking with neural pattern recognition and predictive liquidity forecasting.
              </p>

              <div className="pt-4">
                 <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-all hover:gap-5 group">
                   Initialize Analysis
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div 
                {...fadeInUp} 
                transition={{ delay: 0.2 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="stat-label">Velocity</p>
                  <h3 className="text-2xl font-bold text-white mt-1">₹{summary?.totalSpent ?? 0}</h3>
                </div>
              </motion.div>

              <motion.div 
                {...fadeInUp} 
                transition={{ delay: 0.3 }}
                className="glass-card p-6 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="stat-label">Liquidity</p>
                  <h3 className="text-2xl font-bold text-white mt-1">₹{summary?.budgetRemaining ?? 0}</h3>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right: Immersive Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 relative"
          >
            <div className="absolute -inset-20 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
            <div className="relative glass-panel rounded-[48px] p-8 lg:p-16 border-white/5 overflow-hidden group shadow-2xl">
               {/* Decorative elements */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30" />
               <div className="absolute bottom-8 right-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-[#06080E] bg-gray-800" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Real-time Cluster</span>
               </div>

               <div className="h-[500px] w-full flex items-center justify-center">
                 <BubbleChart data={categoryData} />
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
