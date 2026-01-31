"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("Signing you in...");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Isto faz o Supabase ler o "code" do URL e criar sessão
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (!cancelled) {
          if (data.session) {
            router.replace("/");
          } else {
            setMsg("No session found. Please try logging in again.");
          }
        }
      } catch (e: any) {
        if (!cancelled) setMsg(e?.message || "Auth callback error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 p-6 text-center">
        <h1 className="text-xl font-semibold">Finishing sign-in</h1>
        <p className="mt-2 text-sm text-zinc-600">{msg}</p>
      </div>
    </main>
  );
}
