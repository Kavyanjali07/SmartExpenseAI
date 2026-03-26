"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage, loginUser, signupUser } from "@/services/api";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signupUser({
        username: form.username.trim(),
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        password: form.password,
      });

      const loginResponse = await loginUser({
        username: form.username.trim(),
        password: form.password,
      });

      localStorage.setItem("token", loginResponse.token);
      router.replace("/onboarding");
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Signup failed. Please try different credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060714] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0f1224] p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <p className="text-gray-400 text-sm mt-1">
            Create your account and set up personalized financial guidance.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-300">Username</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-[#151935] px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
