"use client";

import { useEffect, useState } from "react";
import { Character } from "@/components/characters/Characters";
import {
  getPlayerProfile,
  getStoredXp,
  xpIntoCurrentLevel,
  xpToLevel,
  XP_PER_LEVEL,
} from "@/lib/xp";

export function HomeHero() {
  const [name, setName] = useState("Explorer");
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const xp = getStoredXp();
    setName(getPlayerProfile().name);
    setLevel(xpToLevel(xp));
    setProgress(xpIntoCurrentLevel(xp));
  }, []);

  const pct = Math.min(100, Math.round((progress / XP_PER_LEVEL) * 100));

  return (
    <div
      className="relative mx-4 mb-5 min-h-[140px] overflow-hidden rounded-4xl p-5"
      style={{ background: "linear-gradient(135deg, #7B4FFF, #FF4D8D)" }}
    >
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <Character id="fox" size={100} animate />
      </div>
      <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 font-display text-xs font-black uppercase tracking-wide text-white">
        Level {level} Explorer
      </span>
      <h1 className="font-display relative z-10 mb-1 text-2xl text-white">
        Hey {name}! 👋
      </h1>
      <p className="relative z-10 mb-3 text-sm font-semibold text-white/80">
        Ready for today&apos;s adventure?
      </p>
      <div className="relative z-10 flex items-center gap-2">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25">
          <div className="h-full rounded-full bg-brand-yellow" style={{ width: `${pct}%` }} />
        </div>
        <span className="whitespace-nowrap text-xs font-bold text-white/90">
          {progress} / {XP_PER_LEVEL} XP
        </span>
      </div>
    </div>
  );
}
