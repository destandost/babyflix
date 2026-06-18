"use client";

import { useFarmStore } from "../../store/farmStore";
import { ModalShell } from "./ModalShell";

export function BuildModal() {
  const coins = useFarmStore((s) => s.coins);
  const unlockedCols = useFarmStore((s) => s.unlockedCols);
  const unlockedRows = useFarmStore((s) => s.unlockedRows);
  const expandFarm = useFarmStore((s) => s.expandFarm);
  const buyBuilding = useFarmStore((s) => s.buyBuilding);
  const setModal = useFarmStore((s) => s.setModal);

  return (
    <ModalShell title="Build & expand">
      <div className="p-4 space-y-3">
        <button
          type="button"
          onClick={() => expandFarm()}
          className="flex w-full items-center gap-3 rounded-3xl border-2 border-brand-purple bg-brand-purple/5 p-4 active:scale-[0.98]"
        >
          <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
            <rect x="8" y="20" width="32" height="20" fill="#AED581" stroke="#558B2F" strokeWidth="2" />
            <polygon points="24,8 40,20 8,20" fill="#81C784" />
          </svg>
          <div className="text-left">
            <div className="font-display text-sm text-brand-text">Expand farm</div>
            <div className="text-xs font-bold text-brand-muted">
              {unlockedCols}x{unlockedRows} · 120 coins
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            buyBuilding("silo");
          }}
          disabled={coins < 80}
          className="flex w-full items-center gap-3 rounded-3xl border-2 border-brand-border p-4 disabled:opacity-50"
        >
          <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden>
            <ellipse cx="24" cy="32" rx="14" ry="10" fill="#B0BEC5" />
            <rect x="14" y="12" width="20" height="22" rx="4" fill="#CFD8DC" />
          </svg>
          <div className="text-left">
            <div className="font-display text-sm text-brand-text">Silo</div>
            <div className="text-xs font-bold text-brand-muted">80 coins</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setModal("animals");
          }}
          className="w-full rounded-2xl border-2 border-brand-border py-3 font-display text-sm text-brand-purple"
        >
          Open animal pens
        </button>
        <button
          type="button"
          onClick={() => setModal("machines")}
          className="w-full rounded-2xl border-2 border-brand-border py-3 font-display text-sm text-brand-purple"
        >
          Open machines
        </button>
      </div>
    </ModalShell>
  );
}
