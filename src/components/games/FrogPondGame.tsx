"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Character } from "@/components/characters/Characters";
import { GameButton } from "@/components/games/GameButton";
import { randomFrom } from "@/lib/playful-reactions";
import { speakGame } from "@/lib/speech";

type Fly = {
  id: string;
  x: number;
  y: number;
  wobble: number;
};

const FROG_X = 50;
const FROG_Y = 82;
const MAX_FLIES = 6;
const SPAWN_MS = 1400;

export function FrogPondGame() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [flies, setFlies] = useState<Fly[]>([]);
  const [caught, setCaught] = useState(0);
  const [combo, setCombo] = useState(0);
  const [message, setMessage] = useState("Tap the flies — Ribbit!");
  const [tongue, setTongue] = useState<{
    flyId: string;
    x: number;
    y: number;
    length: number;
    angle: number;
  } | null>(null);
  const [munching, setMunching] = useState(false);
  const [frogBounce, setFrogBounce] = useState(false);

  const spawnFly = useCallback(() => {
    setFlies((current) => {
      if (current.length >= MAX_FLIES) return current;
      return [
        ...current,
        {
          id: `fly-${Date.now()}-${Math.random()}`,
          x: 12 + Math.random() * 76,
          y: 8 + Math.random() * 55,
          wobble: Math.random() * 360,
        },
      ];
    });
  }, []);

  useEffect(() => {
    spawnFly();
    const id = setInterval(spawnFly, SPAWN_MS);
    return () => clearInterval(id);
  }, [spawnFly]);

  useEffect(() => {
    const id = setInterval(() => {
      setFlies((current) =>
        current.map((f) => ({
          ...f,
          x: Math.min(92, Math.max(8, f.x + (Math.random() - 0.5) * 4)),
          y: Math.min(70, Math.max(8, f.y + (Math.random() - 0.5) * 3)),
          wobble: f.wobble + 8,
        })),
      );
    }, 400);
    return () => clearInterval(id);
  }, []);

  const eatFly = (fly: Fly, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tongue || munching) return;

    const arena = arenaRef.current;
    if (!arena) return;

    const rect = arena.getBoundingClientRect();
    const flyX = (fly.x / 100) * rect.width;
    const flyY = (fly.y / 100) * rect.height;
    const frogX = (FROG_X / 100) * rect.width;
    const frogY = (FROG_Y / 100) * rect.height;

    const dx = flyX - frogX;
    const dy = flyY - frogY;
    const length = Math.hypot(dx, dy);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    setTongue({
      flyId: fly.id,
      x: fly.x,
      y: fly.y,
      length: length / rect.width * 100 * 0.85,
      angle,
    });

    setTimeout(() => {
      setFlies((list) => list.filter((f) => f.id !== fly.id));
      setTongue(null);
      setMunching(true);
      setFrogBounce(true);
      setCaught((c) => c + 1);
      setCombo((c) => c + 1);
      const cheer = randomFrom(["Got it!", "Yum!", "Ribbit!", "Tasty!", "Zoom!"]);
      setMessage(cheer);
      void speakGame(cheer);

      setTimeout(() => {
        setMunching(false);
        setFrogBounce(false);
      }, 350);
    }, 280);
  };

  const missClick = () => {
    setCombo(0);
    setMessage("Miss! Tap a fly 🪰");
  };

  return (
    <div className="overflow-hidden rounded-4xl bg-white shadow-teal ring-2 ring-brand-border">
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "linear-gradient(135deg, #2ECC71, #00C9B1)" }}
      >
        <div>
          <p className="font-display text-lg font-extrabold text-emerald-900">
            🐸 Frog Pond
          </p>
          <p className="text-xs font-bold text-emerald-700">
            Caught {caught} · Combo ×{combo}
          </p>
        </div>
        <span className="coin-badge text-xs">🪙 Fun</span>
      </div>

      <p className="bg-lime-50 py-2 text-center font-display text-sm font-bold text-lime-800">
        {message}
      </p>

      <div
        ref={arenaRef}
        className="relative h-72 cursor-crosshair touch-none overflow-hidden bg-gradient-to-b from-sky-300 via-lime-200 to-lime-500 sm:h-96"
        onClick={missClick}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <span className="absolute left-[10%] top-[60%] text-4xl">🌿</span>
          <span className="absolute right-[15%] top-[50%] text-3xl">🪷</span>
          <span className="absolute left-[40%] top-[30%] text-2xl">🌾</span>
        </div>

        {flies.map((fly) => (
          <GameButton
            key={fly.id}
            speak="Catch"
            onClick={(e) => eatFly(fly, e)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 transition hover:scale-125 ${
              tongue?.flyId === fly.id ? "scale-0 opacity-0" : "animate-bounce"
            }`}
            style={{
              left: `${fly.x}%`,
              top: `${fly.y}%`,
              transform: `translate(-50%, -50%) rotate(${fly.wobble}deg)`,
            }}
            aria-label="Catch the fly"
          >
            <span className="text-4xl drop-shadow sm:text-5xl">🪰</span>
          </GameButton>
        ))}

        {tongue && (
          <div
            className="pointer-events-none absolute z-20 origin-left"
            style={{
              left: `${FROG_X}%`,
              top: `${FROG_Y}%`,
              width: `${tongue.length}%`,
              transform: `translate(0, -50%) rotate(${tongue.angle}deg)`,
              transition: "width 0.25s ease-out",
            }}
          >
            <div className="h-3 w-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600 shadow-md sm:h-4" />
            <div className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full bg-rose-500" />
          </div>
        )}

        <div
          className={`absolute z-30 -translate-x-1/2 transition-transform ${
            frogBounce ? "scale-110" : ""
          } ${munching ? "animate-pulse" : ""}`}
          style={{ left: `${FROG_X}%`, top: `${FROG_Y}%` }}
        >
          <Character id="dragon" size={munching ? 88 : 80} className="drop-shadow-lg" />
        </div>
      </div>

      <p className="py-3 text-center text-xs font-semibold text-emerald-700">
        Flies keep buzzing in — tap fast for a combo!
      </p>
    </div>
  );
}
