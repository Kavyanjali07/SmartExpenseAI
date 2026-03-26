"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";
import { Search, Settings, Bell, ChevronDown } from "lucide-react";
import { useAuthGuard } from "@/hooks/useAuthGuard";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { isChecking, isAuthenticated } = useAuthGuard();

  if (isChecking || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060714] text-cyan-300">
        Verifying your session...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#060714] overflow-hidden font-sans text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
               <span className="text-white font-bold text-xs">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">SMART <span className="text-cyan-400">AI</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
               <input 
                 type="text" 
                 placeholder="Search analytics..." 
                 className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-400/50 w-64 transition-all"
               />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#060714]" />
              </button>
              <div className="h-8 w-[1px] bg-white/10 mx-2" />
              <button className="flex items-center gap-2 hover:bg-white/5 p-1.5 rounded-xl transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[#060714] flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>
                <ChevronDown size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Viewport with Neon Glow Border */}
        <div className="flex-1 p-6 pt-2 overflow-hidden flex">
          <div className="flex-1 rounded-[24px] relative overflow-hidden flex flex-col p-[1px] bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30">
            <div className="flex-1 bg-[#0b0d21] rounded-[23px] relative overflow-hidden flex flex-col">
               {/* Ambient inner glow */}
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyan-500/5 to-transparent z-0" />
               
               <main className="flex-1 overflow-y-auto custom-scrollbar p-8 z-10 relative">
                 {children}
               </main>
            </div>
          </div>
        </div>

      </div>

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] right-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed top-[30%] left-[-5%] w-[300px] h-[300px] bg-pink-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
}
