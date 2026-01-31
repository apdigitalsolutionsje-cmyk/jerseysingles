"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setError(null);

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) setError(error.message);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-zinc-500">
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>

        <button
          onClick={signInWithGoogle}
          className="mt-6 w-full rounded-xl bg-black py-3 text-white"
        >
          Continue with Google
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </main>
  );
}
