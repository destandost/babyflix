"use client";

import { ANIMAL_TYPES } from "../../lib/animals";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";
import { ModalShell } from "./ModalShell";

export function AnimalModal() {
  const level = useFarmStore((s) => s.level);
  const coins = useFarmStore((s) => s.coins);
  const animals = useFarmStore((s) => s.animals);
  const buyAnimal = useFarmStore((s) => s.buyAnimal);
  const collectAnimalProduct = useFarmStore((s) => s.collectAnimalProduct);

  return (
    <ModalShell title="Animal pens">
      <div className="p-4">
        {animals.length > 0 && (
          <>
            <p className="mb-2 text-xs font-bold text-brand-muted">Your animals</p>
            <div className="mb-4 flex flex-col gap-2">
              {animals.map((animal) => {
                const type = ANIMAL_TYPES.find((a) => a.id === animal.type);
                return (
                  <div
                    key={animal.id}
                    className="flex items-center gap-3 rounded-2xl border-2 border-brand-border p-3"
                  >
                    {type && <SvgIcon id={type.svgId} size={40} />}
                    <div className="flex-1 font-display text-sm text-brand-text">
                      {animal.name}
                    </div>
                    <button
                      type="button"
                      disabled={!animal.productReady}
                      onClick={() => collectAnimalProduct(animal.id)}
                      className={`rounded-xl px-3 py-2 font-display text-xs text-white ${
                        animal.productReady ? "bg-green-500" : "cursor-not-allowed bg-brand-border"
                      }`}
                    >
                      Collect
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <p className="mb-2 text-xs font-bold text-brand-muted">Buy animals</p>
        <div className="grid grid-cols-2 gap-3">
          {ANIMAL_TYPES.map((type) => {
            const locked = type.unlockLevel > level;
            return (
              <button
                key={type.id}
                type="button"
                disabled={locked || coins < type.penCost}
                onClick={() => buyAnimal(type.id)}
                className="rounded-3xl border-2 border-brand-border p-3 disabled:opacity-50"
              >
                <div className="mb-2 flex justify-center">
                  <SvgIcon id={type.svgId} size={44} />
                </div>
                <div className="font-display text-sm text-brand-text">{type.name}</div>
                <div className="text-xs font-bold text-brand-muted">
                  {locked ? `Lv ${type.unlockLevel}` : `${type.penCost} coins`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}
