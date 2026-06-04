import Link from "next/link";
import { FeatureCard } from "@/components/FeatureCard";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLanguageBanner } from "@/components/language/HomeLanguageBanner";
import { PageShell } from "@/components/PageShell";
import { HOME_SECTIONS } from "@/lib/features";
import { HOME_SECTION_UI, SHOW_CATALOG } from "@/lib/ui-catalog";
import { GAMES } from "@/lib/games";

export default function HomePage() {
  return (
    <PageShell>
      <HomeHero />

      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-display text-xl text-brand-text">Keep Watching</h2>
        <Link href="/shows" className="text-xs font-black text-brand-purple">
          See all →
        </Link>
      </div>

      <div className="scrollbar-hide flex gap-3.5 overflow-x-auto px-5 pb-6">
        {SHOW_CATALOG.slice(0, 4).map((show) => (
          <Link
            key={show.id}
            href="/shows"
            className="min-w-[116px] flex-shrink-0 text-left transition-transform active:scale-[0.97]"
          >
            <div
              className="relative mb-2 flex h-24 items-center justify-center overflow-hidden rounded-3xl"
              style={{ background: show.gradient }}
            >
              <span className="absolute left-2 top-2 rounded-lg bg-brand-pink px-2 py-0.5 text-[9px] font-black text-white">
                {show.badge}
              </span>
              <Character id={show.character} size={80} />
            </div>
            <div className="text-xs font-black leading-tight text-brand-text">{show.name}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">
              {show.episodes} episodes
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-display text-xl text-brand-text">Arcade</h2>
        <Link href="/games" className="text-xs font-black text-brand-purple">
          See all →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-6">
        {GAMES.slice(0, 4).map((game) => (
          <Link
            key={game.id}
            href={game.route}
            className="relative overflow-hidden rounded-3xl p-4 text-left transition-transform active:scale-[0.97]"
            style={{ background: game.gradient, boxShadow: game.shadow }}
          >
            <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/10" />
            <Character id={game.character as CharacterId} size={56} className="relative z-10 mb-2.5" />
            <div className="relative z-10 font-display text-base text-white">{game.name}</div>
            <div className="relative z-10 mt-0.5 text-[10px] font-bold text-white/75">
              {game.description}
            </div>
            <div className="relative z-10 mt-2 text-[10px] font-black text-brand-yellow">
              🪙 +{game.coins} per win
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-3 px-5">
        <h2 className="font-display text-xl text-brand-text">Explore</h2>
      </div>

      <HomeLanguageBanner />

      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {HOME_SECTIONS.map((section) => {
          const ui = HOME_SECTION_UI[section.href];
          if (!ui) return null;
          return (
            <FeatureCard
              key={section.href}
              href={section.href}
              title={section.title}
              description={section.description}
              character={ui.character}
              gradient={ui.gradient}
              shadow={ui.shadow}
            />
          );
        })}
      </div>
    </PageShell>
  );
}
