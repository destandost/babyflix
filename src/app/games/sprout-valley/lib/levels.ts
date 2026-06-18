export interface LevelRequirement {
  level: number;
  xpNeeded: number;
  unlockedCols: number;
  unlockedRows: number;
  unlocks: string[];
}

export const LEVEL_REQUIREMENTS: LevelRequirement[] = [
  { level: 1, xpNeeded: 0, unlockedCols: 3, unlockedRows: 2, unlocks: ["wheat", "corn", "chicken"] },
  { level: 2, xpNeeded: 100, unlockedCols: 3, unlockedRows: 3, unlocks: ["carrot", "cow", "bakery"] },
  {
    level: 3,
    xpNeeded: 250,
    unlockedCols: 4,
    unlockedRows: 3,
    unlocks: ["strawberry", "sheep", "dairy", "pancake"],
  },
  { level: 4, xpNeeded: 500, unlockedCols: 4, unlockedRows: 4, unlocks: ["tomato", "pig", "juicer"] },
  {
    level: 5,
    xpNeeded: 900,
    unlockedCols: 5,
    unlockedRows: 4,
    unlocks: ["sunflower", "jam_jar", "cake", "ice_cream"],
  },
  { level: 6, xpNeeded: 1400, unlockedCols: 5, unlockedRows: 5, unlocks: ["pumpkin"] },
  { level: 7, xpNeeded: 2000, unlockedCols: 6, unlockedRows: 5, unlocks: ["watermelon"] },
  { level: 8, xpNeeded: 3000, unlockedCols: 6, unlockedRows: 6, unlocks: ["all machines max queue"] },
  { level: 9, xpNeeded: 4500, unlockedCols: 7, unlockedRows: 6, unlocks: ["fishing area"] },
  { level: 10, xpNeeded: 6500, unlockedCols: 7, unlockedRows: 7, unlocks: ["town market"] },
];

export function getLevelFromXp(xp: number): number {
  let level = 1;
  for (const req of LEVEL_REQUIREMENTS) {
    if (xp >= req.xpNeeded) level = req.level;
  }
  return level;
}

export function getLevelConfig(level: number): LevelRequirement {
  return (
    [...LEVEL_REQUIREMENTS].reverse().find((r) => r.level <= level) ?? LEVEL_REQUIREMENTS[0]
  );
}

export function getXpForNextLevel(level: number): number {
  const next = LEVEL_REQUIREMENTS.find((r) => r.level === level + 1);
  return next?.xpNeeded ?? LEVEL_REQUIREMENTS[LEVEL_REQUIREMENTS.length - 1].xpNeeded;
}
