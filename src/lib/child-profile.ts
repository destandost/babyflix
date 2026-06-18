export const CHILD_AGE_KEY = "babyflix-child-age";
export const CHILD_AGE_CHANGED_EVENT = "babyflix-child-age-changed";

export function notifyChildAgeChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(CHILD_AGE_CHANGED_EVENT));
}

export const CHILD_AGE_OPTIONS = [2, 3, 4, 5, 6, 7] as const;
export type ChildAge = (typeof CHILD_AGE_OPTIONS)[number];

export interface AgeRange {
  min: number;
  max: number;
}

export function getChildAge(): ChildAge | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CHILD_AGE_KEY);
    if (!raw) return null;
    const n = parseInt(raw, 10);
    if (CHILD_AGE_OPTIONS.includes(n as ChildAge)) return n as ChildAge;
    return null;
  } catch {
    return null;
  }
}

export function setChildAge(age: ChildAge): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHILD_AGE_KEY, String(age));
  notifyChildAgeChanged();
}

export function hasChildAge(): boolean {
  return getChildAge() !== null;
}

export function clearChildAge(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CHILD_AGE_KEY);
  notifyChildAgeChanged();
}

/** Parse show catalog strings like "2–5" or "3-7". */
export function parseAgeRangeString(range: string): AgeRange {
  const normalized = range.replace(/\s/g, "").replace(/–/g, "-");
  const parts = normalized.split("-").map((p) => parseInt(p, 10)).filter((n) => !Number.isNaN(n));
  if (parts.length >= 2) {
    return { min: parts[0], max: parts[1] };
  }
  if (parts.length === 1) {
    return { min: parts[0], max: 7 };
  }
  return { min: 2, max: 7 };
}

/** Parse game tags like "ages 4+". */
export function parseAgesTag(tag: string): AgeRange | null {
  const match = tag.match(/ages?\s*(\d+)\+?/i);
  if (!match) return null;
  const min = parseInt(match[1], 10);
  return { min, max: 7 };
}

export function isAgeInRange(childAge: number, range: AgeRange): boolean {
  return childAge >= range.min && childAge <= range.max;
}

export function ageFitScore(childAge: number, range: AgeRange): number {
  if (!isAgeInRange(childAge, range)) return -1;
  const mid = (range.min + range.max) / 2;
  return 10 - Math.abs(childAge - mid);
}

export function ageLabel(age: number): string {
  return age === 1 ? "1 year old" : `${age} years old`;
}
