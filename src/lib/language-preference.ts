import { getLanguageById, type LanguageDefinition } from "./languages";

const STORAGE_KEY = "babyflix-learning-language";
export const LANGUAGE_CHANGED_EVENT = "babyflix-language-changed";

export interface LanguagePreference {
  languageId: string;
  /** Set when user picks "Other" and types a custom language name */
  customName?: string;
}

export function notifyLanguagePreferenceChanged(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGED_EVENT));
}

export function getLanguagePreference(): LanguagePreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LanguagePreference;
    if (!parsed?.languageId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setLanguagePreference(pref: LanguagePreference): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  notifyLanguagePreferenceChanged();
}

export function clearLanguagePreference(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  notifyLanguagePreferenceChanged();
}

export function resolveActiveLanguage(
  pref: LanguagePreference | null,
): LanguageDefinition | null {
  if (!pref) return null;

  if (pref.languageId === "custom" && pref.customName?.trim()) {
    return {
      id: "custom",
      name: pref.customName.trim(),
      nativeName: pref.customName.trim(),
      flag: "🌍",
      isCustom: true,
      translations: {} as LanguageDefinition["translations"],
    };
  }

  return getLanguageById(pref.languageId) ?? null;
}

export function getActiveLanguageLabel(pref: LanguagePreference | null): string {
  const lang = resolveActiveLanguage(pref);
  return lang ? `${lang.flag} ${lang.name}` : "No language chosen";
}
