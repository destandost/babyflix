import type { LearningModule } from "./types";

export const APP_NAME = "babyflix";

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "math",
    title: "Math",
    description: "Counting, shapes, and early number play.",
    emoji: "🔢",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "language",
    title: "Language",
    description: "Choose any language — 28+ options or type your own.",
    emoji: "🗣️",
    color: "from-violet-400 to-purple-500",
  },
  {
    id: "alphabet",
    title: "Alphabet",
    description: "Letters, phonics, and reading fun.",
    emoji: "🔤",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "social-skills",
    title: "Social Skills",
    description: "Feelings, sharing, listening, and kind words.",
    emoji: "🤝",
    color: "from-emerald-400 to-green-500",
  },
  {
    id: "arts",
    title: "Arts",
    description: "Colors, drawing, and creative play.",
    emoji: "🎨",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "motor-skills",
    title: "Motor Skills",
    description: "Balance, finger control, and body coordination.",
    emoji: "🏃",
    color: "from-lime-400 to-green-500",
  },
];

export const HOME_SECTIONS = [
  {
    href: "/shows",
    title: "Shows",
    description: "Watch friendly episodes and stories.",
    emoji: "📺",
    color: "from-indigo-400 to-indigo-600",
  },
  {
    href: "/games",
    title: "Arcade",
    description: "Tap, trace, catch, and paint — play for fun.",
    emoji: "🧸",
    color: "from-pink-300 to-orange-300",
  },
  {
    href: "/learn",
    title: "Learn",
    description: "Lessons, activities, and quizzes — earn XP.",
    emoji: "📚",
    color: "from-cyan-400 to-teal-600",
  },
  {
    href: "/leaderboard",
    title: "Leaderboard",
    description: "See how kids compare by level and XP.",
    emoji: "🏆",
    color: "from-yellow-400 to-amber-500",
  },
  {
    href: "/parents",
    title: "For Parents",
    description: "Progress reports and family dialogue.",
    emoji: "👨‍👩‍👧",
    color: "from-slate-500 to-slate-700",
  },
] as const;

export const MOCK_LEADERBOARD = [
  { rank: 1, name: "Luna", level: 12, xp: 2840, emoji: "🦊" },
  { rank: 2, name: "Milo", level: 11, xp: 2510, emoji: "🐻" },
  { rank: 3, name: "Zara", level: 10, xp: 2200, emoji: "🐰" },
  { rank: 4, name: "Kai", level: 9, xp: 1980, emoji: "🦁" },
  { rank: 5, name: "Nia", level: 8, xp: 1750, emoji: "🐼" },
];

export const MOCK_PARENT_REPORT = {
  childName: "Your child",
  periodLabel: "This week",
  modulesCompleted: 4,
  gamesPlayed: 12,
  showsWatched: 3,
  highlights: [
    "Finished 2 alphabet lessons",
    "Improved motor-skills score in balance game",
    "Started basic counting in math",
  ],
};
