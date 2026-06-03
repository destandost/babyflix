"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/features";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/shows", label: "Shows", icon: "📺" },
  { href: "/games", label: "Play", icon: "🎮" },
  { href: "/learn", label: "Learn", icon: "⭐" },
  { href: "/leaderboard", label: "Rank", icon: "🏆" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNav() {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 hidden border-b border-brand-border bg-white md:block">
        <div className="mx-auto flex h-14 max-w-[430px] items-center justify-between px-4">
          <Link href="/" className="font-display text-lg text-brand-text">
            {APP_NAME}
          </Link>
          <nav className="flex gap-1">
            {NAV_ITEMS.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 font-display text-xs font-bold transition active:scale-[0.97] ${
                  isActive(pathname, href)
                    ? "bg-brand-purple text-white shadow-purple"
                    : "text-brand-muted hover:bg-brand-off"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-brand-border bg-white md:hidden"
        style={{
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex h-16 items-center justify-around px-2">
          {NAV_ITEMS.map(({ href, label, icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex min-w-[3.5rem] flex-col items-center gap-0.5 rounded-2xl px-2 py-1 transition active:scale-[0.97] ${
                  active ? "bg-brand-purple text-white shadow-purple" : "text-brand-muted"
                }`}
              >
                <span className="text-lg" aria-hidden>
                  {icon}
                </span>
                <span className="font-display text-[10px] font-bold leading-none">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
