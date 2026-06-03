"use client";

import Link from "next/link";

interface PlayToyShellProps {
  children: React.ReactNode;
  buddy?: string;
  hint?: string;
}

export function PlayToyShell({
  children,
  buddy = "🐰",
  hint = "Tap, drag, and mix — no wrong answers here!",
}: PlayToyShellProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#ffe8f5] via-[#fff5e8] to-[#e8f4ff] shadow-inner ring-4 ring-white/80">
      <div className="flex items-center justify-between gap-2 border-b border-white/60 bg-white/50 px-4 py-3">
        <span className="text-3xl animate-pulse" aria-hidden>
          {buddy}
        </span>
        <p className="font-display text-center text-sm font-bold text-violet-700">
          {hint}
        </p>
        <Link
          href="/games"
          className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-violet-600 shadow-sm"
        >
          Exit
        </Link>
      </div>
      {children}
    </div>
  );
}
