"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<"google" | "email" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const baseUrl = useMemo(() => {
    // Se no Vercel tiveres NEXT_PUBLIC_SITE_URL, usa isso.
    const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
    if (fromEnv && fromEnv.startsWith("http")) return fromEnv.replace(/\/+$/, "");
    // fallback
    if (typeof window !== "undefined") return window.location.origin;
    return "";
  }, []);

  const signInWithGoogle = async () => {
    setErr(null);
    setMsg(null);
    setLoading("google");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });

    setLoading(null);
    if (error) setErr(error.message);
  };

  const signInWithEmail = async () => {
    setErr(null);
    setMsg(null);

    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      setErr("Type a valid email.");
      return;
    }

    setLoading("email");

    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    });

    setLoading(null);

    if (error) setErr(error.message);
    else setMsg("Check your email for the sign-in link.");
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in with Google or get a magic link by email.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={signInWithGoogle}
            disabled={loading !== null}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium hover:bg-zinc-50 disabled:opacity-60"
          >
            {loading === "google" ? "Opening Google…" : "Continue with Google"}
          </button>

          <div className="mt-4 rounded-2xl border border-zinc-200 p-4">
            <label className="text-xs font-medium text-zinc-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-zinc-400"
            />
            <button
              onClick={signInWithEmail}
              disabled={loading !== null}
              className="mt-3 w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60"
            >
              {loading === "email" ? "Sending link…" : "Continue with email"}
            </button>
          </div>

          {err && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {err}
            </div>
          )}
          {msg && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              {msg}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
