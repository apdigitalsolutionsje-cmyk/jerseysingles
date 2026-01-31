import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="JerseySingles"
            width={36}
            height={36}
            priority
          />
          <span className="text-lg font-semibold">JerseySingles</span>
        </div>

        <nav className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            Create account
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Meet people in Jersey.
              <span className="block text-zinc-500">
                Simple. Private. Local-first.
              </span>
            </h1>

            <p className="mt-5 max-w-prose text-lg text-zinc-600">
              JerseySingles is built for real people on the island — no spam, no
              noise. Create a profile, discover matches, and chat when you both
              like each other.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Start free
              </Link>
              <a
                href="#how"
                className="rounded-full border border-zinc-200 px-6 py-3 text-sm font-medium hover:bg-zinc-50"
              >
                How it works
              </a>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 text-sm text-zinc-600 sm:grid-cols-3">
              <div className="rounded-2xl border border-zinc-200 p-4">
                <div className="font-medium text-zinc-900">Local-only</div>
                <div className="mt-1">Focus on Jersey</div>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-4">
                <div className="font-medium text-zinc-900">Mutual chat</div>
                <div className="mt-1">Message after match</div>
              </div>
              <div className="rounded-2xl border border-zinc-200 p-4">
                <div className="font-medium text-zinc-900">Premium later</div>
                <div className="mt-1">Extra features</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="text-sm font-medium text-zinc-900">
                Coming next
              </div>
              <ul className="mt-3 space-y-2 text-sm text-zinc-600">
                <li>• Sign up & log in</li>
                <li>• Create profile (photos, bio, age)</li>
                <li>• Discover (swipe-style)</li>
                <li>• Matches + chat</li>
                <li>• Premium limits & Stripe</li>
              </ul>
            </div>

            <div id="how" className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="text-sm font-medium text-zinc-900">
                How it works
              </div>
              <ol className="mt-3 space-y-2 text-sm text-zinc-600">
                <li>1) Create your profile</li>
                <li>2) Like people you’re interested in</li>
                <li>3) If it’s mutual, you can chat</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-5xl px-6 pb-10 text-xs text-zinc-500">
        © {new Date().getFullYear()} JerseySingles. All rights reserved.
      </footer>
    </main>
  );
}
