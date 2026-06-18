import type { Animal, Building, Machine, Plot } from "../store/farmStore";
import type { Order } from "./orders";

export const SAVE_KEY = "babyflix_sprout_valley";

export interface FarmSaveData {
  coins: number;
  water: number;
  maxWater: number;
  xp: number;
  level: number;
  diamonds: number;
  plots: Plot[];
  gridCols: number;
  gridRows: number;
  unlockedCols: number;
  unlockedRows: number;
  animals: Animal[];
  machines: Machine[];
  buildings: Building[];
  inventory: Record<string, number>;
  orders: Order[];
  lastOrderRefresh: number;
  seenScienceFacts: Record<string, boolean>;
  savedAt: number;
}

export function saveFarm(data: FarmSaveData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({ ...data, savedAt: Date.now() }),
  );
}

export function loadFarm(): Partial<FarmSaveData> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    const save = JSON.parse(raw) as FarmSaveData;
    const now = Date.now();

    save.plots = (save.plots ?? []).map((plot: Plot) => {
      if (
        (plot.state === "growing" || plot.state === "planted") &&
        plot.readyAt &&
        now >= plot.readyAt
      ) {
        return { ...plot, state: "ready" as const };
      }
      return plot;
    });

    save.animals = (save.animals ?? []).map((animal: Animal) => {
      const type = animal.type;
      const collectMs =
        animal.lastCollected != null
          ? now - animal.lastCollected
          : Infinity;
      const ready =
        animal.lastCollected == null ||
        collectMs >= getAnimalCollectMs(type);
      return { ...animal, productReady: ready };
    });

    save.machines = (save.machines ?? []).map((machine: Machine) => {
      if (machine.producing && machine.readyAt && now >= machine.readyAt) {
        return { ...machine };
      }
      return machine;
    });

    const savedAt = save.savedAt ?? now;
    const offlineMins = (now - savedAt) / 60000;
    const waterRefill = Math.min(Math.floor(offlineMins / 5), 10);
    save.water = Math.min((save.water ?? 0) + waterRefill, save.maxWater ?? 20);

    return save;
  } catch {
    return null;
  }
}

function getAnimalCollectMs(type: string): number {
  const times: Record<string, number> = {
    chicken: 3 * 60 * 1000,
    cow: 5 * 60 * 1000,
    sheep: 4 * 60 * 1000,
    pig: 6 * 60 * 1000,
  };
  return times[type] ?? 3 * 60 * 1000;
}
