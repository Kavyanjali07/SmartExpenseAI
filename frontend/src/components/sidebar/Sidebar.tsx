"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Wallet, BarChart3, MessageCircle, Sparkles, LogOut, UserCircle2, SlidersHorizontal } from "lucide-react";
import { logoutClient } from "@/hooks/useAuthGuard";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/expenses", label: "Expenses", icon: Wallet },
    { href: "/insights", label: "Insights", icon: BarChart3 },
    { href: "/assistant", label: "AI Assistant", icon: MessageCircle },
    { href: "/onboarding", label: "Onboarding", icon: SlidersHorizontal },
    { href: "/profile", label: "Profile", icon: UserCircle2 },
  ];

  const onLogout = () => {
    logoutClient();
    router.replace("/login");
  };

  return (
    <div
      className="h-screen w-[72px] hover:w-64 flex flex-col items-center hover:items-start py-8 gap-10 border-r border-white/5 relative group/sidebar z-30 transition-all duration-300 bg-[#060714]"
    >
      <div className="absolute top-0 right-[-1px] w-[1px] h-full bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0" />

      <div className="px-5 w-full overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
            <Sparkles size={22} className="text-white" />
          </div>
          <span className="text-lg font-bold whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
            SMART <span className="text-cyan-400">AI</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-3 w-full overflow-hidden">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all relative ${
                isActive ? "bg-white/5 text-cyan-400" : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <IconComponent size={22} className="flex-shrink-0" />
              <span className="text-xs font-semibold whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full shadow-[0_0_8px_#00d4ff]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 w-full overflow-hidden">
        <button
          onClick={onLogout}
          className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-pink-500/10 text-gray-500 hover:text-pink-500 transition-all w-full"
        >
          <LogOut size={22} className="flex-shrink-0" />
          <span className="text-xs font-semibold whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
