"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { NumberBondsGame } from "@/components/games/number-bonds/NumberBondsGame";

export default function NumberBondsPage() {
  return (
    <GamePageShell
      gameName="Number Bonds"
      description="Catch pairs of numbers that add up!"
      characterId="bear"
      renderGame={(difficulty, onComplete) => (
        <NumberBondsGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
