"use client";

import Link from "next/link";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { GameButton } from "@/components/games/GameButton";

export interface PlayTab {
  id: string;
  label: string;
  emoji: string;
}

interface PlayWorldFrameProps {
  title: string;
  subtitle: string;
  tabs: PlayTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  buddyCharacter: CharacterId;
  buddyLine: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function PlayWorldFrame({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  buddyCharacter,
  buddyLine,
  children,
  footer,
}: PlayWorldFrameProps) {
  return (
    <div className="overflow-hidden rounded-4xl bg-white shadow-purple ring-2 ring-brand-border">
      <div
        className="flex items-center justify-between gap-2 px-4 py-3"
        style={{ background: "linear-gradient(135deg, #7B4FFF, #FF4D8D)" }}
      >
        <div>
          <p className="font-display text-lg text-white">{title}</p>
          <p className="text-xs font-semibold text-white/80">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <Character id={buddyCharacter} size={44} />
          <Link
            href="/games"
            className="rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white"
          >
            Arcade
          </Link>
        </div>
      </div>

      <div className="scrollbar-hide flex gap-1 overflow-x-auto border-b border-brand-border bg-brand-off px-2 py-2">
        {tabs.map((tab) => (
          <GameButton
            key={tab.id}
            speak={tab.label}
            onClick={() => onTabChange(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-bold transition active:scale-[0.97] ${
              activeTab === tab.id
                ? "bg-brand-purple text-white shadow-purple"
                : "bg-white text-brand-muted"
            }`}
          >
            <span aria-hidden>{tab.emoji}</span>
            {tab.label}
          </GameButton>
        ))}
      </div>

      <p className="bg-brand-yellow/20 px-4 py-2 text-center text-sm font-bold text-brand-text">
        {buddyLine}
      </p>

      <div className="min-h-[320px] sm:min-h-[380px]">{children}</div>

      {footer && (
        <div className="border-t border-violet-100 bg-violet-50/50 px-3 py-3">{footer}</div>
      )}
    </div>
  );
}
