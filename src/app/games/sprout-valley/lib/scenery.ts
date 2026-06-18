import { TILE_H, TILE_W, toIso } from "./renderer";

/** Warm sky + hills + sun (Hay Day–style pastoral backdrop). */
export function drawSkyAndHorizon(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, "#7EC8F2");
  sky.addColorStop(0.45, "#B8E4FA");
  sky.addColorStop(1, "#F5E6C8");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const hill1 = ctx.createLinearGradient(0, h * 0.5, 0, h);
  hill1.addColorStop(0, "#6AAF4E");
  hill1.addColorStop(1, "#4E8F38");
  ctx.fillStyle = hill1;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.58);
  ctx.quadraticCurveTo(w * 0.25, h * 0.48, w * 0.5, h * 0.55);
  ctx.quadraticCurveTo(w * 0.78, h * 0.62, w, h * 0.52);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#5A9A42";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.68);
  ctx.quadraticCurveTo(w * 0.4, h * 0.6, w, h * 0.65);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(w * 0.82, h * 0.14, 28, 0, Math.PI * 2);
  ctx.fillStyle = "#FFF9C4";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,214,0,0.5)";
  ctx.lineWidth = 6;
  ctx.stroke();

  drawCloud(ctx, w * 0.15, h * 0.1, 1);
  drawCloud(ctx, w * 0.55, h * 0.06, 0.85);
  drawCloud(ctx, w * 0.35, h * 0.18, 0.7);
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.arc(22, 4, 22, 0, Math.PI * 2);
  ctx.arc(48, 0, 16, 0, Math.PI * 2);
  ctx.arc(24, -8, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Large grass field under the farm plot. */
export function drawGrassField(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  cols: number,
  rows: number,
) {
  const pad = 48;
  const hw = (cols + rows) * (TILE_W / 4) + pad;
  const hh = (cols + rows) * (TILE_H / 4) + pad;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  ctx.ellipse(0, 8, hw, hh, 0, 0, Math.PI * 2);
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, hw);
  g.addColorStop(0, "#8BCF5A");
  g.addColorStop(0.6, "#6DB84A");
  g.addColorStop(1, "#4A9035");
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = "#3D7A2F";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const rx = cx + Math.cos(angle) * (hw * 0.85);
    const ry = cy + Math.sin(angle) * (hh * 0.55) + 8;
    ctx.fillStyle = i % 2 === 0 ? "#5DA644" : "#72B855";
    ctx.beginPath();
    ctx.ellipse(rx, ry, 4, 8, angle, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawWoodenFence(
  ctx: CanvasRenderingContext2D,
  offsetX: number,
  offsetY: number,
  cols: number,
  rows: number,
) {
  const corners = [
    toIso(0, 0, offsetX, offsetY),
    toIso(cols - 1, 0, offsetX, offsetY),
    toIso(cols - 1, rows - 1, offsetX, offsetY),
    toIso(0, rows - 1, offsetX, offsetY),
  ];

  ctx.strokeStyle = "#8D6E63";
  ctx.lineWidth = 4;
  ctx.lineJoin = "round";
  ctx.beginPath();
  const pad = 18;
  corners.forEach((p, i) => {
    const x = p.x + TILE_W / 2;
    const y = p.y - pad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.stroke();

  corners.forEach((p) => {
    const x = p.x + TILE_W / 2;
    const y = p.y - pad;
    ctx.fillStyle = "#A1887F";
    ctx.fillRect(x - 4, y - 20, 8, 22);
    ctx.fillStyle = "#FFD54F";
    ctx.beginPath();
    ctx.arc(x, y - 22, 6, 0, Math.PI * 2);
    ctx.fill();
  });
}

/** Barn local coords: foundation bottom sits at y = BARN_GROUND_Y */
export const BARN_GROUND_Y = 50;

export interface FarmHitArea {
  id: "truck" | "stall";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FarmLayout {
  offsetX: number;
  offsetY: number;
  farmCenterX: number;
  grassCenterX: number;
  grassCenterY: number;
  barnX: number;
  barnY: number;
  windmillX: number;
  windmillY: number;
  truckX: number;
  truckY: number;
  stallX: number;
  stallY: number;
  truckHit: FarmHitArea;
  stallHit: FarmHitArea;
}

export const TRUCK_GROUND_Y = 54;
export const STALL_GROUND_Y = 50;

export function pointInRect(mx: number, my: number, x: number, y: number, w: number, h: number) {
  return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

export function computeFarmLayout(
  canvasW: number,
  canvasH: number,
  cols: number,
  rows: number,
): FarmLayout {
  const farmCenterX = canvasW / 2;
  const offsetX = farmCenterX - ((cols - rows) * TILE_W) / 4 - TILE_W / 2;
  const offsetY = canvasH * 0.34;

  const backLeft = toIso(0, 0, offsetX, offsetY);
  const backRight = toIso(cols - 1, 0, offsetX, offsetY);
  const frontLeft = toIso(0, rows - 1, offsetX, offsetY);
  const frontRight = toIso(cols - 1, rows - 1, offsetX, offsetY);

  const groundY =
    Math.max(
      frontLeft.y + TILE_H,
      frontRight.y + TILE_H,
      backLeft.y + TILE_H,
    ) + 14;

  const grassCenterX = (backLeft.x + frontRight.x + TILE_W) / 2;
  const grassCenterY = (backLeft.y + frontRight.y + TILE_H) / 2 + 18;

  const barnX = backLeft.x - 62;
  const barnY = groundY - BARN_GROUND_Y;

  const windmillX = backRight.x + TILE_W + 18;
  const windmillY = groundY - 50;

  const truckX = frontRight.x + TILE_W - 8;
  const truckY = groundY - TRUCK_GROUND_Y;
  const stallX = frontLeft.x - 74;
  const stallY = groundY - STALL_GROUND_Y;

  return {
    offsetX,
    offsetY,
    farmCenterX,
    grassCenterX,
    grassCenterY,
    barnX,
    barnY,
    windmillX,
    windmillY,
    truckX,
    truckY,
    stallX,
    stallY,
    truckHit: { id: "truck", x: truckX, y: truckY, w: 92, h: 58 },
    stallHit: { id: "stall", x: stallX, y: stallY, w: 76, h: 54 },
  };
}

/** Delivery truck — tap to open orders. */
export function drawDeliveryTruck(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  hasReadyOrder: boolean,
) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#5DA644";
  ctx.beginPath();
  ctx.ellipse(46, TRUCK_GROUND_Y - 2, 48, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#9E9E9E";
  ctx.fillRect(4, 38, 68, 6);

  ctx.fillStyle = "#FF7043";
  ctx.beginPath();
  ctx.roundRect(4, 18, 52, 22, 4);
  ctx.fill();
  ctx.strokeStyle = "#BF360C";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#FF8A65";
  ctx.beginPath();
  ctx.roundRect(56, 24, 28, 16, 3);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#B3E5FC";
  ctx.fillRect(60, 27, 20, 10);

  ctx.fillStyle = "#424242";
  ctx.beginPath();
  ctx.arc(18, 46, 9, 0, Math.PI * 2);
  ctx.arc(68, 46, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#757575";
  ctx.beginPath();
  ctx.arc(18, 46, 4, 0, Math.PI * 2);
  ctx.arc(68, 46, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#BF360C";
  ctx.fillRect(4, 28, 52, 4);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 9px Nunito, sans-serif";
  ctx.fillText("ORDERS", 14, 16);

  if (hasReadyOrder) {
    ctx.beginPath();
    ctx.arc(82, 12, 11, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD600";
    ctx.fill();
    ctx.strokeStyle = "#FF8F00";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#5D4037";
    ctx.font = "bold 12px Nunito, sans-serif";
    ctx.fillText("!", 79, 16);
  }

  ctx.restore();
}

/** Striped market stall — tap to sell crops. */
export function drawMarketStall(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#5DA644";
  ctx.beginPath();
  ctx.ellipse(36, STALL_GROUND_Y, 40, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#8D6E63";
  ctx.fillRect(4, 32, 64, 18);

  const awningY = 8;
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#FF7043" : "#FFFFFF";
    ctx.fillRect(4 + i * 11, awningY, 11, 22);
  }
  ctx.strokeStyle = "#BF360C";
  ctx.lineWidth = 2;
  ctx.strokeRect(4, awningY, 66, 22);

  ctx.fillStyle = "#D7CCC8";
  ctx.fillRect(8, 34, 56, 8);

  ctx.fillStyle = "#FFEB3B";
  ctx.beginPath();
  ctx.arc(18, 28, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#E91E63";
  ctx.beginPath();
  ctx.arc(36, 26, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#8BC34A";
  ctx.beginPath();
  ctx.arc(52, 28, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#5D4037";
  ctx.font = "bold 10px Nunito, sans-serif";
  ctx.fillText("SELL", 26, 20);

  ctx.restore();
}

export function drawBarn(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#5DA644";
  ctx.beginPath();
  ctx.ellipse(30, BARN_GROUND_Y - 2, 42, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#8D6E63";
  ctx.fillRect(-8, 42, 76, 8);

  ctx.fillStyle = "#C62828";
  ctx.fillRect(0, 18, 60, 32);
  ctx.fillStyle = "#B71C1C";
  ctx.beginPath();
  ctx.moveTo(-4, 18);
  ctx.lineTo(30, -2);
  ctx.lineTo(64, 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#FFECB3";
  ctx.fillRect(22, 28, 16, 22);
  ctx.fillStyle = "#5D4037";
  ctx.fillRect(28, 36, 4, 14);

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(8, 26, 10, 10);
  ctx.fillRect(42, 26, 10, 10);
  ctx.strokeStyle = "#5D4037";
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 26, 10, 10);
  ctx.strokeRect(42, 26, 10, 10);

  ctx.restore();
}

export function drawWindmill(ctx: CanvasRenderingContext2D, x: number, y: number, spin: number) {
  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = "#5DA644";
  ctx.beginPath();
  ctx.ellipse(24, 48, 22, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ECEFF1";
  ctx.beginPath();
  ctx.moveTo(20, 50);
  ctx.lineTo(28, 50);
  ctx.lineTo(32, 8);
  ctx.lineTo(16, 8);
  ctx.closePath();
  ctx.fill();

  ctx.translate(24, 22);
  ctx.rotate(spin);
  for (let i = 0; i < 4; i++) {
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#B0BEC5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -22);
    ctx.lineTo(5, -18);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

export function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.fillStyle = "#6D4C41";
  ctx.fillRect(-4, 0, 8, 18);
  ctx.fillStyle = "#388E3C";
  ctx.beginPath();
  ctx.arc(0, -8, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#43A047";
  ctx.beginPath();
  ctx.arc(-8, -4, 12, 0, Math.PI * 2);
  ctx.arc(8, -4, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawPathTile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
) {
  const hw = TILE_W / 2;
  const hh = TILE_H / 2;
  ctx.beginPath();
  ctx.moveTo(x + hw, y);
  ctx.lineTo(x + TILE_W, y + hh);
  ctx.lineTo(x + hw, y + TILE_H);
  ctx.lineTo(x, y + hh);
  ctx.closePath();
  ctx.fillStyle = "#D7CCC8";
  ctx.fill();
  ctx.strokeStyle = "rgba(141,110,99,0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

export const GAME_ACTION_BAR_HEIGHT = "6.25rem";
export const GAME_SAFE_BOTTOM = "max(0.5rem, env(safe-area-inset-bottom))";
