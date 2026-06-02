export interface MiniGame {
  id: string;
  title: string;
  description: string;
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
  },
];

export function getMiniGame(id: string) {
  return MINI_GAMES.find((g) => g.id === id);
}
