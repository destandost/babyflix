import Link from "next/link";
import { CountStarsGame } from "@/components/games/CountStarsGame";
import { PageShell } from "@/components/PageShell";
import { HARD_MODE } from "@/lib/game-difficulty";

export default function CountStarsPage() {
  return (
    <PageShell>
      <Link
        href="/games"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← All games
      </Link>

      <div className="mt-4 rounded-3xl bg-gradient-to-br from-sky-400 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
        <span className="text-5xl" aria-hidden>
          ⭐
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">Count the Stars</h1>
        <p className="mt-2 max-w-xl text-white/95">
          Hard mode: {HARD_MODE.roundsToWin} rounds, up to {HARD_MODE.maxStars} scattered
          stars, {HARD_MODE.choiceCount} close answers, {HARD_MODE.timerSeconds}s timer,{" "}
          {HARD_MODE.maxLives} lives.
        </p>
      </div>

      <div className="mt-6">
        <CountStarsGame />
      </div>
    </PageShell>
  );
}
