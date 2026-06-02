/** Shared hard-mode tuning for mini-games */

export const HARD_MODE = {
  roundsToWin: 10,
  maxLives: 3,
  choiceCount: 6,
  timerSeconds: 10,
  minStars: 4,
  maxStars: 15,
  xpPerCorrect: 15,
  xpWinBonus: 50,
} as const;

export function starCountForRound(round: number): number {
  const { minStars, maxStars } = HARD_MODE;
  if (round <= 3) {
    return randomInt(4, 7);
  }
  if (round <= 6) {
    return randomInt(6, 11);
  }
  return randomInt(9, maxStars);
}

export function buildHardChoices(correct: number, min: number, max: number): number[] {
  const choices = new Set<number>([correct]);

  const offsets = [-2, -1, 1, 2, 3, -3];
  for (const off of shuffle(offsets)) {
    if (choices.size >= HARD_MODE.choiceCount) break;
    const n = correct + off;
    if (n >= min && n <= max) choices.add(n);
  }

  while (choices.size < HARD_MODE.choiceCount) {
    choices.add(randomInt(min, max));
  }

  return shuffle([...choices]);
}

export function randomStarLayout(count: number): { x: number; y: number; size: "sm" | "md" | "lg" }[] {
  const used: { x: number; y: number }[] = [];
  const layouts: { x: number; y: number; size: "sm" | "md" | "lg" }[] = [];

  for (let i = 0; i < count; i++) {
    let x = 0;
    let y = 0;
    let attempts = 0;
    do {
      x = 8 + Math.random() * 84;
      y = 10 + Math.random() * 80;
      attempts++;
    } while (
      attempts < 40 &&
      used.some((p) => Math.hypot(p.x - x, p.y - y) < 14)
    );
    used.push({ x, y });
    const sizeRoll = Math.random();
    layouts.push({
      x,
      y,
      size: sizeRoll > 0.65 ? "sm" : sizeRoll > 0.35 ? "md" : "lg",
    });
  }

  return layouts;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
