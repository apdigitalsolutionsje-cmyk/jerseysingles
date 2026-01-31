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
        redirectTo: "https://jerseysingles.vercel.app/auth/callback",
        queryParams: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 320 }}>
        <button
          onClick={signInWithGoogle}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 6,
            background: "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Continue with Google
        </button>

        {error && (
          <p style={{ color: "red", marginTop: 12, fontSize: 14 }}>
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
