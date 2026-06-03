"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getLanguagePreference,
  resolveActiveLanguage,
} from "@/lib/language-preference";
import { PHRASE_COUNT } from "@/lib/phrases";
import { SpeakButton } from "./SpeakButton";

export function HomeLanguageBanner() {
  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState("");
  const [flag, setFlag] = useState("🌍");
  const [languageId, setLanguageId] = useState("");
  const [sampleWord, setSampleWord] = useState("");

  useEffect(() => {
    setMounted(true);
    const pref = getLanguagePreference();
    const lang = resolveActiveLanguage(pref);
    if (!lang) return;

    setFlag(lang.flag);
    setLabel(lang.name);
    setLanguageId(lang.id);

    if (!lang.isCustom && lang.translations.hello) {
      setSampleWord(lang.translations.hello);
    }
  }, []);

  if (!mounted || !label) return null;

  return (
    <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 p-1 shadow-lg">
      <div className="rounded-[1.35rem] bg-white/95 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              className="flex h-16 w-16 animate-bounce items-center justify-center rounded-2xl bg-violet-100 text-4xl sm:h-20 sm:w-20 sm:text-5xl"
              aria-hidden
            >
              {flag}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-500">
                Your language
              </p>
              <p className="font-display text-2xl font-extrabold text-violet-900 sm:text-3xl">
                Learning {label}!
              </p>
              <p className="mt-1 text-sm text-violet-600">
                {PHRASE_COUNT} words · audio practice
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {sampleWord && languageId && languageId !== "custom" && (
              <SpeakButton
                text={sampleWord}
                languageId={languageId}
                phraseId="hello"
                label="Say hello"
              />
            )}
            <Link
              href="/learn/language#words"
              className="rounded-full bg-violet-600 px-5 py-2.5 font-display text-sm font-bold text-white shadow-md transition hover:bg-violet-500"
            >
              Word library →
            </Link>
            <Link
              href="/learn/quiz/language"
              className="rounded-full bg-amber-100 px-5 py-2.5 font-display text-sm font-bold text-amber-900 transition hover:bg-amber-200"
            >
              Word quiz →
            </Link>
            <Link
              href="/learn/language"
              className="rounded-full bg-violet-100 px-5 py-2.5 font-display text-sm font-bold text-violet-800 transition hover:bg-violet-200"
            >
              Change
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
