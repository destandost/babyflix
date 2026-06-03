"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Character } from "@/components/characters/Characters";
import { EMOJI_TO_CHARACTER } from "@/lib/ui-catalog";
import {
  buildLeaderboard,
  getPlayerProfile,
  getStoredXp,
  setPlayerProfile,
  xpIntoCurrentLevel,
  XP_PER_LEVEL,
  type LeaderboardEntry,
} from "@/lib/xp";
import type { CharacterId } from "@/components/characters/Characters";

const AVATARS = ["🦊", "🐻", "🐰", "🦁", "🐼", "🐸", "🦄"];

function entryCharacter(emoji: string): CharacterId {
  return EMOJI_TO_CHARACTER[emoji] ?? "fox";
}

export function LeaderboardBoard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [playerXp, setPlayerXp] = useState(0);
  const [name, setName] = useState("You");
  const [emoji, setEmoji] = useState("🧒");

  const refresh = useCallback(() => {
    setEntries(buildLeaderboard());
    setPlayerXp(getStoredXp());
    const profile = getPlayerProfile();
    setName(profile.name);
    setEmoji(profile.emoji);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, [refresh]);

  const saveProfile = () => {
    setPlayerProfile({
      name: name.trim().slice(0, 16) || "You",
      emoji,
    });
    refresh();
  };

  const player = entries.find((e) => e.isPlayer);
  const levelProgress = xpIntoCurrentLevel(playerXp);
  const top3 = entries.slice(0, 3);
  const podiumOrder = top3.length >= 3 ? [top3[1], top3[0], top3[2]] : top3;

  return (
    <>
      <div
        className="mx-4 mb-4 rounded-4xl p-5"
        style={{ background: "linear-gradient(135deg, #7B4FFF, #FF4D8D)" }}
      >
        <h2 className="font-display mb-4 text-center text-xl text-white">🏆 Weekly Stars</h2>
        {podiumOrder.length > 0 && (
          <div className="flex items-end justify-center gap-2">
            {podiumOrder.map((entry, i) => {
              const place = i === 0 ? 2 : i === 1 ? 1 : 3;
              const sizes = [56, 68, 52];
              const heights = ["h-10", "h-14", "h-8"];
              return (
                <div key={entry.id} className="flex flex-col items-center">
                  <Character id={entryCharacter(entry.emoji)} size={sizes[i] ?? 52} />
                  <div className="mt-1 rounded-xl bg-white/20 px-2 py-1">
                    <div className="font-display text-xs text-white">{entry.name}</div>
                    <div className="text-center text-xs font-black text-brand-yellow">
                      {entry.xp}⭐
                    </div>
                  </div>
                  <div
                    className={`mt-1 flex w-12 ${heights[i]} items-center justify-center rounded-t-xl bg-white/20 font-display text-white ${
                      place === 1 ? "text-xl" : "text-lg"
                    }`}
                  >
                    {place}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mx-4 mb-4 rounded-3xl border border-brand-border bg-white p-4">
        <p className="font-display text-sm font-bold text-brand-text">Your leaderboard name</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {AVATARS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`rounded-2xl p-2 transition active:scale-[0.97] ${
                emoji === e ? "bg-brand-purple/15 ring-2 ring-brand-purple" : "bg-brand-off"
              }`}
            >
              <Character id={entryCharacter(e)} size={36} />
            </button>
          ))}
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={16}
          className="mt-3 w-full rounded-2xl border-2 border-brand-border px-4 py-2 font-display text-brand-text"
          placeholder="Your name"
        />
        <button type="button" onClick={saveProfile} className="btn-primary mt-3 text-sm">
          Save
        </button>
      </div>

      {player && (
        <div
          className="mx-4 mb-4 rounded-4xl p-5 text-white"
          style={{ background: "linear-gradient(135deg, #FFD600, #FF6B4A)" }}
        >
          <p className="text-xs font-black uppercase tracking-wide text-white/80">Your rank</p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="font-display text-4xl font-extrabold">#{player.rank}</span>
            <Character id={entryCharacter(player.emoji)} size={56} />
            <div>
              <p className="font-display text-xl font-extrabold">{player.name}</p>
              <p className="text-sm text-white/95">
                Level {player.level} · {playerXp.toLocaleString()} XP
              </p>
            </div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${(levelProgress / XP_PER_LEVEL) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs font-bold text-white/80">
            {levelProgress} / {XP_PER_LEVEL} XP to next level
          </p>
          <Link href="/learn" className="btn-primary mt-4 inline-block bg-white text-brand-coral">
            Take a quiz →
          </Link>
        </div>
      )}

      <div className="px-4 pb-8">
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            className={`mb-2.5 flex items-center gap-3 rounded-[18px] border-[2.5px] bg-white p-3.5 ${
              entry.isPlayer ? "border-brand-purple bg-brand-purple/5" : "border-brand-border"
            }`}
          >
            <span
              className={`font-display w-7 text-center text-lg ${
                i === 0
                  ? "text-brand-yellow"
                  : i === 1
                    ? "text-gray-400"
                    : i === 2
                      ? "text-brand-coral"
                      : "text-brand-muted"
              }`}
            >
              {i + 1}
            </span>
            <Character id={entryCharacter(entry.emoji)} size={40} />
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm text-brand-text">
                {entry.name}
                {entry.isPlayer && " (you!)"}
              </div>
              <div className="text-[10px] font-semibold text-brand-muted">
                Level {entry.level} · {entry.xp.toLocaleString()} XP
              </div>
            </div>
            <div className="font-display text-base text-brand-purple">{entry.xp}⭐</div>
          </div>
        ))}
      </div>

      <p className="px-4 pb-6 text-center text-xs text-brand-muted">
        Friend names are sample players — your XP comes from quizzes on this device.
      </p>
    </>
  );
}
