import type { LearningModuleId } from "./types";

export interface QuizOption {
  id: string;
  label: string;
  emoji?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  sceneEmoji?: string;
  options: QuizOption[];
  correctId: string;
}

export interface ModuleQuiz {
  moduleId: LearningModuleId;
  title: string;
  subtitle: string;
  questions: QuizQuestion[];
}

/** Max XP for one perfect 5-question quiz (5×10 + 15 bonus). */
export const QUIZ_XP_MAX_PERFECT = 65;

export const MODULE_QUIZZES: Record<LearningModuleId, ModuleQuiz> = {
  math: {
    moduleId: "math",
    title: "Number Check",
    subtitle: "Count the pictures — 5 friendly questions.",
    questions: [
      {
        id: "m1",
        prompt: "How many stars?",
        sceneEmoji: "⭐⭐⭐",
        options: [
          { id: "2", label: "2" },
          { id: "3", label: "3" },
          { id: "4", label: "4" },
        ],
        correctId: "3",
      },
      {
        id: "m2",
        prompt: "How many balloons?",
        sceneEmoji: "🎈🎈🎈🎈",
        options: [
          { id: "3", label: "3" },
          { id: "4", label: "4" },
          { id: "5", label: "5" },
        ],
        correctId: "4",
      },
      {
        id: "m3",
        prompt: "How many ducks?",
        sceneEmoji: "🐥🐥",
        options: [
          { id: "1", label: "1" },
          { id: "2", label: "2" },
          { id: "3", label: "3" },
        ],
        correctId: "2",
      },
      {
        id: "m4",
        prompt: "Which group has MORE?",
        sceneEmoji: "🧸🧸🧸",
        options: [
          { id: "a", label: "🧸🧸", emoji: "🧸🧸" },
          { id: "b", label: "🧸🧸🧸", emoji: "🧸🧸🧸" },
          { id: "c", label: "🧸", emoji: "🧸" },
        ],
        correctId: "b",
      },
      {
        id: "m5",
        prompt: "What number comes after 4?",
        sceneEmoji: "4️⃣",
        options: [
          { id: "3", label: "3" },
          { id: "5", label: "5" },
          { id: "6", label: "6" },
        ],
        correctId: "5",
      },
    ],
  },
  language: {
    moduleId: "language",
    title: "Word Match",
    subtitle: "Quiz uses your chosen language — pick Spanish, Turkish, Japanese, and more.",
    questions: [],
  },
  alphabet: {
    moduleId: "alphabet",
    title: "Letter Quiz",
    subtitle: "Sounds and pictures for letters A–F.",
    questions: [
      {
        id: "a1",
        prompt: "Which letter does Apple start with?",
        sceneEmoji: "🍎",
        options: [
          { id: "A", label: "A" },
          { id: "B", label: "B" },
          { id: "C", label: "C" },
        ],
        correctId: "A",
      },
      {
        id: "a2",
        prompt: "Which letter does Dog start with?",
        sceneEmoji: "🐶",
        options: [
          { id: "C", label: "C" },
          { id: "D", label: "D" },
          { id: "E", label: "E" },
        ],
        correctId: "D",
      },
      {
        id: "a3",
        prompt: "Which picture goes with letter C?",
        sceneEmoji: "🔤",
        options: [
          { id: "cat", label: "Cat", emoji: "🐱" },
          { id: "ball", label: "Ball", emoji: "⚽" },
          { id: "fish", label: "Fish", emoji: "🐟" },
        ],
        correctId: "cat",
      },
      {
        id: "a4",
        prompt: "Which letter does Fish start with?",
        sceneEmoji: "🐟",
        options: [
          { id: "E", label: "E" },
          { id: "F", label: "F" },
          { id: "G", label: "G" },
        ],
        correctId: "F",
      },
      {
        id: "a5",
        prompt: "Which letter does Egg start with?",
        sceneEmoji: "🥚",
        options: [
          { id: "D", label: "D" },
          { id: "E", label: "E" },
          { id: "F", label: "F" },
        ],
        correctId: "E",
      },
    ],
  },
  "social-skills": {
    moduleId: "social-skills",
    title: "Friendship Quiz",
    subtitle: "Feelings, sharing, listening, and kind words.",
    questions: [
      {
        id: "s1",
        prompt: "Someone got a big hug. How do they feel?",
        sceneEmoji: "🤗",
        options: [
          { id: "happy", label: "Happy", emoji: "😊" },
          { id: "mad", label: "Mad", emoji: "😠" },
          { id: "scared", label: "Scared", emoji: "😨" },
        ],
        correctId: "happy",
      },
      {
        id: "s2",
        prompt: "What should you do with a toy both friends want?",
        sceneEmoji: "⚽",
        options: [
          { id: "grab", label: "Grab it fast" },
          { id: "share", label: "Take turns sharing" },
          { id: "hide", label: "Hide it" },
        ],
        correctId: "share",
      },
      {
        id: "s3",
        prompt: "What do good listeners use first?",
        sceneEmoji: "🦉",
        options: [
          { id: "feet", label: "Running feet", emoji: "🏃" },
          { id: "eyes", label: "Looking eyes", emoji: "👀" },
          { id: "hands", label: "Waving hands", emoji: "👋" },
        ],
        correctId: "eyes",
      },
      {
        id: "s4",
        prompt: "A new kid is at the playground. What helps?",
        sceneEmoji: "🛝",
        options: [
          { id: "away", label: "Go away!" },
          { id: "hi", label: "Hi! Want to play?" },
          { id: "ignore", label: "Ignore them" },
        ],
        correctId: "hi",
      },
      {
        id: "s5",
        prompt: "Someone looks sad. What is kind?",
        sceneEmoji: "😢",
        options: [
          { id: "laugh", label: "Laugh at them" },
          { id: "sit", label: "Are you okay? Sit with me?" },
          { id: "run", label: "Run away" },
        ],
        correctId: "sit",
      },
    ],
  },
  arts: {
    moduleId: "arts",
    title: "Color & Create",
    subtitle: "Colors, drawing, and creative tools.",
    questions: [
      {
        id: "ar1",
        prompt: "Red and blue mixed make…",
        sceneEmoji: "🎨",
        options: [
          { id: "green", label: "Green" },
          { id: "purple", label: "Purple" },
          { id: "orange", label: "Orange" },
        ],
        correctId: "purple",
      },
      {
        id: "ar2",
        prompt: "Yellow and blue mixed make…",
        sceneEmoji: "🟡🔵",
        options: [
          { id: "green", label: "Green" },
          { id: "pink", label: "Pink" },
          { id: "brown", label: "Brown" },
        ],
        correctId: "green",
      },
      {
        id: "ar3",
        prompt: "Red and yellow mixed make…",
        sceneEmoji: "🟥🟨",
        options: [
          { id: "purple", label: "Purple" },
          { id: "orange", label: "Orange" },
          { id: "green", label: "Green" },
        ],
        correctId: "orange",
      },
      {
        id: "ar4",
        prompt: "What are the three primary colors?",
        sceneEmoji: "🌈",
        options: [
          { id: "rbg", label: "Red, blue, green" },
          { id: "rby", label: "Red, blue, yellow" },
          { id: "rgb", label: "Red, green, black" },
        ],
        correctId: "rby",
      },
      {
        id: "ar5",
        prompt: "Artists use colors to…",
        sceneEmoji: "🖼️",
        options: [
          { id: "express", label: "Show feelings and ideas" },
          { id: "cook", label: "Cook dinner" },
          { id: "drive", label: "Drive cars" },
        ],
        correctId: "express",
      },
    ],
  },
  "motor-skills": {
    moduleId: "motor-skills",
    title: "Move & Groove",
    subtitle: "Balance, listening body, and finger control.",
    questions: [
      {
        id: "mo1",
        prompt: "Balance Steps helps you practice…",
        sceneEmoji: "🦩",
        options: [
          { id: "balance", label: "Staying steady left and right" },
          { id: "sing", label: "Singing loud" },
          { id: "type", label: "Typing fast" },
        ],
        correctId: "balance",
      },
      {
        id: "mo2",
        prompt: "Finger Gym is about…",
        sceneEmoji: "💪",
        options: [
          { id: "patterns", label: "Copying finger patterns" },
          { id: "jump", label: "Jumping on beds" },
          { id: "tv", label: "Watching TV" },
        ],
        correctId: "patterns",
      },
      {
        id: "mo3",
        prompt: "Good balance means…",
        sceneEmoji: "⚖️",
        options: [
          { id: "steady", label: "Standing steady without wobbling too much" },
          { id: "run", label: "Running the fastest" },
          { id: "hide", label: "Hiding under a table" },
        ],
        correctId: "steady",
      },
      {
        id: "mo4",
        prompt: "Small finger muscles help you…",
        sceneEmoji: "✋",
        options: [
          { id: "pinch", label: "Pinch, zip, and hold a pencil" },
          { id: "fly", label: "Fly like a bird" },
          { id: "sleep", label: "Sleep all day" },
        ],
        correctId: "pinch",
      },
      {
        id: "mo5",
        prompt: "When you land from a jump, bend your…",
        sceneEmoji: "🦘",
        options: [
          { id: "knees", label: "Knees softly" },
          { id: "elbows", label: "Elbows only" },
          { id: "nose", label: "Nose first" },
        ],
        correctId: "knees",
      },
    ],
  },
};

export function getModuleQuiz(moduleId: string): ModuleQuiz | undefined {
  return MODULE_QUIZZES[moduleId as LearningModuleId];
}

export function getQuizHref(moduleId: string): string {
  return `/learn/quiz/${moduleId}`;
}

export function isValidQuizModule(moduleId: string): moduleId is LearningModuleId {
  return moduleId in MODULE_QUIZZES;
}
