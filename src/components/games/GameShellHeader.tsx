"use client";

import Link from "next/link";
import { Character, type CharacterId } from "@/components/characters/Characters";

interface GameShellHeaderProps {
  title: string;
  backHref?: string;
  character?: CharacterId;
  scoreLabel?: string;
}

export function GameShellHeader({
  title,
  backHref = "/games",
  character = "fox",
  scoreLabel,
}: GameShellHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-brand-border bg-white px-5 py-4">
      <Link
        href={backHref}
        className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-border text-lg font-bold text-brand-text transition active:scale-[0.97]"
        aria-label="Back to Arcade"
      >
        ←
      </Link>
      <Character id={character} size={36} />
      <h1 className="font-display flex-1 text-xl text-brand-text">{title}</h1>
      {scoreLabel && (
        <div className="coin-badge text-sm">{scoreLabel}</div>
      )}
    </div>
  );
}
