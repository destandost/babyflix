<<<<<<< Updated upstream
import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
=======
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { ShowPlayer } from "@/components/shows/ShowPlayer";
import { getChildAge } from "@/lib/child-profile";
import { getRecommendationsForAge, type RecommendableShow } from "@/lib/recommendations";
>>>>>>> Stashed changes

const SHOWS = [
  { title: "Counting Forest", emoji: "🌲", duration: "8 min" },
  { title: "Letter Parade", emoji: "🎪", duration: "10 min" },
  { title: "Kindness Club", emoji: "💛", duration: "12 min" },
];

function ShowCard({ show }: { show: RecommendableShow }) {
  return (
    <Link
      href="/shows"
      className="overflow-hidden rounded-3xl border-[2.5px] border-brand-border bg-white transition-transform active:scale-[0.97]"
    >
      <div
        className="relative flex h-28 items-center justify-center"
        style={{ background: show.gradient }}
      >
        <Character id={show.character} size={80} />
      </div>
      <div className="p-3">
        <div className="font-display text-[13px] leading-tight text-brand-text">{show.name}</div>
        <div className="mt-1 text-[10px] font-semibold text-brand-muted">
          {show.episodes} episodes
        </div>
        <span className="mt-1.5 inline-block rounded-lg bg-brand-border px-2 py-0.5 text-[9px] font-black text-brand-muted">
          Ages {show.ageRange}
        </span>
      </div>
    </Link>
  );
}

export default function ShowsPage() {
<<<<<<< Updated upstream
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        📺 Shows
      </h1>
      <p className="mt-2 text-violet-700">
        Short, gentle episodes kids can watch on a tablet or browser.
      </p>

      <PlaceholderBanner
        title="Coming soon"
        message="Video playback and episode library will plug in here."
      />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {SHOWS.map((show) => (
          <li
            key={show.title}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-violet-100"
          >
            <span className="text-4xl" aria-hidden>
              {show.emoji}
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-violet-900">
                {show.title}
              </h2>
              <p className="text-sm text-violet-600">{show.duration}</p>
            </div>
          </li>
        ))}
      </ul>
=======
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [childAge, setChildAge] = useState<number | null>(null);
  const [shows, setShows] = useState<RecommendableShow[]>([]);

  useEffect(() => {
    const age = getChildAge();
    setChildAge(age);
    if (age === null) return;
    setShows(getRecommendationsForAge(age).shows);
  }, []);

  const visibleCategories = useMemo(() => {
    return CATEGORIES.filter(
      (cat) => cat === "All" || shows.some((s) => s.category === cat),
    );
  }, [shows]);

  const filtered =
    active === "All" ? shows : shows.filter((s) => s.category === active);

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
        <p className="text-sm font-semibold text-white/85">
          {childAge !== null
            ? `Only shows for age ${childAge}`
            : "New episodes every week!"}
        </p>
        {childAge !== null && (
          <Link
            href="/welcome?edit=1"
            className="mt-2 inline-block text-xs font-black text-white/80 underline"
          >
            Change age
          </Link>
        )}
      </div>

      {shows.length === 0 && childAge !== null ? (
        <div className="mx-4 mb-6 rounded-3xl border-2 border-brand-border bg-white p-6 text-center">
          <p className="font-display text-base text-brand-text">No shows for this age yet</p>
          <p className="mt-2 text-sm font-semibold text-brand-muted">
            Try updating your child&apos;s age to see more.
          </p>
          <Link
            href="/welcome?edit=1"
            className="btn-primary mt-4 inline-block px-6 py-3 text-sm"
          >
            Update age
          </Link>
        </div>
      ) : (
        <>
          {visibleCategories.length > 1 && (
            <div className="scrollbar-hide flex gap-2 overflow-x-auto px-4 pb-4">
              {visibleCategories.map((cat) => (
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
          )}

          <div className="grid grid-cols-2 gap-3.5 px-4 pb-6">
            {filtered.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          {filtered.length === 0 && active !== "All" && (
            <p className="px-4 pb-4 text-center text-sm font-semibold text-brand-muted">
              No shows in this category for your child&apos;s age.
            </p>
          )}
        </>
      )}

      <div className="px-4 pb-8">
        <ShowPlayer />
      </div>
>>>>>>> Stashed changes
    </PageShell>
  );
}
