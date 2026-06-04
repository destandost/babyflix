import type { CharacterId } from "@/components/characters/Characters";
import type { ContentTier, Difficulty } from "@/lib/difficulty";

export const ANIMALS = [
  { id: "bunny", charId: "bunny" as CharacterId, name: "Bunny", food: "🥕", foodName: "Carrot", wrong: ["🍖", "🐟", "🍯", "🌿"] },
  { id: "bear", charId: "bear" as CharacterId, name: "Bear", food: "🍯", foodName: "Honey", wrong: ["🥕", "🌿", "🥜", "🐟"] },
  { id: "monkey", charId: "monkey" as CharacterId, name: "Monkey", food: "🍌", foodName: "Banana", wrong: ["🥕", "🍯", "🐟", "🌿"] },
  { id: "dragon", charId: "dragon" as CharacterId, name: "Dragon", food: "🔥", foodName: "Fire", wrong: ["🍌", "🥕", "🍯", "🌿"] },
  { id: "dino", charId: "dino" as CharacterId, name: "Dino", food: "🌿", foodName: "Leaves", wrong: ["🍖", "🍌", "🍯", "🥕"] },
  { id: "fox", charId: "fox" as CharacterId, name: "Fox", food: "🫐", foodName: "Berries", wrong: ["🥕", "🍯", "🌿", "🍖"] },
  { id: "unicorn", charId: "unicorn" as CharacterId, name: "Unicorn", food: "🌈", foodName: "Rainbow", wrong: ["🥕", "🍖", "🐟", "🍯"] },
  { id: "fish", charId: "fish" as CharacterId, name: "Fish", food: "🐛", foodName: "Worm", wrong: ["🥕", "🍌", "🍯", "🌿"] },
];

export type WordEntry = { word: string; charId: CharacterId; hint: string };

/** Word Builder clues — charId must match a BabyFlix character the word describes. */
export const WORDS: Record<ContentTier, WordEntry[]> = {
  0: [
    { word: "FOX", charId: "fox", hint: "An orange wild animal" },
    { word: "FISH", charId: "fish", hint: "Swims in the water" },
    { word: "BEAR", charId: "bear", hint: "Big and cuddly" },
    { word: "DINO", charId: "dino", hint: "Green and scaly" },
    { word: "PET", charId: "bunny", hint: "A soft furry friend" },
  ],
  1: [
    { word: "FROG", charId: "dino", hint: "Green and loves to jump" },
    { word: "FISH", charId: "fish", hint: "Swims in the ocean" },
    { word: "BEAR", charId: "bear", hint: "Big fluffy forest animal" },
    { word: "STAR", charId: "starbear", hint: "Shines in the night sky" },
    { word: "CLOUD", charId: "cloud", hint: "Fluffy white shapes in the sky" },
    { word: "MONKEY", charId: "monkey", hint: "Swings through the trees" },
  ],
  2: [
    { word: "CLOUD", charId: "cloud", hint: "Floats in the sky" },
    { word: "DRAGON", charId: "dragon", hint: "Breathes fire and flies" },
    { word: "MAGIC", charId: "unicorn", hint: "Mysterious and wonderful" },
    { word: "OCEAN", charId: "fish", hint: "Where fish swim and splash" },
    { word: "FROST", charId: "cloud", hint: "Cold and icy in the sky" },
    { word: "JUNGLE", charId: "monkey", hint: "A wild tropical forest" },
    { word: "UNICORN", charId: "unicorn", hint: "A magical horned friend" },
  ],
};

export function wordsForDifficulty(difficulty: Difficulty): WordEntry[] {
  return WORDS[difficulty.contentTier];
}

export type PatternItem = { charId: CharacterId };

export const PATTERN_CHARS: CharacterId[] = [
  "fox",
  "bear",
  "dino",
  "bunny",
  "dragon",
  "fish",
  "monkey",
  "unicorn",
];

export interface StoryScene {
  order: number;
  label: string;
  bg: string;
  narration: string;
}

export interface Story {
  id: string;
  title: string;
  character: CharacterId;
  scenes: StoryScene[];
}

export const STORIES: Record<ContentTier, Story[]> = {
  0: [
    {
      id: "seed",
      title: "The Little Seed",
      character: "dino",
      scenes: [
        {
          order: 1,
          label: "A seed in the ground",
          bg: "linear-gradient(180deg,#87CEEB 55%,#8B6914 45%)",
          narration: "First, a tiny seed was planted in the ground.",
        },
        {
          order: 2,
          label: "Sun and rain help it grow",
          bg: "linear-gradient(180deg,#FFD700 0%,#87CEEB 50%,#90EE90 50%)",
          narration: "Then, the sun and rain helped it grow into a sprout.",
        },
        {
          order: 3,
          label: "A beautiful flower blooms",
          bg: "linear-gradient(180deg,#87CEEB 50%,#90EE90 50%)",
          narration: "Finally, it grew into a beautiful flower!",
        },
      ],
    },
    {
      id: "morning",
      title: "Good Morning!",
      character: "bear",
      scenes: [
        {
          order: 1,
          label: "Waking up in bed",
          bg: "linear-gradient(135deg,#1a1a4e,#7B4FFF)",
          narration: "First, the bear woke up and had a big stretch.",
        },
        {
          order: 2,
          label: "Brushing teeth",
          bg: "linear-gradient(135deg,#00C9B1,#00D4FF)",
          narration: "Next, the bear brushed its teeth nice and clean.",
        },
        {
          order: 3,
          label: "Eating a yummy breakfast",
          bg: "linear-gradient(135deg,#FFD600,#FF6B4A)",
          narration: "Then, the bear ate a delicious breakfast!",
        },
      ],
    },
  ],
  1: [
    {
      id: "rain",
      title: "After the Rain",
      character: "cloud",
      scenes: [
        {
          order: 1,
          label: "Dark clouds gather",
          bg: "linear-gradient(180deg,#2d2d44,#4a4a6a)",
          narration: "First, dark clouds gathered in the sky.",
        },
        {
          order: 2,
          label: "Rain falls on flowers",
          bg: "linear-gradient(180deg,#4a6fa5,#87CEEB)",
          narration: "Then, the rain fell and watered all the flowers.",
        },
        {
          order: 3,
          label: "A rainbow appears",
          bg: "linear-gradient(180deg,#87CEEB,#90EE90)",
          narration: "Finally, a beautiful rainbow appeared!",
        },
      ],
    },
  ],
  2: [
    {
      id: "quest",
      title: "The Dragon's Quest",
      character: "dragon",
      scenes: [
        {
          order: 1,
          label: "Dragon finds a mysterious map",
          bg: "linear-gradient(135deg,#2d1e5f,#7B4FFF)",
          narration: "One day, a young dragon discovered a mysterious old map.",
        },
        {
          order: 2,
          label: "Dragon flies over tall mountains",
          bg: "linear-gradient(135deg,#1a3a5f,#00C9B1)",
          narration: "Bravely, the dragon flew over the tall, icy mountains.",
        },
        {
          order: 3,
          label: "Dragon finds the treasure",
          bg: "linear-gradient(135deg,#5f3a1e,#FFD600)",
          narration: "At last, the dragon found the gleaming golden treasure!",
        },
      ],
    },
  ],
};

export function storiesForDifficulty(difficulty: Difficulty): Story[] {
  return STORIES[difficulty.contentTier];
}

export const BUBBLE_COLORS = [
  "#FF4D8D",
  "#7B4FFF",
  "#00C9B1",
  "#FF6B4A",
  "#FFD600",
  "#00D4FF",
];

export const LETTER_COLORS = [
  "#FF4D8D",
  "#7B4FFF",
  "#00C9B1",
  "#FF6B4A",
  "#FFD600",
  "#00D4FF",
  "#2ECC71",
  "#FF8CC8",
];

export function getTileColor(letter: string) {
  return LETTER_COLORS[letter.charCodeAt(0) % LETTER_COLORS.length];
}
