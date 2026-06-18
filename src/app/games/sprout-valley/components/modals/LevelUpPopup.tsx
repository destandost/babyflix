"use client";

import { useFarmStore } from "../../store/farmStore";

export function LevelUpPopup() {
  const level = useFarmStore((s) => s.levelUpLevel);
  const dismissLevelUp = useFarmStore((s) => s.dismissLevelUp);

  if (!level) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="w-full max-w-sm rounded-4xl p-8 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #7B4FFF, #00C9B1)",
          boxShadow: "0 12px 40px rgba(123,79,255,0.4)",
        }}
      >
        <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto mb-4" aria-hidden>
          <polygon
            points="32,4 38,24 58,24 42,36 48,56 32,44 16,56 22,36 6,24 26,24"
            fill="#FFD600"
            stroke="#FF8F00"
            strokeWidth="2"
          />
        </svg>
        <h3 className="font-display mb-2 text-3xl">Level {level}!</h3>
        <p className="mb-6 text-sm font-semibold text-white/90">
          New crops and buildings unlocked. Keep growing!
        </p>
        <button
          type="button"
          onClick={() => dismissLevelUp()}
          className="w-full rounded-3xl bg-white py-3 font-display text-brand-purple active:scale-95"
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
