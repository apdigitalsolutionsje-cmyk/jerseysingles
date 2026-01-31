"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) setError(error.message);
  };

  const signInWithEmail = async () => {
    setError(null);

    const email = prompt("Email:");
    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) setError(error.message);
    else alert("Check your email.");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>Login</h1>

      <button onClick={signInWithEmail}>Continue with Email</button>
      <br /><br />
      <button onClick={signInWithGoogle}>Continue with Google</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
