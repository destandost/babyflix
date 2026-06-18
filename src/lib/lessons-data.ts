import type { CharacterId } from "@/components/characters/Characters";
import type { SubjectId } from "@/lib/learn-data";
import { EXPANDED_LESSONS } from "./lessons-expanded";

export type SlideType =
  | "intro"
  | "teach"
  | "story"
  | "interact"
  | "quiz"
  | "funfact"
  | "experiment"
  | "drag"
  | "fillin"
  | "match"
  | "game";

export interface LessonSlide {
  type: SlideType;
  title: string;
  content: string;
  character?: CharacterId;
  visual?: string;
  options?: string[];
  correct?: number;
  voiceText?: string;
  funFact?: string;
  experiment?: {
    title: string;
    materials: string[];
    steps: string[];
  };
  pairs?: [string, string][];
  blank?: string;
  blankOptions?: string[];
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  title: string;
  description: string;
  ageGroup: "2-4" | "4-6" | "6-8" | "all";
  slides: LessonSlide[];
  coinsReward: number;
  xpReward: number;
}

function endGameSlide(character: CharacterId): LessonSlide {
  return {
    type: "game",
    title: "Quick tap challenge!",
    content: "Tap the star as fast as you can!",
    character,
    visual: "⭐",
    voiceText: "Tap the star three times! Ready, go!",
  };
}

const CORE_LESSONS: Lesson[] = [
  {
    id: "math-counting-1",
    subjectId: "math",
    title: "Counting to 5",
    description: "Learn to count objects up to 5",
    ageGroup: "2-4",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Counting to 5!",
        content: "Today we learn to count! Ready?",
        character: "bear",
        visual: "🔢",
        voiceText: "Today we are going to learn to count to five! Are you ready?",
      },
      {
        type: "teach",
        title: "One apple",
        content: "This is ONE apple. Count with me: 1!",
        character: "bear",
        visual: "🍎",
        voiceText: "This is one apple. Say it with me: ONE!",
      },
      {
        type: "teach",
        title: "Two apples",
        content: "Now TWO apples. Count: 1, 2!",
        character: "bear",
        visual: "🍎🍎",
        voiceText: "Now we have two apples. Count with me: one, two!",
      },
      {
        type: "interact",
        title: "How many stars?",
        content: "Tap the right number!",
        visual: "⭐⭐⭐",
        options: ["1", "2", "3", "4"],
        correct: 2,
      },
      {
        type: "story",
        title: "Bear counts cookies",
        content: "Bear baked cookies! Help him count them all.",
        character: "bear",
        visual: "🍪🍪🍪🍪",
        voiceText: "Bear baked four delicious cookies! Can you count them with him?",
      },
      {
        type: "quiz",
        title: "Quick quiz!",
        content: "How many fish can you see?",
        visual: "🐟🐟",
        options: ["1", "2", "3", "5"],
        correct: 1,
      },
      endGameSlide("bear"),
    ],
  },
  {
    id: "math-shapes-1",
    subjectId: "math",
    title: "Shapes Around Us",
    description: "Circles, squares, triangles and more",
    ageGroup: "4-6",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Shapes!",
        content: "Shapes are everywhere! Let's find them.",
        character: "bear",
        visual: "🔵🔴🟡",
      },
      {
        type: "teach",
        title: "The Circle",
        content: "A circle is perfectly round, like the sun!",
        character: "bear",
        visual: "⭕",
        voiceText: "A circle is perfectly round with no corners. The sun is a circle!",
      },
      {
        type: "teach",
        title: "The Square",
        content: "A square has 4 equal sides and 4 corners.",
        character: "bear",
        visual: "⬜",
        voiceText: "A square has four equal sides. Can you draw one in the air?",
      },
      {
        type: "interact",
        title: "Which is a triangle?",
        content: "Tap the triangle!",
        options: ["⬜", "🔺", "⭕", "💠"],
        correct: 1,
      },
      {
        type: "quiz",
        title: "Shape quiz!",
        content: "How many sides does a triangle have?",
        options: ["2", "3", "4", "5"],
        correct: 1,
      },
      endGameSlide("bear"),
    ],
  },
  {
    id: "alpha-abc-1",
    subjectId: "alphabet",
    title: "Letters A, B, C",
    description: "Meet the first three letters",
    ageGroup: "2-4",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      {
        type: "intro",
        title: "The Alphabet!",
        content: "Letters make words! Let's meet A, B and C.",
        character: "boy",
        visual: "🔤",
      },
      {
        type: "story",
        title: "Dino loves letters",
        content: "Dino says: A is for Apple! Can you say A?",
        character: "boy",
        visual: "🍎",
        voiceText: "A is for Apple! Say it with me: AYY!",
      },
      {
        type: "teach",
        title: "B is for Bear",
        content: "B makes a buzzy sound — buh buh Bear!",
        character: "boy",
        visual: "🐻",
        voiceText: "B is for Bear! Say the B sound: buh!",
      },
      {
        type: "teach",
        title: "C is for Cat",
        content: "C makes a hard sound — cuh cuh Cat!",
        character: "boy",
        visual: "🐱",
        voiceText: "C is for Cat! Say the C sound: cuh!",
      },
      {
        type: "interact",
        title: "Which letter?",
        content: "Apple starts with which letter?",
        options: ["B", "C", "A", "D"],
        correct: 2,
      },
      {
        type: "quiz",
        title: "Letter quiz!",
        content: "Bear starts with which letter?",
        options: ["A", "B", "C", "D"],
        correct: 1,
      },
      endGameSlide("boy"),
    ],
  },
  {
    id: "science-animals-1",
    subjectId: "science",
    title: "Animal Habitats",
    description: "Where do animals live?",
    ageGroup: "4-6",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Animal Homes!",
        content: "Every animal has a special home. Let's explore!",
        character: "owl",
        visual: "🌍",
        voiceText:
          "Every animal has a special place where it lives! Let's find out where!",
      },
      {
        type: "teach",
        title: "Fish live in water",
        content: "Fish breathe underwater using their gills!",
        character: "owl",
        visual: "🐟🌊",
        voiceText:
          "Fish live in rivers, lakes, and oceans. They breathe underwater using gills!",
      },
      {
        type: "teach",
        title: "Birds live in trees",
        content: "Birds build nests in trees to keep their eggs safe!",
        character: "owl",
        visual: "🐦🌳",
        voiceText:
          "Birds live in trees! They build cozy nests to keep their eggs warm and safe.",
      },
      {
        type: "story",
        title: "Dragon explores",
        content:
          "Dragon flew across the world to find different animals in their homes.",
        character: "owl",
        visual: "🐉",
        voiceText:
          "Dragon loved to explore! One day she flew across the whole world discovering where animals live.",
      },
      {
        type: "interact",
        title: "Where does it live?",
        content: "Where does a fish live?",
        options: ["🌳 Tree", "🌊 Ocean", "🏔️ Mountain", "🏜️ Desert"],
        correct: 1,
      },
      {
        type: "quiz",
        title: "Habitat quiz!",
        content: "Where do birds build their nests?",
        options: ["Underground", "In water", "In trees", "In caves"],
        correct: 2,
      },
      endGameSlide("dragon"),
    ],
  },
  {
    id: "science-weather-1",
    subjectId: "science",
    title: "Weather & Seasons",
    description: "Sun, rain, snow and wind",
    ageGroup: "4-6",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Weather!",
        content: "Is it sunny today? Let's learn about weather!",
        character: "owl",
        visual: "⛅",
      },
      {
        type: "teach",
        title: "Sunny days",
        content: "The sun gives us light and warmth!",
        character: "owl",
        visual: "☀️",
        voiceText:
          "The sun is a giant ball of fire very far away. It gives us warmth and light!",
      },
      {
        type: "teach",
        title: "Rainy days",
        content: "Rain comes from clouds. Plants love rain!",
        character: "owl",
        visual: "🌧️",
        voiceText:
          "Rain falls from clouds. It waters the plants and fills rivers and lakes!",
      },
      {
        type: "interact",
        title: "What weather is it?",
        content: "Tap the snowy weather!",
        options: ["☀️", "🌧️", "❄️", "🌪️"],
        correct: 2,
      },
      {
        type: "quiz",
        title: "Weather quiz!",
        content: "What do plants drink?",
        options: ["Juice", "Rain", "Milk", "Tea"],
        correct: 1,
      },
      endGameSlide("owl"),
    ],
  },
  {
    id: "coding-sequences-1",
    subjectId: "coding",
    title: "What is a Sequence?",
    description: "Steps in the right order",
    ageGroup: "4-6",
    coinsReward: 20,
    xpReward: 25,
    slides: [
      {
        type: "intro",
        title: "Coding!",
        content: "Coding is giving instructions! Let's learn how.",
        character: "penguin",
        visual: "💻",
        voiceText:
          "Coding means giving a computer step by step instructions! Let's learn how!",
      },
      {
        type: "teach",
        title: "A sequence",
        content:
          "A sequence is doing things in order. Like getting dressed: socks THEN shoes!",
        character: "penguin",
        visual: "🧦👟",
        voiceText:
          "A sequence is steps in the right order. You put socks on BEFORE shoes, not after!",
      },
      {
        type: "story",
        title: "Cosmo codes a rocket",
        content:
          "Cosmo wants to launch a rocket. First: fuel. Then: countdown. Then: BLAST OFF!",
        character: "penguin",
        visual: "🚀",
        voiceText:
          "Cosmo needs to launch her rocket. First she adds fuel. Then she counts down. Then blast off!",
      },
      {
        type: "interact",
        title: "Fix the sequence!",
        content: "To make a sandwich, what comes FIRST?",
        options: ["Eat it!", "Put filling in", "Get the bread", "Cut it"],
        correct: 2,
      },
      {
        type: "quiz",
        title: "Sequence quiz!",
        content: "You want to draw a picture. What do you do FIRST?",
        options: ["Colour it", "Show your friends", "Pick up the pencil", "Hang it up"],
        correct: 2,
      },
      endGameSlide("penguin"),
    ],
  },
  {
    id: "coding-patterns-1",
    subjectId: "coding",
    title: "Loops & Patterns",
    description: "Things that repeat again and again",
    ageGroup: "6-8",
    coinsReward: 20,
    xpReward: 25,
    slides: [
      {
        type: "intro",
        title: "Loops!",
        content: "A loop is something that repeats. Like day and night!",
        character: "penguin",
        visual: "🔄",
      },
      {
        type: "teach",
        title: "What is a loop?",
        content:
          "In coding, a loop does the same thing over and over until told to stop.",
        character: "penguin",
        visual: "♻️",
        voiceText:
          "A loop repeats the same instructions again and again. Like brushing each tooth one by one!",
      },
      {
        type: "funfact",
        title: "Fun Fact!",
        content: "Day and night repeat every 24 hours — that is a loop in nature!",
        visual: "🌙",
        funFact:
          "Seasons loop too: spring, summer, autumn, winter, then it all starts again!",
      },
      {
        type: "interact",
        title: "Spot the loop!",
        content: "Which of these is a loop?",
        options: ["Eat breakfast once", "Blink your eyes", "Jump once", "Stand still"],
        correct: 1,
      },
      {
        type: "quiz",
        title: "Loop quiz!",
        content:
          "The seasons go Spring Summer Autumn Winter then start again. This is a...?",
        options: ["Sequence", "Loop", "Pattern", "Game"],
        correct: 1,
      },
      endGameSlide("penguin"),
    ],
  },
  {
    id: "geo-continents-1",
    subjectId: "geography",
    title: "The 7 Continents",
    description: "The big pieces of land on Earth",
    ageGroup: "4-6",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Our World!",
        content:
          "Earth is covered in land and water. The land is split into 7 continents!",
        character: "elephant",
        visual: "🌍",
        voiceText:
          "Our planet Earth is amazing! The land is split into seven huge pieces called continents!",
      },
      {
        type: "teach",
        title: "Africa",
        content: "Africa is the second biggest continent. Lions and elephants live there!",
        character: "elephant",
        visual: "🦁🐘",
        voiceText:
          "Africa is a huge, warm continent. It is home to lions, elephants, and giraffes!",
      },
      {
        type: "teach",
        title: "Europe",
        content: "Europe is where countries like the UK, France and Turkey are!",
        character: "elephant",
        visual: "🗼🏰",
        voiceText:
          "Europe is a smaller continent with many countries packed together. The UK, France and Turkey are in Europe!",
      },
      {
        type: "teach",
        title: "Asia",
        content: "Asia is the BIGGEST continent! China, Japan and India are in Asia.",
        character: "elephant",
        visual: "🏯🐼",
        voiceText:
          "Asia is the biggest continent on Earth! Countries like China, Japan and India are all in Asia.",
      },
      {
        type: "interact",
        title: "Which continent?",
        content: "Where do pandas live?",
        options: ["Africa", "Europe", "Asia", "Australia"],
        correct: 2,
      },
      {
        type: "quiz",
        title: "Continents quiz!",
        content: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correct: 2,
      },
      endGameSlide("elephant"),
    ],
  },
  {
    id: "geo-oceans-1",
    subjectId: "geography",
    title: "The Oceans",
    description: "The huge bodies of water on Earth",
    ageGroup: "4-6",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "The Oceans!",
        content: "Most of Earth is covered in water! Let's explore the oceans.",
        character: "elephant",
        visual: "🌊",
        voiceText:
          "Did you know most of our planet is covered in water? Let's dive into the oceans!",
      },
      {
        type: "teach",
        title: "The Pacific Ocean",
        content: "The Pacific is the BIGGEST ocean. It covers nearly half the Earth!",
        character: "elephant",
        visual: "🐋",
        voiceText:
          "The Pacific Ocean is so enormous it covers nearly half of our entire planet!",
      },
      {
        type: "story",
        title: "Zara explores the ocean",
        content: "Zara the fish swam from the warm Pacific all the way to the icy Arctic!",
        character: "elephant",
        visual: "🐠",
        voiceText:
          "Zara the rainbow fish loved to explore! She swam through the warm Pacific Ocean all the way to the cold Arctic.",
      },
      {
        type: "funfact",
        title: "Fun Fact!",
        content: "The ocean is so deep that Mount Everest could fit inside with room to spare!",
        visual: "🏔️",
        funFact:
          "More than 80% of the ocean has never been explored by humans — there are still millions of species we have not discovered!",
      },
      {
        type: "quiz",
        title: "Ocean quiz!",
        content: "What is the biggest ocean?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3,
      },
      endGameSlide("elephant"),
    ],
  },
  {
    id: "social-feelings-1",
    subjectId: "social-skills",
    title: "Understanding Feelings",
    description: "Happy, sad, angry and scared",
    ageGroup: "2-4",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      {
        type: "intro",
        title: "Feelings!",
        content: "Everyone has feelings. They're all okay!",
        character: "grandma",
        visual: "😊😢😠",
        voiceText:
          "Everyone has feelings! Happy, sad, angry — they're all normal and okay.",
      },
      {
        type: "teach",
        title: "Feeling happy",
        content: "Happy feels warm and bright inside, like sunshine!",
        character: "grandma",
        visual: "😊",
        voiceText: "Happy feels like sunshine inside your heart! What makes you feel happy?",
      },
      {
        type: "teach",
        title: "Feeling sad",
        content: "Sad is okay too. A hug from a friend can help.",
        character: "grandma",
        visual: "😢",
        voiceText:
          "It's okay to feel sad sometimes. Talking to a friend or having a hug can make it better.",
      },
      {
        type: "interact",
        title: "How does Bunny feel?",
        content: "Bunny dropped their ice cream. How do they feel?",
        options: ["Happy 😊", "Sad 😢", "Excited 🤩", "Angry 😠"],
        correct: 1,
      },
      {
        type: "quiz",
        title: "Feelings quiz!",
        content: "You got a birthday present! How do you feel?",
        options: ["Sad", "Scared", "Happy", "Angry"],
        correct: 2,
      },
      endGameSlide("grandma"),
    ],
  },
  {
    id: "arts-colours-1",
    subjectId: "arts",
    title: "Primary Colours",
    description: "Red, blue and yellow",
    ageGroup: "2-4",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      {
        type: "intro",
        title: "Colours!",
        content: "Three special colours can make ALL other colours!",
        character: "unicorn",
        visual: "🔴🔵🟡",
      },
      {
        type: "teach",
        title: "Red",
        content: "Red is the colour of apples, roses and fire trucks!",
        character: "unicorn",
        visual: "🔴🍎",
        voiceText: "Red is a bold, exciting colour! Apples, roses and fire trucks are all red!",
      },
      {
        type: "teach",
        title: "Blue + Yellow = Green",
        content: "Mix blue and yellow paint together — you get GREEN!",
        character: "unicorn",
        visual: "🔵+🟡=🟢",
        voiceText: "Magic! When you mix blue and yellow together you get green!",
      },
      {
        type: "interact",
        title: "What colour?",
        content: "Tap the red thing!",
        options: ["🔵", "🟡", "🔴", "🟢"],
        correct: 2,
      },
      {
        type: "quiz",
        title: "Colour quiz!",
        content: "Blue + Yellow makes which colour?",
        options: ["Red", "Purple", "Orange", "Green"],
        correct: 3,
      },
      endGameSlide("unicorn"),
    ],
  },
  {
    id: "motor-balance-1",
    subjectId: "motor-skills",
    title: "Balance Like a Flamingo",
    description: "Stand on one foot and stay steady",
    ageGroup: "2-4",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      {
        type: "intro",
        title: "Balance time!",
        content: "Let's practise standing tall and steady!",
        character: "frog",
        visual: "🦩",
        voiceText: "Today we practise balance! Can you stand on one foot?",
      },
      {
        type: "teach",
        title: "Stand tall",
        content: "Feet apart, arms out wide, like an aeroplane!",
        character: "frog",
        visual: "✈️",
        voiceText: "Spread your feet apart and stretch your arms wide like an aeroplane!",
      },
      {
        type: "story",
        title: "Monkey on a branch",
        content: "Monkey balanced on a tree branch. Slow breaths help!",
        character: "frog",
        visual: "🌳",
        voiceText: "Monkey took a deep breath and balanced perfectly on the branch!",
      },
      {
        type: "experiment",
        title: "Balance challenge!",
        content: "How long can you stand on one leg? Try with eyes open then closed!",
        experiment: {
          title: "Balance Test",
          materials: ["Just your body!"],
          steps: [
            "Stand on one leg with eyes open",
            "Count how many seconds",
            "Now try with eyes closed — much harder!",
            "Why is it harder? Your eyes help your balance!",
          ],
        },
      },
      {
        type: "funfact",
        title: "Fun Fact!",
        content:
          "Flamingos sleep standing on one leg — scientists think it uses less energy than standing on two!",
        visual: "🦩",
        funFact:
          "The inner ear contains tiny fluid-filled canals that help you balance. When the fluid moves, your brain knows which direction you're tilting!",
      },
      {
        type: "quiz",
        title: "Balance quiz!",
        content: "Which three things help you balance?",
        options: [
          "Hands, feet, back",
          "Eyes, ears, muscles",
          "Nose, mouth, skin",
          "Arms, legs, hair",
        ],
        correct: 1,
      },
      endGameSlide("frog"),
    ],
  },
];

export const LESSONS: Lesson[] = [...CORE_LESSONS, ...EXPANDED_LESSONS];

export function getLessonsForSubject(subjectId: string): Lesson[] {
  return LESSONS.filter((l) => l.subjectId === subjectId);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === lessonId);
}

export function lessonCountForSubject(subjectId: string): number {
  return getLessonsForSubject(subjectId).length;
}
