"use client";

import { useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

const MIXES: Record<string, { result: string; label: string; emoji: string }> = {
  "red+blue": { result: "#7c3aed", label: "Purple", emoji: "💜" },
  "yellow+blue": { result: "#22c55e", label: "Green", emoji: "💚" },
  "red+yellow": { result: "#f97316", label: "Orange", emoji: "🧡" },
};

const COLORS = [
  { id: "red", name: "Red", hex: "#ef4444" },
  { id: "blue", name: "Blue", hex: "#3b82f6" },
  { id: "yellow", name: "Yellow", hex: "#eab308" },
] as const;

export function ColorMixActivity() {
  const [picked, setPicked] = useState<string[]>([]);
  const [message, setMessage] = useState("Tap two colors to mix!");

  const tapColor = (id: string) => {
    if (picked.length >= 2) {
      setPicked([id]);
      setMessage("Pick a second color!");
      return;
    }
    const next = [...picked, id];
    setPicked(next);
    if (next.length < 2) {
      setMessage("Now pick another color!");
      return;
    }
    const key = [...next].sort().join("+");
    const mix = MIXES[key];
    if (mix) {
      setMessage(randomFrom([`You made ${mix.label}!`, "Beautiful mix!", "Wow!"]));
    } else {
      setMessage("Try red + blue, yellow + blue, or red + yellow!");
      setPicked([]);
    }
  };

  const key = picked.length === 2 ? [...picked].sort().join("+") : "";
  const mix = key ? MIXES[key] : null;

  return (
    <div className="rounded-3xl bg-gradient-to-b from-pink-50 to-rose-100 p-6">
      <p className="text-center font-display text-lg font-bold text-rose-900">{message}</p>

      <div
        className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full text-6xl shadow-inner transition-colors duration-500"
        style={{ backgroundColor: mix?.result ?? "#f5f5f4" }}
      >
        {mix ? mix.emoji : "🎨"}
      </div>
      {mix && (
        <p className="mt-3 text-center font-display text-xl font-extrabold text-violet-900">
          {mix.label}
        </p>
      )}

      <div className="mt-8 flex justify-center gap-4">
        {COLORS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => tapColor(c.id)}
            className={`flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-md ring-4 transition ${
              picked.includes(c.id) ? "ring-pink-400 scale-105" : "ring-transparent"
            }`}
          >
            <span
              className="h-14 w-14 rounded-full"
              style={{ backgroundColor: c.hex }}
              aria-hidden
            />
            <span className="font-display text-sm font-bold text-violet-900">{c.name}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setPicked([]);
          setMessage("Tap two colors to mix!");
        }}
        className="mx-auto mt-6 block rounded-full bg-rose-400 px-6 py-2 font-display text-sm font-bold text-white"
      >
        Clear & mix again
      </button>
    </div>
  );
}
