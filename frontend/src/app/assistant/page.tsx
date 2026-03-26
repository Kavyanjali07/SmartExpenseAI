"use client";

import { FormEvent, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { getApiErrorMessage, queryAssistant } from "@/services/api";

export default function AssistantPage() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResponse("");

    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    try {
      const res = await queryAssistant(trimmed);
      const answer = res.answer || "No response received.";
      setResponse(answer);
      if (answer.includes("OpenAI API key is missing")) {
        setError("AI is running in fallback mode. Configure OPENAI_API_KEY in backend to enable full responses.");
      }
    } catch (err: unknown) {
      const message = getApiErrorMessage(err, "Failed to get AI response.");
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            AI-Powered Financial Intelligence Engine
          </h1>
          <p className="text-gray-400 mt-2">
            Ask follow-up questions and get context-aware financial reasoning.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Example: Why is my spending increasing this month?"
            className="w-full min-h-[140px] rounded-xl border border-white/10 bg-[#121526] text-white p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-cyan-500 text-black font-semibold disabled:opacity-60"
            >
              {loading ? "Thinking..." : "Ask Assistant"}
            </button>
            {loading && <span className="text-gray-400 text-sm">Generating response...</span>}
          </div>
        </form>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        {response && (
          <div className="rounded-xl border border-white/10 bg-[#141a2f] p-5">
            <h2 className="text-white font-semibold mb-3">Assistant Response</h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
