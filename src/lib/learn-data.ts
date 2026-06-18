import type { CharacterId } from "@/components/characters/Characters";

export type SubjectId =
  | "math"
  | "language"
  | "alphabet"
  | "social-skills"
  | "arts"
  | "motor-skills"
  | "science"
  | "coding"
  | "geography";

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  character: CharacterId;
  gradient: string;
  shadow: string;
  icon: string;
  color: string;
  totalLessons: number;
  coinsPerLesson: number;
  xpPerLesson: number;
}

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Maths",
    description: "Numbers, counting and shapes",
    character: "bear",
    gradient: "linear-gradient(135deg, #FF4D8D, #FF8CC8)",
    shadow: "0 6px 20px rgba(255,77,141,0.3)",
    icon: "🔢",
    color: "#FF4D8D",
    totalLessons: 21,
    coinsPerLesson: 15,
    xpPerLesson: 20,
  },
  {
    id: "language",
    name: "Language",
    description: "Words, reading and speaking",
    character: "girl",
    gradient: "linear-gradient(135deg, #7B4FFF, #A87BFF)",
    shadow: "0 6px 20px rgba(123,79,255,0.3)",
    icon: "🗣️",
    color: "#7B4FFF",
    totalLessons: 20,
    coinsPerLesson: 15,
    xpPerLesson: 20,
  },
  {
    id: "alphabet",
    name: "Alphabet",
    description: "Letters A to Z",
    character: "boy",
    gradient: "linear-gradient(135deg, #00C9B1, #00E8D0)",
    shadow: "0 6px 20px rgba(0,201,177,0.3)",
    icon: "🔤",
    color: "#00C9B1",
    totalLessons: 16,
    coinsPerLesson: 10,
    xpPerLesson: 15,
  },
  {
    id: "social-skills",
    name: "Social Skills",
    description: "Feelings, sharing and kindness",
    character: "grandma",
    gradient: "linear-gradient(135deg, #FF6B4A, #FF9A80)",
    shadow: "0 6px 20px rgba(255,107,74,0.3)",
    icon: "🤝",
    color: "#FF6B4A",
    totalLessons: 15,
    coinsPerLesson: 15,
    xpPerLesson: 20,
  },
  {
    id: "arts",
    name: "Arts",
    description: "Colours, drawing and creativity",
    character: "unicorn",
    gradient: "linear-gradient(135deg, #FFD600, #FF6B4A)",
    shadow: "0 6px 20px rgba(255,214,0,0.3)",
    icon: "🎨",
    color: "#FFD600",
    totalLessons: 13,
    coinsPerLesson: 10,
    xpPerLesson: 15,
  },
  {
    id: "motor-skills",
    name: "Motor Skills",
    description: "Movement, balance and coordination",
    character: "frog",
    gradient: "linear-gradient(135deg, #2ECC71, #00C9B1)",
    shadow: "0 6px 20px rgba(46,204,113,0.3)",
    icon: "🏃",
    color: "#2ECC71",
    totalLessons: 11,
    coinsPerLesson: 10,
    xpPerLesson: 15,
  },
  {
    id: "science",
    name: "Science",
    description: "Nature, animals and experiments",
    character: "owl",
    gradient: "linear-gradient(135deg, #00D4FF, #7B4FFF)",
    shadow: "0 6px 20px rgba(0,212,255,0.3)",
    icon: "🔬",
    color: "#00D4FF",
    totalLessons: 16,
    coinsPerLesson: 15,
    xpPerLesson: 20,
  },
  {
    id: "coding",
    name: "Coding & Logic",
    description: "Patterns, sequences and problem solving",
    character: "penguin",
    gradient: "linear-gradient(135deg, #7B4FFF, #FF4D8D)",
    shadow: "0 6px 20px rgba(123,79,255,0.3)",
    icon: "💻",
    color: "#7B4FFF",
    totalLessons: 15,
    coinsPerLesson: 20,
    xpPerLesson: 25,
  },
  {
    id: "geography",
    name: "Geography",
    description: "Countries, continents and our world",
    character: "elephant",
    gradient: "linear-gradient(135deg, #00C9B1, #2ECC71)",
    shadow: "0 6px 20px rgba(0,201,177,0.3)",
    icon: "🌍",
    color: "#00C9B1",
    totalLessons: 15,
    coinsPerLesson: 15,
    xpPerLesson: 20,
  },
];

export function getSubject(id: string): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

/** Language lab keeps its own page; other subjects use the dynamic hub. */
export function getSubjectHref(id: SubjectId): string {
  if (id === "language") return "/learn/language";
  return `/learn/${id}`;
}
