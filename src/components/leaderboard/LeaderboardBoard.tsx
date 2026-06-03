"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  buildLeaderboard,
  getPlayerProfile,
  getStoredXp,
  setPlayerProfile,
  xpIntoCurrentLevel,
  XP_PER_LEVEL,
  type LeaderboardEntry,
} from "@/lib/xp";

const AVATARS = ["🧒", "🦊", "🐻", "🐰", "🦁", "🐼", "🐸", "🦄"];

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

  return (
    <>
      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-violet-100">
        <p className="font-display text-sm font-bold text-violet-900">Your leaderboard name</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {AVATARS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setEmoji(e)}
              className={`rounded-full px-3 py-2 text-2xl ${
                emoji === e ? "bg-violet-200 ring-2 ring-violet-400" : "bg-violet-50"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={16}
          className="mt-3 w-full rounded-xl border-2 border-violet-100 px-4 py-2 font-display text-violet-900"
          placeholder="Your name"
        />
        <button
          type="button"
          onClick={saveProfile}
          className="mt-3 rounded-full bg-violet-500 px-5 py-2 font-display text-sm font-bold text-white"
        >
          Save
        </button>
      </div>

      {player && (
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-6 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-100">
            Your rank
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-4">
            <span className="font-display text-4xl font-extrabold">#{player.rank}</span>
            <span className="text-5xl" aria-hidden>
              {player.emoji}
            </span>
            <div>
              <p className="font-display text-xl font-extrabold">{player.name}</p>
              <p className="text-sm text-white/95">
                Level {player.level} · {playerXp.toLocaleString()} XP
                {player.quizStars
                  ? ` · ${player.quizStars} perfect quiz${player.quizStars === 1 ? "" : "zes"}`
                  : ""}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs font-bold text-amber-100">
              <span>Level {player.level}</span>
              <span>
                {levelProgress} / {XP_PER_LEVEL} XP to next level
              </span>
            </div>
            <div className="mt-1 h-3 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${(levelProgress / XP_PER_LEVEL) * 100}%` }}
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-amber-50">
            Quiz scores add XP — 10 per right answer, +15 bonus for a perfect quiz.
          </p>
          <Link
            href="/learn"
            className="mt-4 inline-block rounded-full bg-white px-5 py-2 font-display text-sm font-bold text-orange-700"
          >
            Take a quiz →
          </Link>
        </div>
      )}

      <ol className="mt-8 space-y-3">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`flex items-center gap-4 rounded-2xl px-5 py-4 shadow-md ring-2 ${
              entry.isPlayer ? "bg-amber-50 ring-amber-300" : "bg-white ring-violet-100"
            }`}
          >
            <span
              className={`font-display w-8 text-xl font-extrabold ${
                entry.isPlayer ? "text-orange-600" : "text-amber-500"
              }`}
            >
              #{entry.rank}
            </span>
            <span className="text-3xl" aria-hidden>
              {entry.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold text-violet-900">
                {entry.name}
                {entry.isPlayer && (
                  <span className="ml-2 text-xs font-bold text-orange-600">(you)</span>
                )}
              </p>
              <p className="text-sm text-violet-600">
                Level {entry.level} · {entry.xp.toLocaleString()} XP
                {entry.quizStars ? ` · ${entry.quizStars} ⭐ quizzes` : ""}
              </p>
            </div>
            {entry.rank <= 3 && (
              <span className="text-2xl" aria-label="Top player">
                {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 text-center text-xs text-violet-500">
        Friend names are sample players — your XP comes from quizzes on this device.
      </p>
    </>
  );
}
