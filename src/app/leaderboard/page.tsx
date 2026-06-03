import { PageShell } from "@/components/PageShell";
import { LeaderboardBoard } from "@/components/leaderboard/LeaderboardBoard";

export default function LeaderboardPage() {
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        🏆 Leaderboard
      </h1>
      <p className="mt-2 max-w-2xl text-violet-700">
        Finish Learn quizzes to earn XP, level up, and climb the ranks. Better scores mean
        more points — perfect quizzes get a bonus!
      </p>

      <LeaderboardBoard />
    </PageShell>
  );
}
