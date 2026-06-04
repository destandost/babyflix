"use client";

import { useState, type ReactNode } from "react";
import { CompletionScreen } from "@/components/games/CompletionScreen";
import { DifficultySelector } from "@/components/games/DifficultySelector";
import type { CharacterId } from "@/components/characters/Characters";
import type { Difficulty } from "@/lib/difficulty";
import { awardGameWin } from "@/lib/xp";

type Phase = "select" | "play" | "done";

interface GamePageShellProps {
  gameName: string;
  description: string;
  characterId: CharacterId;
  renderGame: (
    difficulty: Difficulty,
    onComplete: (stars: 1 | 2 | 3, bonusCoins?: number) => void,
  ) => ReactNode;
}

export function GamePageShell({
  gameName,
  description,
  characterId,
  renderGame,
}: GamePageShellProps) {
  const [phase, setPhase] = useState<Phase>("select");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [stars, setStars] = useState<1 | 2 | 3>(3);
  const [coinsEarned, setCoinsEarned] = useState(0);

  const reset = () => {
    setPhase("select");
    setDifficulty(null);
    setStars(3);
    setCoinsEarned(0);
  };

  const handleComplete = (s: 1 | 2 | 3, bonusCoins = 0) => {
    if (!difficulty) return;
    const coins = difficulty.coinsPerWin * s + bonusCoins;
    const xp = difficulty.xpPerWin * s;
    awardGameWin(xp);
    setStars(s);
    setCoinsEarned(coins);
    setPhase("done");
  };

  if (phase === "select") {
    return (
      <div className="min-h-screen bg-brand-off">
        <DifficultySelector
          gameName={gameName}
          description={description}
          characterId={characterId}
          onSelect={(d) => {
            setDifficulty(d);
            setPhase("play");
          }}
        />
      </div>
    );
  }

  if (phase === "done" && difficulty) {
    return (
      <CompletionScreen
        coinsEarned={coinsEarned}
        stars={stars}
        characterId={characterId}
        onPlayAgain={reset}
      />
    );
  }

  if (phase === "play" && difficulty) {
    return (
      <div className="min-h-screen bg-brand-off">{renderGame(difficulty, handleComplete)}</div>
    );
  }

  return null;
}
