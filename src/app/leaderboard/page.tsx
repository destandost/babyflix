import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { MOCK_LEADERBOARD } from "@/lib/features";

export default function LeaderboardPage() {
  return (
    <PageShell>
<<<<<<< Updated upstream
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        🏆 Leaderboard
      </h1>
      <p className="mt-2 max-w-2xl text-violet-700">
        Çocukların birbirine kıyasla seviyelerini gösterir — kids see how their
        level compares to friends (privacy-safe design TBD).
      </p>

      <PlaceholderBanner
        title="Sample data"
        message="Connect accounts and real XP when auth is added."
      />

      <ol className="mt-6 space-y-3">
        {MOCK_LEADERBOARD.map((entry) => (
          <li
            key={entry.rank}
            className="flex items-center gap-4 rounded-2xl bg-white px-5 py-4 shadow-md ring-1 ring-violet-100"
          >
            <span className="font-display w-8 text-xl font-extrabold text-amber-500">
              #{entry.rank}
            </span>
            <span className="text-3xl" aria-hidden>
              {entry.emoji}
            </span>
            <div className="flex-1">
              <p className="font-display font-bold text-violet-900">
                {entry.name}
              </p>
              <p className="text-sm text-violet-600">
                Level {entry.level} · {entry.xp.toLocaleString()} XP
              </p>
            </div>
            {entry.rank <= 3 && (
              <span className="text-2xl" aria-label="Top player">
                {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
              </span>
            )}
          </li>
        ))}
      </ol>
=======
      <div className="px-5 pt-4">
        <h1 className="font-display text-2xl text-brand-text">Leaderboard</h1>
        <p className="mt-1 text-sm font-semibold text-brand-muted">
          Earn XP from quizzes and games and see how you rank this week!
        </p>
      </div>
      <LeaderboardBoard />
>>>>>>> Stashed changes
    </PageShell>
  );
}
