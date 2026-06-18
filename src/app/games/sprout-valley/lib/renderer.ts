import type { Plot, PlotState } from "../store/farmStore";
import { getCrop } from "./crops";

export const TILE_W = 88;
export const TILE_H = 52;
const TILE_DEPTH = 18;

export function toIso(col: number, row: number, offsetX: number, offsetY: number) {
  return {
    x: offsetX + (col - row) * (TILE_W / 2),
    y: offsetY + (col + row) * (TILE_H / 2),
  };
}

function drawTopTexture(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  baseColor: string,
  accent: string,
) {
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;
  ctx.beginPath();
  ctx.moveTo(x + hw, y);
  ctx.lineTo(x + TILE_W, y + hh);
  ctx.lineTo(x + hw, y + TILE_H);
  ctx.lineTo(x, y + hh);
  ctx.closePath();
  ctx.fillStyle = baseColor;
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.35;
  for (let i = 1; i < 4; i++) {
    const t = i / 4;
    ctx.beginPath();
    ctx.moveTo(x + hw * (1 - t), y + hh * t);
    ctx.lineTo(x + TILE_W - hw * t, y + hh + hh * t * 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export function drawTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  options: {
    topColor: string;
    leftColor: string;
    rightColor: string;
    selected?: boolean;
    glowing?: boolean;
    isSoil?: boolean;
  },
) {
  const { topColor, leftColor, rightColor, selected, glowing, isSoil } = options;
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;
  const top = glowing ? "#E8F5A8" : topColor;
  const accent = isSoil ? "#5D4037" : "#33691E";

  drawTopTexture(ctx, x, y, top, accent);

  ctx.beginPath();
  ctx.moveTo(x, y + hh);
  ctx.lineTo(x + hw, y + TILE_H);
  ctx.lineTo(x + hw, y + TILE_H + TILE_DEPTH);
  ctx.lineTo(x, y + hh + TILE_DEPTH * 0.55);
  ctx.closePath();
  ctx.fillStyle = leftColor;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x + hw, y + TILE_H);
  ctx.lineTo(x + TILE_W, y + hh);
  ctx.lineTo(x + TILE_W, y + hh + TILE_DEPTH * 0.55);
  ctx.lineTo(x + hw, y + TILE_H + TILE_DEPTH);
  ctx.closePath();
  ctx.fillStyle = rightColor;
  ctx.fill();

  if (isSoil && !glowing) {
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(x + hw - 8, y + hh + 2, 16, 4);
  }

  if (selected) {
    ctx.beginPath();
    ctx.moveTo(x + hw, y - 4);
    ctx.lineTo(x + TILE_W + 4, y + hh);
    ctx.lineTo(x + hw, y + TILE_H + 6);
    ctx.lineTo(x - 4, y + hh);
    ctx.closePath();
    ctx.strokeStyle = "#FFD600";
    ctx.lineWidth = 4;
    ctx.shadowColor = "rgba(255,214,0,0.8)";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  if (glowing) {
    ctx.beginPath();
    ctx.arc(x + hw, y + hh - 4, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD600";
    ctx.fill();
    ctx.strokeStyle = "#FF8F00";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

export function getTileColors(state: PlotState) {
  const soil = {
    empty: { top: "#C4A574", left: "#9E7B4F", right: "#7A5C3A" },
    planted: { top: "#A67C52", left: "#8D6E63", right: "#6D4C41" },
    watered: { top: "#8B6914", left: "#6D4C41", right: "#5D4037" },
    growing: { top: "#9CCC65", left: "#7CB342", right: "#558B2F" },
    ready: { top: "#AED581", left: "#7CB342", right: "#689F38" },
  };
  const grass = {
    empty: { top: "#9AD66A", left: "#6DB84A", right: "#4F9A38" },
    planted: soil.planted,
    watered: soil.watered,
    growing: soil.growing,
    ready: soil.ready,
  };
  const palette = state === "empty" ? grass : soil;
  return { ...palette[state], isSoil: state !== "empty" };
}

const imageCache = new Map<string, HTMLImageElement>();

export async function getSVGImage(svgId: string, size: number): Promise<HTMLImageElement | null> {
  const key = `${svgId}_${size}`;
  if (imageCache.has(key)) return imageCache.get(key)!;

  return new Promise((resolve) => {
    const svgEl = document.getElementById(svgId);
    if (!svgEl) {
      resolve(null);
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image(size, size);
    img.onload = () => {
      imageCache.set(key, img);
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };
    img.src = url;
  });
}

export function getCropStageSvg(plot: Plot): string {
  const crop = plot.cropId ? getCrop(plot.cropId) : null;
  if (!crop) return "crop-seed";
  if (plot.state === "ready") return crop.svgId;
  if (!plot.plantedAt || !plot.readyAt) return crop.stages[0];
  const now = Date.now();
  const total = Math.max(1, plot.readyAt - plot.plantedAt);
  const elapsed = Math.max(0, now - plot.plantedAt);
  const idx = Math.min(
    crop.stages.length - 1,
    Math.floor((elapsed / total) * crop.stages.length),
  );
  return crop.stages[idx];
}

export function drawCropOnTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  plot: Plot,
  cachedImg?: HTMLImageElement | null,
) {
  const cx = x + TILE_W / 2;
  const cy = y + TILE_H / 2 - 12;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;

  if (cachedImg) {
    ctx.drawImage(cachedImg, cx - 22, cy - 32, 44, 44);
    ctx.restore();
    return;
  }

  const crop = plot.cropId ? getCrop(plot.cropId) : null;
  if (!crop) {
    ctx.restore();
    return;
  }

  const colors: Record<string, string> = {
    wheat: "#FFD54F",
    corn: "#FFEB3B",
    carrot: "#FF9800",
    strawberry: "#E91E63",
    tomato: "#F44336",
    sunflower: "#FFC107",
    pumpkin: "#FF6F00",
    watermelon: "#4CAF50",
  };
  const color = colors[crop.id] ?? "#8BC34A";

  if (plot.state === "ready") {
    ctx.beginPath();
    ctx.ellipse(cx, cy + 8, 16, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "#558B2F";
    ctx.lineWidth = 2;
    ctx.stroke();
  } else if (plot.state === "growing" || plot.state === "watered") {
    ctx.fillStyle = "#6D4C41";
    ctx.fillRect(cx - 3, cy, 6, 18);
    ctx.beginPath();
    ctx.arc(cx, cy - 4, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#43A047";
    ctx.fill();
  } else {
    ctx.fillStyle = "#8D6E63";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function pointInDiamond(mx: number, my: number, tx: number, ty: number): boolean {
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;
  const dx = Math.abs(mx - (tx + hw)) / hw;
  const dy = Math.abs(my - (ty + hh)) / hh;
  return dx + dy <= 1.05;
}

export function drawAnimalPen(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  ready: boolean,
  accent: string,
) {
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.strokeStyle = "#8D6E63";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.35;
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.fillStyle = "#5D4037";
  ctx.font = "bold 10px Nunito, sans-serif";
  ctx.fillText(label.slice(0, 8), x + 8, y + h - 8);

  if (ready) {
    ctx.beginPath();
    ctx.arc(x + w - 10, y + 10, 9, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD600";
    ctx.fill();
    ctx.strokeStyle = "#FF8F00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#5D4037";
    ctx.font = "bold 11px Nunito, sans-serif";
    ctx.fillText("!", x + w - 13, y + 14);
  }
}
