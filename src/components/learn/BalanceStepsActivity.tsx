"use client";

import { useEffect, useState } from "react";
import { randomFrom } from "@/lib/playful-reactions";

type Side = "left" | "right";

export function BalanceStepsActivity() {
  const [side, setSide] = useState<Side>("left");
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [message, setMessage] = useState("Tap the glowing foot!");

  useEffect(() => {
    const id = setInterval(() => {
      setSide(Math.random() < 0.5 ? "left" : "right");
      setTarget((t) => t + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const tap = (picked: Side) => {
    if (picked === side) {
      setScore((s) => s + 1);
      setTilt(0);
      setMessage(randomFrom(["Steady!", "Nice!", "Wow!", "Balanced!"]));
    } else {
      setTilt(picked === "left" ? -20 : 20);
      setMessage("Whoa — try the other foot!");
      setTimeout(() => setTilt(0), 400);
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-lime-100 to-emerald-200 p-6">
      <p className="text-center font-display text-lg font-bold text-emerald-900">
        {message}
      </p>
      <p className="mt-1 text-center text-sm font-semibold text-emerald-700">
        Balanced steps: {score} / {target}
      </p>

      <div
        className="relative mx-auto mt-8 h-40 w-48 transition-transform duration-300"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="absolute bottom-0 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-amber-700/40" />
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-7xl">🦩</span>
        <span
          className={`absolute bottom-2 left-2 text-4xl transition ${
            side === "left" ? "animate-pulse scale-125" : "opacity-40"
          }`}
        >
          🦶
        </span>
        <span
          className={`absolute bottom-2 right-2 text-4xl transition ${
            side === "right" ? "animate-pulse scale-125" : "opacity-40"
          }`}
        >
          🦶
        </span>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button
          type="button"
          onClick={() => tap("left")}
          className="rounded-3xl bg-white px-10 py-6 font-display text-2xl font-extrabold text-lime-800 shadow-lg transition hover:scale-105 active:scale-95"
        >
          ← Left
        </button>
        <button
          type="button"
          onClick={() => tap("right")}
          className="rounded-3xl bg-white px-10 py-6 font-display text-2xl font-extrabold text-lime-800 shadow-lg transition hover:scale-105 active:scale-95"
        >
          Right →
        </button>
      </div>
    </div>
  );
}
