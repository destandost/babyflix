import { getTotalCoins, spendEarnedCoins } from "@/lib/rewards";
import { SHOP_AVATAR_ITEMS, type ShopAvatarItem } from "@/lib/shop-avatars";

export interface CoinPack {
  id: string;
  name: string;
  coins: number;
  priceLabel: string;
  emoji: string;
}

export const COIN_PACKS: CoinPack[] = [
  { id: "pack-small", name: "Coin Pouch", coins: 100, priceLabel: "£1.99", emoji: "🪙" },
  { id: "pack-medium", name: "Treasure Chest", coins: 300, priceLabel: "£4.99", emoji: "💰" },
  { id: "pack-large", name: "Golden Hoard", coins: 800, priceLabel: "£9.99", emoji: "👑" },
];

const GUEST_SHOP_KEY = "babyflix_guest_shop";

interface GuestShopState {
  bonusCoins: number;
  ownedAvatars: string[];
}

function readGuestShop(): GuestShopState {
  if (typeof window === "undefined") {
    return { bonusCoins: 0, ownedAvatars: [] };
  }
  try {
    const raw = localStorage.getItem(GUEST_SHOP_KEY);
    if (!raw) return { bonusCoins: 0, ownedAvatars: [] };
    const parsed = JSON.parse(raw) as GuestShopState;
    return {
      bonusCoins: parsed.bonusCoins ?? 0,
      ownedAvatars: Array.isArray(parsed.ownedAvatars) ? parsed.ownedAvatars : [],
    };
  } catch {
    return { bonusCoins: 0, ownedAvatars: [] };
  }
}

function writeGuestShop(state: GuestShopState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GUEST_SHOP_KEY, JSON.stringify(state));
}

export function getBonusCoins(): number {
  return readGuestShop().bonusCoins;
}

export function getSpendableCoins(): number {
  return getTotalCoins() + getBonusCoins();
}

export function getShopAvatars(): ShopAvatarItem[] {
  const owned = new Set(readGuestShop().ownedAvatars);
  return SHOP_AVATAR_ITEMS.map((item) => ({
    ...item,
    owned: owned.has(item.id),
  }));
}

export function purchaseCoinPack(
  packId: string,
): { ok: true } | { ok: false; error: string } {
  const pack = COIN_PACKS.find((p) => p.id === packId);
  if (!pack) return { ok: false, error: "That pack is not available." };

  const guest = readGuestShop();
  writeGuestShop({ ...guest, bonusCoins: guest.bonusCoins + pack.coins });
  return { ok: true };
}

export function purchaseAvatar(
  avatarId: string,
): { ok: true } | { ok: false; error: string } {
  const item = SHOP_AVATAR_ITEMS.find((a) => a.id === avatarId);
  if (!item) return { ok: false, error: "Avatar not found." };

  const guest = readGuestShop();
  if (guest.ownedAvatars.includes(avatarId)) {
    return { ok: false, error: "You already own this avatar!" };
  }

  const spendable = getSpendableCoins();
  if (spendable < item.price) {
    return {
      ok: false,
      error: `You need ${item.price} coins. You have ${spendable}. Earn more in Learn or buy a coin pack.`,
    };
  }

  let remaining = item.price;
  const fromBonus = Math.min(guest.bonusCoins, remaining);
  remaining -= fromBonus;

  const nextGuest: GuestShopState = {
    bonusCoins: guest.bonusCoins - fromBonus,
    ownedAvatars: guest.ownedAvatars,
  };

  if (remaining > 0) {
    const spent = spendEarnedCoins(remaining);
    if (!spent) {
      return { ok: false, error: "Could not complete purchase. Try again." };
    }
  }

  writeGuestShop({
    ...nextGuest,
    ownedAvatars: [...nextGuest.ownedAvatars, avatarId],
  });

  return { ok: true };
}
