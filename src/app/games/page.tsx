"use client";

import Link from "next/link";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { GAMES } from "@/lib/games";

export default function GamesPage() {
  return (
    <PageShell>
      <div className="min-h-screen bg-brand-off">
      <div className="px-5 pb-2 pt-6">
        <h1 className="font-display text-3xl text-brand-text">Play & Learn 🎮</h1>
        <p className="mt-1 text-sm font-semibold text-brand-muted">Earn coins as you play!</p>
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 pt-4">
        {GAMES.map((game) => (
          <Link
            key={game.id}
            href={game.route}
            className="relative block overflow-hidden rounded-3xl p-4 text-left transition-transform active:scale-[0.96]"
            style={{ background: game.gradient, boxShadow: game.shadow }}
          >
            <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/10" />
            <div className="relative z-10">
              <Character id={game.character as CharacterId} size={60} className="mb-2" />
              <div className="font-display text-[15px] text-white">{game.name}</div>
              <div className="mt-1 text-[10px] font-semibold text-white/70">{game.description}</div>
              <div className="mt-2 text-[10px] font-black text-brand-yellow">🪙 +{game.coins} coins</div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </PageShell>
  );
}
