"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, User, LayoutGrid } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled 
          ? "bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-white/10 py-3" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_15px_rgba(125,90,255,0.3)] group-hover:scale-110 transition-transform duration-300">
            <LayoutGrid className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight gradient-text">SmartExpense AI</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-1 glass-panel rounded-full px-3 py-1.5 border-white/5">
            <Search size={16} className="text-gray-400 ml-1" />
            <input 
              type="text" 
              placeholder="Search analytics..." 
              className="bg-transparent border-none focus:outline-none text-sm text-white w-40 placeholder:text-gray-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.4 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white">
              <Bell size={20} />
            </button>
            
            <div className="h-8 w-[1px] bg-white/10 mx-1" />

            <button className="flex items-center gap-2 hover:bg-white/5 p-1 rounded-full transition-all group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 p-[1px] group-hover:shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                <div className="w-full h-full rounded-full bg-[#0B0F1A] flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="User" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors mr-1">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
