"use client";

import Link from "next/link";
import { useState } from "react";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { ShowPlayer } from "@/components/shows/ShowPlayer";
import { SHOW_CATALOG } from "@/lib/ui-catalog";

const CATEGORIES = ["All", "Animals", "Space", "Ocean", "Fantasy"] as const;

export default function ShowsPage() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    active === "All"
      ? SHOW_CATALOG
      : SHOW_CATALOG.filter((s) => s.category === active);

  return (
    <PageShell>
      <div
        className="mx-4 mb-5 rounded-4xl p-5"
        style={{
          background: "linear-gradient(135deg, #00C9B1, #00D4FF)",
          boxShadow: "0 8px 24px rgba(0,201,177,0.3)",
        }}
      >
        <h1 className="font-display mb-1 text-2xl text-white">Shows & Stories 📺</h1>
        <p className="text-sm font-semibold text-white/85">New episodes every week!</p>
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 font-display text-xs font-black transition-all active:scale-[0.97] ${
              active === cat
                ? "bg-brand-purple text-white shadow-purple"
                : "bg-brand-border text-brand-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3.5 px-4 pb-6">
        {filtered.map((show) => (
          <Link
            key={show.id}
            href="/shows"
            className="overflow-hidden rounded-3xl border-[2.5px] border-brand-border bg-white transition-transform active:scale-[0.97]"
          >
            <div
              className="flex h-28 items-center justify-center"
              style={{ background: show.gradient }}
            >
              <Character id={show.character} size={80} />
            </div>
            <div className="p-3">
              <div className="font-display text-[13px] leading-tight text-brand-text">
                {show.name}
              </div>
              <div className="mt-1 text-[10px] font-semibold text-brand-muted">
                {show.episodes} episodes
              </div>
              <span className="mt-1.5 inline-block rounded-lg bg-brand-border px-2 py-0.5 text-[9px] font-black text-brand-muted">
                Ages {show.ageRange}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="px-4 pb-8">
        <ShowPlayer />
      </div>
    </PageShell>
  );
}
