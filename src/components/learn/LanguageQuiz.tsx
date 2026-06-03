"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { randomFrom } from "@/lib/playful-reactions";
import {
  getLanguagePreference,
  LANGUAGE_CHANGED_EVENT,
  resolveActiveLanguage,
} from "@/lib/language-preference";
import { buildLanguageQuizQuestions } from "@/lib/language-quiz";
import { countPhraseEntries } from "@/lib/language-vocabulary";
import type { LanguageDefinition } from "@/lib/languages";
import { recordQuizResult } from "@/lib/xp";
import type { QuizQuestion, QuizOption } from "@/lib/quizzes";

function shuffleOptions(options: QuizOption[]): QuizOption[] {
  return [...options].sort(() => Math.random() - 0.5);
}

export function LanguageQuiz() {
  const [language, setLanguage] = useState<LanguageDefinition | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [message, setMessage] = useState("Pick your answer!");
  const [finished, setFinished] = useState(false);
  const [award, setAward] = useState<ReturnType<typeof recordQuizResult> | null>(null);

  const loadLanguage = useCallback(() => {
    const lang = resolveActiveLanguage(getLanguagePreference());
    setLanguage(lang);
    if (lang && !lang.isCustom) {
      setQuestions(buildLanguageQuizQuestions(lang, 5));
      setIndex(0);
      setCorrect(0);
      setMessage("Pick your answer!");
      setFinished(false);
      setAward(null);
    } else {
      setQuestions([]);
    }
  }, []);

  useEffect(() => {
    loadLanguage();
    window.addEventListener(LANGUAGE_CHANGED_EVENT, loadLanguage);
    return () => window.removeEventListener(LANGUAGE_CHANGED_EVENT, loadLanguage);
  }, [loadLanguage]);

  const question = questions[index];
  const shuffled = useMemo(
    () => (question ? shuffleOptions(question.options) : []),
    [question],
  );

  const pick = (optionId: string) => {
    if (finished || !question || !language) return;

    if (optionId === question.correctId) {
      const nextCorrect = correct + 1;
      setCorrect(nextCorrect);
      setMessage(randomFrom(["Yes!", "You got it!", "Super star!", "Nice!"]));

      setTimeout(() => {
        if (index + 1 >= questions.length) {
          const result = recordQuizResult("language", nextCorrect, questions.length);
          setAward(result);
          setFinished(true);
        } else {
          setIndex((i) => i + 1);
          setMessage("Pick your answer!");
        }
      }, 700);
    } else {
      setMessage(randomFrom(["Almost — try again!", "Good try — pick another!", "Oops — one more try!"]));
    }
  };

  const restart = () => {
    if (language && !language.isCustom) {
      setQuestions(buildLanguageQuizQuestions(language, 5));
    }
    setIndex(0);
    setCorrect(0);
    setMessage("Pick your answer!");
    setFinished(false);
    setAward(null);
  };

  if (!language) {
    return (
      <div className="rounded-3xl bg-violet-50 p-8 text-center">
        <p className="font-display text-lg font-bold text-violet-900">Pick a language first!</p>
        <p className="mt-2 text-violet-600">
          Choose one of {28} languages on the language lab page, then come back for your quiz.
        </p>
        <Link
          href="/learn/language"
          className="mt-4 inline-block rounded-full bg-violet-600 px-6 py-3 font-display font-bold text-white"
        >
          Choose language →
        </Link>
      </div>
    );
  }

  if (language.isCustom) {
    return (
      <div className="rounded-3xl bg-violet-50 p-8 text-center">
        <p className="font-display text-lg font-bold text-violet-900">
          Custom language: {language.name}
        </p>
        <p className="mt-2 text-violet-600">
          Built-in word libraries and quizzes need a language from the list (Spanish, Turkish,
          Japanese, and more).
        </p>
        <Link
          href="/learn/language"
          className="mt-4 inline-block rounded-full bg-violet-600 px-6 py-3 font-display font-bold text-white"
        >
          Pick a built-in language →
        </Link>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-3xl bg-violet-50 p-8 text-center">
        <p className="font-display text-lg font-bold text-violet-900">Word library loading…</p>
        <p className="mt-2 text-violet-600">Try picking {language.name} again on the language lab.</p>
        <Link href="/learn/language" className="mt-4 inline-block font-bold text-violet-600">
          Language lab →
        </Link>
      </div>
    );
  }

  const wordCount = countPhraseEntries(language);

  if (finished && award) {
    return (
      <div className="rounded-3xl bg-gradient-to-b from-amber-50 to-yellow-100 p-8 text-center shadow-lg ring-4 ring-amber-200">
        <span className="text-6xl" aria-hidden>
          🌟
        </span>
        <h2 className="font-display mt-4 text-2xl font-extrabold text-violet-900">
          {language.flag} {language.name} quiz complete!
        </h2>
        <p className="mt-2 text-lg text-violet-700">
          You got {correct} of {questions.length} right
        </p>
        <p className="mt-1 font-display text-xl font-bold text-teal-700">
          +{award.xpEarned} XP → Level {award.level}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-full bg-violet-500 px-6 py-3 font-display font-bold text-white"
          >
            Try again
          </button>
          <Link
            href="/leaderboard"
            className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-3 font-display font-bold text-white"
          >
            See rank →
          </Link>
          <Link
            href="/learn/language"
            className="rounded-full bg-white px-6 py-3 font-display font-bold text-violet-800 ring-2 ring-violet-200"
          >
            Word library →
          </Link>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl ring-4 ring-violet-100">
      <p className="text-center font-display text-sm font-bold text-violet-600">
        {language.flag} {language.name} · {wordCount} words in your library
      </p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <p className="font-display text-sm font-bold text-violet-500">
          Question {index + 1} of {questions.length}
        </p>
        <p className="font-display text-sm font-bold text-teal-600">⭐ {correct}</p>
      </div>

      <div className="mt-3 flex gap-1">
        {questions.map((q, i) => (
          <div
            key={q.id}
            className={`h-2 flex-1 rounded-full ${
              i < index ? "bg-teal-400" : i === index ? "bg-violet-400" : "bg-violet-100"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-center font-display text-lg font-bold text-violet-900">{message}</p>

      <div className="mt-6 rounded-2xl bg-violet-50 p-6 text-center">
        {question.sceneEmoji && (
          <span className="text-5xl leading-relaxed" aria-hidden>
            {question.sceneEmoji}
          </span>
        )}
        <p className="font-display mt-4 text-xl font-extrabold text-violet-900">{question.prompt}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {shuffled.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => pick(opt.id)}
              className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-50 to-teal-50 px-5 py-4 font-display text-lg font-bold text-violet-900 shadow-sm transition hover:scale-[1.02] hover:ring-4 hover:ring-teal-200 active:scale-[0.99]"
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-violet-400">
        Answers are in {language.name} — change language on the lab page anytime
      </p>
    </div>
  );
}
