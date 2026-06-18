import { create } from "zustand";
import { syncGlobalXp } from "../lib/babyflixBridge";
import { getAnimalType } from "../lib/animals";
import { getCrop } from "../lib/crops";
import {
  getLevelConfig,
  getLevelFromXp,
  getXpForNextLevel,
} from "../lib/levels";
import { getMachineProduct, getMachineType } from "../lib/machines";
import {
  generateOrders,
  ORDER_COUNT,
  ORDER_DURATION_MS,
  type Order,
} from "../lib/orders";
import { loadFarm, saveFarm } from "../lib/saveLoad";
import { CROPS } from "../lib/crops";
import { getProductSellPrice } from "../lib/sellPrices";

export type PlotState = "empty" | "planted" | "watered" | "growing" | "ready";
export type ToolType = "plant" | "water" | "harvest" | "move";

export interface Plot {
  id: string;
  row: number;
  col: number;
  state: PlotState;
  cropId: string | null;
  plantedAt: number | null;
  wateredAt: number | null;
  readyAt: number | null;
  watered: boolean;
}

export interface Animal {
  id: string;
  type: string;
  name: string;
  productReady: boolean;
  lastCollected: number | null;
}

export interface Machine {
  id: string;
  type: string;
  producing: string | null;
  startedAt: number | null;
  readyAt: number | null;
  queue: string[];
}

export interface Building {
  id: string;
  type: string;
  placedAt: number;
}

export interface FarmStore {
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
  selectedPlot: string | null;
  selectedTool: ToolType;
  activeModal: string | null;
  notification: string | null;
  scienceFactId: string | null;
  levelUpLevel: number | null;
  seenScienceFacts: Record<string, boolean>;
  plantCrop: (plotId: string, cropId: string) => void;
  waterPlot: (plotId: string) => void;
  harvestPlot: (plotId: string) => void;
  collectAnimalProduct: (animalId: string) => void;
  startMachine: (machineId: string, productId: string) => void;
  collectMachineProduct: (machineId: string) => void;
  fillOrder: (orderId: string) => void;
  buyAnimal: (type: string) => void;
  buyMachine: (type: string) => void;
  buyBuilding: (type: string) => void;
  expandFarm: () => void;
  sellInventory: (cropId: string, qty: number) => void;
  setTool: (tool: ToolType) => void;
  selectPlot: (plotId: string | null) => void;
  setModal: (modal: string | null) => void;
  setNotification: (msg: string | null) => void;
  dismissScience: () => void;
  dismissLevelUp: () => void;
  addWater: (amount: number) => void;
  addFarmXp: (amount: number) => void;
  tick: () => void;
  save: () => void;
  load: () => void;
  handlePlotAction: (plotId: string) => void;
}

function createPlots(cols: number, rows: number): Plot[] {
  const plots: Plot[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      plots.push({
        id: `plot_${r}_${c}`,
        row: r,
        col: c,
        state: "empty",
        cropId: null,
        plantedAt: null,
        wateredAt: null,
        readyAt: null,
        watered: false,
      });
    }
  }
  return plots;
}

function availableCropIds(level: number): string[] {
  return CROPS.filter((c) => c.unlockLevel <= level).map((c) => c.id);
}

function addInventory(
  inventory: Record<string, number>,
  itemId: string,
  qty: number,
): Record<string, number> {
  return { ...inventory, [itemId]: (inventory[itemId] ?? 0) + qty };
}

function removeInventory(
  inventory: Record<string, number>,
  itemId: string,
  qty: number,
): Record<string, number> | null {
  const have = inventory[itemId] ?? 0;
  if (have < qty) return null;
  const next = { ...inventory, [itemId]: have - qty };
  if (next[itemId] === 0) delete next[itemId];
  return next;
}

function maybeScience(
  seen: Record<string, boolean>,
  factId: string,
): { seen: Record<string, boolean>; show: string | null } {
  if (seen[factId]) return { seen, show: null };
  return { seen: { ...seen, [factId]: true }, show: factId };
}

const EXPAND_COST = 120;

export const useFarmStore = create<FarmStore>((set, get) => ({
  coins: 100,
  water: 15,
  maxWater: 20,
  xp: 0,
  level: 1,
  diamonds: 0,
  plots: createPlots(3, 2),
  gridCols: 7,
  gridRows: 7,
  unlockedCols: 3,
  unlockedRows: 2,
  animals: [],
  machines: [],
  buildings: [],
  inventory: {},
  orders: generateOrders(1, availableCropIds(1)),
  lastOrderRefresh: Date.now(),
  selectedPlot: null,
  selectedTool: "plant",
  activeModal: null,
  notification: null,
  scienceFactId: null,
  levelUpLevel: null,
  seenScienceFacts: {},

  setTool: (tool) => set({ selectedTool: tool }),
  selectPlot: (plotId) => set({ selectedPlot: plotId }),
  setModal: (modal) => set({ activeModal: modal }),
  setNotification: (msg) => set({ notification: msg }),

  addWater: (amount) => {
    const { water, maxWater } = get();
    set({ water: Math.min(water + amount, maxWater) });
  },

  addFarmXp: (amount) => {
    const prev = get();
    const xp = prev.xp + amount;
    const level = getLevelFromXp(xp);
    const config = getLevelConfig(level);
    const leveledUp = level > prev.level;
    set({
      xp,
      level,
      unlockedCols: config.unlockedCols,
      unlockedRows: config.unlockedRows,
      levelUpLevel: leveledUp ? level : prev.levelUpLevel,
      plots: ensurePlotGrid(prev.plots, config.unlockedCols, config.unlockedRows),
    });
    syncGlobalXp(amount);
  },

  plantCrop: (plotId, cropId) => {
    const state = get();
    const crop = getCrop(cropId);
    const plot = state.plots.find((p) => p.id === plotId);
    if (!crop || !plot || plot.state !== "empty") return;
    if (crop.unlockLevel > state.level) {
      set({ notification: `Unlock ${crop.name} at level ${crop.unlockLevel}` });
      return;
    }
    if (state.coins < crop.buyCost) {
      set({ notification: "Not enough coins for seeds!" });
      return;
    }
    const now = Date.now();
    const science = maybeScience(state.seenScienceFacts, crop.scienceFactId);
    set({
      coins: state.coins - crop.buyCost,
      seenScienceFacts: science.seen,
      scienceFactId: science.show,
      plots: state.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              state: "planted",
              cropId,
              plantedAt: now,
              wateredAt: null,
              readyAt: now + crop.growTimeDryMs,
              watered: false,
            }
          : p,
      ),
      activeModal: null,
      selectedPlot: plotId,
    });
  },

  waterPlot: (plotId) => {
    const state = get();
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot || !plot.cropId) return;
    if (plot.state !== "planted" && plot.state !== "growing") return;
    if (state.water <= 0) {
      set({ notification: "Out of water! Wait for refill." });
      return;
    }
    const crop = getCrop(plot.cropId);
    if (!crop) return;
    const now = Date.now();
    set({
      water: state.water - 1,
      plots: state.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              state: "growing",
              watered: true,
              wateredAt: now,
              readyAt: now + crop.growTimeMs,
            }
          : p,
      ),
    });
  },

  harvestPlot: (plotId) => {
    const state = get();
    const plot = state.plots.find((p) => p.id === plotId);
    if (!plot || plot.state !== "ready" || !plot.cropId) return;
    const crop = getCrop(plot.cropId);
    if (!crop) return;
    get().addFarmXp(crop.xpOnHarvest);
    set({
      inventory: addInventory(state.inventory, plot.cropId, 1),
      plots: state.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              state: "empty",
              cropId: null,
              plantedAt: null,
              wateredAt: null,
              readyAt: null,
              watered: false,
            }
          : p,
      ),
      notification: `Harvested ${crop.name}!`,
    });
  },

  collectAnimalProduct: (animalId) => {
    const state = get();
    const animal = state.animals.find((a) => a.id === animalId);
    if (!animal || !animal.productReady) return;
    const type = getAnimalType(animal.type);
    if (!type) return;

    const inv = removeInventory(state.inventory, type.feedCropId, type.feedQty);
    if (!inv) {
      set({
        notification: `Need ${type.feedQty} ${type.feedCropId} to feed ${type.name}`,
      });
      return;
    }

    const science = maybeScience(state.seenScienceFacts, type.scienceFactId);
    get().addFarmXp(type.xpOnCollect);
    set({
      inventory: addInventory(inv, type.productId, 1),
      animals: state.animals.map((a) =>
        a.id === animalId
          ? { ...a, productReady: false, lastCollected: Date.now() }
          : a,
      ),
      seenScienceFacts: science.seen,
      scienceFactId: science.show,
      notification: `Collected ${type.productName}!`,
    });
  },

  startMachine: (machineId, productId) => {
    const state = get();
    const machine = state.machines.find((m) => m.id === machineId);
    if (!machine) return;
    const mType = getMachineType(machine.type);
    const product = getMachineProduct(machine.type, productId);
    if (!mType || !product || product.unlockLevel > state.level) return;

    if (machine.producing) {
      if (machine.queue.length >= mType.maxQueue) {
        set({ notification: "Machine queue is full!" });
        return;
      }
      set({
        machines: state.machines.map((m) =>
          m.id === machineId ? { ...m, queue: [...m.queue, productId] } : m,
        ),
      });
      return;
    }

    let inv = { ...state.inventory };
    for (const input of product.inputs) {
      const next = removeInventory(inv, input.itemId, input.qty);
      if (!next) {
        set({ notification: "Missing ingredients!" });
        return;
      }
      inv = next;
    }

    const now = Date.now();
    set({
      inventory: inv,
      machines: state.machines.map((m) =>
        m.id === machineId
          ? {
              ...m,
              producing: productId,
              startedAt: now,
              readyAt: now + product.makeTimeMs,
            }
          : m,
      ),
      notification: `Making ${product.name}...`,
    });
  },

  collectMachineProduct: (machineId) => {
    const state = get();
    const machine = state.machines.find((m) => m.id === machineId);
    if (!machine?.producing || !machine.readyAt || Date.now() < machine.readyAt) return;
    const product = getMachineProduct(machine.type, machine.producing);
    if (!product) return;

    const science = maybeScience(state.seenScienceFacts, machine.producing);
    get().addFarmXp(product.xpOnComplete);

    let nextMachine: Machine = {
      ...machine,
      producing: null,
      startedAt: null,
      readyAt: null,
      queue: [...machine.queue],
    };

    let inventory = addInventory(state.inventory, product.id, 1);

    if (nextMachine.queue.length > 0) {
      const nextId = nextMachine.queue[0];
      const nextProduct = getMachineProduct(machine.type, nextId);
      if (nextProduct) {
        let inv = inventory;
        let ok = true;
        for (const input of nextProduct.inputs) {
          const removed = removeInventory(inv, input.itemId, input.qty);
          if (!removed) {
            ok = false;
            break;
          }
          inv = removed;
        }
        if (ok) {
          const now = Date.now();
          inventory = inv;
          nextMachine = {
            ...nextMachine,
            queue: nextMachine.queue.slice(1),
            producing: nextId,
            startedAt: now,
            readyAt: now + nextProduct.makeTimeMs,
          };
        }
      }
    }

    set({
      inventory,
      machines: state.machines.map((m) => (m.id === machineId ? nextMachine : m)),
      seenScienceFacts: science.seen,
      scienceFactId: science.show,
      notification: `Collected ${product.name}!`,
    });
  },

  fillOrder: (orderId) => {
    const state = get();
    const order = state.orders.find((o) => o.id === orderId && !o.filled);
    if (!order) return;

    let inv = { ...state.inventory };
    for (const item of order.items) {
      const next = removeInventory(inv, item.cropId, item.qty);
      if (!next) return;
      inv = next;
    }

    get().addFarmXp(Math.floor(order.reward / 5));
    set({
      inventory: inv,
      coins: state.coins + order.reward,
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, filled: true } : o)),
      notification: `Order complete! +${order.reward} coins`,
    });
  },

  buyAnimal: (type) => {
    const state = get();
    const aType = getAnimalType(type);
    if (!aType || aType.unlockLevel > state.level) return;
    if (state.coins < aType.penCost) {
      set({ notification: "Not enough coins!" });
      return;
    }
    const id = `animal_${Date.now()}`;
    set({
      coins: state.coins - aType.penCost,
      animals: [
        ...state.animals,
        {
          id,
          type,
          name: aType.name,
          productReady: true,
          lastCollected: null,
        },
      ],
      notification: `${aType.name} joined the farm!`,
      activeModal: null,
    });
  },

  buyMachine: (type) => {
    const state = get();
    const mType = getMachineType(type);
    if (!mType || mType.unlockLevel > state.level) return;
    if (state.machines.some((m) => m.type === type)) {
      set({ notification: "You already own this machine!" });
      return;
    }
    if (state.coins < mType.cost) {
      set({ notification: "Not enough coins!" });
      return;
    }
    set({
      coins: state.coins - mType.cost,
      machines: [
        ...state.machines,
        {
          id: `machine_${type}`,
          type,
          producing: null,
          startedAt: null,
          readyAt: null,
          queue: [],
        },
      ],
      notification: `${mType.name} built!`,
      activeModal: null,
    });
  },

  buyBuilding: (type) => {
    const state = get();
    const cost = 80;
    if (state.coins < cost) {
      set({ notification: "Not enough coins!" });
      return;
    }
    set({
      coins: state.coins - cost,
      buildings: [
        ...state.buildings,
        { id: `building_${Date.now()}`, type, placedAt: Date.now() },
      ],
      notification: "Building placed!",
    });
  },

  expandFarm: () => {
    const state = get();
    const config = getLevelConfig(state.level);
    if (
      state.unlockedCols >= config.unlockedCols &&
      state.unlockedRows >= config.unlockedRows
    ) {
      set({ notification: "Level up to unlock more land!" });
      return;
    }
    if (state.coins < EXPAND_COST) {
      set({ notification: `Need ${EXPAND_COST} coins to expand` });
      return;
    }
    const nextCols = Math.min(state.unlockedCols + 1, config.unlockedCols);
    const nextRows = Math.min(state.unlockedRows + 1, config.unlockedRows);
    set({
      coins: state.coins - EXPAND_COST,
      unlockedCols: nextCols,
      unlockedRows: nextRows,
      plots: ensurePlotGrid(state.plots, nextCols, nextRows),
      notification: "Farm expanded!",
    });
  },

  sellInventory: (itemId, qty) => {
    const state = get();
    const crop = getCrop(itemId);
    const price = crop?.sellPrice ?? getProductSellPrice(itemId);
    const inv = removeInventory(state.inventory, itemId, qty);
    if (!inv) return;
    get().addFarmXp(qty * 2);
    set({
      inventory: inv,
      coins: state.coins + price * qty,
      notification: `Sold ${qty} for ${price * qty} coins`,
    });
  },

  handlePlotAction: (plotId) => {
    const { selectedTool, plots } = get();
    const plot = plots.find((p) => p.id === plotId);
    if (!plot) return;
    set({ selectedPlot: plotId });

    if (selectedTool === "plant") {
      if (plot.state === "empty") set({ activeModal: "plant" });
      return;
    }
    if (selectedTool === "water") {
      get().waterPlot(plotId);
      return;
    }
    if (selectedTool === "harvest") {
      get().harvestPlot(plotId);
    }
  },

  dismissScience: () => {
    get().addFarmXp(15);
    set({ scienceFactId: null });
  },

  dismissLevelUp: () => set({ levelUpLevel: null }),

  tick: () => {
    const state = get();
    const now = Date.now();
    let plots = state.plots;
    let animals = state.animals;
    let machines = state.machines;
    let orders = state.orders;
    let lastOrderRefresh = state.lastOrderRefresh;

    plots = plots.map((plot) => {
      if (
        (plot.state === "growing" || plot.state === "planted") &&
        plot.readyAt &&
        now >= plot.readyAt
      ) {
        return { ...plot, state: "ready" as const };
      }
      return plot;
    });

    animals = animals.map((animal) => {
      const type = getAnimalType(animal.type);
      if (!type) return animal;
      const since =
        animal.lastCollected == null ? Infinity : now - animal.lastCollected;
      if (!animal.productReady && since >= type.collectTimeMs) {
        return { ...animal, productReady: true };
      }
      return animal;
    });

    machines = machines.map((machine) => {
      if (machine.producing && machine.readyAt && now >= machine.readyAt) {
        return machine;
      }
      return machine;
    });

    const activeOrders = orders.filter((o) => !o.filled && o.expiresAt > now);
    if (
      activeOrders.length < ORDER_COUNT ||
      now - lastOrderRefresh > ORDER_DURATION_MS
    ) {
      const fresh = generateOrders(state.level, availableCropIds(state.level));
      orders = [
        ...activeOrders,
        ...fresh.slice(0, ORDER_COUNT - activeOrders.length),
      ];
      lastOrderRefresh = now;
    }

    set({ plots, animals, machines, orders, lastOrderRefresh });
  },

  save: () => {
    const s = get();
    saveFarm({
      coins: s.coins,
      water: s.water,
      maxWater: s.maxWater,
      xp: s.xp,
      level: s.level,
      diamonds: s.diamonds,
      plots: s.plots,
      gridCols: s.gridCols,
      gridRows: s.gridRows,
      unlockedCols: s.unlockedCols,
      unlockedRows: s.unlockedRows,
      animals: s.animals,
      machines: s.machines,
      buildings: s.buildings,
      inventory: s.inventory,
      orders: s.orders,
      lastOrderRefresh: s.lastOrderRefresh,
      seenScienceFacts: s.seenScienceFacts,
      savedAt: Date.now(),
    });
  },

  load: () => {
    const data = loadFarm();
    if (!data) return;
    const level = data.level ?? getLevelFromXp(data.xp ?? 0);
    const config = getLevelConfig(level);
    set({
      coins: data.coins ?? 100,
      water: data.water ?? 15,
      maxWater: data.maxWater ?? 20,
      xp: data.xp ?? 0,
      level,
      diamonds: data.diamonds ?? 0,
      plots: ensurePlotGrid(
        data.plots ?? createPlots(3, 2),
        data.unlockedCols ?? config.unlockedCols,
        data.unlockedRows ?? config.unlockedRows,
      ),
      unlockedCols: data.unlockedCols ?? config.unlockedCols,
      unlockedRows: data.unlockedRows ?? config.unlockedRows,
      animals: data.animals ?? [],
      machines: data.machines ?? [],
      buildings: data.buildings ?? [],
      inventory: data.inventory ?? {},
      orders: data.orders ?? generateOrders(level, availableCropIds(level)),
      lastOrderRefresh: data.lastOrderRefresh ?? Date.now(),
      seenScienceFacts: data.seenScienceFacts ?? {},
    });
  },
}));

function ensurePlotGrid(plots: Plot[], cols: number, rows: number): Plot[] {
  const map = new Map(plots.map((p) => [`${p.row}_${p.col}`, p]));
  const next: Plot[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}_${c}`;
      const existing = map.get(key);
      next.push(
        existing ?? {
          id: `plot_${r}_${c}`,
          row: r,
          col: c,
          state: "empty",
          cropId: null,
          plantedAt: null,
          wateredAt: null,
          readyAt: null,
          watered: false,
        },
      );
    }
  }
  return next;
}

export function getXpProgress(xp: number, level: number): number {
  const current = getLevelConfig(level).xpNeeded;
  const next = getXpForNextLevel(level);
  const span = Math.max(1, next - current);
  return Math.min(100, ((xp - current) / span) * 100);
}
