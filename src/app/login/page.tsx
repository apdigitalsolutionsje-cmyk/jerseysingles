"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"google" | "email" | null>(null);

  const baseUrl = useMemo(() => {
    // Preferimos env em produção, senão origin atual
    return (
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== "undefined" ? window.location.origin : "")
    );
  }, []);

  const redirectTo = `${baseUrl}/auth/callback`;

  const signInWithGoogle = async () => {
    setError(null);
    setStatus(null);
    setLoading("google");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });

    if (error) setError(error.message);
    setLoading(null);
  };

  const sendMagicLink = async () => {
    setError(null);
    setStatus(null);
    setLoading("email");

    if (!email.trim()) {
      setError("Type your email first.");
      setLoading(null);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) setError(error.message);
    else setStatus("Check your email for the sign-in link.");
    setLoading(null);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Use Google or get a secure sign-in link by email.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={sendMagicLink}
            disabled={loading !== null}
            className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
          >
            {loading === "email" ? "Sending link..." : "Continue with email"}
          </button>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm outline-none focus:border-zinc-400"
          />

          <button
            onClick={signInWithGoogle}
            disabled={loading !== null}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium hover:bg-zinc-50 disabled:opacity-60"
          >
            {loading === "google" ? "Opening Google..." : "Continue with Google"}
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {status && (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            {status}
          </p>
        )}

        <div className="mt-8 rounded-2xl border border-zinc-200 p-4 text-xs text-zinc-600">
          If Google doesn’t open, it’s always config (Supabase provider + redirect URLs)
          or the site didn’t redeploy.
        </div>
      </div>
    </main>
  );
}
