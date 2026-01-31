"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [msg, setMsg] = useState("Signing you in...");

  useEffect(() => {
    const run = async () => {
      // Isto força o Supabase a ler o code do URL e guardar a session
      const { error } = await supabase.auth.getSession();

      if (error) {
        setMsg(`Auth error: ${error.message}`);
        return;
      }

      router.replace("/");
    };

    run();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <p className="text-sm text-zinc-600">{msg}</p>
    </main>
  );
}
