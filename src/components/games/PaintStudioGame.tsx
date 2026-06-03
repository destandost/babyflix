"use client";

import { useEffect, useRef, useState } from "react";
import { GameButton } from "@/components/games/GameButton";
import { PlayWorldFrame } from "./playful/PlayWorldFrame";
import { PAINT_COLOR_NAMES, STICKER_SPEAK } from "@/lib/game-speak-labels";
import { randomFrom, BUDDY_REACTIONS } from "@/lib/playful-reactions";
import { speakGame } from "@/lib/speech";

const COLORS = [
  "#ff6b9d",
  "#ffc93c",
  "#6bcb77",
  "#4d96ff",
  "#9d4edd",
  "#ff6f3c",
  "#2d2d2d",
  "#ffffff",
];

const STICKERS = [
  "⭐",
  "🌈",
  "🐶",
  "🐱",
  "🌸",
  "🚗",
  "🏠",
  "🎈",
  "A",
  "B",
  "C",
  "❤️",
  "🦋",
  "🍎",
];

type StickerOnCanvas = { id: string; emoji: string; x: number; y: number; size: number };

export function PaintStudioGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [room, setRoom] = useState<"paint" | "stickers" | "gallery">("paint");
  const [color, setColor] = useState(COLORS[0]);
  const [brush, setBrush] = useState(8);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [line, setLine] = useState("Paint anything you want!");
  const [stickers, setStickers] = useState<StickerOnCanvas[]>([]);
  const [pickedSticker, setPickedSticker] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff9f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const react = () => {
    const line = randomFrom(BUDDY_REACTIONS);
    setLine(line);
    void speakGame(line);
  };

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== "brush") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, brush, 0, Math.PI * 2);
    ctx.fill();
  };

  const erase = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool !== "eraser") return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.fillStyle = "#fff9f0";
    ctx.beginPath();
    ctx.arc(x, y, brush + 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff9f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStickers([]);
    setLine("Fresh paper!");
  };

  const saveToGallery = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const data = canvas.toDataURL("image/png");
    setGallery((g) => [data, ...g].slice(0, 6));
    react();
    setLine("Saved to your gallery!");
    setRoom("gallery");
  };

  const placeSticker = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pickedSticker) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStickers((s) => [
      ...s,
      {
        id: `st-${Date.now()}`,
        emoji: pickedSticker,
        x,
        y,
        size: 2 + Math.floor(Math.random() * 2),
      },
    ]);
    setPickedSticker(null);
    react();
  };

  return (
    <PlayWorldFrame
      title="Paint Studio"
      subtitle="Draw · stamp stickers · save art"
      tabs={[
        { id: "paint", label: "Canvas", emoji: "🖌️" },
        { id: "stickers", label: "Stickers", emoji: "✨" },
        { id: "gallery", label: "Gallery", emoji: "🖼️" },
      ]}
      activeTab={room}
      onTabChange={(id) => setRoom(id as typeof room)}
      buddyCharacter="bunny"
      buddyLine={line}
      footer={
        <p className="text-center text-xs font-bold text-violet-600">
          {gallery.length} masterpiece{gallery.length === 1 ? "" : "s"} saved
        </p>
      }
    >
      {room === "paint" && (
        <div className="bg-[#fff9f0] p-3">
          <div className="relative overflow-hidden rounded-2xl border-4 border-violet-200 bg-white shadow-inner">
            <canvas
              ref={canvasRef}
              width={600}
              height={360}
              className="relative z-0 h-auto w-full touch-none"
              onPointerDown={(e) => {
                setIsDrawing(true);
                (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
                if (tool === "brush") draw(e);
                else erase(e);
              }}
              onPointerMove={(e) => {
                if (tool === "brush") draw(e);
                else erase(e);
              }}
              onPointerUp={() => setIsDrawing(false)}
              onPointerLeave={() => setIsDrawing(false)}
            />
            <div className="pointer-events-none absolute inset-0 z-10">
              {stickers.map((st) => (
                <span
                  key={st.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${st.x}%`,
                    top: `${st.y}%`,
                    fontSize: `${st.size}rem`,
                  }}
                >
                  {st.emoji}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {COLORS.map((c) => (
              <GameButton
                key={c}
                speak={PAINT_COLOR_NAMES[c] ?? "color"}
                onClick={() => setColor(c)}
                className={`h-9 w-9 rounded-full border-2 shadow ${
                  color === c ? "scale-110 border-violet-600" : "border-white"
                }`}
                style={{ backgroundColor: c }}
                aria-label={PAINT_COLOR_NAMES[c] ?? "color"}
              />
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <GameButton
              speak="Brush"
              onClick={() => setTool("brush")}
              className={`rounded-xl px-4 py-2 font-bold ${
                tool === "brush" ? "bg-violet-500 text-white" : "bg-white"
              }`}
            >
              🖌️ Brush
            </GameButton>
            <GameButton
              speak="Eraser"
              onClick={() => setTool("eraser")}
              className={`rounded-xl px-4 py-2 font-bold ${
                tool === "eraser" ? "bg-violet-500 text-white" : "bg-white"
              }`}
            >
              🧽 Eraser
            </GameButton>
            {[4, 8, 14, 22].map((b) => (
              <GameButton
                key={b}
                speak={`Brush size ${b}`}
                onClick={() => setBrush(b)}
                className={`rounded-xl px-3 py-2 font-bold ${
                  brush === b ? "bg-amber-300" : "bg-white"
                }`}
              >
                ● {b}
              </GameButton>
            ))}
            <GameButton
              speak="New paper"
              onClick={clearCanvas}
              className="rounded-xl bg-rose-200 px-4 py-2 font-bold text-rose-800"
            >
              New paper
            </GameButton>
            <GameButton
              speak="Save"
              onClick={saveToGallery}
              className="rounded-xl bg-emerald-500 px-4 py-2 font-bold text-white"
            >
              Save 🖼️
            </GameButton>
          </div>
        </div>
      )}

      {room === "stickers" && (
        <div
          className="relative min-h-[320px] cursor-crosshair bg-[#fff9f0] p-4"
          onClick={placeSticker}
        >
          <p className="mb-3 text-center font-bold text-violet-700">
            Pick a sticker, then tap the big paper
          </p>
          <div className="flex min-h-[200px] flex-wrap justify-center gap-2 rounded-2xl border-4 border-dashed border-violet-200 bg-white p-4">
            {stickers.map((st) => (
              <span
                key={st.id}
                className="absolute"
                style={{
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  fontSize: `${st.size}rem`,
                }}
              >
                {st.emoji}
              </span>
            ))}
            {stickers.length === 0 && (
              <span className="self-center text-violet-300">Empty paper — tap stickers below</span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {STICKERS.map((s) => (
              <GameButton
                key={s}
                speak={STICKER_SPEAK[s] ?? s}
                onClick={(e) => {
                  e.stopPropagation();
                  setPickedSticker(s);
                  const label = STICKER_SPEAK[s] ?? s;
                  setLine(`Stamp ${label}!`);
                }}
                className={`rounded-2xl bg-white px-4 py-3 text-3xl shadow ${
                  pickedSticker === s ? "ring-4 ring-violet-400" : ""
                }`}
              >
                {s}
              </GameButton>
            ))}
          </div>
        </div>
      )}

      {room === "gallery" && (
        <div className="min-h-[320px] bg-violet-50 p-4">
          {gallery.length === 0 ? (
            <p className="py-16 text-center font-bold text-violet-500">
              No art yet — paint on the canvas and tap Save!
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg ring-2 ring-violet-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Artwork ${i + 1}`} className="h-auto w-full" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </PlayWorldFrame>
  );
}
