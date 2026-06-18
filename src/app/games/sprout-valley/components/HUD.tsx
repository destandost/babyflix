"use client";

import { useRouter } from "next/navigation";
import { getXpProgress, useFarmStore } from "../store/farmStore";

export function HUD() {
  const coins = useFarmStore((s) => s.coins);
  const water = useFarmStore((s) => s.water);
  const maxWater = useFarmStore((s) => s.maxWater);
  const xp = useFarmStore((s) => s.xp);
  const level = useFarmStore((s) => s.level);
  const notification = useFarmStore((s) => s.notification);
  const router = useRouter();
  const xpProgress = getXpProgress(xp, level);

  return (
    <header
      className="relative z-[210] flex-shrink-0 shadow-md"
      style={{
        background: "linear-gradient(180deg, #FFF8E1 0%, #FFECB3 100%)",
        borderBottom: "4px solid #8D6E63",
      }}
    >
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/games")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#8D6E63] bg-[#EFEBE9] shadow-[0_3px_0_#5D4037] active:translate-y-0.5 active:shadow-none"
            aria-label="Back to games"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
              <path d="M15 6L9 12l6 6" stroke="#3E2723" strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </button>
          <div>
            <div className="font-display text-base leading-none text-[#3E2723]">Sprout Valley</div>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-2 w-24 overflow-hidden rounded-full border border-[#8D6E63]/40 bg-[#EFEBE9]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#66BB6A] to-[#43A047]"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <span className="rounded-md bg-[#8D6E63] px-1.5 py-0.5 text-[9px] font-black text-white">
                LV {level}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div
            className="flex items-center gap-1.5 rounded-xl border-2 border-[#F9A825] px-2.5 py-1.5 shadow-[0_3px_0_#E65100]"
            style={{ background: "linear-gradient(180deg, #FFE082, #FFD54F)" }}
          >
            <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden>
              <circle cx="16" cy="16" r="14" fill="#FFD600" stroke="#E65100" strokeWidth="2" />
              <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#E65100" fontWeight="bold">
                C
              </text>
            </svg>
            <span className="text-sm font-black text-[#5D4037]">{coins}</span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-xl border-2 border-[#0288D1] px-2.5 py-1.5 shadow-[0_3px_0_#01579B]"
            style={{ background: "linear-gradient(180deg, #B3E5FC, #4FC3F7)" }}
          >
            <svg width="16" height="16" viewBox="0 0 32 32" aria-hidden>
              <path
                d="M16 4 Q22 12 22 18 A6 6 0 0 1 10 18 Q10 12 16 4Z"
                fill="#0288D1"
              />
            </svg>
            <span className="text-sm font-black text-[#01579B]">
              {water}/{maxWater}
            </span>
          </div>
        </div>
      </div>
      {notification && (
        <p
          className="border-t-2 border-[#8D6E63]/30 px-4 py-2 text-center text-xs font-bold text-[#5D4037]"
          style={{ background: "rgba(255,248,225,0.9)" }}
        >
          {notification}
        </p>
      )}
    </header>
  );
}
