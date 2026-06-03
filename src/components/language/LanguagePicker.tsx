"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LANGUAGES } from "@/lib/languages";
import {
  getLanguagePreference,
  setLanguagePreference,
  resolveActiveLanguage,
  type LanguagePreference,
} from "@/lib/language-preference";
import { PHRASE_COUNT } from "@/lib/phrases";
import { countPhraseEntries } from "@/lib/language-vocabulary";
import { SpeakButton } from "./SpeakButton";

export function LanguagePicker() {
  const [query, setQuery] = useState("");
  const [pref, setPref] = useState<LanguagePreference | null>(null);
  const [customName, setCustomName] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    const saved = getLanguagePreference();
    setPref(saved);
    if (saved?.languageId === "custom" && saved.customName) {
      setCustomName(saved.customName);
      setShowCustom(true);
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q),
    );
  }, [query]);

  const active = resolveActiveLanguage(pref);

  const selectLanguage = (languageId: string) => {
    const next: LanguagePreference = { languageId };
    setLanguagePreference(next);
    setPref(next);
    setShowCustom(false);
  };

  const saveCustom = () => {
    const name = customName.trim();
    if (!name) return;
    const next: LanguagePreference = { languageId: "custom", customName: name };
    setLanguagePreference(next);
    setPref(next);
  };

  return (
    <div className="space-y-6">
      {active && (
        <div className="rounded-2xl bg-violet-600 px-5 py-4 text-white shadow-md">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-200">
            Learning now
          </p>
          <p className="font-display mt-1 text-2xl font-extrabold">
            {active.flag} {active.name}
            {active.nativeName !== active.name && (
              <span className="ml-2 text-lg font-semibold text-violet-200">
                ({active.nativeName})
              </span>
            )}
          </p>
          <p className="mt-2 text-sm text-violet-200">
            {!active.isCustom
              ? `${countPhraseEntries(active)} / ${PHRASE_COUNT} words in your library · quiz in ${active.name}`
              : `${PHRASE_COUNT} words with built-in languages`}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {!active.isCustom && active.translations.hello && (
              <SpeakButton
                text={active.translations.hello}
                languageId={active.id}
                phraseId="hello"
                label="Hear hello"
                className="!bg-violet-500 !text-white !ring-violet-300"
              />
            )}
            <Link
              href="/learn/language#words"
              className="inline-flex rounded-full bg-white px-6 py-3 font-display font-bold text-violet-700 transition hover:scale-105"
            >
              Word library →
            </Link>
            <Link
              href="/learn/quiz/language"
              className="inline-flex rounded-full bg-amber-200 px-5 py-3 font-display font-bold text-amber-900 transition hover:bg-amber-100"
            >
              Word quiz →
            </Link>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="lang-search" className="font-display text-sm font-bold text-violet-800">
          Find a language
        </label>
        <input
          id="lang-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Spanish, Turkish, Japanese…"
          className="mt-2 w-full rounded-2xl border-2 border-violet-200 bg-white px-4 py-3 text-violet-900 outline-none ring-violet-300 focus:border-violet-400 focus:ring-2"
        />
      </div>

      <div className="grid max-h-[420px] gap-2 overflow-y-auto pr-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lang) => {
          const selected = pref?.languageId === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => selectLanguage(lang.id)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                selected
                  ? "bg-violet-600 text-white shadow-md ring-2 ring-violet-400"
                  : "bg-white text-violet-900 shadow-sm ring-1 ring-violet-100 hover:ring-violet-300"
              }`}
            >
              <span className="text-3xl" aria-hidden>
                {lang.flag}
              </span>
              <span className="min-w-0">
                <span className="font-display block font-bold">{lang.name}</span>
                <span
                  className={`block truncate text-sm ${
                    selected ? "text-violet-200" : "text-violet-600"
                  }`}
                >
                  {lang.nativeName}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-violet-600">No languages match that search.</p>
      )}

      <section className="rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/80 p-5">
        <button
          type="button"
          onClick={() => setShowCustom((v) => !v)}
          className="font-display text-lg font-bold text-violet-800"
        >
          🌍 Other language — type any language you want
        </button>

        {showCustom && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. Basque, Tagalog, Sign Language…"
              className="flex-1 rounded-xl border-2 border-violet-200 bg-white px-4 py-3 text-violet-900 outline-none focus:border-violet-400"
            />
            <button
              type="button"
              onClick={saveCustom}
              className="rounded-xl bg-violet-600 px-6 py-3 font-display font-bold text-white transition hover:bg-violet-500"
            >
              Save choice
            </button>
          </div>
        )}

        {pref?.languageId === "custom" && pref.customName && (
          <p className="mt-3 text-sm text-violet-700">
            Custom mode uses speak-and-learn practice (say the word in{" "}
            <strong>{pref.customName}</strong> with a grown-up).
          </p>
        )}
      </section>
    </div>
  );
}
