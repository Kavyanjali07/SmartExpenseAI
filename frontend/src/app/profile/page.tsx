"use client";

import { FormEvent, useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  getApiErrorMessage,
  getFinancialHealth,
  getUserProfile,
  updateUserProfile,
  type UserProfile,
} from "@/services/api";

const GOALS = [
  { label: "Save Money", value: "SAVE" },
  { label: "Control Spending", value: "CONTROL_SPENDING" },
  { label: "Invest", value: "INVEST" },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("SAVE");
  const [healthScore, setHealthScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const [profileResponse, healthResponse] = await Promise.all([
        getUserProfile(),
        getFinancialHealth(),
      ]);

      setProfile(profileResponse);
      setIncome(
        typeof profileResponse.monthlyIncome === "number"
          ? String(profileResponse.monthlyIncome)
          : ""
      );
      setBudget(
        typeof profileResponse.monthlyBudget === "number"
          ? String(profileResponse.monthlyBudget)
          : ""
      );
      setGoal(profileResponse.primaryGoal || "SAVE");
      setHealthScore(healthResponse.score);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to load profile."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onSave = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess("");

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

    setSaving(true);
    try {
      const updated = await updateUserProfile({
        income: parsedIncome,
        budget: parsedBudget,
        goal,
      });
      setProfile(updated);
      setSuccess("Profile saved successfully.");
      const healthResponse = await getFinancialHealth();
      setHealthScore(healthResponse.score);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Failed to save profile."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-400 mt-1">
            Manage your personalization settings and financial baseline.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl border border-white/10 bg-[#12172e] p-6 text-cyan-300">
            Loading profile...
          </div>
        )}

        {!loading && profile && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-1 rounded-xl border border-white/10 bg-[#12172e] p-5 space-y-2">
              <p className="text-sm text-gray-400">Username</p>
              <p className="text-white font-semibold">{profile.username}</p>
              <p className="text-sm text-gray-400 pt-2">Email</p>
              <p className="text-white">{profile.email}</p>
              <p className="text-sm text-gray-400 pt-2">Full Name</p>
              <p className="text-white">{profile.fullName}</p>
              <p className="text-sm text-gray-400 pt-2">Financial Health Score</p>
              <p className="text-2xl font-bold text-cyan-300">
                {healthScore !== null ? `${healthScore}/100` : "N/A"}
              </p>
            </div>

            <form
              onSubmit={onSave}
              className="lg:col-span-2 rounded-xl border border-white/10 bg-[#12172e] p-5 space-y-4"
            >
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

              {success && (
                <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-200 text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-cyan-400 text-black font-semibold px-5 py-2.5 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
