import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { MINI_GAMES } from "@/lib/games";

export default function GamesPage() {
  return (
    <PageShell>
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
    </PageShell>
  );
}
