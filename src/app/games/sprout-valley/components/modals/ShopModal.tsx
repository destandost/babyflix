"use client";

import { getCrop } from "../../lib/crops";
import { getProductSellPrice } from "../../lib/sellPrices";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";
import { ModalShell } from "./ModalShell";

export function ShopModal() {
  const inventory = useFarmStore((s) => s.inventory);
  const sellInventory = useFarmStore((s) => s.sellInventory);

  const entries = Object.entries(inventory).filter(([, qty]) => qty > 0);

  return (
    <ModalShell title="Farm market stall">
      <div className="p-4">
        <div className="mb-4 flex justify-center">
          <svg width="72" height="56" viewBox="0 0 72 56" aria-hidden>
            <rect x="4" y="32" width="64" height="18" fill="#8D6E63" rx="2" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={4 + i * 11}
                y={8}
                width={11}
                height={22}
                fill={i % 2 === 0 ? "#FF7043" : "#FFFFFF"}
              />
            ))}
            <text x="26" y="22" fontSize="10" fill="#5D4037" fontWeight="bold">
              SELL
            </text>
          </svg>
        </div>
        {entries.length === 0 ? (
          <p className="text-center text-sm font-semibold text-brand-muted">
            Harvest crops, then sell them at your stall on the farm.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {entries.map(([itemId, qty]) => {
              const crop = getCrop(itemId);
              const price = crop?.sellPrice ?? getProductSellPrice(itemId);
              const svgId = crop?.svgId ?? "prod-bread";
              return (
                <div
                  key={itemId}
                  className="flex items-center gap-3 rounded-2xl border-2 border-brand-border p-3"
                >
                  <SvgIcon id={svgId} size={36} />
                  <div className="flex-1">
                    <div className="font-display text-sm text-brand-text">
                      {crop?.name ?? itemId}
                    </div>
                    <div className="text-xs font-bold text-brand-muted">x{qty}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => sellInventory(itemId, 1)}
                    className="rounded-xl bg-brand-yellow px-3 py-2 font-display text-xs text-brand-text active:scale-95"
                  >
                    Sell {price}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-4 text-center text-[10px] font-semibold text-brand-muted">
          Tip: truck orders pay more than the stall!
        </p>
      </div>
    </ModalShell>
  );
}
