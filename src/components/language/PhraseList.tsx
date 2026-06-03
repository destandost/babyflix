"use client";

import { useCallback, useEffect, useState } from "react";
import { PHRASES } from "@/lib/phrases";
import {
  getLanguagePreference,
  LANGUAGE_CHANGED_EVENT,
  resolveActiveLanguage,
} from "@/lib/language-preference";
import { countPhraseEntries } from "@/lib/language-vocabulary";
import type { LanguageDefinition } from "@/lib/languages";
import { SpeakButton } from "./SpeakButton";

export function PhraseList() {
  const [language, setLanguage] = useState<LanguageDefinition | null>(null);

  const refresh = useCallback(() => {
    setLanguage(resolveActiveLanguage(getLanguagePreference()));
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(LANGUAGE_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(LANGUAGE_CHANGED_EVENT, refresh);
  }, [refresh]);

  if (!language) {
    return (
      <section id="words" className="mt-10 scroll-mt-24 rounded-2xl bg-violet-50 p-6 text-center">
        <p className="font-display font-bold text-violet-900">Pick a language above</p>
        <p className="mt-1 text-sm text-violet-600">
          Your word library will show all {PHRASES.length} words in that language.
        </p>
      </section>
    );
  }

  if (language.isCustom) {
    return (
      <section id="words" className="mt-10 scroll-mt-24 rounded-2xl bg-violet-50 p-6">
        <h2 className="font-display text-xl font-bold text-violet-900">
          Word library · {language.name}
        </h2>
        <p className="mt-2 text-violet-700">
          Custom languages use speak-and-learn with a grown-up. Pick Spanish, Turkish, Japanese, or
          any built-in language for the full {PHRASES.length}-word library and quiz.
        </p>
      </section>
    );
  }

  const wordCount = countPhraseEntries(language);

  return (
    <section id="words" className="mt-10 scroll-mt-24">
      <h2 className="font-display text-xl font-bold text-violet-900">
        {language.flag} {language.name} word library · {wordCount} words
      </h2>
      <p className="mt-1 text-sm text-violet-600">
        English on the left · {language.nativeName} on the right · tap 🔊 (Duolingo-style voice)
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {PHRASES.map((phrase) => {
          const word = language.translations[phrase.id as keyof typeof language.translations];
          if (!word) return null;
          return (
            <li
              key={phrase.id}
              className="flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-violet-100"
            >
              <div className="min-w-0">
                <span className="mr-2" aria-hidden>
                  {phrase.emoji}
                </span>
                <span className="font-semibold text-violet-900">{phrase.english}</span>
                <span className="mt-0.5 block font-display text-lg font-bold text-violet-700">
                  {word}
                </span>
              </div>
              <SpeakButton
                text={word}
                languageId={language.id}
                phraseId={phrase.id}
                label="🔊"
                className="!px-3 !py-1.5 shrink-0"
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
