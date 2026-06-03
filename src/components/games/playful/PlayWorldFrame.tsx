"use client";

import Link from "next/link";
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
  buddy: string;
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
  buddy,
  buddyLine,
  children,
  footer,
}: PlayWorldFrameProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl ring-4 ring-pink-100">
      <div className="flex items-center justify-between gap-2 bg-gradient-to-r from-violet-100 to-pink-100 px-4 py-3">
        <div>
          <p className="font-display text-lg font-extrabold text-violet-900">{title}</p>
          <p className="text-xs font-semibold text-violet-600">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl" aria-hidden>
            {buddy}
          </span>
          <Link
            href="/games"
            className="rounded-full bg-white px-3 py-1 text-xs font-bold text-violet-600 shadow"
          >
            Arcade
          </Link>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-violet-100 bg-violet-50/80 px-2 py-2">
        {tabs.map((tab) => (
          <GameButton
            key={tab.id}
            speak={tab.label}
            onClick={() => onTabChange(tab.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-display text-sm font-bold transition ${
              activeTab === tab.id
                ? "bg-violet-500 text-white shadow-md"
                : "bg-white text-violet-700 hover:bg-violet-100"
            }`}
          >
            <span aria-hidden>{tab.emoji}</span>
            {tab.label}
          </GameButton>
        ))}
      </div>

      <p className="bg-amber-50 px-4 py-2 text-center text-sm font-bold text-amber-900">
        {buddyLine}
      </p>

      <div className="min-h-[320px] sm:min-h-[380px]">{children}</div>

      {footer && (
        <div className="border-t border-violet-100 bg-violet-50/50 px-3 py-3">{footer}</div>
      )}
    </div>
  );
}
