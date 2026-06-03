import type { LanguageDefinition } from "./languages";
import { PHRASES, type Phrase, type PhraseId } from "./phrases";

export interface PhraseEntry {
  phrase: Phrase;
  word: string;
}

/** All 22 words available for a built-in language. */
export function getPhraseEntries(language: LanguageDefinition): PhraseEntry[] {
  return PHRASES.map((phrase) => {
    const word = language.translations[phrase.id as PhraseId]?.trim();
    if (!word) return null;
    return { phrase, word };
  }).filter((entry): entry is PhraseEntry => entry !== null);
}

export function countPhraseEntries(language: LanguageDefinition): number {
  return getPhraseEntries(language).length;
}

export function hasFullWordLibrary(language: LanguageDefinition): boolean {
  return countPhraseEntries(language) >= PHRASES.length;
}
