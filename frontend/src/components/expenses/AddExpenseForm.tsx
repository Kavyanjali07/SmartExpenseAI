"use client";

import { useState } from "react";
import { createExpense } from "@/services/api";
import { Plus } from "lucide-react";

export default function AddExpenseForm({ onCreated }: { onCreated: () => void }) {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const submit = async () => {

    await createExpense({
      amount: Number(amount),
      category,
      description,
      expenseDate: new Date().toISOString().split("T")[0],
    });

    setAmount("");
    setCategory("");
    setDescription("");

    onCreated();
  };

  return (
    <div className="glass-card p-6 flex gap-4 items-end flex-wrap">

      <div className="flex-1 min-w-[150px]">
        <label className="text-xs text-gray-400 block mb-2">Amount</label>
        <input
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-md border border-cyan-400/30 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="text-xs text-gray-400 block mb-2">Category</label>
        <input
          placeholder="Food, Transport..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-md border border-cyan-400/30 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="text-xs text-gray-400 block mb-2">Description</label>
        <input
          placeholder="Add details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-md border border-cyan-400/30 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
        />
      </div>

      <button
        onClick={submit}
        className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
      >
        <Plus size={18} />
        Add Expense
      </button>

    </div>
  );
}