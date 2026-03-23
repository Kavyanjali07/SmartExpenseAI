"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import AddExpenseForm from "@/components/expenses/AddExpenseForm";
import { getExpenses, deleteExpense } from "@/services/api";
import CsvImport from "@/components/expenses/CsvImport";

export default function ExpensesPage() {

  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error("Failed to load expenses", err);
    } finally {
      setLoading(false);
    }
  };

  const removeExpense = async (id: number) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  return (
    <DashboardLayout>

      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Expense Management</h1>
          <p className="text-gray-400">Track and manage all your expenses</p>
        </div>

        <AddExpenseForm onCreated={loadExpenses} />
        <CsvImport onImported={loadExpenses} />

        {/* Loading State */}
        {loading && (
          <div className="glass-card p-8 text-center">
            <p className="text-cyan-300 animate-pulse">Loading your expenses...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && expenses.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-gray-400 mb-2">No expenses yet</p>
            <p className="text-sm text-gray-500">Start by adding an expense above</p>
          </div>
        )}

        {/* Expense Table */}
        {!loading && expenses.length > 0 && (

          <div className="glass-card overflow-hidden">
            <table className="w-full text-left">

              <thead className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-cyan-400/20">
                <tr>
                  <th className="p-4 text-cyan-300 font-semibold">Amount</th>
                  <th className="p-4 text-cyan-300 font-semibold">Category</th>
                  <th className="p-4 text-cyan-300 font-semibold">Date</th>
                  <th className="p-4 text-cyan-300 font-semibold">Description</th>
                  <th className="p-4 text-cyan-300 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {expenses.map((e: any, index: number) => (
                  <tr
                    key={e.id}
                    className="border-b border-cyan-400/10 hover:bg-cyan-400/5 transition-all duration-300 group animate-in"
                    style={{
                      animation: `slideInUp 0.5s ease-out ${index * 0.05}s both`,
                    }}
                  >

                    <td className="p-4 font-semibold text-lg group-hover:text-cyan-300 transition-colors">₹{e.amount}</td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-purple-200 text-sm font-medium border border-purple-400/30 group-hover:from-purple-500/50 group-hover:to-cyan-500/50 transition-all">
                        {e.category}
                      </span>
                    </td>

                    <td className="p-4 text-gray-300">{e.expenseDate}</td>

                    <td className="p-4 text-gray-400 group-hover:text-gray-300 transition-colors">{e.description}</td>

                    <td className="p-4">
                      <button
                        onClick={() => removeExpense(e.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 px-3 py-1 rounded transition-all duration-200 font-medium"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        )}
      </div>

    </DashboardLayout>
  );
}