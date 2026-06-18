import { CROPS } from "./crops";

export interface Order {
  id: string;
  items: { cropId: string; qty: number }[];
  reward: number;
  expiresAt: number;
  filled: boolean;
}

export const ORDER_DURATION_MS = 4 * 60 * 60 * 1000;
export const ORDER_COUNT = 3;

export function generateOrder(level: number, availableCrops: string[]): Order {
  const numItems = level < 3 ? 1 : level < 6 ? 2 : 3;
  const items: { cropId: string; qty: number }[] = [];
  const used = new Set<string>();

  for (let i = 0; i < numItems; i++) {
    const pool = availableCrops.filter((c) => !used.has(c));
    if (!pool.length) break;
    const cropId = pool[Math.floor(Math.random() * pool.length)];
    used.add(cropId);
    const qty = Math.floor(Math.random() * 3) + 1;
    items.push({ cropId, qty });
  }

  const baseReward = items.reduce((sum, item) => {
    const crop = CROPS.find((c) => c.id === item.cropId);
    return sum + (crop?.sellPrice ?? 10) * item.qty;
  }, 0);

  return {
    id: `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    items,
    reward: Math.max(10, Math.floor(baseReward * 1.5)),
    expiresAt: Date.now() + ORDER_DURATION_MS,
    filled: false,
  };
}

export function generateOrders(level: number, availableCrops: string[]): Order[] {
  const crops =
    availableCrops.length > 0
      ? availableCrops
      : CROPS.filter((c) => c.unlockLevel <= level).map((c) => c.id);
  return Array.from({ length: ORDER_COUNT }, () => generateOrder(level, crops));
}
