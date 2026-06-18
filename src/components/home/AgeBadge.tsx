"use client";

import Link from "next/link";
import { ageLabel, getChildAge } from "@/lib/child-profile";

export function AgeBadge() {
  const age = getChildAge();
  if (age === null) return null;

  return (
    <Link
      href="/welcome?edit=1"
      className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-black text-white backdrop-blur-sm"
    >
      <span>Picks for {ageLabel(age)}</span>
      <span className="text-white/70">· change</span>
    </Link>
  );
}
