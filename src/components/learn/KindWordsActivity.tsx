"use client";

import { useMemo, useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

interface Scenario {
  scene: string;
  prompt: string;
  kind: string;
  unkind: string[];
}

const SCENARIOS: Scenario[] = [
  {
    scene: "🛝",
    prompt: "A new kid is at the playground.",
    kind: "Hi! Want to play together?",
    unkind: ["Go away!", "You're not my friend."],
  },
  {
    scene: "🎂",
    prompt: "It's someone's birthday at party.",
    kind: "Happy birthday! I'm glad you're here.",
    unkind: ["I wanted more cake.", "This party is boring."],
  },
  {
    scene: "📚",
    prompt: "A classmate drops their books.",
    kind: "Need help? I can pick some up!",
    unkind: ["That looked funny.", "Not my problem."],
  },
  {
    scene: "😢",
    prompt: "Someone looks sad on the bench.",
    kind: "Are you okay? Want to sit with me?",
    unkind: ["Why are you crying?", "Leave me alone."],
  },
];

export function KindWordsActivity() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Pick the kind words!");

  const scenario = SCENARIOS[index % SCENARIOS.length];
  const choices = useMemo(
    () => [scenario.kind, ...scenario.unkind].sort(() => Math.random() - 0.5),
    [scenario],
  );

  const pick = (text: string) => {
    if (text === scenario.kind) {
      setScore((s) => s + 1);
      setMessage(randomFrom(["Friendly!", "That helps!", "Great choice!"]));
      setTimeout(() => {
        setIndex((i) => i + 1);
        setMessage("Pick the kind words!");
      }, 900);
    } else {
      setMessage("That might hurt feelings — try a kinder way.");
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-violet-50 to-fuchsia-100 p-6">
      <p className="text-center font-display text-lg font-bold text-violet-900">
        {message}
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-violet-700">
        Kind picks: {score}
      </p>

      <div className="mt-6 rounded-2xl bg-white/90 p-6 text-center shadow-inner">
        <span className="text-6xl" aria-hidden>
          {scenario.scene}
        </span>
        <p className="font-display mt-4 text-lg font-bold text-violet-900">
          {scenario.prompt}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {choices.map((text) => (
          <li key={text}>
            <button
              type="button"
              onClick={() => pick(text)}
              className="w-full rounded-2xl bg-white px-5 py-4 text-left font-display text-sm font-bold text-violet-900 shadow-md transition hover:ring-4 hover:ring-emerald-200 active:scale-[0.99] sm:text-base"
            >
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
