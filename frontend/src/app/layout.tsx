import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartExpense AI — AI-Powered Financial Intelligence Engine",
  description: "AI-powered Financial Intelligence Engine for analytics, ML signals, and context-aware financial guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
