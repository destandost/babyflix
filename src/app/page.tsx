<<<<<<< Updated upstream
=======
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
>>>>>>> Stashed changes
import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";
import { getChildAge } from "@/lib/child-profile";
import { HOME_SECTIONS } from "@/lib/features";
<<<<<<< Updated upstream
=======
import { getRecommendationsForAge } from "@/lib/recommendations";
import { HOME_SECTION_UI } from "@/lib/ui-catalog";
>>>>>>> Stashed changes

export default function HomePage() {
  const [shows, setShows] = useState<ReturnType<typeof getRecommendationsForAge>["shows"]>([]);
  const [games, setGames] = useState<ReturnType<typeof getRecommendationsForAge>["games"]>([]);
  const [childAge, setChildAge] = useState<number | null>(null);

  useEffect(() => {
    const age = getChildAge();
    setChildAge(age);
    if (age === null) return;
    const rec = getRecommendationsForAge(age);
    setShows(rec.shows.slice(0, 4));
    setGames(rec.games);
  }, []);

  return (
    <PageShell>
      <section className="mb-8 text-center sm:mb-10">
        <p className="text-5xl sm:text-6xl" aria-hidden>
          🍼✨
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold text-violet-900 sm:text-4xl">
          Welcome to babyflix
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-base text-violet-700 sm:text-lg">
          Shows, games, and lessons for curious kids ages 2–7. Pick something
          fun below!
        </p>
      </section>

<<<<<<< Updated upstream
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {HOME_SECTIONS.map((section) => (
          <FeatureCard key={section.href} {...section} />
        ))}
=======
      {childAge !== null && shows.length > 0 && (
        <>
          <div className="mb-3 flex items-center justify-between px-5">
            <div>
              <h2 className="font-display text-xl text-brand-text">Shows</h2>
              <p className="text-[11px] font-semibold text-brand-muted">For age {childAge}</p>
            </div>
            <Link href="/shows" className="text-xs font-black text-brand-purple">
              See all →
            </Link>
          </div>

          <div className="scrollbar-hide flex gap-3.5 overflow-x-auto px-5 pb-6">
            {shows.map((show) => (
              <Link
                key={show.id}
                href="/shows"
                className="min-w-[116px] flex-shrink-0 text-left transition-transform active:scale-[0.97]"
              >
                <div
                  className="relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded-3xl"
                  style={{ background: show.gradient }}
                >
                  <span className="absolute left-2 top-2 rounded-lg bg-brand-pink px-2 py-0.5 text-[9px] font-black text-white">
                    {show.badge}
                  </span>
                  <span className="absolute right-2 top-2 rounded-lg bg-brand-yellow px-1.5 py-0.5 text-[8px] font-black text-brand-text">
                    {show.ageRange}
                  </span>
                  <Character id={show.character} size={80} />
                </div>
                <div className="text-xs font-black leading-tight text-brand-text">{show.name}</div>
                <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">
                  {show.episodes} episodes
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {childAge !== null && games.length > 0 && (
        <>
          <div className="mb-3 flex items-center justify-between px-5">
            <div>
              <h2 className="font-display text-xl text-brand-text">Games</h2>
              <p className="text-[11px] font-semibold text-brand-muted">For age {childAge}</p>
            </div>
            <Link href="/games" className="text-xs font-black text-brand-purple">
              Arcade →
            </Link>
          </div>

          <div className="flex flex-col gap-3 px-4 pb-6">
            {games.map((game) => (
              <Link
                key={game.id}
                href={game.route}
                className="relative overflow-hidden rounded-4xl p-4 text-left transition-transform active:scale-[0.97]"
                style={{ background: game.gradient, boxShadow: game.shadow }}
              >
                {game.badge && (
                  <span className="absolute right-3 top-3 rounded-full bg-brand-yellow px-2 py-0.5 text-[9px] font-black text-brand-text">
                    {game.badge}
                  </span>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-white/25 px-2 py-0.5 text-[9px] font-black text-white">
                  Ages {game.minAge}–{game.maxAge}
                </span>
                <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-white/10" />
                <div className="relative z-10 flex items-center gap-3">
                  <Character id={game.character as CharacterId} size={64} />
                  <div className="flex-1">
                    <div className="font-display text-lg text-white">{game.name}</div>
                    <div className="mt-0.5 text-[11px] font-semibold text-white/80">
                      {game.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="mb-3 px-5">
        <h2 className="font-display text-xl text-brand-text">Explore</h2>
      </div>

      <HomeLanguageBanner />

      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {HOME_SECTIONS.map((section) => {
          const ui = HOME_SECTION_UI[section.href];
          if (!ui) return null;
          return (
            <FeatureCard
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.description}
              character={ui.character}
              gradient={ui.gradient}
              shadow={ui.shadow}
            />
          );
        })}
>>>>>>> Stashed changes
      </div>
    </PageShell>
  );
}
