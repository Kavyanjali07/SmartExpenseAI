"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage, getUserProfile, updateUserProfile } from "@/services/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const GOALS = [
  { label: "Save Money", value: "SAVE" },
  { label: "Control Spending", value: "CONTROL_SPENDING" },
  { label: "Invest", value: "INVEST" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { isChecking, isAuthenticated } = useAuthGuard("/login");

  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("SAVE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExistingProfile = async () => {
      if (!isAuthenticated) {
        return;
      }

      try {
        const profile = await getUserProfile();
        if (
          typeof profile.monthlyIncome === "number" &&
          typeof profile.monthlyBudget === "number" &&
          profile.primaryGoal
        ) {
          router.replace("/");
          return;
        }

        if (typeof profile.monthlyIncome === "number") {
          setIncome(String(profile.monthlyIncome));
        }

        if (typeof profile.monthlyBudget === "number") {
          setBudget(String(profile.monthlyBudget));
        }

        if (profile.primaryGoal) {
          setGoal(profile.primaryGoal);
        }
      } catch {
        // Keep onboarding open if profile fetch fails.
      }
    };

    loadExistingProfile();
  }, [isAuthenticated, router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const parsedIncome = Number(income);
    const parsedBudget = Number(budget);

    if (!Number.isFinite(parsedIncome) || parsedIncome < 0) {
      setError("Please enter a valid monthly income.");
      return;
    }

    if (!Number.isFinite(parsedBudget) || parsedBudget < 0) {
      setError("Please enter a valid monthly budget.");
      return;
    }

    setLoading(true);
    try {
      await updateUserProfile({
        income: parsedIncome,
        budget: parsedBudget,
        goal,
      });
      router.replace("/");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Could not save onboarding details."));
    } finally {
      setLoading(false);
    }
  };

  if (isChecking || !isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#060714] text-cyan-300 flex items-center justify-center">
        Verifying your session...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060714] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f1224] p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome to SmartExpense AI</h1>
          <p className="text-gray-400 text-sm mt-1">
            Set your financial baseline so the assistant can personalize recommendations.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Monthly income</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Monthly budget</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Primary goal</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {GOALS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setGoal(item.value)}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    goal === item.value
                      ? "border-cyan-400 bg-cyan-400/20 text-cyan-200"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-cyan-500/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-400 text-black font-semibold py-2.5 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Finish Onboarding"}
          </button>
        </form>
      </div>
    </main>
  );
}
