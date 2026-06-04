"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import { BUBBLE_COLORS } from "@/lib/game-data";
import type { ContentTier, Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

const ROUNDS = 5;

interface Bubble {
  id: string;
  value: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  swayOffset: number;
  popping?: boolean;
}

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

function valuePool(tier: ContentTier): string[] {
  if (tier === 0) return "ABCDEF".split("");
  if (tier === 1) return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return [
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    ...Array.from({ length: 20 }, (_, i) => String(i + 1)),
  ];
}

function pickTarget(tier: ContentTier): string {
  const pool = valuePool(tier);
  return pool[Math.floor(Math.random() * pool.length)];
}

function pickDecoy(tier: ContentTier, exclude: string): string {
  const choices = valuePool(tier).filter((v) => v !== exclude);
  if (choices.length === 0) return exclude;
  return choices[Math.floor(Math.random() * choices.length)];
}

function targetPrompt(value: string) {
  return /^\d+$/.test(value) ? `Find the number ${value}!` : `Pop the letter ${value}!`;
}

let bubbleSeq = 0;

export function BubblePopGame({ difficulty, onComplete }: Props) {
  const { levelIndex, contentTier } = difficulty;
  const maxBubbles = valueAtLevel(levelIndex, [4, 4, 5, 5, 6] as const);
  const baseSpeed = valueAtLevel(levelIndex, [0.45, 0.55, 0.85, 1.05, 1.2] as const);
  const spawnMs = valueAtLevel(levelIndex, [2200, 1800, 1500, 1200, 1000] as const);

  const [target, setTarget] = useState(() => pickTarget(contentTier));
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [shakeId, setShakeId] = useState<string | null>(null);

  const arenaRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const targetRef = useRef(target);
  const scoreRef = useRef(0);
  const finishedRef = useRef(false);
  const poppingRef = useRef<Set<string>>(new Set());

  targetRef.current = target;
  scoreRef.current = score;

  const makeBubble = useCallback(
    (mustBeTarget: boolean): Bubble => {
      const t = targetRef.current;
      const value = mustBeTarget ? t : pickDecoy(contentTier, t);
      bubbleSeq += 1;
      return {
        id: `bubble-${bubbleSeq}`,
        value,
        x: 10 + Math.random() * 75,
        y: -80 - Math.random() * 40,
        speed: baseSpeed * difficulty.speed * (0.85 + Math.random() * 0.3),
        size: 64 + Math.random() * 24,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        swayOffset: Math.random() * Math.PI * 2,
      };
    },
    [contentTier, baseSpeed, difficulty.speed],
  );

  const activeBubbles = (list: Bubble[]) =>
    list.filter((b) => !b.popping && !poppingRef.current.has(b.id));

  const hasTargetVisible = (list: Bubble[]) =>
    activeBubbles(list).some((b) => b.value === targetRef.current);

  const skipTargetAnnounce = useRef(true);

  // Starter bubbles always include the current target
  useEffect(() => {
    setBubbles([makeBubble(true), makeBubble(false), makeBubble(false)]);
    void speakGame(targetPrompt(targetRef.current));
  }, [makeBubble]);

  useEffect(() => {
    if (skipTargetAnnounce.current) {
      skipTargetAnnounce.current = false;
      return;
    }
    void speakGame(targetPrompt(target));
  }, [target]);

  // Spawn loop — guarantee a target bubble is always on screen
  useEffect(() => {
    const id = setInterval(() => {
      setBubbles((list) => {
        const active = activeBubbles(list);
        if (active.length >= maxBubbles) return list;
        const needsTarget = !hasTargetVisible(list);
        return [...list, makeBubble(needsTarget)];
      });
    }, spawnMs);
    return () => clearInterval(id);
  }, [makeBubble, maxBubbles, spawnMs]);

  // Animation loop
  useEffect(() => {
    const loop = () => {
      const h = arenaRef.current?.clientHeight ?? 500;
      setBubbles((list) => {
        const next: Bubble[] = [];
        for (const b of list) {
          if (b.popping || poppingRef.current.has(b.id)) {
            continue;
          }
          const y = b.y + b.speed;
          const sway = Math.sin(Date.now() * 0.001 + b.swayOffset) * 0.35;
          if (y > h + 60) {
            const escapedWasTarget = b.value === targetRef.current;
            next.push(makeBubble(escapedWasTarget));
            if (escapedWasTarget) {
              void speakGame(`Keep looking for ${targetRef.current}!`);
            }
            continue;
          }
          next.push({
            ...b,
            y,
            x: Math.min(88, Math.max(8, b.x + sway)),
          });
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [makeBubble]);

  const advanceTarget = () => {
    let next = pickTarget(contentTier);
    for (let i = 0; i < 10 && next === targetRef.current; i++) {
      next = pickTarget(contentTier);
    }
    setTarget(next);
  };

  const pop = (bubble: Bubble) => {
    if (bubble.popping || poppingRef.current.has(bubble.id) || finishedRef.current) {
      return;
    }

    const isCorrect = bubble.value === targetRef.current;

    if (isCorrect) {
      poppingRef.current.add(bubble.id);
      SFX.pop.play();
      void speakGame(/^\d+$/.test(bubble.value) ? `Brilliant! That's ${bubble.value}!` : "Amazing pop!");

      setBubbles((b) => b.map((x) => (x.id === bubble.id ? { ...x, popping: true } : x)));
      setTimeout(() => {
        poppingRef.current.delete(bubble.id);
        setBubbles((b) => b.filter((x) => x.id !== bubble.id));
      }, 280);

      setCoins((c) => c + 10);
      const nextScore = scoreRef.current + 1;
      scoreRef.current = nextScore;
      setScore(nextScore);

      if (nextScore >= ROUNDS) {
        finishedRef.current = true;
        void speakGame("You popped them all! Incredible!");
        const stars: 1 | 2 | 3 = nextScore >= ROUNDS ? 3 : nextScore >= 3 ? 2 : 1;
        setTimeout(() => onComplete(stars), 600);
      } else {
        advanceTarget();
      }
    } else {
      SFX.wrong.play();
      void speakGame(`Keep looking for ${targetRef.current}!`);
      setShakeId(bubble.id);
      setTimeout(() => setShakeId(null), 400);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(180deg, #0d0d2b 0%, #1a1a4e 100%)" }}
    >
      <GameHeader
        title="Bubble Pop"
        coins={coins}
        round={Math.min(score + 1, ROUNDS)}
        totalRounds={ROUNDS}
      />
      <p className="py-3 text-center font-display text-2xl text-white">
        Pop: <span className="text-brand-yellow">{target}</span>
      </p>
      <div ref={arenaRef} className="relative mx-2 h-[480px] overflow-hidden">
        {bubbles.map((b) => {
          const isTargetBubble = b.value === target;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => pop(b)}
              className={`absolute flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 font-display text-xl font-bold text-white ${
                b.popping ? "scale-0 opacity-0" : ""
              } ${shakeId === b.id ? "animate-shake border-red-400" : "border-white/30"} ${
                isTargetBubble && !b.popping ? "ring-2 ring-white/50" : ""
              }`}
              style={{
                left: `${b.x}%`,
                top: b.y,
                width: b.size,
                height: b.size,
                background: `${b.color}cc`,
                transition: b.popping ? "transform 0.25s, opacity 0.25s" : "transform 0.15s",
              }}
            >
              {b.value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
