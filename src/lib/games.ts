export interface MiniGame {
  id: string;
  title: string;
  description: string;
<<<<<<< Updated upstream
  emoji: string;
  href: string;
  moduleId: string;
  xpPerRound: number;
}

export const MINI_GAMES: MiniGame[] = [
  {
    id: "count-stars",
    title: "Count the Stars",
    description: "Hard mode: scattered stars, timer, 6 choices, 10 rounds.",
    emoji: "⭐",
    href: "/games/count-stars",
    moduleId: "math",
    xpPerRound: 10,
=======
  route: string;
  character: string;
  gradient: string;
  shadow: string;
  coins: number;
  tags: string[];
  badge?: string;
}

/** Arcade catalog — sophisticated games only. */
export const GAMES: Game[] = [
  {
    id: "sprout-valley",
    name: "Sprout Valley",
    description: "Grow your dream farm—plant crops, raise animals, craft treats, and beat the clock on truck orders!",
    route: "/games/sprout-valley",
    character: "fox",
    gradient: "linear-gradient(135deg, #43A047, #7B4FFF)",
    shadow: "0 8px 28px rgba(67,160,71,0.35)",
    coins: 0,
    tags: ["farming", "simulation", "strategy", "ages 4+"],
    badge: "NEW",
>>>>>>> Stashed changes
  },
];

export function getMiniGame(id: string) {
  return MINI_GAMES.find((g) => g.id === id);
}
