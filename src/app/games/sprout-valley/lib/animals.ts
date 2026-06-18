export interface AnimalType {
  id: string;
  name: string;
  svgId: string;
  penCost: number;
  feedCropId: string;
  feedQty: number;
  productId: string;
  productName: string;
  productSvgId: string;
  collectTimeMs: number;
  xpOnCollect: number;
  unlockLevel: number;
  scienceFactId: string;
}

export const ANIMAL_TYPES: AnimalType[] = [
  {
    id: "chicken",
    name: "Chicken",
    svgId: "ani-chicken",
    penCost: 50,
    feedCropId: "wheat",
    feedQty: 2,
    productId: "egg",
    productName: "Egg",
    productSvgId: "prod-egg",
    collectTimeMs: 3 * 60 * 1000,
    xpOnCollect: 5,
    unlockLevel: 1,
    scienceFactId: "chicken",
  },
  {
    id: "cow",
    name: "Cow",
    svgId: "ani-cow",
    penCost: 120,
    feedCropId: "corn",
    feedQty: 3,
    productId: "milk",
    productName: "Milk",
    productSvgId: "prod-milk",
    collectTimeMs: 5 * 60 * 1000,
    xpOnCollect: 8,
    unlockLevel: 2,
    scienceFactId: "cow",
  },
  {
    id: "sheep",
    name: "Sheep",
    svgId: "ani-sheep",
    penCost: 80,
    feedCropId: "wheat",
    feedQty: 2,
    productId: "wool",
    productName: "Wool",
    productSvgId: "prod-wool",
    collectTimeMs: 4 * 60 * 1000,
    xpOnCollect: 6,
    unlockLevel: 3,
    scienceFactId: "sheep",
  },
  {
    id: "pig",
    name: "Pig",
    svgId: "ani-pig",
    penCost: 90,
    feedCropId: "corn",
    feedQty: 3,
    productId: "bacon",
    productName: "Bacon",
    productSvgId: "prod-bacon",
    collectTimeMs: 6 * 60 * 1000,
    xpOnCollect: 10,
    unlockLevel: 4,
    scienceFactId: "pig",
  },
];

export function getAnimalType(id: string): AnimalType | undefined {
  return ANIMAL_TYPES.find((a) => a.id === id);
}
