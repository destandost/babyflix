import Link from "next/link";
<<<<<<< Updated upstream
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { MINI_GAMES } from "@/lib/games";
=======
import { useEffect, useState } from "react";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { getChildAge } from "@/lib/child-profile";
import { getRecommendationsForAge, type RecommendableGame } from "@/lib/recommendations";

function CoinBadge() {
  return (
    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-black text-brand-yellow">
      <svg width="14" height="14" viewBox="0 0 32 32" aria-hidden>
        <circle cx="16" cy="16" r="14" fill="#FFD600" stroke="#CC9900" strokeWidth="2" />
        <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#CC8800" fontWeight="bold">
          C
        </text>
      </svg>
      Earn in-game coins
    </span>
  );
}
>>>>>>> Stashed changes

export default function GamesPage() {
  const [childAge, setChildAge] = useState<number | null>(null);
  const [games, setGames] = useState<RecommendableGame[]>([]);

  useEffect(() => {
    const age = getChildAge();
    setChildAge(age);
    if (age === null) return;
    setGames(getRecommendationsForAge(age).games);
  }, []);

  return (
    <PageShell>
<<<<<<< Updated upstream
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        🎮 Games
      </h1>
      <p className="mt-2 text-violet-700">
        Play by topic — math, languages, alphabet, arts, motor skills, and more.
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-violet-900">
          Play now
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {MINI_GAMES.map((game) => (
            <Link
              key={game.id}
              href={game.href}
              className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-6 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
            >
              <span className="text-5xl" aria-hidden>
                {game.emoji}
              </span>
              <div className="mt-4">
                <p className="font-display text-xl font-extrabold">{game.title}</p>
                <p className="mt-1 text-sm font-medium text-white/90">
                  {game.description}
                </p>
                <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  Hard mode
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-violet-900">
          By topic
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_MODULES.map((mod) => (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className={`rounded-2xl bg-gradient-to-br ${mod.color} p-5 text-white shadow-md transition hover:scale-[1.02]`}
            >
              <span className="text-3xl" aria-hidden>
                {mod.emoji}
              </span>
              <h2 className="font-display mt-2 text-lg font-bold">{mod.title}</h2>
              <p className="text-sm text-white/90">Lessons & more games</p>
            </Link>
          ))}
        </div>
      </section>
=======
      <div className="min-h-screen bg-brand-off pb-8">
        <div className="px-5 pb-2 pt-6">
          <h1 className="font-display text-3xl text-brand-text">Arcade</h1>
          <p className="mt-1 text-sm font-semibold text-brand-muted">
            {childAge !== null
              ? `Only games for age ${childAge}`
              : "Deep games with progression, strategy, and rewards."}
          </p>
          {childAge !== null && (
            <Link
              href="/welcome?edit=1"
              className="text-xs font-black text-brand-purple"
            >
              Change age →
            </Link>
          )}
        </div>

        {games.length === 0 && childAge !== null ? (
          <div className="mx-4 mt-4 rounded-3xl border-2 border-brand-border bg-white p-6 text-center">
            <p className="font-display text-base text-brand-text">No games for this age yet</p>
            <p className="mt-2 text-sm font-semibold text-brand-muted">
              Sprout Valley is for ages 4–7. Try updating your child&apos;s age.
            </p>
            <Link
              href="/welcome?edit=1"
              className="btn-primary mt-4 inline-block px-6 py-3 text-sm"
            >
              Update age
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 pt-2">
            {games.map((game) => (
              <Link
                key={game.id}
                href={game.route}
                className="relative block overflow-hidden rounded-4xl p-5 text-left transition-transform active:scale-[0.98]"
                style={{ background: game.gradient, boxShadow: game.shadow }}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                {game.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-brand-yellow px-2.5 py-1 text-[10px] font-black text-brand-text">
                    {game.badge}
                  </span>
                )}
                <span className="absolute left-4 top-4 rounded-full bg-white/25 px-2.5 py-1 text-[10px] font-black text-white">
                  Ages {game.minAge}–{game.maxAge}
                </span>
                <div className="relative z-10 flex items-center gap-4">
                  <Character id={game.character as CharacterId} size={72} />
                  <div className="flex-1">
                    <div className="font-display text-xl text-white">{game.name}</div>
                    <div className="mt-1 text-sm font-semibold text-white/85">{game.description}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {game.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <CoinBadge />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {games.length > 0 && (
          <div className="mx-4 mt-6 rounded-3xl border-2 border-dashed border-brand-border bg-white p-5 text-center">
            <p className="font-display text-base text-brand-text">More games coming</p>
            <p className="mt-1 text-xs font-semibold text-brand-muted">
              New adventures will appear when they fit your child&apos;s age.
            </p>
          </div>
        )}
      </div>
>>>>>>> Stashed changes
    </PageShell>
  );
}
