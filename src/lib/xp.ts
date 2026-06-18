<<<<<<< Updated upstream
=======
import { getWeeklyNpcEntries } from "./leaderboard-npcs";
import type { LearningModuleId } from "./types";

>>>>>>> Stashed changes
const XP_KEY = "babyflix-xp";

export function getStoredXp(): number {
  if (typeof window === "undefined") return 0;
  const raw = localStorage.getItem(XP_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function addXp(amount: number): number {
  const next = getStoredXp() + amount;
  localStorage.setItem(XP_KEY, String(next));
  return next;
}
<<<<<<< Updated upstream
=======

/** Award XP after a game win (uses same storage as quizzes). */
export function awardGameWin(xpAmount: number): number {
  return addXp(xpAmount);
}

export function xpToLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function xpIntoCurrentLevel(xp: number): number {
  return xp % XP_PER_LEVEL;
}

export function calculateQuizXp(correct: number, total: number): number {
  const base = correct * QUIZ_XP_PER_CORRECT;
  const bonus = correct === total && total > 0 ? QUIZ_XP_PERFECT_BONUS : 0;
  return base + bonus;
}

export function getPlayerProfile(): PlayerProfile {
  if (typeof window === "undefined") {
    return { name: "You", emoji: "🧒" };
  }
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return { name: "You", emoji: "🧒" };
    const parsed = JSON.parse(raw) as PlayerProfile;
    if (parsed.name && parsed.emoji) return parsed;
  } catch {
    /* ignore */
  }
  return { name: "You", emoji: "🧒" };
}

export function setPlayerProfile(profile: PlayerProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function getQuizResults(): QuizResultRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUIZ_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuizResultRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveQuizResults(results: QuizResultRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUIZ_KEY, JSON.stringify(results));
}

export function getQuizResult(moduleId: LearningModuleId): QuizResultRecord | undefined {
  return getQuizResults().find((r) => r.moduleId === moduleId);
}

export function countPerfectQuizzes(): number {
  return getQuizResults().filter(
    (r) => r.totalQuestions > 0 && r.bestCorrect >= r.totalQuestions,
  ).length;
}

export interface QuizAwardResult {
  xpEarned: number;
  totalXp: number;
  level: number;
  isNewBest: boolean;
  bestCorrect: number;
  totalQuestions: number;
}

export function recordQuizResult(
  moduleId: LearningModuleId,
  correct: number,
  total: number,
): QuizAwardResult {
  const xpEarned = calculateQuizXp(correct, total);
  const totalXp = addXp(xpEarned);

  const results = getQuizResults();
  const existing = results.find((r) => r.moduleId === moduleId);
  const isNewBest = !existing || correct > existing.bestCorrect;

  const updated: QuizResultRecord = {
    moduleId,
    bestCorrect: Math.max(existing?.bestCorrect ?? 0, correct),
    totalQuestions: total,
    lastPlayedAt: new Date().toISOString(),
    xpEarnedTotal: (existing?.xpEarnedTotal ?? 0) + xpEarned,
  };

  const nextResults = [...results.filter((r) => r.moduleId !== moduleId), updated];
  saveQuizResults(nextResults);

  return {
    xpEarned,
    totalXp,
    level: xpToLevel(totalXp),
    isNewBest,
    bestCorrect: updated.bestCorrect,
    totalQuestions: total,
  };
}

export function buildLeaderboard(): LeaderboardEntry[] {
  const playerXp = getStoredXp();
  const profile = getPlayerProfile();
  const quizStars = countPerfectQuizzes();

  const npcs: LeaderboardEntry[] = getWeeklyNpcEntries().map((entry) => ({
    id: entry.id,
    rank: 0,
    name: entry.name,
    emoji: entry.emoji,
    xp: entry.xp,
    level: entry.level,
  }));

  const player: LeaderboardEntry = {
    id: "player",
    rank: 0,
    name: profile.name,
    emoji: profile.emoji,
    xp: playerXp,
    level: xpToLevel(playerXp),
    isPlayer: true,
    quizStars,
  };

  const sorted = [...npcs, player].sort((a, b) => b.xp - a.xp || b.level - a.level);

  return sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));
}
>>>>>>> Stashed changes
