"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/features";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/shows", label: "Shows", icon: "📺" },
  { href: "/games", label: "Games", icon: "🎮" },
  { href: "/learn", label: "Learn", icon: "⭐" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNav() {
  const pathname = usePathname() ?? "";

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-[100] w-full max-w-[430px] -translate-x-1/2 border-t-2 border-brand-border bg-white"
      aria-label="Main navigation"
      style={{
        boxShadow: "0 -4px 24px rgba(123,79,255,0.12)",
        paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex h-[4.25rem] items-stretch justify-around px-1 pt-1">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-12 min-w-[4.5rem] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl px-1 py-1 transition active:scale-[0.96] ${
                active
                  ? "bg-brand-purple text-white shadow-purple"
                  : "text-brand-muted hover:bg-brand-off"
              }`}
            >
              <span className="text-xl leading-none" aria-hidden>
                {icon}
              </span>
              <span className="font-display text-[10px] font-bold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
      <p className="sr-only">{APP_NAME} — {pathname}</p>
    </nav>
  );
}
