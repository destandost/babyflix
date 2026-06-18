"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME } from "@/lib/features";
import { NavIcon, type NavIconId } from "./NavIcon";

const NAV_ITEMS: { href: string; label: string; icon: NavIconId; activeClass: string }[] = [
  { href: "/", label: "Home", icon: "home", activeClass: "text-brand-purple" },
  { href: "/shows", label: "Shows", icon: "shows", activeClass: "text-brand-coral" },
  { href: "/games", label: "Games", icon: "games", activeClass: "text-brand-teal" },
  { href: "/learn", label: "Learn", icon: "learn", activeClass: "text-brand-purple" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppNav() {
  const pathname = usePathname() ?? "";
  if (pathname.startsWith("/games/sprout-valley") || pathname.startsWith("/welcome")) return null;

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-[100] w-full max-w-[430px] -translate-x-1/2 border-t border-brand-border/80 bg-white/95 backdrop-blur-md"
      aria-label="Main navigation"
      style={{
        boxShadow: "0 -2px 16px rgba(45,45,68,0.06)",
        paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex h-[3.75rem] items-center justify-around px-2">
        {NAV_ITEMS.map(({ href, label, icon, activeClass }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex min-h-11 min-w-[4.25rem] flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 transition active:scale-[0.97] ${
                active ? activeClass : "text-brand-muted"
              }`}
            >
              {active && (
                <span
                  className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-current"
                  aria-hidden
                />
              )}
              <NavIcon id={icon} active={active} />
              <span
                className={`font-display text-[10px] font-bold leading-none tracking-wide ${
                  active ? "opacity-100" : "opacity-80"
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
      <p className="sr-only">
        {APP_NAME} — {pathname}
      </p>
    </nav>
  );
}
