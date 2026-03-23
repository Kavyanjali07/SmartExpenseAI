import { ReactNode } from "react";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 p-10 min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a0f35] to-[#0f1a2e]">
        {children}
      </main>

    </div>
  );
}