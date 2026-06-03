"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameButton } from "@/components/games/GameButton";
import { speakGame } from "@/lib/speech";

const TRAILS = [
  { name: "Wiggle", path: "M 40 180 Q 120 40 200 180 T 360 180" },
  { name: "Loop", path: "M 60 200 Q 200 20 340 200 Q 200 380 60 200" },
  { name: "Zigzag", path: "M 50 80 L 150 240 L 250 80 L 350 240" },
  { name: "Hill", path: "M 40 220 Q 200 40 360 220" },
  { name: "Wave", path: "M 30 150 Q 100 50 170 150 T 310 150 T 370 150" },
];

const CANVAS_W = 400;
const CANVAS_H = 280;
const HIT_WIDTH = 32;

function canvasPoint(canvas: HTMLCanvasElement, clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  };
}

export function TraceTrailGame() {
  const guideRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<Path2D | null>(null);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [level, setLevel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState(0);
  const [drawing, setDrawing] = useState(false);
  const [message, setMessage] = useState("Trace on top of the dotted line!");

  const trail = TRAILS[level % TRAILS.length];

  const paintGuide = useCallback(() => {
    const canvas = guideRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    pathRef.current = new Path2D(trail.path);
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.fillStyle = "#f0fdf9";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 20;
    ctx.setLineDash([14, 12]);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(pathRef.current);
  }, [trail.path]);

  const clearDrawLayer = useCallback(() => {
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    lastPointRef.current = null;
  }, []);

  const isOnTrail = useCallback((x: number, y: number) => {
    const canvas = guideRef.current;
    const path = pathRef.current;
    if (!canvas || !path) return false;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.save();
    ctx.lineWidth = HIT_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const hit = ctx.isPointInStroke(path, x, y);
    ctx.restore();
    return hit;
  }, []);

  const addProgress = useCallback(() => {
    setProgress((p) => {
      const next = Math.min(100, p + 3);
      if (next >= 100) {
        setStars((s) => s + 1);
        const done = `${trail.name} trail done!`;
        setMessage(`⭐ ${done}`);
        void speakGame(done);
        setTimeout(() => {
          setLevel((l) => l + 1);
          setProgress(0);
          setMessage("Next trail!");
          void speakGame("Next trail");
        }, 800);
      }
      return next;
    });
  }, [trail.name]);

  useEffect(() => {
    paintGuide();
    clearDrawLayer();
  }, [paintGuide, clearDrawLayer]);

  const strokeSegment = (x: number, y: number) => {
    const canvas = drawRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.setLineDash([]);

    const last = lastPointRef.current;
    if (last) {
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastPointRef.current = { x, y };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const { x, y } = canvasPoint(e.currentTarget, e.clientX, e.clientY);
    if (!isOnTrail(x, y)) {
      setMessage("Start on the dotted line!");
      return;
    }
    setDrawing(true);
    setMessage("Keep tracing…");
    lastPointRef.current = { x, y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    e.preventDefault();
    const { x, y } = canvasPoint(e.currentTarget, e.clientX, e.clientY);
    if (isOnTrail(x, y)) {
      strokeSegment(x, y);
      addProgress();
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDrawing(false);
    lastPointRef.current = null;
  };

  const resetTrail = () => {
    setProgress(0);
    setMessage("Trace on top of the dotted line!");
    paintGuide();
    clearDrawLayer();
  };

  const skipTrail = () => {
    setLevel((l) => l + 1);
    setProgress(0);
    setMessage("New shape!");
    void speakGame("New shape");
  };

  return (
    <div className="overflow-hidden rounded-4xl bg-white shadow-teal ring-2 ring-brand-border">
      <div
        className="flex justify-between px-4 py-3"
        style={{ background: "linear-gradient(135deg, #00C9B1, #2ECC71)" }}
      >
        <div>
          <p className="font-display text-lg font-extrabold text-lime-900">✏️ Trace Trail</p>
          <p className="text-xs font-bold text-lime-800">
            {trail.name} · ⭐ {stars} · {Math.round(progress)}%
          </p>
        </div>
        <span className="coin-badge text-xs">🪙 Fun</span>
      </div>

      <p className="bg-lime-50 py-2 text-center font-display text-sm font-bold text-lime-800">
        {message}
      </p>

      <div className="bg-emerald-50 p-3">
        <div className="relative w-full touch-none rounded-2xl shadow-inner">
          <canvas
            ref={guideRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl"
            aria-hidden
          />
          <canvas
            ref={drawRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="relative z-10 h-full w-full rounded-2xl"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onLostPointerCapture={handlePointerEnd}
          />
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-lime-200">
          <div
            className="h-full rounded-full bg-lime-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex justify-center gap-2 py-3">
        <GameButton
          speak="Try again"
          onClick={resetTrail}
          className="rounded-full bg-lime-500 px-5 py-2 font-display font-bold text-white"
        >
          Try again
        </GameButton>
        <GameButton
          speak="Skip"
          onClick={skipTrail}
          className="rounded-full bg-white px-5 py-2 font-display font-bold text-lime-800 ring-2 ring-lime-300"
        >
          Skip →
        </GameButton>
      </div>
    </div>
  );
}
