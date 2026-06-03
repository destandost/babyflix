"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameButton } from "@/components/games/GameButton";
import { randomFrom } from "@/lib/playful-reactions";
import { speakGame } from "@/lib/speech";

type Bubble = {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
};

export function BubbleCatchGame() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [basketX, setBasketX] = useState(50);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [caught, setCaught] = useState(0);
  const [missed, setMissed] = useState(0);
  const [message, setMessage] = useState("Drag the basket — catch the bubbles!");
  const [dragging, setDragging] = useState(false);

  const spawnBubble = useCallback(() => {
    setBubbles((b) => {
      if (b.length >= 8) return b;
      return [
        ...b,
        {
          id: `b-${Date.now()}-${Math.random()}`,
          x: 10 + Math.random() * 80,
          y: 0,
          size: 28 + Math.random() * 20,
          speed: 0.35 + Math.random() * 0.35,
        },
      ];
    });
  }, []);

  useEffect(() => {
    spawnBubble();
    const id = setInterval(spawnBubble, 900);
    return () => clearInterval(id);
  }, [spawnBubble]);

  useEffect(() => {
    const id = setInterval(() => {
      setBubbles((list) => {
        const next: Bubble[] = [];
        let miss = 0;

        for (const b of list) {
          const newY = b.y + b.speed;
          const caughtBubble =
            newY >= 78 &&
            newY <= 92 &&
            Math.abs(b.x - basketX) < 14;

          if (caughtBubble) {
            setCaught((c) => c + 1);
            const cheer = randomFrom(["Pop!", "Got it!", "Nice!", "Splash!"]);
            setMessage(cheer);
            void speakGame(cheer);
            continue;
          }

          if (newY > 100) {
            miss++;
            continue;
          }

          next.push({ ...b, y: newY });
        }

        if (miss > 0) {
          setMissed((m) => m + miss);
          setMessage("Oops — try again!");
        }

        return next;
      });
    }, 50);

    return () => clearInterval(id);
  }, [basketX]);

  const moveBasket = (clientX: number) => {
    const el = arenaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.min(88, Math.max(12, x)));
  };

  return (
    <div className="overflow-hidden rounded-4xl bg-white shadow-teal ring-2 ring-brand-border">
      <div
        className="flex justify-between px-4 py-3"
        style={{ background: "linear-gradient(135deg, #00D4FF, #00C9B1)" }}
      >
        <div>
          <p className="font-display text-lg font-extrabold text-sky-900">🫧 Bubble Catch</p>
          <p className="text-xs font-bold text-sky-700">
            Caught {caught} · Missed {missed}
          </p>
        </div>
        <span className="coin-badge text-xs">🪙 Fun</span>
      </div>

      <p className="bg-sky-50 py-2 text-center font-display text-sm font-bold text-sky-800">
        {message}
      </p>

      <div
        ref={arenaRef}
        className="relative h-80 touch-none overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-lime-200 sm:h-96"
        onPointerDown={(e) => {
          setDragging(true);
          moveBasket(e.clientX);
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => dragging && moveBasket(e.clientX)}
        onPointerUp={() => setDragging(false)}
      >
        {bubbles.map((b) => (
          <span
            key={b.id}
            className="pointer-events-none absolute -translate-x-1/2 rounded-full bg-white/70 shadow-inner"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
            }}
          />
        ))}

        <div
          className="absolute bottom-4 z-10 -translate-x-1/2 transition-[left] duration-75"
          style={{ left: `${basketX}%` }}
        >
          <span className="text-5xl drop-shadow-lg" aria-hidden>
            🧺
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-3 border-t border-sky-100 py-3">
        <GameButton
          speak="Move left"
          onClick={() => setBasketX((x) => Math.max(12, x - 12))}
          className="rounded-2xl bg-sky-500 px-6 py-3 text-2xl font-bold text-white"
        >
          ←
        </GameButton>
        <GameButton
          speak="Move right"
          onClick={() => setBasketX((x) => Math.min(88, x + 12))}
          className="rounded-2xl bg-sky-500 px-6 py-3 text-2xl font-bold text-white"
        >
          →
        </GameButton>
      </div>
    </div>
  );
}
