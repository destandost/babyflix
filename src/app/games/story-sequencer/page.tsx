"use client";

import { GamePageShell } from "@/components/games/GamePageShell";
import { StorySequencerGame } from "@/components/games/story-sequencer/StorySequencerGame";

export default function StorySequencerPage() {
  return (
    <GamePageShell
      gameName="Story Sequencer"
      description="Put the story scenes in the right order!"
      characterId="starbear"
      renderGame={(difficulty, onComplete) => (
        <StorySequencerGame difficulty={difficulty} onComplete={onComplete} />
      )}
    />
  );
}
