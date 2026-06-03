const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type LetterPuzzle =
  | { type: "letter"; answer: string; prompt: string }
  | { type: "word"; answer: string; prompt: string; emoji: string };

const WORD_PUZZLES: { emoji: string; template: string; answer: string }[] = [
  { emoji: "🍎", template: "_ P P L E", answer: "A" },
  { emoji: "🐱", template: "C _ T", answer: "A" },
  { emoji: "🐕", template: "D _ G", answer: "O" },
  { emoji: "☀️", template: "S _ N", answer: "U" },
  { emoji: "🐝", template: "B _ E", answer: "E" },
  { emoji: "🚢", template: "S H _ P", answer: "I" },
  { emoji: "🌙", template: "M _ O N", answer: "O" },
  { emoji: "🐸", template: "F R _ G", answer: "O" },
  { emoji: "🎂", template: "C _ K E", answer: "A" },
  { emoji: "🦁", template: "L _ O N", answer: "I" },
];

export function buildLetterPuzzle(round: number): LetterPuzzle {
  if (round >= 6) {
    const word = WORD_PUZZLES[Math.floor(Math.random() * WORD_PUZZLES.length)];
    return {
      type: "word",
      answer: word.answer,
      emoji: word.emoji,
      prompt: `${word.emoji}  ${word.template}`,
    };
  }

  const answer = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  const showLower = round >= 4;
  return {
    type: "letter",
    answer,
    prompt: showLower ? answer.toLowerCase() : answer,
  };
}

export function buildLetterChoices(correct: string): string[] {
  const idx = ALPHABET.indexOf(correct.toUpperCase());
  const choices = new Set<string>([correct.toUpperCase()]);

  for (const off of [-3, -2, -1, 1, 2, 3, 4]) {
    if (choices.size >= 6) break;
    const c = ALPHABET[idx + off];
    if (c) choices.add(c);
  }

  while (choices.size < 6) {
    choices.add(ALPHABET[Math.floor(Math.random() * ALPHABET.length)]);
  }

  return shuffle([...choices]);
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
