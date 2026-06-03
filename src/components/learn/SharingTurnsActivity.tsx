"use client";

import { useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

type Holder = "left" | "right" | "middle";

export function SharingTurnsActivity() {
  const [holder, setHolder] = useState<Holder>("middle");
  const [turns, setTurns] = useState(0);
  const [message, setMessage] = useState("Tap Share to pass the toy!");

  const share = () => {
    if (holder === "middle") {
      setHolder("left");
      setMessage("🐻 has the ball! Now share to Bunny.");
      return;
    }
    const next: Holder = holder === "left" ? "right" : "left";
    setHolder(next);
    setTurns((t) => t + 1);
    setMessage(
      randomFrom([
        "Nice sharing!",
        "Taking turns!",
        "Both friends happy!",
        "Your turn next!",
      ]),
    );
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-amber-50 to-orange-100 p-6">
      <p className="text-center font-display text-lg font-bold text-orange-900">
        {message}
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-orange-700">
        Shares: {turns}
      </p>

      <div className="mt-8 flex items-end justify-between gap-2 px-2">
        <div
          className={`flex flex-1 flex-col items-center rounded-3xl p-4 transition ${
            holder === "left" ? "bg-amber-200 ring-4 ring-amber-400" : "bg-white/70"
          }`}
        >
          <span className="text-5xl">🐻</span>
          <span className="font-display mt-2 text-sm font-bold text-violet-900">Bear</span>
          {holder === "left" && <span className="mt-2 text-3xl">⚽</span>}
        </div>

        <div
          className={`flex flex-col items-center rounded-3xl p-3 transition ${
            holder === "middle" ? "bg-lime-200 ring-4 ring-lime-400" : "opacity-40"
          }`}
        >
          <span className="text-4xl">⚽</span>
        </div>

        <div
          className={`flex flex-1 flex-col items-center rounded-3xl p-4 transition ${
            holder === "right" ? "bg-amber-200 ring-4 ring-amber-400" : "bg-white/70"
          }`}
        >
          <span className="text-5xl">🐰</span>
          <span className="font-display mt-2 text-sm font-bold text-violet-900">Bunny</span>
          {holder === "right" && <span className="mt-2 text-3xl">⚽</span>}
        </div>
      </div>

      <button
        type="button"
        onClick={share}
        className="mx-auto mt-8 block rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 px-10 py-4 font-display text-xl font-extrabold text-white shadow-lg transition hover:scale-105 active:scale-95"
      >
        🤝 Share!
      </button>
    </div>
  );
}
