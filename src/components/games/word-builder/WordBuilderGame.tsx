"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Character } from "@/components/characters/Characters";
import { GameHeader } from "@/components/games/GameHeader";
import { getTileColor, wordsForDifficulty } from "@/lib/game-data";
import type { Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface LetterTile {
  id: string;
  letter: string;
}

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

let tileSeq = 0;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTilePool(word: string, distractorCount: number): LetterTile[] {
  const needed = word.split("").map((letter, index) => {
    tileSeq += 1;
    return { id: `need-${word}-${index}-${tileSeq}`, letter };
  });
  const used = new Set(word.split(""));
  const extras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .filter((c) => !used.has(c))
    .sort(() => Math.random() - 0.5)
    .slice(0, distractorCount)
    .map((letter) => {
      tileSeq += 1;
      return { id: `extra-${tileSeq}`, letter };
    });
  return shuffle([...needed, ...extras]);
}

export function WordBuilderGame({ difficulty, onComplete }: Props) {
  const words = wordsForDifficulty(difficulty);
  const distractorCount = valueAtLevel(difficulty.levelIndex, [0, 1, 2, 3, 4] as const);

  const [wordIndex, setWordIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [glow, setGlow] = useState(false);
  const [locked, setLocked] = useState(false);
  const [shakeSlot, setShakeSlot] = useState<number | null>(null);

  const finishedRef = useRef(false);
  const wrongCountRef = useRef(0);

  const current = words[wordIndex % words.length];
  const targetLetters = useMemo(() => current.word.split(""), [current.word]);
  const slotCount = targetLetters.length;

  const [available, setAvailable] = useState<LetterTile[]>(() =>
    buildTilePool(current.word, distractorCount),
  );
  const [filled, setFilled] = useState<(LetterTile | null)[]>(() =>
    Array(slotCount).fill(null),
  );

  const startWord = (index: number, speak = true) => {
    const entry = words[index % words.length];
    const count = entry.word.length;
    setAvailable(buildTilePool(entry.word, distractorCount));
    setFilled(Array(count).fill(null));
    setGlow(false);
    setLocked(false);
    setShakeSlot(null);
    if (speak) void speakGame(`${entry.hint}. Can you spell it?`);
  };

  useEffect(() => {
    startWord(wordIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when word index changes
  }, [wordIndex]);

  const nextEmptySlot = filled.findIndex((s) => s === null);

  const placeFromPool = (tile: LetterTile) => {
    if (locked || finishedRef.current || nextEmptySlot === -1) return;

    const expected = targetLetters[nextEmptySlot];
    if (tile.letter !== expected) {
      SFX.wrong.play();
      wrongCountRef.current += 1;
      setShakeSlot(nextEmptySlot);
      setTimeout(() => setShakeSlot(null), 400);
      void speakGame(`Look for the letter ${expected}!`);
      return;
    }

    SFX.pop.play();
    void speakGame(tile.letter);

    const nextFilled = [...filled];
    nextFilled[nextEmptySlot] = tile;
    setFilled(nextFilled);
    setAvailable((a) => a.filter((t) => t.id !== tile.id));

    if (nextEmptySlot === slotCount - 1) {
      setLocked(true);
      setGlow(true);
      void speakGame(current.word);
      setTimeout(() => {
        setGlow(false);
        setCoins((c) => c + 20);
        if (wordIndex + 1 >= words.length) {
          finishedRef.current = true;
          const stars: 1 | 2 | 3 =
            wrongCountRef.current === 0 ? 3 : wrongCountRef.current <= 2 ? 2 : 1;
          void speakGame("Amazing speller! You got them all!");
          onComplete(stars);
        } else {
          setWordIndex((i) => i + 1);
        }
      }, 1400);
    }
  };

  const clearFromSlot = (slotIndex: number) => {
    if (locked || finishedRef.current || !filled[slotIndex]) return;

    const returning: LetterTile[] = [];
    const nextFilled = [...filled];
    for (let i = slotIndex; i < slotCount; i++) {
      if (nextFilled[i]) {
        returning.push(nextFilled[i]!);
        nextFilled[i] = null;
      }
    }
    setFilled(nextFilled);
    setAvailable((a) => [...a, ...returning]);
    SFX.tick.play();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-100">
      <GameHeader
        title="Word Builder"
        coins={coins}
        round={wordIndex + 1}
        totalRounds={words.length}
      />
      <div className="flex flex-col items-center px-4 pt-4">
        <Character id={current.charId} size={90} />
        <p className="mt-2 text-center text-sm font-semibold text-brand-muted">{current.hint}</p>
      </div>
      <div className="mt-6 flex justify-center gap-2 px-4">
        {targetLetters.map((_, i) => (
          <button
            key={`slot-${current.word}-${i}`}
            type="button"
            disabled={locked || !filled[i]}
            onClick={() => clearFromSlot(i)}
            className={`flex h-14 min-h-12 min-w-12 items-center justify-center rounded-xl border-2 px-2 font-display text-xl font-bold transition ${
              glow ? "border-brand-yellow bg-yellow-100" : "border-brand-border bg-white"
            } ${shakeSlot === i ? "animate-shake border-red-400" : ""} ${
              filled[i] ? "active:scale-95" : ""
            }`}
          >
            {filled[i]?.letter ?? ""}
          </button>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 px-4 pb-8">
        {available.map((tile) => (
          <button
            key={tile.id}
            type="button"
            disabled={locked}
            onClick={() => placeFromPool(tile)}
            className="flex h-12 min-h-12 min-w-12 items-center justify-center rounded-xl px-3 font-display text-lg font-bold text-white shadow-md transition active:scale-95 disabled:opacity-40"
            style={{ background: getTileColor(tile.letter) }}
          >
            {tile.letter}
          </button>
        ))}
      </div>
    </div>
  );
}
