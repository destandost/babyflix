"use client";

import { Character, type CharacterId } from "@/components/characters/Characters";
import { DIFFICULTY_LEVELS, type Difficulty } from "@/lib/difficulty";

interface DifficultySelectorProps {
  gameName: string;
  description: string;
  characterId: CharacterId;
  onSelect: (d: Difficulty) => void;
}

export function DifficultySelector({
  gameName,
  description,
  characterId,
  onSelect,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center px-6 pb-6 pt-10">
      <Character id={characterId} size={110} animate />
      <h2 className="font-display mt-4 mb-1 text-center text-2xl text-brand-text">{gameName}</h2>
      <p className="mb-8 text-center text-sm font-semibold text-brand-muted">{description}</p>
      <div className="flex w-full max-h-[min(52vh,420px)] flex-col gap-2.5 overflow-y-auto pr-1">
        {DIFFICULTY_LEVELS.map((d) => (
          <button
            key={d.ageGroup}
            type="button"
            onClick={() => onSelect(d)}
            className="flex w-full items-center justify-between rounded-[20px] border-[2.5px] border-brand-border bg-white p-4 text-left transition-all hover:border-brand-purple hover:bg-brand-purple/5 active:scale-[0.98]"
          >
            <div>
              <div className="font-display text-lg text-brand-text">{d.label}</div>
              <div className="mt-0.5 text-xs font-semibold text-brand-muted">
                Ages {d.ageGroup} · 🪙 +{d.coinsPerWin} coins
                {d.timeLimit ? ` · ⏱ ${d.timeLimit}s` : ""}
              </div>
            </div>
            <span className="text-2xl text-[#D0D0E8]">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
