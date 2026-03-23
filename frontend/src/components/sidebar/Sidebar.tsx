"use client";

import Link from "next/link";
import { LayoutDashboard, Wallet, BarChart3, MessageCircle, Sparkles } from "lucide-react";

export default function Sidebar() {
  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/expenses", label: "Expenses", icon: Wallet },
    { href: "/insights", label: "Insights", icon: BarChart3 },
    { href: "/assistant", label: "AI Assistant", icon: MessageCircle },
  ];

  return (
    <div className="h-screen w-64 glass-card m-4 ml-0 flex flex-col gap-8 border-l border-purple-500/30">

      <div className="p-6 pb-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">
            SMART AI
          </h1>
        </div>
        <p className="text-xs text-gray-400 ml-13 font-semibold">EXPENSE TRACKER</p>
      </div>

      <nav className="flex flex-col gap-2 px-4 flex-1">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 transition-all duration-300 group border border-transparent hover:border-cyan-400/30"
            >
              <IconComponent size={20} className="group-hover:text-cyan-300 transition-colors" />
              <span className="group-hover:text-cyan-200 transition-colors">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 pt-0 border-t border-purple-500/20">
        <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
          Upgrade Plan
        </button>
      </div>

    </div>
  );
}