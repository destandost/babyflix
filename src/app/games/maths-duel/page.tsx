"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { MathsDuelGame } from "@/components/games/maths-duel/MathsDuelGame";

export default function MathsDuelPage() {
  return (
    <GamePageShell
      gameName="Maths Duel"
      description="Tap the right answer before it zooms past!"
      characterId="dragon"
      renderGame={(difficulty, onComplete) => (
        <MathsDuelGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
