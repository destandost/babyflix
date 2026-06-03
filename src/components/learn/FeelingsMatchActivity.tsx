"use client";

import { useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

type FeelingId = "happy" | "sad" | "mad" | "calm" | "scared";

const FACES: { id: FeelingId; emoji: string; label: string }[] = [
  { id: "happy", emoji: "😊", label: "Happy" },
  { id: "sad", emoji: "😢", label: "Sad" },
  { id: "mad", emoji: "😠", label: "Mad" },
  { id: "calm", emoji: "😌", label: "Calm" },
  { id: "scared", emoji: "😨", label: "Scared" },
];

const SCENARIOS: { prompt: string; scene: string; feeling: FeelingId }[] = [
  { prompt: "You got a big hug from someone you love!", scene: "🤗", feeling: "happy" },
  { prompt: "Your favorite stuffed animal got a rip.", scene: "🧸", feeling: "sad" },
  { prompt: "Someone took your turn without asking.", scene: "🎮", feeling: "mad" },
  { prompt: "You listen to soft music before bed.", scene: "🌙", feeling: "calm" },
  { prompt: "A loud boom surprised you!", scene: "💥", feeling: "scared" },
  { prompt: "You shared a snack and everyone smiled.", scene: "🍪", feeling: "happy" },
  { prompt: "Your friend moved far away.", scene: "✈️", feeling: "sad" },
  { prompt: "You take deep breaths when things feel busy.", scene: "🌬️", feeling: "calm" },
];

export function FeelingsMatchActivity() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("How do you think they feel?");

  const scenario = SCENARIOS[index % SCENARIOS.length];

  const pick = (id: FeelingId) => {
    if (id === scenario.feeling) {
      setScore((s) => s + 1);
      setMessage(randomFrom(["You got it!", "Great noticing!", "Kind heart!"]));
      setTimeout(() => {
        setIndex((i) => i + 1);
        setMessage("How do you think they feel?");
      }, 900);
    } else {
      setMessage("Hmm — try another face. All feelings are okay!");
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-rose-50 to-emerald-100 p-6">
      <p className="text-center font-display text-lg font-bold text-emerald-900">
        {message}
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-emerald-700">
        Matched: {score}
      </p>

      <div className="mt-6 rounded-2xl bg-white/90 p-6 text-center shadow-inner">
        <span className="text-6xl" aria-hidden>
          {scenario.scene}
        </span>
        <p className="font-display mt-4 text-lg font-bold text-violet-900">
          {scenario.prompt}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {FACES.map((face) => (
          <button
            key={face.id}
            type="button"
            onClick={() => pick(face.id)}
            className="flex flex-col items-center rounded-2xl bg-white px-4 py-3 shadow-md transition hover:scale-105 active:scale-95"
          >
            <span className="text-4xl">{face.emoji}</span>
            <span className="mt-1 font-display text-xs font-bold text-violet-800">
              {face.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
