"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import type { ContentTier, Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface Question {
  text: string;
  correct: number;
  wrong: number;
  correctSide: "left" | "right";
}

function generateQuestion(tier: ContentTier, levelIndex: number): Question {
  const ops =
    tier === 0 ? ["add"] : tier === 1 ? ["add", "sub"] : ["add", "sub", "mul"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const max = valueAtLevel(levelIndex, [5, 6, 10, 11, 12] as const);
  let a = 1 + Math.floor(Math.random() * max);
  let b = 1 + Math.floor(Math.random() * max);
  let correct = a + b;
  let text = `${a} + ${b} = ?`;
  if (op === "sub") {
    if (b > a) [a, b] = [b, a];
    correct = a - b;
    text = `${a} − ${b} = ?`;
  } else if (op === "mul") {
    a = 1 + Math.floor(Math.random() * 9);
    b = 1 + Math.floor(Math.random() * 9);
    correct = a * b;
    text = `${a} × ${b} = ?`;
  }
  let wrong = correct + (Math.random() > 0.5 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
  if (wrong === correct) wrong += 1;
  const correctSide: "left" | "right" = Math.random() > 0.5 ? "left" : "right";
  return { text, correct, wrong, correctSide };
}

function getSpeed(correctCount: number) {
  const base = 4500;
  const reduction = Math.min(correctCount * 250, 2700);
  return Math.max(base - reduction, 1800);
}

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

export function MathsDuelGame({ difficulty, onComplete }: Props) {
  const total = 10;
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [coins, setCoins] = useState(0);
  const [question, setQuestion] = useState(() =>
    generateQuestion(difficulty.contentTier, difficulty.levelIndex),
  );
  const [sliding, setSliding] = useState(false);
  const [answered, setAnswered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const speed = getSpeed(correctCount);
  const speedPercent = ((4500 - speed) / (4500 - 1800)) * 100;

  const finishRound = useCallback(
    (stars: 1 | 2 | 3) => {
      if (qIndex + 1 >= total) {
        onComplete(stars);
      } else {
        setQIndex((i) => i + 1);
        setQuestion(generateQuestion(difficulty.contentTier, difficulty.levelIndex));
        setAnswered(false);
        setSliding(false);
      }
    },
    [qIndex, total, onComplete, difficulty.contentTier, difficulty.levelIndex],
  );

  useEffect(() => {
    void speakGame(question.text.replace("?", ""));
    const t = setTimeout(() => setSliding(true), 500);
    return () => clearTimeout(t);
  }, [question.text, qIndex]);

  useEffect(() => {
    if (!sliding || answered) return;
    timeoutRef.current = setTimeout(() => {
      if (answered) return;
      SFX.wrong.play();
      void speakGame(`The answer was ${question.correct}!`);
      finishRound(correctCount >= 5 ? 2 : 1);
    }, speed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sliding, answered, speed, question.correct, correctCount, finishRound]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const answer = (side: "left" | "right") => {
    if (!sliding || answered) return;
    setAnswered(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const ok = side === question.correctSide;
    if (ok) {
      SFX.correct.play();
      void speakGame("Lightning fast! Correct!");
      const next = correctCount + 1;
      setCorrectCount(next);
      setCoins((c) => c + 15);
      if (next % 3 === 0) void speakGame("Speeding up! Can you keep up?");
      const stars: 1 | 2 | 3 = next >= 8 ? 3 : next >= 5 ? 2 : 1;
      setTimeout(() => finishRound(stars), 400);
    } else {
      SFX.wrong.play();
      setTimeout(() => finishRound(correctCount >= 5 ? 2 : 1), 500);
    }
  };

  const leftVal = question.correctSide === "left" ? question.correct : question.wrong;
  const rightVal = question.correctSide === "right" ? question.correct : question.wrong;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200">
      <GameHeader title="Maths Duel" coins={coins} round={qIndex + 1} totalRounds={total} />
      <div className="mx-4 mb-3 h-2 overflow-hidden rounded-full bg-brand-border">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${speedPercent}%`,
            background: `linear-gradient(90deg, #00C9B1, ${speedPercent > 70 ? "#FF4D8D" : "#FFD600"})`,
          }}
        />
      </div>
      <p className="py-6 text-center font-display text-3xl text-brand-text">{question.text}</p>
      <div className="relative mx-4 flex h-44 items-center justify-center overflow-hidden rounded-3xl bg-white/40">
        <button
          type="button"
          onClick={() => answer("left")}
          className="absolute left-4 top-1/2 z-10 flex h-20 min-w-[112px] -translate-y-1/2 items-center justify-center rounded-2xl border-2 border-brand-border bg-white px-4 font-display text-3xl font-bold shadow-lg transition-transform active:scale-95"
          style={{
            transform: sliding
              ? "translate(-50%, -50%)"
              : "translate(calc(-50vw - 50%), -50%)",
            left: "50%",
            top: "50%",
            transition: sliding ? `transform ${speed}ms linear` : "none",
          }}
        >
          {leftVal}
        </button>
        <button
          type="button"
          onClick={() => answer("right")}
          className="absolute right-4 top-1/2 z-10 flex h-20 min-w-[112px] -translate-y-1/2 items-center justify-center rounded-2xl border-2 border-brand-border bg-white px-4 font-display text-3xl font-bold shadow-lg transition-transform active:scale-95"
          style={{
            transform: sliding
              ? "translate(50%, -50%)"
              : "translate(calc(50vw + 50%), -50%)",
            right: "50%",
            top: "50%",
            transition: sliding ? `transform ${speed}ms linear` : "none",
          }}
        >
          {rightVal}
        </button>
      </div>
    </div>
  );
}
