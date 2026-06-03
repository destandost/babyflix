import { PageShell } from "@/components/PageShell";
import { LeaderboardBoard } from "@/components/leaderboard/LeaderboardBoard";

export default function LeaderboardPage() {
  return (
    <PageShell>
      <div className="px-5 pt-4">
        <h1 className="font-display text-2xl text-brand-text">Leaderboard</h1>
        <p className="mt-1 text-sm font-semibold text-brand-muted">
          Finish Learn quizzes to earn XP and climb the ranks.
        </p>
      </div>
      <LeaderboardBoard />
    </PageShell>
  );
}
