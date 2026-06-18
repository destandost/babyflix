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
    description: "Words, sounds, and new languages.",
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
    description: "Sharing, feelings, and friendship.",
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
    description: "Movement, coordination, and balance.",
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
    title: "Games",
    description: "Play math, language, arts, and motor games.",
    emoji: "🎮",
    color: "from-fuchsia-400 to-pink-600",
  },
  {
    href: "/learn",
    title: "Learn",
    description: "Structured lessons across every module.",
    emoji: "📚",
    color: "from-cyan-400 to-teal-600",
  },
  {
    href: "/leaderboard",
    title: "Leaderboard",
    description: "Climb the ranks with XP from quizzes and games.",
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
