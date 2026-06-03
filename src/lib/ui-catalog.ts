import type { CharacterId } from "@/components/characters/Characters";

export const SHOW_CATALOG: {
  id: string;
  name: string;
  character: CharacterId;
  gradient: string;
  episodes: number;
  ageRange: string;
  badge: string;
  category: string;
}[] = [
  {
    id: "cosmo",
    name: "Cosmo the Star Bear",
    character: "starbear",
    gradient: "linear-gradient(135deg,#7B4FFF,#00C9B1)",
    episodes: 12,
    ageRange: "2–5",
    badge: "EP 3",
    category: "Fantasy",
  },
  {
    id: "zara",
    name: "Zara the Rainbow Fish",
    character: "fish",
    gradient: "linear-gradient(135deg,#00C9B1,#00D4FF)",
    episodes: 8,
    ageRange: "1–4",
    badge: "NEW",
    category: "Ocean",
  },
  {
    id: "dino",
    name: "Dino Patrol",
    character: "dino",
    gradient: "linear-gradient(135deg,#2ECC71,#00C9B1)",
    episodes: 16,
    ageRange: "3–6",
    badge: "EP 5",
    category: "Animals",
  },
  {
    id: "luna",
    name: "Luna the Moon Bunny",
    character: "bunny",
    gradient: "linear-gradient(135deg,#FF4D8D,#7B4FFF)",
    episodes: 10,
    ageRange: "0–3",
    badge: "EP 1",
    category: "Fantasy",
  },
  {
    id: "cloud",
    name: "Captain Cloud",
    character: "cloud",
    gradient: "linear-gradient(135deg,#00D4FF,#7B4FFF)",
    episodes: 6,
    ageRange: "2–6",
    badge: "EP 2",
    category: "Space",
  },
  {
    id: "pepper",
    name: "Pepper the Dragon",
    character: "dragon",
    gradient: "linear-gradient(135deg,#00C9B1,#7B4FFF)",
    episodes: 14,
    ageRange: "3–7",
    badge: "EP 1",
    category: "Fantasy",
  },
];

export const SUBJECT_UI: Record<
  string,
  { gradient: string; character: CharacterId; shadow: string }
> = {
  math: {
    gradient: "linear-gradient(135deg,#FF4D8D,#FF8CC8)",
    character: "fox",
    shadow: "0 6px 20px rgba(255,77,141,0.3)",
  },
  language: {
    gradient: "linear-gradient(135deg,#7B4FFF,#A87BFF)",
    character: "unicorn",
    shadow: "0 6px 20px rgba(123,79,255,0.3)",
  },
  alphabet: {
    gradient: "linear-gradient(135deg,#00C9B1,#00E8D0)",
    character: "dino",
    shadow: "0 6px 20px rgba(0,201,177,0.3)",
  },
  "social-skills": {
    gradient: "linear-gradient(135deg,#FF6B4A,#FF9A80)",
    character: "monkey",
    shadow: "0 6px 20px rgba(255,107,74,0.3)",
  },
  arts: {
    gradient: "linear-gradient(135deg,#FFD600,#FF6B4A)",
    character: "bunny",
    shadow: "0 8px 32px rgba(255,214,0,0.3)",
  },
  "motor-skills": {
    gradient: "linear-gradient(135deg,#00D4FF,#7B4FFF)",
    character: "bear",
    shadow: "0 8px 32px rgba(123,79,255,0.3)",
  },
};

export type GameVisualType = "drag" | "match" | "trace" | "catch";

export const GAME_UI: Record<
  string,
  { character: CharacterId; type: GameVisualType; coins: number }
> = {
  "bubble-catch": { character: "fish", type: "catch", coins: 5 },
  "trace-trail": { character: "dino", type: "trace", coins: 8 },
  "frog-pond": { character: "dragon", type: "catch", coins: 6 },
  "paint-studio": { character: "bunny", type: "match", coins: 10 },
};

export const GAME_CARD_COLORS: Record<
  GameVisualType,
  { bg: string; shadow: string }
> = {
  drag: { bg: "linear-gradient(135deg, #FF4D8D, #FF8CC8)", shadow: "0 6px 20px rgba(255,77,141,0.3)" },
  match: { bg: "linear-gradient(135deg, #7B4FFF, #A87BFF)", shadow: "0 6px 20px rgba(123,79,255,0.3)" },
  trace: { bg: "linear-gradient(135deg, #00C9B1, #00E8D0)", shadow: "0 6px 20px rgba(0,201,177,0.3)" },
  catch: { bg: "linear-gradient(135deg, #FF6B4A, #FF9A80)", shadow: "0 6px 20px rgba(255,107,74,0.3)" },
};

export const EMOJI_TO_CHARACTER: Record<string, CharacterId> = {
  "🦊": "fox",
  "🐻": "bear",
  "🐰": "bunny",
  "🦁": "fox",
  "🐼": "bear",
  "🧒": "fox",
  "🐸": "dragon",
  "🦄": "unicorn",
};

export const HOME_SECTION_UI: Record<
  string,
  { character: CharacterId; gradient: string; shadow: string }
> = {
  "/shows": {
    character: "starbear",
    gradient: "linear-gradient(135deg,#7B4FFF,#00C9B1)",
    shadow: "0 8px 24px rgba(0,201,177,0.3)",
  },
  "/games": {
    character: "bunny",
    gradient: "linear-gradient(135deg,#FF4D8D,#FF8CC8)",
    shadow: "0 6px 20px rgba(255,77,141,0.3)",
  },
  "/learn": {
    character: "unicorn",
    gradient: "linear-gradient(135deg,#FFD600,#FF6B4A)",
    shadow: "0 8px 32px rgba(255,214,0,0.3)",
  },
  "/leaderboard": {
    character: "fox",
    gradient: "linear-gradient(135deg,#7B4FFF,#FF4D8D)",
    shadow: "0 8px 32px rgba(123,79,255,0.3)",
  },
  "/parents": {
    character: "bear",
    gradient: "linear-gradient(135deg,#00D4FF,#7B4FFF)",
    shadow: "0 8px 32px rgba(123,79,255,0.3)",
  },
};
