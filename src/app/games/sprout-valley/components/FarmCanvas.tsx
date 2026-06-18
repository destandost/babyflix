"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  computeFarmLayout,
  drawBarn,
  drawDeliveryTruck,
  drawGrassField,
  drawMarketStall,
  drawPathTile,
  drawSkyAndHorizon,
  drawTree,
  drawWindmill,
  drawWoodenFence,
  pointInRect,
} from "../lib/scenery";
import {
  drawAnimalPen,
  drawCropOnTile,
  drawTile,
  getCropStageSvg,
  getSVGImage,
  getTileColors,
  pointInDiamond,
  TILE_H,
  TILE_W,
  toIso,
} from "../lib/renderer";
import { getAnimalType } from "../lib/animals";
import { getMachineType } from "../lib/machines";
import { useFarmStore } from "../store/farmStore";

export function FarmCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const cropImagesRef = useRef<Map<string, HTMLImageElement | null>>(new Map());

  const unlockedCols = useFarmStore((s) => s.unlockedCols);
  const unlockedRows = useFarmStore((s) => s.unlockedRows);
  const gridCols = useFarmStore((s) => s.gridCols);
  const gridRows = useFarmStore((s) => s.gridRows);
  const plots = useFarmStore((s) => s.plots);
  const selectedPlot = useFarmStore((s) => s.selectedPlot);
  const animals = useFarmStore((s) => s.animals);
  const machines = useFarmStore((s) => s.machines);
  const orders = useFarmStore((s) => s.orders);
  const inventory = useFarmStore((s) => s.inventory);
  const handlePlotAction = useFarmStore((s) => s.handlePlotAction);
  const collectAnimalProduct = useFarmStore((s) => s.collectAnimalProduct);
  const collectMachineProduct = useFarmStore((s) => s.collectMachineProduct);
  const setModal = useFarmStore((s) => s.setModal);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    drawSkyAndHorizon(ctx, w, h);

    const layout = computeFarmLayout(w, h, unlockedCols, unlockedRows);
    const {
      offsetX,
      offsetY,
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
    } = layout;

    const hasReadyOrder = orders.some(
      (o) =>
        !o.filled &&
        o.items.every((item) => (inventory[item.cropId] ?? 0) >= item.qty),
    );

    drawGrassField(ctx, grassCenterX, grassCenterY, unlockedCols, unlockedRows);
    drawBarn(ctx, barnX, barnY);
    drawWindmill(ctx, windmillX, windmillY, (Date.now() / 1200) % (Math.PI * 2));

    const frontGround = offsetY + (unlockedCols + unlockedRows - 2) * (TILE_H / 2) + TILE_H + 20;
    drawTree(ctx, w - 20, frontGround + 10, 0.85);
    drawTree(ctx, Math.max(4, barnX - 10), frontGround - 8, 0.7);

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        if (r >= unlockedRows || c >= unlockedCols) {
          const { x, y } = toIso(c, r, offsetX, offsetY);
          const lockedColors = { top: "#7CB342", left: "#558B2F", right: "#33691E", isSoil: false };
          drawTile(ctx, x, y, {
            topColor: lockedColors.top,
            leftColor: lockedColors.left,
            rightColor: lockedColors.right,
            isSoil: false,
          });
          ctx.globalAlpha = 0.45;
          ctx.fillStyle = "#2E7D32";
          ctx.font = "bold 14px Nunito, sans-serif";
          ctx.fillText("+", x + TILE_W / 2 - 4, y + TILE_H / 2);
          ctx.globalAlpha = 1;
        }
      }
    }

    for (let r = 0; r < unlockedRows; r++) {
      for (let c = 0; c < unlockedCols; c++) {
        if ((c + r) % 3 === 0 && c > 0 && r > 0) {
          const { x, y } = toIso(c, r, offsetX, offsetY);
          drawPathTile(ctx, x, y);
        }
      }
    }

    for (let r = 0; r < unlockedRows; r++) {
      for (let c = 0; c < unlockedCols; c++) {
        const plot = plots.find((p) => p.row === r && p.col === c);
        if (!plot) continue;
        const { x, y } = toIso(c, r, offsetX, offsetY);
        const tileStyle = getTileColors(plot.state);
        drawTile(ctx, x, y, {
          topColor: tileStyle.top,
          leftColor: tileStyle.left,
          rightColor: tileStyle.right,
          isSoil: tileStyle.isSoil,
          selected: selectedPlot === plot.id,
          glowing: plot.state === "ready",
        });
        if (plot.cropId && plot.state !== "empty") {
          const svgId = getCropStageSvg(plot);
          drawCropOnTile(ctx, x, y, plot, cropImagesRef.current.get(svgId));
        }
      }
    }

    drawWoodenFence(ctx, offsetX, offsetY, unlockedCols, unlockedRows);

    drawMarketStall(ctx, stallX, stallY);
    drawDeliveryTruck(ctx, truckX, truckY, hasReadyOrder);

    const penX = w - 88;
    let penY = 72;
    animals.forEach((animal) => {
      const type = getAnimalType(animal.type);
      drawAnimalPen(ctx, penX, penY, 76, 52, type?.name ?? "Pet", animal.productReady, "#FFF9C4");
      penY += 58;
    });
    machines.forEach((machine) => {
      const type = getMachineType(machine.type);
      const ready =
        !!machine.producing && !!machine.readyAt && Date.now() >= machine.readyAt;
      drawAnimalPen(ctx, penX, penY, 76, 52, type?.name ?? "Shop", ready, "#FFCCBC");
      penY += 58;
    });

    rafRef.current = requestAnimationFrame(draw);
  }, [
    unlockedCols,
    unlockedRows,
    gridCols,
    gridRows,
    plots,
    selectedPlot,
    animals,
    machines,
    orders,
    inventory,
  ]);

  useEffect(() => {
    const ids = [
      "crop-seed",
      "crop-sprout",
      "crop-growing",
      "crop-wheat-ready",
      "crop-corn-ready",
      "crop-carrot-ready",
      "crop-strawberry-ready",
      "crop-tomato-ready",
    ];
    ids.forEach(async (id) => {
      const img = await getSVGImage(id, 44);
      cropImagesRef.current.set(id, img);
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const handlePointer = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      const layout = computeFarmLayout(w, h, unlockedCols, unlockedRows);
      const { offsetX, offsetY, truckHit, stallHit } = layout;

      if (pointInRect(mx, my, truckHit.x, truckHit.y, truckHit.w, truckHit.h)) {
        setModal("orders");
        return;
      }
      if (pointInRect(mx, my, stallHit.x, stallHit.y, stallHit.w, stallHit.h)) {
        setModal("shop");
        return;
      }

      for (let r = 0; r < unlockedRows; r++) {
        for (let c = 0; c < unlockedCols; c++) {
          const { x, y } = toIso(c, r, offsetX, offsetY);
          if (pointInDiamond(mx, my, x, y)) {
            const plot = plots.find((p) => p.row === r && p.col === c);
            if (plot) handlePlotAction(plot.id);
            return;
          }
        }
      }

      const penX = w - 88;
      let penY = 72;
      for (const animal of animals) {
        if (mx >= penX && mx <= penX + 76 && my >= penY && my <= penY + 52) {
          if (animal.productReady) collectAnimalProduct(animal.id);
          else setModal("animals");
          return;
        }
        penY += 58;
      }
      for (const machine of machines) {
        if (mx >= penX && mx <= penX + 76 && my >= penY && my <= penY + 52) {
          const ready =
            !!machine.producing && !!machine.readyAt && Date.now() >= machine.readyAt;
          if (ready) collectMachineProduct(machine.id);
          else setModal("machines");
          return;
        }
        penY += 58;
      }
    },
    [
      unlockedCols,
      unlockedRows,
      plots,
      animals,
      machines,
      handlePlotAction,
      collectAnimalProduct,
      collectMachineProduct,
      setModal,
    ],
  );

  return (
    <div ref={containerRef} className="relative min-h-0 flex-1 w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none"
        style={{ touchAction: "none" }}
        onClick={(e) => handlePointer(e.clientX, e.clientY)}
        onTouchEnd={(e) => {
          e.preventDefault();
          const t = e.changedTouches[0];
          if (t) handlePointer(t.clientX, t.clientY);
        }}
      />
    </div>
  );
}
