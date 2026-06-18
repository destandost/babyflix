import { CROPS } from "./crops";
import { MACHINE_TYPES } from "./machines";

const PRODUCT_PRICES: Record<string, number> = {
  egg: 15,
  milk: 18,
  wool: 22,
  bacon: 25,
};

export function getProductSellPrice(itemId: string): number {
  const crop = CROPS.find((c) => c.id === itemId);
  if (crop) return crop.sellPrice;
  if (PRODUCT_PRICES[itemId]) return PRODUCT_PRICES[itemId];
  for (const m of MACHINE_TYPES) {
    const p = m.products.find((pr) => pr.id === itemId);
    if (p) return p.sellPrice;
  }
  return 10;
}
