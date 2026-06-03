"use client";

import { useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

type StepId = "eyes" | "ears" | "still";

const STEPS: { id: StepId; emoji: string; label: string; hint: string }[] = [
  { id: "eyes", emoji: "👀", label: "Eyes", hint: "Look at the person talking" },
  { id: "ears", emoji: "👂", label: "Ears", hint: "Listen to their words" },
  { id: "still", emoji: "🧘", label: "Quiet body", hint: "Hands still — ready to hear" },
];

export function ListeningBodyActivity() {
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState<StepId[]>([]);
  const [rounds, setRounds] = useState(0);
  const [message, setMessage] = useState("Tap each part to get ready to listen!");

  const current = STEPS[stepIndex % STEPS.length];

  const tap = (id: StepId) => {
    if (id !== current.id) {
      setMessage(`Try ${current.label} first — ${current.hint}`);
      return;
    }
    const nextDone = [...done, id];
    setDone(nextDone);
    setMessage(randomFrom(["Ready!", "Good listener!", "Nice focus!"]));

    if (nextDone.length >= STEPS.length) {
      setRounds((r) => r + 1);
      setDone([]);
      setStepIndex(0);
      setMessage("🌟 Super listener! Let's go again.");
      return;
    }
    setStepIndex((i) => i + 1);
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-sky-50 to-cyan-100 p-6">
      <p className="text-center font-display text-lg font-bold text-sky-900">
        {message}
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-sky-700">
        Listening rounds: {rounds}
      </p>

      <div className="relative mx-auto mt-8 flex h-48 w-48 items-center justify-center">
        <span className="text-8xl">🦉</span>
        <span className="absolute -top-2 right-4 animate-bounce text-4xl">💬</span>
      </div>
      <p className="text-center font-display text-sm font-bold text-violet-800">
        {current.hint}
      </p>

      <div className="mt-8 flex justify-center gap-4">
        {STEPS.map((step) => {
          const completed = done.includes(step.id);
          const active = step.id === current.id && !completed;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => tap(step.id)}
              className={`flex flex-col items-center rounded-2xl px-5 py-4 shadow-md transition ${
                completed
                  ? "bg-emerald-200 ring-2 ring-emerald-400"
                  : active
                    ? "animate-pulse bg-white ring-4 ring-sky-300"
                    : "bg-white/80"
              }`}
            >
              <span className="text-4xl">{step.emoji}</span>
              <span className="mt-1 font-display text-xs font-bold text-violet-900">
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
