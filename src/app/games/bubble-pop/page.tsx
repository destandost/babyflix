"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { BubblePopGame } from "@/components/games/bubble-pop/BubblePopGame";

export default function BubblePopPage() {
  return (
    <GamePageShell
      gameName="Bubble Pop"
      description="Pop the right letters and numbers!"
      characterId="fox"
      renderGame={(difficulty, onComplete) => (
        <BubblePopGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
