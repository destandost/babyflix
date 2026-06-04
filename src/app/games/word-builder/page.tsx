"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { WordBuilderGame } from "@/components/games/word-builder/WordBuilderGame";

export default function WordBuilderPage() {
  return (
    <GamePageShell
      gameName="Word Builder"
      description="Tap letters to spell the word!"
      characterId="dino"
      renderGame={(difficulty, onComplete) => (
        <WordBuilderGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
