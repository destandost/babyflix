import Link from "next/link";
import { APP_NAME } from "@/lib/features";

const NAV_LINKS = [
  { href: "/shows", label: "Shows" },
  { href: "/games", label: "Games" },
  { href: "/learn", label: "Learn" },
  { href: "/leaderboard", label: "Rank" },
  { href: "/parents", label: "Parents" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-2xl px-2 py-1 transition hover:bg-violet-50"
        >
          <span className="text-2xl" aria-hidden>
            🍼
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-violet-700">
            {APP_NAME}
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-violet-800 transition hover:bg-violet-100 sm:px-4 sm:text-base"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
