"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { PatternFinishGame } from "@/components/games/pattern-finish/PatternFinishGame";

export default function PatternFinishPage() {
  return (
    <GamePageShell
      gameName="Pattern Finish"
      description="What comes next in the sequence?"
      characterId="unicorn"
      renderGame={(difficulty, onComplete) => (
        <PatternFinishGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
