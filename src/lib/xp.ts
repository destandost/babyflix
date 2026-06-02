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
