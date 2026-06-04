"use client";

import { useRouter } from "next/navigation";

interface GameHeaderProps {
  title: string;
  coins: number;
  lives?: number;
  maxLives?: number;
  timeLeft?: number | null;
  round?: number;
  totalRounds?: number;
  onBack?: () => void;
}

export function GameHeader({
  title,
  coins,
  lives,
  maxLives = 3,
  timeLeft,
  round,
  totalRounds,
  onBack,
}: GameHeaderProps) {
  const router = useRouter();
  const handleBack = onBack ?? (() => router.push("/games"));

  return (
    <div className="sticky top-0 z-20 flex items-center gap-3 border-b-2 border-brand-border bg-white px-5 py-4">
      <button
        type="button"
        onClick={handleBack}
        className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-border text-lg font-bold text-brand-text transition-transform active:scale-90"
      >
        ←
      </button>
      <div className="flex-1">
        <h1 className="font-display text-lg leading-none text-brand-text">{title}</h1>
        {round && totalRounds && (
          <div className="mt-0.5 text-xs font-semibold text-brand-muted">
            Round {round} of {totalRounds}
          </div>
        )}
      </div>
      {timeLeft !== null && timeLeft !== undefined && (
        <div
          className={`rounded-[14px] px-3 py-1.5 text-sm font-black ${
            timeLeft <= 10 ? "animate-pulse bg-brand-pink text-white" : "bg-brand-border text-brand-text"
          }`}
        >
          ⏱ {timeLeft}s
        </div>
      )}
      {lives !== undefined && (
        <div className="flex gap-0.5">
          {Array.from({ length: maxLives }).map((_, i) => (
            <span
              key={i}
              className={`text-base transition-all duration-300 ${
                i < lives ? "scale-110 opacity-100" : "scale-90 opacity-20"
              }`}
            >
              ❤️
            </span>
          ))}
        </div>
      )}
      <div className="coin-badge text-sm">🪙 {coins}</div>
    </div>
  );
}
