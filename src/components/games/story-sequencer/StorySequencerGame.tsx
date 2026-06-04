"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import { storiesForDifficulty, type Story, type StoryScene } from "@/lib/game-data";
import type { Difficulty } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

function SceneCard({ scene, small }: { scene: StoryScene; small?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative overflow-hidden rounded-[18px] ${small ? "h-[80px] w-[100px]" : "h-[120px] w-[150px]"}`}
        style={{ background: scene.bg }}
      >
        <div className="absolute right-2 top-2 h-6 w-6 rounded-full bg-yellow-300 opacity-90" />
        <div className="absolute bottom-4 left-1/2 h-2 w-4 -translate-x-1/2 rounded-full bg-amber-900/60" />
      </div>
      {!small && (
        <p className="mt-2 max-w-[150px] text-center font-display text-xs text-brand-text">
          {scene.label}
        </p>
      )}
    </div>
  );
}

export function StorySequencerGame({ difficulty, onComplete }: Props) {
  const story: Story = useMemo(() => {
    const list = storiesForDifficulty(difficulty);
    return list[Math.floor(Math.random() * list.length)];
  }, [difficulty]);

  const [slots, setSlots] = useState<(StoryScene | null)[]>([null, null, null]);
  const [pool, setPool] = useState<StoryScene[]>([]);
  const [coins, setCoins] = useState(0);
  const [narrating, setNarrating] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const shuffled = [...story.scenes].sort(() => Math.random() - 0.5);
    setPool(shuffled);
    void speakGame("Put the story in order! What happens first?");
  }, [story.scenes]);

  const placeScene = (scene: StoryScene, slotIndex: number) => {
    setPool((p) => p.filter((s) => s.order !== scene.order));
    setSlots((prev) => {
      const next = [...prev];
      if (next[slotIndex]) {
        setPool((p) => [...p, next[slotIndex]!]);
      }
      next[slotIndex] = scene;
      return next;
    });
    SFX.pop.play();
  };

  const tapPool = (scene: StoryScene) => {
    const empty = slots.findIndex((s) => s === null);
    if (empty === -1) return;
    placeScene(scene, empty);
  };

  const tapSlot = (index: number) => {
    const s = slots[index];
    if (!s) return;
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
    setPool((p) => [...p, s]);
  };

  useEffect(() => {
    if (finishedRef.current || slots.some((s) => s === null)) return;
    const ordered = slots.every((s, i) => s && s.order === i + 1);
    if (!ordered) return;
    finishedRef.current = true;
    const run = async () => {
      setNarrating(true);
      SFX.correct.play();
      for (const scene of slots as StoryScene[]) {
        await speakGame(scene.narration);
        await new Promise((r) => setTimeout(r, 400));
      }
      void speakGame("What a wonderful storyteller you are!");
      setCoins((c) => c + 25);
      onComplete(3);
    };
    void run();
  }, [slots, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-teal-50">
      <GameHeader title="Story Sequencer" coins={coins} />
      <p className="px-4 py-3 text-center font-display text-lg text-brand-text">{story.title}</p>
      <div className="flex justify-center gap-3 px-4">
        {slots.map((scene, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tapSlot(i)}
            className="flex min-h-[140px] min-w-[100px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-purple bg-white/80 p-2"
          >
            <span className="font-display text-sm text-brand-muted">{i + 1}</span>
            {scene ? <SceneCard scene={scene} small /> : <span className="text-2xl text-brand-muted">?</span>}
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-3 px-4 pb-8">
        {pool.map((scene) => (
          <button
            key={scene.order}
            type="button"
            disabled={narrating}
            onClick={() => tapPool(scene)}
            className="transition active:scale-95"
          >
            <SceneCard scene={scene} />
          </button>
        ))}
      </div>
    </div>
  );
}
