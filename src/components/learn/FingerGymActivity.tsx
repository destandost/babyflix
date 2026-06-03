"use client";

import { useEffect, useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

const PADS = ["👆", "✋", "🤏", "👍", "✌️"];

export function FingerGymActivity() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [activePad, setActivePad] = useState<number | null>(null);
  const [message, setMessage] = useState("Watch… then tap the glowing finger!");

  const startRound = () => {
    const seq = Array.from({ length: 5 }, () => Math.floor(Math.random() * 5));
    setSequence(seq);
    setStep(0);
    setMessage("Go!");
    playSequence(seq);
  };

  const playSequence = async (seq: number[]) => {
    for (let i = 0; i < seq.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      setActivePad(seq[i]);
      await new Promise((r) => setTimeout(r, 450));
      setActivePad(null);
    }
    setMessage("Your turn — tap in order!");
  };

  useEffect(() => {
    startRound();
  }, []);

  const tapPad = (index: number) => {
    if (sequence.length === 0) return;
    if (index === sequence[step]) {
      const next = step + 1;
      setStep(next);
      setMessage(randomFrom(["Yes!", "Good!", "Strong fingers!"]));
      if (next >= sequence.length) {
        setMessage("🎉 Round complete!");
        setTimeout(startRound, 1200);
      }
    } else {
      setMessage("Oops — watch again!");
      setStep(0);
      setTimeout(() => playSequence(sequence), 600);
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-amber-50 to-orange-100 p-6">
      <p className="text-center font-display text-lg font-bold text-amber-900">
        {message}
      </p>
      <p className="mt-2 text-center text-sm text-amber-700">
        Step {Math.min(step + 1, sequence.length)} of {sequence.length || 5}
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {PADS.map((emoji, i) => (
          <button
            key={i}
            type="button"
            onClick={() => tapPad(i)}
            className={`flex h-20 w-20 items-center justify-center rounded-full text-4xl shadow-lg transition sm:h-24 sm:w-24 sm:text-5xl ${
              activePad === i
                ? "scale-110 bg-violet-500 ring-4 ring-violet-200"
                : step > 0 && i === sequence[step]
                  ? "animate-pulse bg-lime-300"
                  : "bg-white"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={startRound}
        className="mx-auto mt-8 block rounded-full bg-amber-500 px-6 py-3 font-display font-bold text-white"
      >
        New pattern
      </button>
    </div>
  );
}
