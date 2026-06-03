export interface LessonItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  status: "ready" | "locked";
  duration?: string;
}

export const MODULE_LESSONS: Record<string, LessonItem[]> = {
  math: [
    {
      id: "counting",
      title: "Counting 1–5",
      description: "Meet the numbers with pictures and rhythm.",
      href: "/learn/math/counting",
      status: "ready",
      duration: "5 min",
    },
    {
      id: "compare",
      title: "More or less?",
      description: "Compare small groups of objects.",
      status: "locked",
      duration: "6 min",
    },
    {
      id: "shapes",
      title: "Shape hunt",
      description: "Circles, squares, and triangles in real life.",
      status: "locked",
      duration: "7 min",
    },
    {
      id: "patterns",
      title: "Number patterns",
      description: "What comes next in a simple sequence?",
      status: "locked",
      duration: "8 min",
    },
  ],
  language: [
    {
      id: "pick-language",
      title: "Choose your language",
      description: "Pick from 28+ languages or type your own.",
      href: "/learn/language",
      status: "ready",
      duration: "2 min",
    },
    {
      id: "word-library",
      title: "Word library",
      description: "Browse all 22 words with pronunciation audio.",
      href: "/learn/language#words",
      status: "ready",
      duration: "10 min",
    },
    {
      id: "phrases",
      title: "Everyday phrases",
      description: "Hello, please, thank you, and more.",
      status: "locked",
      duration: "8 min",
    },
    {
      id: "conversation",
      title: "Mini conversations",
      description: "Short back-and-forth practice scenes.",
      status: "locked",
      duration: "12 min",
    },
  ],
  alphabet: [
    {
      id: "sounds",
      title: "Letter sounds A–F",
      description: "Hear and say the first six letter sounds.",
      href: "/learn/alphabet/sounds",
      status: "ready",
      duration: "6 min",
    },
    {
      id: "upper-lower",
      title: "Big & small letters",
      description: "Match uppercase and lowercase pairs.",
      status: "locked",
      duration: "7 min",
    },
    {
      id: "rhymes",
      title: "Rhyme time",
      description: "Words that sound alike at the end.",
      status: "locked",
      duration: "8 min",
    },
    {
      id: "first-words",
      title: "My first words",
      description: "Simple three-letter words to read.",
      status: "locked",
      duration: "10 min",
    },
  ],
  "social-skills": [
    {
      id: "feelings",
      title: "Name That Feeling",
      description: "Match happy, sad, mad, calm, and scared to little stories.",
      href: "/learn/social-skills/feelings",
      status: "ready",
      duration: "6 min",
    },
    {
      id: "sharing",
      title: "Sharing Practice",
      description: "Pass the ball between friends — tap to share.",
      href: "/learn/social-skills/sharing",
      status: "ready",
      duration: "7 min",
    },
    {
      id: "listening",
      title: "Good Listening",
      description: "Eyes, ears, quiet body — tap in order with Owl.",
      href: "/learn/social-skills/listening",
      status: "ready",
      duration: "5 min",
    },
    {
      id: "friends",
      title: "Making Friends",
      description: "Pick kind words for playground, party, and sad moments.",
      href: "/learn/social-skills/friends",
      status: "ready",
      duration: "8 min",
    },
    {
      id: "sorry",
      title: "Saying sorry",
      description: "Fix-ups after oops moments — coming soon.",
      status: "locked",
      duration: "6 min",
    },
  ],
  arts: [
    {
      id: "colors",
      title: "Color Mix Lab",
      description: "Tap colors and see what they make together.",
      href: "/learn/arts/colors",
      status: "ready",
      duration: "6 min",
    },
    {
      id: "draw",
      title: "Draw your day",
      description: "Tell a story with pictures.",
      status: "locked",
      duration: "10 min",
    },
    {
      id: "music",
      title: "Rhythm & beat",
      description: "Clap and tap simple patterns.",
      status: "locked",
      duration: "7 min",
    },
    {
      id: "craft",
      title: "Paper craft",
      description: "Fold and tear safe paper shapes.",
      status: "locked",
      duration: "12 min",
    },
  ],
  "motor-skills": [
    {
      id: "balance",
      title: "Balance Steps",
      description: "Tap left or right to stay steady like a flamingo.",
      href: "/learn/motor-skills/balance",
      status: "ready",
      duration: "5 min",
    },
    {
      id: "fingers",
      title: "Finger Gym",
      description: "Copy the finger pattern — memory and control.",
      href: "/learn/motor-skills/fingers",
      status: "ready",
      duration: "7 min",
    },
    {
      id: "jump",
      title: "Jump & land",
      description: "Bend knees when you land — coming soon.",
      status: "locked",
      duration: "5 min",
    },
    {
      id: "throw",
      title: "Soft toss",
      description: "Aim at a big target — coming soon.",
      status: "locked",
      duration: "6 min",
    },
  ],
};

export function getModuleLessons(moduleId: string): LessonItem[] {
  return MODULE_LESSONS[moduleId] ?? [];
}
