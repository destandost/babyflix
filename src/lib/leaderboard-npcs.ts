/**
 * Weekly leaderboard players — fictional names for display only.
 * Mix and scores shift slightly each ISO week (stable all week, new on Monday).
 */

export interface NpcTemplate {
  id: string;
  name: string;
  emoji: string;
  baseXp: number;
}

/** Pool of believable first names + kid-style avatars. */
export const PLAYER_POOL: NpcTemplate[] = [
  { id: "emma", name: "Emma", emoji: "🐰", baseXp: 3120 },
  { id: "noah", name: "Noah", emoji: "🦊", baseXp: 2980 },
  { id: "priya", name: "Priya", emoji: "🦄", baseXp: 2840 },
  { id: "leo", name: "Leo", emoji: "🦁", baseXp: 2710 },
  { id: "sofia", name: "Sofia", emoji: "🐼", baseXp: 2580 },
  { id: "kai", name: "Kai", emoji: "🐻", baseXp: 2450 },
  { id: "amira", name: "Amira", emoji: "🦉", baseXp: 2320 },
  { id: "jack", name: "Jack", emoji: "🐸", baseXp: 2190 },
  { id: "maya", name: "Maya", emoji: "🐧", baseXp: 2060 },
  { id: "theo", name: "Theo", emoji: "🐵", baseXp: 1930 },
  { id: "luna", name: "Luna", emoji: "🦊", baseXp: 1800 },
  { id: "milo", name: "Milo", emoji: "🐻", baseXp: 1680 },
  { id: "zara", name: "Zara", emoji: "🐰", baseXp: 1560 },
  { id: "nia", name: "Nia", emoji: "🦄", baseXp: 1440 },
  { id: "oliver", name: "Oliver", emoji: "🦁", baseXp: 1320 },
  { id: "ava", name: "Ava", emoji: "🐼", baseXp: 1200 },
  { id: "finn", name: "Finn", emoji: "🐸", baseXp: 1080 },
  { id: "aisha", name: "Aisha", emoji: "🦉", baseXp: 960 },
];

const PLAYERS_PER_WEEK = 9;

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getLeaderboardWeekKey(date = new Date()): string {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

export function getLeaderboardWeekLabel(date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (x: Date) =>
    x.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  return `${fmt(monday)} – ${fmt(sunday)}`;
}

export interface WeeklyNpcEntry {
  id: string;
  name: string;
  emoji: string;
  xp: number;
  level: number;
}

export function getWeeklyNpcEntries(weekKey = getLeaderboardWeekKey()): WeeklyNpcEntry[] {
  const rand = mulberry32(hashString(weekKey));

  const shuffled = [...PLAYER_POOL].sort(() => rand() - 0.5);
  const picked = shuffled.slice(0, PLAYERS_PER_WEEK);

  return picked.map((player, index) => {
    const xpJitter = Math.floor(rand() * 260) - 110 + index * 5;
    const xp = Math.max(400, player.baseXp + xpJitter);
    const level = Math.max(1, Math.floor(xp / 200) + 1);
    return {
      id: player.id,
      name: player.name,
      emoji: player.emoji,
      xp,
      level,
    };
  });
}
