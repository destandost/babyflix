"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameHeader } from "@/components/games/GameHeader";
import type { Difficulty } from "@/lib/difficulty";
import { valueAtLevel } from "@/lib/difficulty";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface Tile {
  id: string;
  value: number;
  x: number;
  y: number;
  speed: number;
  color: string;
  selected: boolean;
}

const TILE_COLORS = ["#FF4D8D", "#7B4FFF", "#00C9B1", "#FFD600", "#FF6B4A"];

interface Props {
  difficulty: Difficulty;
  onComplete: (stars: 1 | 2 | 3) => void;
}

export function NumberBondsGame({ difficulty, onComplete }: Props) {
  const target = valueAtLevel(difficulty.levelIndex, [5, 7, 10, 15, 20] as const);
  const maxTiles = valueAtLevel(difficulty.levelIndex, [4, 4, 5, 5, 6] as const);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selected, setSelected] = useState<Tile | null>(null);
  const [coins, setCoins] = useState(0);
  const [pairs, setPairs] = useState(0);
  const [lives, setLives] = useState(3);
  const [speedMul, setSpeedMul] = useState(difficulty.speed * 0.4);
  const arenaRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const totalPairs = 8;

  const spawn = useCallback(() => {
    setTiles((t) => {
      if (t.length >= maxTiles) return t;
      return [
        ...t,
        {
          id: `t-${Date.now()}-${Math.random()}`,
          value: 1 + Math.floor(Math.random() * Math.min(target, 12)),
          x: 8 + Math.random() * 74,
          y: -80,
          speed: speedMul * (0.8 + Math.random() * 0.4),
          color: TILE_COLORS[Math.floor(Math.random() * TILE_COLORS.length)],
          selected: false,
        },
      ];
    });
  }, [maxTiles, speedMul, target]);

  useEffect(() => {
    void speakGame(`Find two numbers that make ${target}!`);
    spawn();
    const spawnId = setInterval(spawn, 2200);
    return () => clearInterval(spawnId);
  }, [spawn, target]);

  useEffect(() => {
    const tick = () => {
      const h = arenaRef.current?.clientHeight ?? 400;
      setTiles((list) => {
        const next: Tile[] = [];
        let escaped = false;
        for (const tile of list) {
          const ny = tile.y + tile.speed;
          if (ny > h + 40) {
            escaped = true;
            continue;
          }
          next.push({ ...tile, y: ny });
        }
        if (escaped) {
          setLives((l) => {
            const nl = l - 1;
            if (nl <= 0) {
              onComplete(1);
            }
            return Math.max(0, nl);
          });
          void speakGame("Oh no, that one got away!");
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  const tap = (tile: Tile) => {
    if (!selected) {
      setSelected(tile);
      setTiles((t) => t.map((x) => (x.id === tile.id ? { ...x, selected: true } : x)));
      return;
    }
    if (selected.id === tile.id) {
      setSelected(null);
      setTiles((t) => t.map((x) => ({ ...x, selected: false })));
      return;
    }
    if (selected.value + tile.value === target) {
      SFX.correct.play();
      void speakGame(`Yes! ${selected.value} and ${tile.value} make ${target}!`);
      setTiles((t) => t.filter((x) => x.id !== selected.id && x.id !== tile.id));
      setSelected(null);
      setCoins((c) => c + 15);
      setPairs((p) => {
        const np = p + 1;
        if (np >= totalPairs) onComplete(3);
        setSpeedMul((s) => s + 0.05);
        return np;
      });
    } else {
      SFX.wrong.play();
      void speakGame(`Those don't add up to ${target}! Try again!`);
      setSelected(null);
      setTiles((t) => t.map((x) => ({ ...x, selected: false })));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 to-purple-200">
      <GameHeader
        title="Number Bonds"
        coins={coins}
        lives={lives}
        round={pairs + 1}
        totalRounds={totalPairs}
      />
      <p className="py-3 text-center font-display text-3xl text-brand-purple">Make {target}!</p>
      <div ref={arenaRef} className="relative mx-4 h-[420px] overflow-hidden rounded-3xl bg-white/60">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => tap(tile)}
            className={`absolute flex h-14 w-14 items-center justify-center rounded-2xl font-display text-xl font-bold text-white shadow-lg transition ${
              tile.selected ? "ring-4 ring-brand-yellow scale-110" : ""
            }`}
            style={{
              left: `${tile.x}%`,
              top: tile.y,
              background: tile.color,
            }}
          >
            {tile.value}
          </button>
        ))}
      </div>
    </div>
  );
}
