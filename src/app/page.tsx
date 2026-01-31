import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-10 text-zinc-900">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="JerseySingles"
            width={32}
            height={32}
            className="rounded"
            priority
          />
          <span className="font-semibold">JerseySingles</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Create account
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-16 w-full max-w-5xl">
        <h1 className="text-5xl font-semibold leading-[1.05]">
          Meet people in Jersey.
          <span className="block text-zinc-400">Simple. Private. Local-first.</span>
        </h1>

        <p className="mt-6 max-w-xl text-zinc-600">
          JerseySingles is built for real people on the island — no spam, no noise.
          Create a profile, discover matches, and chat when you both like each other.
        </p>
      </section>
    </main>
  );
}
