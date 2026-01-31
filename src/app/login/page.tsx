"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const signInWithGoogle = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // TEM de bater com Supabase Redirect URLs
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) setError(error.message);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Sign in to continue.
        </p>

        <div className="mt-8 space-y-3">
          {/* Email ainda não implementado aqui — só Google por agora */}
          <button
            onClick={signInWithGoogle}
            className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium hover:bg-zinc-50"
          >
            Continue with Google
          </button>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
