"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  HARD_MODE,
  buildHardChoices,
  randomStarLayout,
  starCountForRound,
} from "@/lib/game-difficulty";
import { addXp, getStoredXp } from "@/lib/xp";

type Feedback = "idle" | "correct" | "wrong" | "timeout";

function startRound(round: number) {
  const starCount = starCountForRound(round);
  return {
    starCount,
    choices: buildHardChoices(starCount, 1, HARD_MODE.maxStars),
    layout: randomStarLayout(starCount),
  };
}

export function CountStarsGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState<number>(HARD_MODE.maxLives);
  const [timeLeft, setTimeLeft] = useState<number>(HARD_MODE.timerSeconds);
  const [totalXp, setTotalXp] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>("idle");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  const [starCount, setStarCount] = useState(() => startRound(1).starCount);
  const [choices, setChoices] = useState(() => startRound(1).choices);
  const [layout, setLayout] = useState(() => startRound(1).layout);

  const starSizeClass = useMemo(() => {
    if (round >= 8) return { sm: "text-2xl", md: "text-3xl", lg: "text-4xl" };
    if (round >= 5) return { sm: "text-3xl", md: "text-4xl", lg: "text-5xl" };
    return { sm: "text-3xl", md: "text-4xl", lg: "text-5xl sm:text-6xl" };
  }, [round]);

  const applyPenalty = useCallback((reason: "wrong" | "timeout" = "wrong") => {
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) setLost(true);
      return next;
    });
    setFeedback(reason);
  }, []);

  const loadRound = useCallback((nextRound: number) => {
    const data = startRound(nextRound);
    setRound(nextRound);
    setStarCount(data.starCount);
    setChoices(data.choices);
    setLayout(data.layout);
    setTimeLeft(HARD_MODE.timerSeconds);
    setFeedback("idle");
  }, []);

  const nextRound = useCallback(() => {
    loadRound(round + 1);
  }, [loadRound, round]);

  useEffect(() => {
    if (won || lost || feedback !== "idle") return;

    if (timeLeft <= 0) {
      applyPenalty("timeout");
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft, won, lost, feedback, applyPenalty]);

  useEffect(() => {
    if (feedback !== "wrong" && feedback !== "timeout") return;
    if (lost) return;

    const id = setTimeout(() => {
      setFeedback("idle");
      setTimeLeft(HARD_MODE.timerSeconds);
    }, 1200);

    return () => clearTimeout(id);
  }, [feedback, lost]);

  const handleAnswer = (answer: number) => {
    if (feedback === "correct" || won || lost) return;

    if (answer === starCount) {
      const xp = addXp(HARD_MODE.xpPerCorrect);
      setTotalXp(xp);
      setScore((s) => s + 1);
      setFeedback("correct");

      if (score + 1 >= HARD_MODE.roundsToWin) {
        addXp(HARD_MODE.xpWinBonus);
        setTotalXp(getStoredXp());
        setWon(true);
        return;
      }

      setTimeout(nextRound, 700);
    } else {
      applyPenalty();
    }
  };

  const restart = () => {
    setScore(0);
    setLives(HARD_MODE.maxLives);
    setWon(false);
    setLost(false);
    loadRound(1);
  };

  const winXp = HARD_MODE.roundsToWin * HARD_MODE.xpPerCorrect + HARD_MODE.xpWinBonus;

  if (won) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-8 text-center text-white shadow-xl">
        <p className="text-6xl" aria-hidden>
          🎉
        </p>
        <h2 className="font-display mt-4 text-3xl font-extrabold">Hard mode cleared!</h2>
        <p className="mt-2 text-lg font-semibold text-white/95">
          {HARD_MODE.roundsToWin} rounds · +{winXp} XP
        </p>
        <p className="mt-1 text-white/90">All-time XP: {totalXp}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={restart}
            className="rounded-full bg-white px-8 py-4 font-display text-lg font-bold text-orange-600 shadow-md transition hover:scale-105 active:scale-95"
          >
            Play again
          </button>
          <Link
            href="/games"
            className="rounded-full bg-orange-600/40 px-8 py-4 font-display text-lg font-bold text-white ring-2 ring-white/50 transition hover:bg-orange-600/60"
          >
            More games
          </Link>
        </div>
      </div>
    );
  }

  if (lost) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-rose-400 to-red-500 p-8 text-center text-white shadow-xl">
        <p className="text-6xl" aria-hidden>
          💫
        </p>
        <h2 className="font-display mt-4 text-3xl font-extrabold">Out of lives!</h2>
        <p className="mt-2 text-lg font-semibold text-white/95">
          You reached round {round} with {score} correct.
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-8 rounded-full bg-white px-8 py-4 font-display text-lg font-bold text-rose-600 shadow-md transition hover:scale-105"
        >
          Try again
        </button>
      </div>
    );
  }

  const timerUrgent = timeLeft <= 3 && feedback === "idle";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl ring-2 ring-sky-100 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-sky-800">
          Round {round} / {HARD_MODE.roundsToWin}
          <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-sm text-rose-700">
            HARD
          </span>
        </p>
        <div className="flex gap-2">
          <p className="rounded-full bg-sky-100 px-3 py-1 font-display text-sm font-bold text-sky-700">
            ⭐ {score}
          </p>
          <p className="rounded-full bg-rose-100 px-3 py-1 font-display text-sm font-bold text-rose-700">
            {"❤️".repeat(lives)}
            {"🖤".repeat(HARD_MODE.maxLives - lives)}
          </p>
          <p
            className={`rounded-full px-3 py-1 font-display text-sm font-bold ${
              timerUrgent
                ? "animate-pulse bg-amber-200 text-amber-900"
                : "bg-violet-100 text-violet-800"
            }`}
          >
            ⏱ {timeLeft}s
          </p>
        </div>
      </div>

      <p className="font-display mt-6 text-center text-2xl font-extrabold text-violet-900 sm:text-3xl">
        How many stars? (count fast!)
      </p>

      <div
        className="relative mt-4 h-44 overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-950 to-slate-900 sm:h-52"
        aria-label={`${starCount} stars scattered`}
      >
        {layout.map((star, i) => (
          <span
            key={i}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition ${
              starSizeClass[star.size]
            } ${feedback === "correct" ? "animate-bounce" : ""}`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
            aria-hidden
          >
            ⭐
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
        {choices.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => handleAnswer(n)}
            disabled={feedback === "correct"}
            className="flex h-14 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 font-display text-2xl font-extrabold text-white shadow-md transition hover:scale-105 active:scale-95 disabled:opacity-60 sm:h-16 sm:text-3xl"
          >
            {n}
          </button>
        ))}
      </div>

      <p
        className={`mt-5 min-h-[2rem] text-center font-display text-base font-bold sm:text-lg ${
          feedback === "correct"
            ? "text-emerald-600"
            : feedback === "wrong" || feedback === "timeout"
              ? "text-rose-500"
              : "text-violet-500"
        }`}
        role="status"
      >
        {feedback === "correct" && "🎉 Correct! Next round gets tougher."}
        {feedback === "wrong" && "❌ Wrong — you lose a life!"}
        {feedback === "timeout" && "⏱ Too slow — you lose a life!"}
        {feedback === "idle" &&
          `${HARD_MODE.choiceCount} choices · up to ${HARD_MODE.maxStars} stars · ${HARD_MODE.timerSeconds}s per round`}
      </p>
    </div>
  );
}
