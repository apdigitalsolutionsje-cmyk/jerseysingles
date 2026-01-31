"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    const run = async () => {
      const code = params.get("code");
      const errorDesc = params.get("error_description");

      if (errorDesc) {
        setMsg(errorDesc);
        return;
      }

      if (!code) {
        setMsg("No code in callback URL.");
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        setMsg(error.message);
        return;
      }

      router.replace("/");
    };

    run();
  }, [params, router]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <p className="text-sm text-zinc-600">{msg}</p>
    </main>
  );
}
