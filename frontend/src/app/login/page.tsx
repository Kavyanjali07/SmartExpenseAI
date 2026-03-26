"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage, getUserProfile, loginUser, type UserProfile } from "@/services/api";

function isProfileComplete(profile: UserProfile) {
  return (
    typeof profile.monthlyIncome === "number" &&
    typeof profile.monthlyBudget === "number" &&
    Boolean(profile.primaryGoal)
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ username: username.trim(), password });
      localStorage.setItem("token", response.token);

      try {
        const profile = await getUserProfile();
        router.replace(isProfileComplete(profile) ? "/" : "/onboarding");
      } catch {
        router.replace("/onboarding");
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Login failed. Please check your credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060714] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1224] p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-gray-400 text-sm mt-1">
            Access your AI-powered Financial Intelligence Engine.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400">
          New here?{" "}
          <Link href="/signup" className="text-cyan-300 hover:text-cyan-200">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
