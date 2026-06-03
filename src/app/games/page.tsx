import { PageShell } from "@/components/PageShell";
import Link from "next/link";
import { MINI_GAMES, PLAY_ZONE_LABELS, PLAY_ZONE_ORDER } from "@/lib/games";

export default function PlayPage() {
  return (
    <PageShell className="!bg-[#fff8fc]">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-lime-300 via-emerald-200 to-pink-200 px-6 py-10 text-center shadow-lg sm:px-10">
        <h1 className="font-display text-4xl font-extrabold text-white drop-shadow sm:text-5xl">
          🎮 Arcade
        </h1>
        <p className="mx-auto mt-3 max-w-md text-lg font-semibold text-white/95">
          Just for fun — tap, drag, trace, and paint. No lessons or quizzes here.
        </p>
      </div>

      {PLAY_ZONE_ORDER.map((zone) => {
        const games = MINI_GAMES.filter((g) => g.zone === zone);
        return (
          <section key={zone} className="mt-10">
            <h2 className="font-display text-xl font-bold text-violet-900">
              {PLAY_ZONE_LABELS[zone]}
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={game.href}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-lg ring-4 ring-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="p-8 text-center">
                    <span
                      className="inline-block text-8xl transition group-hover:scale-110"
                      aria-hidden
                    >
                      {game.emoji}
                    </span>
                    <p className="font-display mt-6 text-2xl font-extrabold text-violet-900">
                      {game.title}
                    </p>
                    <p className="mt-3 text-violet-600">{game.description}</p>
                    <p className="mt-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                      {game.depth}
                    </p>
                    <span className="mt-6 inline-flex rounded-full bg-gradient-to-r from-lime-400 to-pink-400 px-6 py-3 font-display font-bold text-white">
                      Play →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
