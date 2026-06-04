export interface Game {
  id: string;
  name: string;
  description: string;
  route: string;
  character: string;
  gradient: string;
  shadow: string;
  coins: number;
  tags: string[];
}

export const GAMES: Game[] = [
  {
    id: "bubble-pop",
    name: "Bubble Pop",
    description: "Pop the right letters and numbers!",
    route: "/games/bubble-pop",
    character: "fox",
    gradient: "linear-gradient(135deg, #FF4D8D, #FF8CC8)",
    shadow: "0 6px 20px rgba(255,77,141,0.3)",
    coins: 15,
    tags: ["letters", "numbers", "ages 2+"],
  },
  {
    id: "feed-the-animal",
    name: "Feed the Animal",
    description: "Give each animal their favourite food!",
    route: "/games/feed-the-animal",
    character: "monkey",
    gradient: "linear-gradient(135deg, #FF6B4A, #FF9A80)",
    shadow: "0 6px 20px rgba(255,107,74,0.3)",
    coins: 15,
    tags: ["animals", "vocabulary", "ages 2+"],
  },
  {
    id: "word-builder",
    name: "Word Builder",
    description: "Tap letters to spell the word!",
    route: "/games/word-builder",
    character: "dino",
    gradient: "linear-gradient(135deg, #00C9B1, #00E8D0)",
    shadow: "0 6px 20px rgba(0,201,177,0.3)",
    coins: 20,
    tags: ["spelling", "phonics", "ages 3+"],
  },
  {
    id: "number-bonds",
    name: "Number Bonds",
    description: "Catch pairs of numbers that add up!",
    route: "/games/number-bonds",
    character: "bear",
    gradient: "linear-gradient(135deg, #7B4FFF, #A87BFF)",
    shadow: "0 6px 20px rgba(123,79,255,0.3)",
    coins: 15,
    tags: ["maths", "addition", "ages 3+"],
  },
  {
    id: "pattern-finish",
    name: "Pattern Finish",
    description: "What comes next in the sequence?",
    route: "/games/pattern-finish",
    character: "unicorn",
    gradient: "linear-gradient(135deg, #FFD600, #FF6B4A)",
    shadow: "0 6px 20px rgba(255,214,0,0.3)",
    coins: 10,
    tags: ["logic", "patterns", "ages 2+"],
  },
  {
    id: "maths-duel",
    name: "Maths Duel",
    description: "Tap the right answer before it zooms past!",
    route: "/games/maths-duel",
    character: "dragon",
    gradient: "linear-gradient(135deg, #FF6B4A, #FF4D8D)",
    shadow: "0 6px 20px rgba(255,107,74,0.3)",
    coins: 25,
    tags: ["maths", "speed", "ages 4+"],
  },
  {
    id: "story-sequencer",
    name: "Story Sequencer",
    description: "Put the story scenes in the right order!",
    route: "/games/story-sequencer",
    character: "starbear",
    gradient: "linear-gradient(135deg, #7B4FFF, #00C9B1)",
    shadow: "0 6px 20px rgba(123,79,255,0.3)",
    coins: 25,
    tags: ["stories", "logic", "ages 3+"],
  },
];
