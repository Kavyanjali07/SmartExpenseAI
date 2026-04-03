"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BarChart3, 
  Lightbulb, 
  Settings,
  Menu
} from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Dashboard", icon: LayoutDashboard },
  { id: "charts", label: "Analytics", icon: BarChart3 },
  { id: "insights", label: "AI Insights", icon: Lightbulb },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function FloatingMenu() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60]">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="flex items-center gap-1 p-1.5 glass-panel rounded-full border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] neon-border after:opacity-20 hover:after:opacity-50"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative flex items-center justify-center p-2.5 rounded-full transition-all group"
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/10 rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              
              <div className="relative flex items-center gap-0 group-hover:gap-2 transition-all duration-300 overflow-hidden">
                <Icon 
                  size={18} 
                  className={`transition-colors duration-300 ${
                    isActive ? "text-primary shadow-[0_0_8px_rgba(125,90,255,0.4)]" : "text-gray-400"
                  } group-hover:text-white`} 
                />
                <span className={`text-[0px] group-hover:text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive ? "text-primary" : "text-gray-300"
                } group-hover:block`}>
                  {item.label}
                </span>
                {isActive && (
                  <span className="text-xs font-semibold text-white ml-2 hidden lg:block">{item.label}</span>
                )}
              </div>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
