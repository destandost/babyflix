"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { FeedTheAnimalGame } from "@/components/games/feed-the-animal/FeedTheAnimalGame";

export default function FeedTheAnimalPage() {
  return (
    <GamePageShell
      gameName="Feed the Animal"
      description="Give each animal their favourite food!"
      characterId="monkey"
      renderGame={(difficulty, onComplete) => (
        <FeedTheAnimalGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
