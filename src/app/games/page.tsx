import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { LEARNING_MODULES } from "@/lib/features";

export default function GamesPage() {
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        🎮 Games
      </h1>
      <p className="mt-2 text-violet-700">
        Play by topic — math, languages, alphabet, arts, motor skills, and
        more.
      </p>

      <PlaceholderBanner
        title="Game engine placeholder"
        message="Interactive mini-games will live under each module route."
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="text-sm text-white/90">Tap to open lessons & games</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
