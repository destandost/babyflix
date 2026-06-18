"use client";

import { MACHINE_TYPES, getMachineType } from "../../lib/machines";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";
import { ModalShell } from "./ModalShell";

export function MachineModal() {
  const level = useFarmStore((s) => s.level);
  const coins = useFarmStore((s) => s.coins);
  const machines = useFarmStore((s) => s.machines);
  const buyMachine = useFarmStore((s) => s.buyMachine);
  const startMachine = useFarmStore((s) => s.startMachine);
  const collectMachineProduct = useFarmStore((s) => s.collectMachineProduct);

  return (
    <ModalShell title="Production">
      <div className="p-4 space-y-4">
        {machines.map((machine) => {
          const mType = getMachineType(machine.type);
          if (!mType) return null;
          const ready =
            machine.producing &&
            machine.readyAt &&
            Date.now() >= machine.readyAt;
          return (
            <div key={machine.id} className="rounded-3xl border-2 border-brand-border p-3">
              <div className="mb-2 flex items-center gap-2">
                <SvgIcon id={mType.svgId} size={36} />
                <span className="font-display text-base text-brand-text">{mType.name}</span>
              </div>
              {ready && (
                <button
                  type="button"
                  onClick={() => collectMachineProduct(machine.id)}
                  className="mb-2 w-full rounded-xl bg-green-500 py-2 font-display text-sm text-white"
                >
                  Collect {machine.producing}
                </button>
              )}
              {machine.producing && !ready && (
                <p className="mb-2 text-xs font-bold text-brand-muted">Cooking...</p>
              )}
              <div className="flex flex-wrap gap-2">
                {mType.products
                  .filter((p) => p.unlockLevel <= level)
                  .map((product) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => startMachine(machine.id, product.id)}
                      className="rounded-xl border border-brand-purple bg-brand-purple/5 px-2 py-1 font-display text-[11px] text-brand-text"
                    >
                      {product.name}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
        <p className="text-xs font-bold text-brand-muted">Build machines</p>
        <div className="grid grid-cols-2 gap-3">
          {MACHINE_TYPES.map((type) => {
            const owned = machines.some((m) => m.type === type.id);
            const locked = type.unlockLevel > level;
            return (
              <button
                key={type.id}
                type="button"
                disabled={owned || locked || coins < type.cost}
                onClick={() => buyMachine(type.id)}
                className="rounded-3xl border-2 border-brand-border p-3 disabled:opacity-50"
              >
                <div className="mb-2 flex justify-center">
                  <SvgIcon id={type.svgId} size={40} />
                </div>
                <div className="font-display text-sm text-brand-text">{type.name}</div>
                <div className="text-xs font-bold text-brand-muted">
                  {owned ? "Owned" : locked ? `Lv ${type.unlockLevel}` : `${type.cost} coins`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </ModalShell>
  );
}
