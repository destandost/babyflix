"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { randomFrom } from "@/lib/playful-reactions";
import type { ModuleQuiz, QuizOption } from "@/lib/quizzes";
import { getLearnModuleHref } from "@/lib/learn-nav";
import { recordQuizResult, type QuizAwardResult } from "@/lib/xp";

function shuffleOptions(options: QuizOption[]): QuizOption[] {
  return [...options].sort(() => Math.random() - 0.5);
}

interface SubjectQuizProps {
  quiz: ModuleQuiz;
  moduleTitle: string;
  moduleEmoji: string;
}

export function SubjectQuiz({ quiz, moduleTitle, moduleEmoji }: SubjectQuizProps) {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [message, setMessage] = useState("Pick your answer!");
  const [finished, setFinished] = useState(false);
  const [award, setAward] = useState<QuizAwardResult | null>(null);

  const question = quiz.questions[index];
  const shuffled = useMemo(
    () => (question ? shuffleOptions(question.options) : []),
    [question],
  );

  const pick = (optionId: string) => {
    if (finished || !question) return;

    if (optionId === question.correctId) {
      const nextCorrect = correct + 1;
      setCorrect(nextCorrect);
      setMessage(randomFrom(["Yes!", "You got it!", "Super star!", "Nice!"]));

      setTimeout(() => {
        if (index + 1 >= quiz.questions.length) {
          const result = recordQuizResult(quiz.moduleId, nextCorrect, quiz.questions.length);
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
    setIndex(0);
    setCorrect(0);
    setMessage("Pick your answer!");
    setFinished(false);
    setAward(null);
  };

  if (finished && award) {
    const total = quiz.questions.length;
    const perfect = award.bestCorrect === total;
    return (
      <div className="rounded-3xl bg-gradient-to-b from-amber-50 to-yellow-100 p-8 text-center shadow-lg ring-4 ring-amber-200">
        <span className="text-6xl" aria-hidden>
          {perfect ? "🏆" : "🌟"}
        </span>
        <h2 className="font-display mt-4 text-2xl font-extrabold text-violet-900">
          Quiz complete!
        </h2>
        <p className="mt-2 text-lg text-violet-700">
          You got {correct} of {total} right
        </p>
        <p className="mt-1 font-display text-xl font-bold text-teal-700">
          +{award.xpEarned} XP → Level {award.level} ({award.totalXp.toLocaleString()} total)
        </p>
        {award.isNewBest && (
          <p className="mt-2 text-sm font-semibold text-amber-800">New best score for this subject!</p>
        )}
        {perfect && (
          <p className="mt-1 text-sm font-semibold text-violet-700">
            Perfect quiz bonus included — check the leaderboard!
          </p>
        )}
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
            className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-3 font-display font-bold text-white shadow-md"
          >
            See rank →
          </Link>
          <Link
            href={getLearnModuleHref(quiz.moduleId)}
            className="rounded-full bg-white px-6 py-3 font-display font-bold text-violet-800 ring-2 ring-violet-200"
          >
            ← {moduleTitle}
          </Link>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl ring-4 ring-violet-100">
      <div className="flex items-center justify-between gap-2">
        <p className="font-display text-sm font-bold text-violet-500">
          Question {index + 1} of {quiz.questions.length}
        </p>
        <p className="font-display text-sm font-bold text-teal-600">⭐ {correct}</p>
      </div>

      <div className="mt-3 flex gap-1">
        {quiz.questions.map((q, i) => (
          <div
            key={q.id}
            className={`h-2 flex-1 rounded-full ${
              i < index ? "bg-teal-400" : i === index ? "bg-violet-400" : "bg-violet-100"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-center font-display text-lg font-bold text-violet-900">
        {message}
      </p>

      <div className="mt-6 rounded-2xl bg-violet-50 p-6 text-center">
        {question.sceneEmoji && (
          <span className="text-5xl leading-relaxed" aria-hidden>
            {question.sceneEmoji}
          </span>
        )}
        <p className="font-display mt-4 text-xl font-extrabold text-violet-900">
          {question.prompt}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {shuffled.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => pick(opt.id)}
              className="flex w-full items-center gap-3 rounded-[18px] border-[2.5px] border-[#E8E8F4] bg-white px-5 py-4 text-left font-display text-lg text-brand-text transition-all hover:border-brand-purple hover:bg-brand-purple/5 active:scale-[0.97]"
            >
              {opt.emoji && <span className="text-3xl">{opt.emoji}</span>}
              <span>{opt.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-violet-400">
        {moduleEmoji} Each right answer = 10 XP · perfect quiz = +15 bonus · counts on leaderboard
      </p>
    </div>
  );
}
