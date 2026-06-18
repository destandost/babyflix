"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Character } from "@/components/characters/Characters";
import {
  COIN_PACKS,
  getShopAvatars,
  getSpendableCoins,
  purchaseAvatar,
  purchaseCoinPack,
} from "@/lib/shop";

export function ShopClient() {
  const router = useRouter();
  const [spendableCoins, setSpendableCoins] = useState(0);
  const [avatars, setAvatars] = useState(getShopAvatars);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const refresh = useCallback(() => {
    setSpendableCoins(getSpendableCoins());
    setAvatars(getShopAvatars());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function buyPack(packId: string) {
    setMessage("");
    setError("");
    const result = purchaseCoinPack(packId);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    refresh();
    setMessage("Coins added to your wallet!");
  }

  function buyAvatar(avatarId: string) {
    setMessage("");
    setError("");
    const result = purchaseAvatar(avatarId);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    refresh();
    setMessage("Avatar unlocked!");
    router.refresh();
  }

  return (
    <div className="pb-8">
      <div
        className="mx-4 mb-5 rounded-4xl p-5 text-white"
        style={{
          background: "linear-gradient(135deg, #FFB800, #FF4D8D)",
          boxShadow: "0 8px 32px rgba(255,77,141,0.25)",
        }}
      >
        <h1 className="font-display mb-1 text-2xl">Coin Shop</h1>
        <p className="text-sm font-semibold text-white/90">
          Unlock avatars and boost learning rewards
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/25 px-4 py-2">
          <svg width="18" height="18" viewBox="0 0 32 32" aria-hidden>
            <circle cx="16" cy="16" r="14" fill="#FFD600" stroke="#CC9900" strokeWidth="2" />
            <text x="16" y="21" textAnchor="middle" fontSize="12" fill="#CC8800" fontWeight="bold">
              C
            </text>
          </svg>
          <span className="font-display text-lg">{spendableCoins}</span>
          <span className="text-xs font-bold text-white/80">coins available</span>
        </div>
      </div>

      {(message || error) && (
        <p
          className={`mx-4 mb-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            error ? "bg-brand-coral/10 text-brand-coral" : "bg-brand-teal/15 text-brand-teal"
          }`}
        >
          {error || message}
        </p>
      )}

      <h2 className="font-display mb-3 px-5 text-lg text-brand-text">Coin packs</h2>
      <p className="mb-3 px-5 text-xs font-semibold text-brand-muted">
        Demo checkout — coins are added instantly on this device.
      </p>
      <div className="mb-8 space-y-3 px-4">
        {COIN_PACKS.map((pack) => (
          <div
            key={pack.id}
            className="flex items-center gap-4 rounded-3xl border-2 border-brand-border bg-white p-4"
          >
            <span className="text-3xl">{pack.emoji}</span>
            <div className="flex-1">
              <div className="font-display text-base text-brand-text">{pack.name}</div>
              <div className="text-sm font-semibold text-brand-muted">
                +{pack.coins} coins · {pack.priceLabel}
              </div>
            </div>
            <button
              type="button"
              onClick={() => buyPack(pack.id)}
              className="rounded-2xl bg-brand-purple px-4 py-2 text-xs font-black text-white"
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      <h2 className="font-display mb-3 px-5 text-lg text-brand-text">Avatar unlocks</h2>
      <p className="mb-3 px-5 text-xs font-semibold text-brand-muted">
        Spend coins you earn in Learn, or coins from packs above.
      </p>
      <div className="grid grid-cols-2 gap-3 px-4">
        {avatars.map((item) => (
          <div
            key={item.id}
            className={`rounded-3xl border-2 p-4 ${
              item.owned ? "border-brand-teal bg-brand-teal/10" : "border-brand-border bg-white"
            }`}
          >
            <div className="mb-2 flex justify-center">
              <Character id={item.char} size={72} />
            </div>
            <div className="text-center font-display text-sm text-brand-text">{item.name}</div>
            <div className="mb-3 text-center text-xs font-bold text-brand-muted">
              {item.owned ? "Owned" : `${item.price} coins`}
            </div>
            {!item.owned && (
              <button
                type="button"
                onClick={() => buyAvatar(item.id)}
                className="w-full rounded-2xl bg-brand-yellow py-2 text-xs font-black text-brand-text"
              >
                Unlock
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
