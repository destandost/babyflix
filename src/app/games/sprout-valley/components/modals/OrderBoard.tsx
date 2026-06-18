"use client";

import { CROPS } from "../../lib/crops";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";
import { ModalShell } from "./ModalShell";

export function OrderBoard() {
  const orders = useFarmStore((s) => s.orders);
  const inventory = useFarmStore((s) => s.inventory);
  const fillOrder = useFarmStore((s) => s.fillOrder);

  return (
    <ModalShell title="Delivery truck">
      <div className="p-4">
        <p className="mb-4 text-xs font-bold text-brand-muted">
          The truck is waiting! Fill orders to earn bonus coins.
        </p>
        <div className="flex flex-col gap-3">
          {orders
            .filter((o) => !o.filled)
            .map((order) => {
              const canFill = order.items.every(
                (item) => (inventory[item.cropId] ?? 0) >= item.qty,
              );
              const timeLeft = Math.max(0, order.expiresAt - Date.now());
              const timeLeftMins = Math.floor(timeLeft / 60000);
              const pct = (timeLeft / (4 * 60 * 60 * 1000)) * 100;

              return (
                <div
                  key={order.id}
                  className={`rounded-[20px] border-[2.5px] bg-white p-4 ${
                    canFill ? "border-green-400" : "border-brand-border"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <svg width="52" height="40" viewBox="0 0 90 70" aria-hidden>
                      <rect x="5" y="25" width="55" height="35" rx="5" fill="#FF7043" stroke="#BF360C" strokeWidth="2" />
                      <rect x="60" y="35" width="25" height="25" rx="4" fill="#FF8A65" stroke="#BF360C" strokeWidth="2" />
                      <rect x="62" y="37" width="20" height="14" rx="2" fill="#B3E5FC" />
                      <circle cx="20" cy="62" r="8" fill="#424242" />
                      <circle cx="68" cy="62" r="8" fill="#424242" />
                    </svg>
                    <div className="flex flex-1 flex-wrap gap-2">
                      {order.items.map((item) => {
                        const crop = CROPS.find((c) => c.id === item.cropId);
                        const have = inventory[item.cropId] ?? 0;
                        const enough = have >= item.qty;
                        return (
                          <div
                            key={`${order.id}-${item.cropId}`}
                            className={`flex items-center gap-1.5 rounded-[10px] border px-2.5 py-1.5 ${
                              enough ? "border-green-300 bg-green-50" : "border-red-200 bg-red-50"
                            }`}
                          >
                            {crop && <SvgIcon id={crop.svgId} size={28} />}
                            <div>
                              <div className="font-display text-[11px] text-brand-text">
                                {crop?.name}
                              </div>
                              <div
                                className={`text-[10px] font-black ${enough ? "text-green-700" : "text-red-500"}`}
                              >
                                {have}/{item.qty}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-brand-off">
                    <div
                      className={`h-full rounded-full ${pct < 25 ? "bg-red-400" : "bg-green-400"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-brand-muted">{timeLeftMins}m left</span>
                    <button
                      type="button"
                      disabled={!canFill}
                      onClick={() => fillOrder(order.id)}
                      className={`rounded-[14px] px-4 py-2 font-display text-[13px] text-white ${
                        canFill ? "bg-green-500 active:scale-95" : "cursor-not-allowed bg-[#D0D0E0]"
                      }`}
                    >
                      +{order.reward} coins
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </ModalShell>
  );
}
