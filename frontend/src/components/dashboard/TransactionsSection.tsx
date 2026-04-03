"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListFilter, Calendar, ArrowUpRight, ArrowDownRight, Tag, Search, ArrowRight } from "lucide-react";

interface Expense {
  id: number;
  amount: number;
  category: string;
  expenseDate: string;
  description?: string;
}

interface TransactionsSectionProps {
  expenses: Expense[];
}

export default function TransactionsSection({ expenses }: TransactionsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExpenses = expenses.filter(e => 
    e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedExpenses = isExpanded ? filteredExpenses : filteredExpenses.slice(0, 6);

  return (
    <section id="settings" className="scroll-section py-48 lg:py-64 relative bg-[#010204]">
       {/* Background Ambience */}
       <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 blur-[180px] rounded-full -z-10 animate-pulse" />

       <div className="max-w-6xl mx-auto w-full px-6 lg:px-0">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 border-b border-white/5 pb-16">
             <div className="flex flex-col gap-6 max-w-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-[10px] rounded-full bg-primary" />
                  <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em]">Audit Trail</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white">Registry Flux</h2>
                <p className="text-gray-500 font-light text-lg max-w-md leading-relaxed">
                  Real-time metadata ingestion from your financial behavior clusters.
                </p>
             </div>
             
             <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="relative w-full md:w-64">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                   <input 
                      type="text" 
                      placeholder="Search registry..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#0F172A]/40 border border-white/10 rounded-full py-3.5 pl-12 pr-6 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-light"
                    />
                </div>
                <button 
                   onClick={() => setIsExpanded(!isExpanded)}
                   className="flex items-center gap-3 px-8 py-3.5 rounded-full glass-panel border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
                  >
                   <ListFilter size={16} className="text-primary" />
                   {isExpanded ? "Collapse View" : "Full Registry"}
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <AnimatePresence initial={false}>
                {displayedExpenses.map((expense, idx) => (
                   <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.6 }}
                      className="glass-panel p-10 rounded-[48px] border-white/5 flex flex-col justify-between group hover:border-primary/20 hover:bg-white/10 relative overflow-hidden h-full shadow-lg"
                   >
                      <div className="flex items-start justify-between mb-10">
                         <div className="w-12 h-12 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                            <Tag size={20} />
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
                           <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-green-500" /> Resolved
                           </p>
                         </div>
                      </div>

                      <div className="flex flex-col gap-2 mb-10 flex-1">
                          <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors line-clamp-1">{expense.description || "System Signal"}</h4>
                          <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">{expense.category}</span>
                      </div>

                      <div className="flex items-end justify-between self-baseline w-full">
                         <div className="flex flex-col gap-1">
                           <p className="text-xs text-gray-600 font-bold uppercase tracking-[0.1em]">{new Date(expense.expenseDate).toLocaleDateString()}</p>
                           <p className="text-2xl font-extrabold text-white">₹{expense.amount.toFixed(2)}</p>
                         </div>
                         <button className="p-3 rounded-full bg-white/5 text-gray-500 hover:bg-primary/20 hover:text-white transition-all scale-0 group-hover:scale-100 duration-300">
                           <ArrowRight size={18} />
                         </button>
                      </div>
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>

          <AnimatePresence>
             {!isExpanded && filteredExpenses.length > 6 && (
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="mt-16 text-center border-t border-white/5 pt-12"
                  >
                   <p className="text-gray-600 text-sm font-light mb-6">+ {filteredExpenses.length - 6} additional registry entries compressed</p>
                   <button 
                      onClick={() => setIsExpanded(true)}
                      className="px-10 py-4 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
                    >
                      Expand Core Registry
                   </button>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </section>
  );
}
