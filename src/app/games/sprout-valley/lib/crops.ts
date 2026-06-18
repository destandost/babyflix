export interface Crop {
  id: string;
  name: string;
  growTimeMs: number;
  growTimeDryMs: number;
  buyCost: number;
  sellPrice: number;
  xpOnHarvest: number;
  unlockLevel: number;
  svgId: string;
  stages: string[];
  scienceFactId: string;
  usedIn: string[];
}

export const CROPS: Crop[] = [
  {
    id: "wheat",
    name: "Wheat",
    growTimeMs: 2 * 60 * 1000,
    growTimeDryMs: 10 * 60 * 1000,
    buyCost: 5,
    sellPrice: 12,
    xpOnHarvest: 2,
    unlockLevel: 1,
    svgId: "crop-wheat-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-wheat-ready"],
    scienceFactId: "wheat",
    usedIn: ["bread", "pancake", "animal_feed"],
  },
  {
    id: "corn",
    name: "Corn",
    growTimeMs: 5 * 60 * 1000,
    growTimeDryMs: 20 * 60 * 1000,
    buyCost: 10,
    sellPrice: 20,
    xpOnHarvest: 3,
    unlockLevel: 1,
    svgId: "crop-corn-ready",
    stages: ["crop-seed", "crop-sprout", "crop-corn-mid", "crop-corn-ready"],
    scienceFactId: "corn",
    usedIn: ["popcorn", "animal_feed"],
  },
  {
    id: "carrot",
    name: "Carrot",
    growTimeMs: 8 * 60 * 1000,
    growTimeDryMs: 30 * 60 * 1000,
    buyCost: 8,
    sellPrice: 18,
    xpOnHarvest: 3,
    unlockLevel: 2,
    svgId: "crop-carrot-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-carrot-ready"],
    scienceFactId: "carrot",
    usedIn: ["carrot_juice", "salad"],
  },
  {
    id: "strawberry",
    name: "Strawberry",
    growTimeMs: 15 * 60 * 1000,
    growTimeDryMs: 60 * 60 * 1000,
    buyCost: 12,
    sellPrice: 28,
    xpOnHarvest: 5,
    unlockLevel: 3,
    svgId: "crop-strawberry-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-strawberry-ready"],
    scienceFactId: "strawberry",
    usedIn: ["jam", "strawberry_juice", "cake"],
  },
  {
    id: "tomato",
    name: "Tomato",
    growTimeMs: 20 * 60 * 1000,
    growTimeDryMs: 90 * 60 * 1000,
    buyCost: 15,
    sellPrice: 32,
    xpOnHarvest: 6,
    unlockLevel: 4,
    svgId: "crop-tomato-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-tomato-ready"],
    scienceFactId: "tomato",
    usedIn: ["tomato_sauce", "salad"],
  },
  {
    id: "sunflower",
    name: "Sunflower",
    growTimeMs: 30 * 60 * 1000,
    growTimeDryMs: 120 * 60 * 1000,
    buyCost: 18,
    sellPrice: 40,
    xpOnHarvest: 8,
    unlockLevel: 5,
    svgId: "crop-sunflower-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-sunflower-ready"],
    scienceFactId: "sunflower",
    usedIn: ["sunflower_oil"],
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    growTimeMs: 45 * 60 * 1000,
    growTimeDryMs: 180 * 60 * 1000,
    buyCost: 22,
    sellPrice: 55,
    xpOnHarvest: 10,
    unlockLevel: 6,
    svgId: "crop-pumpkin-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-pumpkin-ready"],
    scienceFactId: "pumpkin",
    usedIn: ["pumpkin_pie", "pumpkin_soup"],
  },
  {
    id: "watermelon",
    name: "Watermelon",
    growTimeMs: 60 * 60 * 1000,
    growTimeDryMs: 240 * 60 * 1000,
    buyCost: 25,
    sellPrice: 65,
    xpOnHarvest: 12,
    unlockLevel: 7,
    svgId: "crop-watermelon-ready",
    stages: ["crop-seed", "crop-sprout", "crop-growing", "crop-watermelon-ready"],
    scienceFactId: "watermelon",
    usedIn: ["watermelon_juice"],
  },
];

export function getCrop(id: string): Crop | undefined {
  return CROPS.find((c) => c.id === id);
}
