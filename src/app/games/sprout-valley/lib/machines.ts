export interface MachineProduct {
  id: string;
  name: string;
  svgId: string;
  inputs: { itemId: string; qty: number }[];
  makeTimeMs: number;
  sellPrice: number;
  xpOnComplete: number;
  unlockLevel: number;
}

export interface MachineType {
  id: string;
  name: string;
  svgId: string;
  cost: number;
  unlockLevel: number;
  maxQueue: number;
  products: MachineProduct[];
}

export const MACHINE_TYPES: MachineType[] = [
  {
    id: "bakery",
    name: "Bakery",
    svgId: "mach-bakery",
    cost: 200,
    unlockLevel: 2,
    maxQueue: 3,
    products: [
      {
        id: "bread",
        name: "Bread",
        svgId: "prod-bread",
        inputs: [{ itemId: "wheat", qty: 3 }],
        makeTimeMs: 5 * 60 * 1000,
        sellPrice: 45,
        xpOnComplete: 8,
        unlockLevel: 2,
      },
      {
        id: "cake",
        name: "Cake",
        svgId: "prod-cake",
        inputs: [
          { itemId: "wheat", qty: 3 },
          { itemId: "egg", qty: 2 },
          { itemId: "strawberry", qty: 1 },
        ],
        makeTimeMs: 20 * 60 * 1000,
        sellPrice: 180,
        xpOnComplete: 25,
        unlockLevel: 5,
      },
      {
        id: "pancake",
        name: "Pancake",
        svgId: "prod-pancake",
        inputs: [
          { itemId: "wheat", qty: 2 },
          { itemId: "egg", qty: 1 },
          { itemId: "milk", qty: 1 },
        ],
        makeTimeMs: 10 * 60 * 1000,
        sellPrice: 85,
        xpOnComplete: 12,
        unlockLevel: 3,
      },
    ],
  },
  {
    id: "dairy",
    name: "Dairy",
    svgId: "mach-dairy",
    cost: 250,
    unlockLevel: 3,
    maxQueue: 3,
    products: [
      {
        id: "cheese",
        name: "Cheese",
        svgId: "prod-cheese",
        inputs: [{ itemId: "milk", qty: 4 }],
        makeTimeMs: 8 * 60 * 1000,
        sellPrice: 70,
        xpOnComplete: 10,
        unlockLevel: 3,
      },
      {
        id: "butter",
        name: "Butter",
        svgId: "prod-butter",
        inputs: [{ itemId: "milk", qty: 3 }],
        makeTimeMs: 6 * 60 * 1000,
        sellPrice: 55,
        xpOnComplete: 8,
        unlockLevel: 3,
      },
      {
        id: "ice_cream",
        name: "Ice Cream",
        svgId: "prod-icecream",
        inputs: [
          { itemId: "milk", qty: 3 },
          { itemId: "strawberry", qty: 2 },
        ],
        makeTimeMs: 15 * 60 * 1000,
        sellPrice: 120,
        xpOnComplete: 18,
        unlockLevel: 5,
      },
    ],
  },
  {
    id: "juicer",
    name: "Juice Bar",
    svgId: "mach-juicer",
    cost: 180,
    unlockLevel: 4,
    maxQueue: 3,
    products: [
      {
        id: "carrot_juice",
        name: "Carrot Juice",
        svgId: "prod-carrot-juice",
        inputs: [{ itemId: "carrot", qty: 4 }],
        makeTimeMs: 6 * 60 * 1000,
        sellPrice: 60,
        xpOnComplete: 8,
        unlockLevel: 4,
      },
      {
        id: "strawberry_juice",
        name: "Berry Juice",
        svgId: "prod-berry-juice",
        inputs: [{ itemId: "strawberry", qty: 3 }],
        makeTimeMs: 8 * 60 * 1000,
        sellPrice: 75,
        xpOnComplete: 10,
        unlockLevel: 4,
      },
      {
        id: "watermelon_juice",
        name: "Watermelon Juice",
        svgId: "prod-watermelon-juice",
        inputs: [{ itemId: "watermelon", qty: 2 }],
        makeTimeMs: 12 * 60 * 1000,
        sellPrice: 95,
        xpOnComplete: 14,
        unlockLevel: 7,
      },
    ],
  },
  {
    id: "jam_jar",
    name: "Jam Jar",
    svgId: "mach-jamjar",
    cost: 150,
    unlockLevel: 5,
    maxQueue: 3,
    products: [
      {
        id: "jam",
        name: "Strawberry Jam",
        svgId: "prod-jam",
        inputs: [{ itemId: "strawberry", qty: 5 }],
        makeTimeMs: 10 * 60 * 1000,
        sellPrice: 90,
        xpOnComplete: 12,
        unlockLevel: 5,
      },
      {
        id: "tomato_sauce",
        name: "Tomato Sauce",
        svgId: "prod-tomato-sauce",
        inputs: [{ itemId: "tomato", qty: 4 }],
        makeTimeMs: 12 * 60 * 1000,
        sellPrice: 100,
        xpOnComplete: 14,
        unlockLevel: 5,
      },
    ],
  },
];

export function getMachineType(id: string): MachineType | undefined {
  return MACHINE_TYPES.find((m) => m.id === id);
}

export function getMachineProduct(
  machineTypeId: string,
  productId: string,
): MachineProduct | undefined {
  return getMachineType(machineTypeId)?.products.find((p) => p.id === productId);
}
