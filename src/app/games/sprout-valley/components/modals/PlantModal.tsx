"use client";

import { CROPS } from "../../lib/crops";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";
import { ModalShell } from "./ModalShell";

export function PlantModal() {
  const level = useFarmStore((s) => s.level);
  const coins = useFarmStore((s) => s.coins);
  const selectedPlot = useFarmStore((s) => s.selectedPlot);
  const plantCrop = useFarmStore((s) => s.plantCrop);

  if (!selectedPlot) return null;

  return (
    <ModalShell title="Plant seeds">
      <div className="grid grid-cols-2 gap-3 p-4">
        {CROPS.map((crop) => {
          const locked = crop.unlockLevel > level;
          const afford = coins >= crop.buyCost;
          return (
            <button
              key={crop.id}
              type="button"
              disabled={locked || !afford}
              onClick={() => plantCrop(selectedPlot, crop.id)}
              className={`rounded-3xl border-2 p-3 text-left ${
                locked || !afford
                  ? "border-brand-border opacity-50"
                  : "border-brand-purple bg-brand-purple/5 active:scale-95"
              }`}
            >
              <div className="mb-2 flex justify-center">
                <SvgIcon id={crop.svgId} size={40} />
              </div>
              <div className="font-display text-sm text-brand-text">{crop.name}</div>
              <div className="text-xs font-bold text-brand-muted">
                {locked ? `Lv ${crop.unlockLevel}` : `${crop.buyCost} coins`}
              </div>
            </button>
          );
        })}
      </div>
    </ModalShell>
  );
}
