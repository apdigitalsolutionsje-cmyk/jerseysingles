"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Isto força o Supabase a processar o code/token no URL
    supabase.auth.getSession().then(() => {
      router.replace("/");
    });
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-sm text-zinc-600">Signing you in…</p>
    </main>
  );
}
