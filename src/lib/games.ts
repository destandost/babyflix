export type PlayZone = "action" | "pond" | "garden";

export interface MiniGame {
  id: string;
  title: string;
  description: string;
  emoji: string;
  href: string;
  zone: PlayZone;
  vibe: string;
  depth: string;
}

export const PLAY_ZONE_LABELS: Record<PlayZone, string> = {
  action: "Move & trace",
  pond: "Tap & catch",
  garden: "Create & make",
};

export const PLAY_ZONE_ORDER: PlayZone[] = ["action", "pond", "garden"];

export const MINI_GAMES: MiniGame[] = [
  {
    id: "bubble-catch",
    title: "Bubble Catch",
    description: "Drag the basket and catch falling bubbles before they pop!",
    emoji: "🫧",
    href: "/games/bubble-catch",
    zone: "action",
    vibe: "Drag & track",
    depth: "Move · Catch · Combo",
  },
  {
    id: "trace-trail",
    title: "Trace Trail",
    description: "Follow the dotted path with your finger — wiggles, loops, and zigzags.",
    emoji: "✏️",
    href: "/games/trace-trail",
    zone: "action",
    vibe: "Tracing",
    depth: "5 trails · Stars",
  },
  {
    id: "frog-pond",
    title: "Frog Pond",
    description:
      "Flies buzz around the pond — tap one and the frog's tongue snaps out to catch it!",
    emoji: "🐸",
    href: "/games/frog-pond",
    zone: "pond",
    vibe: "Tap & catch",
    depth: "Tongue snap · Combos",
  },
  {
    id: "paint-studio",
    title: "Paint Studio",
    description:
      "Draw with brushes, stamp stickers, and save your art to a gallery.",
    emoji: "🎨",
    href: "/games/paint-studio",
    zone: "garden",
    vibe: "Art studio",
    depth: "Canvas · Stickers · Gallery",
  },
];

export function getMiniGame(id: string) {
  return MINI_GAMES.find((g) => g.id === id);
}

export function getGamesByZone(zone: PlayZone) {
  return MINI_GAMES.filter((g) => g.zone === zone);
}
