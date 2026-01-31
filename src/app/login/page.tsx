import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-zinc-900">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
          ← Back
        </Link>

        <h1 className="mt-6 text-2xl font-semibold">Log in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          We’ll add Supabase auth next. For now, this is the screen.
        </p>

        <div className="mt-8 space-y-3">
          <button className="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800">
            Continue with email
          </button>
          <button className="w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm font-medium hover:bg-zinc-50">
            Continue with Google
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-zinc-200 p-4 text-xs text-zinc-600">
          Next step: connect Supabase → real login → create profile.
        </div>
      </div>
    </main>
  );
}
