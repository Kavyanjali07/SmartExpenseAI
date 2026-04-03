"use client";

import React from "react";
import Navbar from "./navigation/Navbar";
import FloatingMenu from "./navigation/FloatingMenu";
import { motion } from "framer-motion";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-[#06080E] selection:bg-primary/40 selection:text-white flex flex-col font-sans">
      {/* Dynamic Nav Layer */}
      <Navbar />
      <FloatingMenu />

      {/* Persistence Decorator Elements (Subtle & Spaced) */}
      <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-primary/10 blur-[200px] rounded-full animate-pulse [animation-duration:15s]" />
        <div className="absolute top-[50%] right-[10%] w-[500px] h-[500px] bg-secondary/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] bg-accent/5 blur-[250px] rounded-full animate-ping [animation-duration:12s]" />
      </div>

      {/* Main Content Area: Use container-center logic */}
      <main className="relative z-10 w-full flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Ultra-Premium Footer */}
      <footer id="settings" className="relative z-10 py-32 lg:py-64 border-t border-white/5 bg-[#010204]">
        <div className="max-w-7xl mx-auto px-12 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-24 lg:gap-32">
          
          <div className="md:col-span-2 space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/20" />
              <span className="text-3xl font-extrabold tracking-tighter text-white">SmartExpense AI</span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg font-light leading-relaxed">
              Enterprise-grade financial intelligence engine. Optimized for speed, security, and actionable multi-modal insights.
            </p>
            <div className="flex items-center gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 cursor-pointer transition-all hover:scale-110" />
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <h4 className="text-white font-bold text-lg tracking-tight uppercase tracking-[0.2em]">Engine</h4>
            <ul className="space-y-6 text-gray-500 text-sm font-medium">
              <li className="hover:text-primary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">ML Parameters</li>
              <li className="hover:text-primary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Graph Mapping</li>
              <li className="hover:text-primary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Anomaly Detection</li>
              <li className="hover:text-primary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Live Signals</li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-white font-bold text-lg tracking-tight uppercase tracking-[0.2em]">System</h4>
            <ul className="space-y-6 text-gray-500 text-sm font-medium">
              <li className="hover:text-secondary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">API Keys</li>
              <li className="hover:text-secondary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Logs Archive</li>
              <li className="hover:text-secondary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Metadata</li>
              <li className="hover:text-secondary transition-colors cursor-pointer tracking-widest uppercase text-[10px]">Support</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-12 lg:px-0 mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-600 text-xs font-light">© 2026 SmartExpense AI Intelligence Engine. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
             <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                Connectivity: Optimal
             </span>
             <span className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">Version 2.4.0-AI-PREMIUM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
