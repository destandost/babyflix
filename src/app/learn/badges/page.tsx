"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { BADGES, getAllEarnedBadges } from "@/lib/rewards";

export default function BadgesPage() {
  const router = useRouter();
  const [earned, setEarned] = useState<string[]>([]);

  useEffect(() => {
    setEarned(getAllEarnedBadges());
  }, []);

  return (
    <PageShell>
      <div className="bg-brand-off pb-6">
        <div className="flex items-center gap-3 px-5 pb-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-brand-border bg-white text-lg font-bold text-brand-text"
          >
            ←
          </button>
          <h1 className="font-display text-2xl text-brand-text">My Badges 🏆</h1>
        </div>
        <div className="px-4">
          <p className="mb-4 text-sm font-semibold text-brand-muted">
            {earned.length} of {Object.keys(BADGES).length} badges earned
          </p>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(BADGES).map((badge) => {
              const isEarned = earned.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-[20px] border-[2.5px] bg-white p-4 text-center transition-all ${
                    isEarned ? "border-brand-yellow" : "border-brand-border opacity-50"
                  }`}
                >
                  <div className={`mb-2 text-5xl ${!isEarned ? "grayscale" : ""}`}>{badge.icon}</div>
                  <div className="font-display text-[13px] text-brand-text">{badge.name}</div>
                  <div className="mt-1 text-[10px] font-semibold text-brand-muted">
                    {badge.description}
                  </div>
                  {isEarned && (
                    <div className="mt-2 inline-block rounded-full bg-brand-yellow px-3 py-0.5 text-[10px] font-black text-yellow-900">
                      EARNED ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
