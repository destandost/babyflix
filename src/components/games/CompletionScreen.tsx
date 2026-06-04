"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { launchConfetti } from "@/lib/confetti";
import { SFX } from "@/lib/sounds";

interface CompletionScreenProps {
  coinsEarned: number;
  stars: 1 | 2 | 3;
  characterId: CharacterId;
  onPlayAgain: () => void;
}

export function CompletionScreen({
  coinsEarned,
  stars,
  characterId,
  onPlayAgain,
}: CompletionScreenProps) {
  const router = useRouter();
  const [displayCoins, setDisplayCoins] = useState(0);

  const messages = {
    1: "Good try! 🌟",
    2: "Well done! 🎉",
    3: "PERFECT! 🏆",
  } as const;

  useEffect(() => {
    SFX.win.play();
    launchConfetti("confetti-container");
    let start = 0;
    const step = Math.max(1, coinsEarned / 40);
    const interval = setInterval(() => {
      start += step;
      if (start >= coinsEarned) {
        setDisplayCoins(coinsEarned);
        clearInterval(interval);
        SFX.coin.play();
      } else {
        setDisplayCoins(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [coinsEarned]);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-white p-8 pb-28">
      <div id="confetti-container" className="pointer-events-none absolute inset-0 overflow-hidden" />
      <div className="animate-pop">
        <Character id={characterId} size={130} animate />
      </div>
      <h2 className="font-display mt-4 mb-3 text-center text-3xl text-brand-text">
        {messages[stars]}
      </h2>
      <div className="mb-6 flex gap-2">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className={`text-4xl transition-all duration-500 ${
              s <= stars ? "scale-110 opacity-100" : "scale-90 opacity-20"
            }`}
          >
            ⭐
          </span>
        ))}
      </div>
      <div
        className="mb-8 rounded-3xl px-10 py-5 text-center"
        style={{
          background: "linear-gradient(135deg, #FFD600, #FF6B4A)",
          boxShadow: "0 6px 24px rgba(255,214,0,0.4)",
        }}
      >
        <div className="font-display text-5xl text-white">+{displayCoins}</div>
        <div className="mt-1 text-sm font-bold text-white/80">🪙 coins earned!</div>
      </div>
      <button
        type="button"
        onClick={onPlayAgain}
        className="btn-primary mb-3 w-full rounded-3xl py-4 text-xl"
      >
        Play Again 🎮
      </button>
      <button
        type="button"
        onClick={() => router.push("/games")}
        className="w-full rounded-3xl bg-brand-border py-4 font-display text-xl text-brand-muted transition-transform active:scale-[0.97]"
      >
        Back to Games 🏠
      </button>
    </div>
  );
}
