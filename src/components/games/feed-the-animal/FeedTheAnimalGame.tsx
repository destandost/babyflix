"use client";

import { useMemo, useState } from "react";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { GameHeader } from "@/components/games/GameHeader";
import { ANIMALS } from "@/lib/game-data";
import type { Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

export function FeedTheAnimalGame({ difficulty, onComplete }: Props) {
  const total = valueAtLevel(difficulty.levelIndex, [4, 5, 5, 6, 7] as const);
  const queue = useMemo(
    () => [...ANIMALS].sort(() => Math.random() - 0.5).slice(0, total),
    [total],
  );
  const [index, setIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [hearts, setHearts] = useState(false);
  const [shakeFood, setShakeFood] = useState<string | null>(null);
  const [flying, setFlying] = useState<string | null>(null);

  const animal = queue[index];
  const choices = useMemo(() => {
    if (!animal) return [];
    return [animal.food, ...animal.wrong].sort(() => Math.random() - 0.5);
  }, [animal]);

  const feed = (food: string) => {
    if (!animal || flying) return;
    if (food === animal.food) {
      setFlying(food);
      SFX.correct.play();
      setTimeout(() => {
        setFlying(null);
        setBounce(true);
        setHearts(true);
        void speakGame(`Yummy! The ${animal.name} loves ${animal.foodName}!`);
        const nextCoins = coins + 15;
        setCoins(nextCoins);
        setTimeout(() => {
          setBounce(false);
          setHearts(false);
          if (index + 1 >= total) {
            onComplete(3);
          } else {
            setIndex((i) => i + 1);
            void speakGame(`What does the ${queue[index + 1]?.name} like to eat?`);
          }
        }, 600);
      }, 300);
    } else {
      SFX.wrong.play();
      setShakeFood(food);
      void speakGame("Hmm, try again!");
      setTimeout(() => setShakeFood(null), 400);
    }
  };

  if (!animal) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <GameHeader title="Feed the Animal" coins={coins} round={index + 1} totalRounds={total} />
      <div className="flex flex-col items-center px-4 pt-6">
        <div
          className={`rounded-3xl bg-white px-6 py-3 shadow-md transition-transform ${
            bounce ? "-translate-y-2" : ""
          }`}
        >
          <p className="text-center font-display text-sm text-brand-text">I&apos;m hungry!</p>
        </div>
        <div className={`relative mt-4 ${bounce ? "animate-bounce" : ""}`}>
          <Character id={animal.charId as CharacterId} size={120} />
          {hearts && (
            <span className="absolute -top-2 right-0 text-2xl animate-pulse">❤️</span>
          )}
        </div>
        <p className="mt-2 font-display text-lg text-brand-text">{animal.name}</p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 px-4 pb-8">
        {choices.map((food) => (
          <button
            key={food}
            type="button"
            onClick={() => feed(food)}
            disabled={!!flying}
            className={`flex min-h-[72px] items-center justify-center rounded-2xl border-2 border-brand-border bg-white text-4xl transition active:scale-95 ${
              shakeFood === food ? "animate-shake border-brand-pink" : ""
            } ${flying === food ? "scale-0 opacity-0" : ""}`}
          >
            {food}
          </button>
        ))}
      </div>
    </div>
  );
}
