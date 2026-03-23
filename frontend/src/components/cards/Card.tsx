import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`
      glass-card
      p-6
      transform
      transition-all
      duration-300
      hover:scale-105
      ${className}
    `}>
      {children}
    </div>
  );
}