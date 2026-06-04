"use client";

import { useMemo, useState } from "react";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { GameHeader } from "@/components/games/GameHeader";
import { PATTERN_CHARS, type PatternItem } from "@/lib/game-data";
import type { Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

function generateRound(difficulty: Difficulty) {
  const poolSize = valueAtLevel(difficulty.levelIndex, [2, 2, 3, 3, 4] as const);
  const pool = PATTERN_CHARS.slice(0, poolSize + 2).sort(() => Math.random() - 0.5).slice(0, poolSize);
  const unitLen = pool.length;
  const seqLen = valueAtLevel(difficulty.levelIndex, [5, 6, 6, 7, 8] as const);
  const sequence: PatternItem[] = [];
  for (let i = 0; i < seqLen; i++) {
    sequence.push({ charId: pool[i % unitLen] });
  }
  const missingIndex = 3 + Math.floor(Math.random() * (seqLen - 4));
  const correct = sequence[missingIndex];
  const wrongOptions: PatternItem[] = [];
  while (wrongOptions.length < 3) {
    const pick = { charId: PATTERN_CHARS[Math.floor(Math.random() * PATTERN_CHARS.length)] };
    if (
      pick.charId !== correct.charId &&
      !wrongOptions.some((w) => w.charId === pick.charId)
    ) {
      wrongOptions.push(pick);
    }
  }
  return { sequence, missingIndex, correct, options: [correct, ...wrongOptions].sort(() => Math.random() - 0.5) };
}

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

export function PatternFinishGame({ difficulty, onComplete }: Props) {
  const totalRounds = 8;
  const [round, setRound] = useState(1);
  const [coins, setCoins] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [roundData, setRoundData] = useState(() => generateRound(difficulty));

  const displaySeq = useMemo(
    () =>
      roundData.sequence.map((item, i) =>
        i === roundData.missingIndex ? null : item,
      ),
    [roundData],
  );

  const pick = (item: PatternItem, key: string) => {
    if (item.charId === roundData.correct.charId) {
      SFX.correct.play();
      void speakGame("Perfect! You spotted the pattern!");
      const nextCoins = coins + 10;
      setCoins(nextCoins);
      if (round >= totalRounds) {
        const stars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
        onComplete(stars);
        return;
      }
      setRound((r) => r + 1);
      setRoundData(generateRound(difficulty));
    } else {
      SFX.wrong.play();
      setWrongCount((w) => w + 1);
      setShakeId(key);
      void speakGame("Not quite! Look at the sequence again.");
      setTimeout(() => setShakeId(null), 400);
    }
  };

  return (
    <div className="min-h-screen bg-brand-off">
      <GameHeader title="Pattern Finish" coins={coins} round={round} totalRounds={totalRounds} />
      <p className="px-5 py-4 text-center font-display text-lg text-brand-text">
        What comes next?
      </p>
      <div className="flex flex-wrap justify-center gap-2 px-4">
        {displaySeq.map((item, i) =>
          item ? (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-brand-border bg-white"
            >
              <Character id={item.charId} size={48} />
            </div>
          ) : (
            <div
              key={i}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-dashed border-brand-purple bg-brand-purple/10 font-display text-2xl text-brand-purple"
            >
              ?
            </div>
          ),
        )}
      </div>
      <div className="mt-8 grid grid-cols-2 gap-3 px-4">
        {roundData.options.map((opt, i) => {
          const key = `${round}-${opt.charId}-${i}`;
          return (
            <button
              key={key}
              type="button"
              onClick={() => pick(opt, key)}
              className={`flex min-h-[72px] min-w-[72px] items-center justify-center rounded-[18px] border-[2.5px] border-brand-border bg-white p-4 transition active:scale-[0.97] ${
                shakeId === key ? "animate-shake border-brand-pink bg-pink-50" : ""
              }`}
            >
              <Character id={opt.charId} size={56} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
