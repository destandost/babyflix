/** Five playable levels — finer steps than the old 2-4 / 4-6 / 6-8 bands. */
export type AgeGroup = "2-3" | "3-4" | "4-6" | "5-7" | "6-8";

/** Buckets for word lists, stories, letter pools (3 content tiers × 5 play levels). */
export type ContentTier = 0 | 1 | 2;

export interface Difficulty {
  ageGroup: AgeGroup;
  label: string;
  /** 0 = easiest … 4 = hardest — used for speed, counts, timers */
  levelIndex: 0 | 1 | 2 | 3 | 4;
  /** Word / story / puzzle content bucket */
  contentTier: ContentTier;
  speed: number;
  itemCount: number;
  timeLimit: number | null;
  coinsPerWin: number;
  xpPerWin: number;
}

export const DIFFICULTY_LEVELS: Difficulty[] = [
  {
    ageGroup: "2-3",
    label: "🌱 Tiny Tot",
    levelIndex: 0,
    contentTier: 0,
    speed: 0.5,
    itemCount: 3,
    timeLimit: null,
    coinsPerWin: 8,
    xpPerWin: 8,
  },
  {
    ageGroup: "3-4",
    label: "⭐ Little Star",
    levelIndex: 1,
    contentTier: 0,
    speed: 0.7,
    itemCount: 3,
    timeLimit: null,
    coinsPerWin: 10,
    xpPerWin: 10,
  },
  {
    ageGroup: "4-6",
    label: "⭐⭐ Explorer",
    levelIndex: 2,
    contentTier: 1,
    speed: 1.0,
    itemCount: 4,
    timeLimit: null,
    coinsPerWin: 15,
    xpPerWin: 15,
  },
  {
    ageGroup: "5-7",
    label: "🚀 Rocket",
    levelIndex: 3,
    contentTier: 1,
    speed: 1.25,
    itemCount: 4,
    timeLimit: 45,
    coinsPerWin: 20,
    xpPerWin: 20,
  },
  {
    ageGroup: "6-8",
    label: "🏆 Champion",
    levelIndex: 4,
    contentTier: 2,
    speed: 1.5,
    itemCount: 5,
    timeLimit: 60,
    coinsPerWin: 25,
    xpPerWin: 25,
  },
];

export const DIFFICULTIES: Record<AgeGroup, Difficulty> = Object.fromEntries(
  DIFFICULTY_LEVELS.map((d) => [d.ageGroup, d]),
) as Record<AgeGroup, Difficulty>;

/** Pick a value from a table keyed by level index (pads with last entry). */
export function valueAtLevel<T>(levelIndex: number, table: readonly T[]): T {
  const i = Math.min(Math.max(0, levelIndex), table.length - 1);
  return table[i];
}
