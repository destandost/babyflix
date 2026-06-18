import { awardGameWin } from "@/lib/xp";

/** Sync Sprout Valley XP gains to the global BabyFlix XP store. */
export function syncGlobalXp(amount: number): void {
  if (typeof window === "undefined" || amount <= 0) return;
  awardGameWin(amount);
}
