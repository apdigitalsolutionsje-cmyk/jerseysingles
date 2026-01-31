import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JerseySingles",
  description: "Simple. Private. Local-first dating in Jersey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Top bar */}
        <header className="w-full border-b border-zinc-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              {/* Logo from /public/logo.jpg */}
              <img
                src="/logo.jpg"
                alt="JerseySingles"
                width={28}
                height={28}
                style={{ borderRadius: 6 }}
              />
              <span className="text-base font-semibold text-zinc-900">
                JerseySingles
              </span>
            </Link>

            <nav className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
              >
                Log in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Create account
              </Link>
            </nav>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-140px)]">{children}</main>

        {/* Footer */}
        <footer className="w-full border-t border-zinc-200 bg-white">
          <div className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-zinc-500">
            © {new Date().getFullYear()} JerseySingles. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
