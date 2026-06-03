import Link from "next/link";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { MINI_GAMES, PLAY_ZONE_LABELS, PLAY_ZONE_ORDER } from "@/lib/games";
import { GAME_CARD_COLORS, GAME_UI } from "@/lib/ui-catalog";

export default function PlayPage() {
  return (
    <PageShell>
      <div
        className="mx-4 mb-5 rounded-4xl p-5 text-center"
        style={{
          background: "linear-gradient(135deg, #2ECC71, #00C9B1)",
          boxShadow: "0 8px 24px rgba(0,201,177,0.3)",
        }}
      >
        <div className="mb-2 flex justify-center">
          <Character id="bunny" size={72} animate />
        </div>
        <h1 className="font-display text-3xl text-white">Arcade</h1>
        <p className="mx-auto mt-2 max-w-xs text-sm font-semibold text-white/90">
          Tap, drag, trace, and paint — just for fun!
        </p>
      </div>

      {PLAY_ZONE_ORDER.map((zone) => {
        const games = MINI_GAMES.filter((g) => g.zone === zone);
        return (
          <section key={zone} className="mb-8">
            <h2 className="font-display px-5 text-lg text-brand-text">
              {PLAY_ZONE_LABELS[zone]}
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 px-4">
              {games.map((game) => {
                const ui = GAME_UI[game.id];
                const colors = ui ? GAME_CARD_COLORS[ui.type] : GAME_CARD_COLORS.catch;
                return (
                  <Link
                    key={game.id}
                    href={game.href}
                    className="relative overflow-hidden rounded-3xl p-4 text-left transition-transform active:scale-[0.97]"
                    style={{ background: colors.bg, boxShadow: colors.shadow }}
                  >
                    <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/10" />
                    {ui && (
                      <Character id={ui.character} size={56} className="relative z-10 mb-2" />
                    )}
                    <p className="relative z-10 font-display text-base text-white">
                      {game.title}
                    </p>
                    <p className="relative z-10 mt-1 text-[10px] font-bold text-white/75">
                      {game.depth}
                    </p>
                    <span className="relative z-10 mt-3 inline-block rounded-full bg-white/25 px-3 py-1 font-display text-xs font-bold text-white">
                      Play →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
