import type { Lesson } from "../lessons-data";

export const ALPHABET_LESSONS: Lesson[] = [
  {
    id: "alpha-def-1",
    subjectId: "alphabet",
    ageGroup: "2-4",
    title: "Letters D, E, F",
    description: "Three more letters",
    coinsReward: 10,
    xpReward: 15,
    slides: [
      { type: "intro", title: "D, E, F!", content: "Three more letters to learn today!", character: "boy", visual: "DEF" },
      { type: "teach", title: "D is for Dog", content: "D makes a DUH sound! DUH DUH Dog!", character: "boy", visual: "🐶", voiceText: "D is for Dog! The letter D makes the DUH sound. DUH! Dog starts with DUH!" },
      { type: "teach", title: "E is for Elephant", content: "E makes an EH sound! EH EH Elephant!", character: "boy", visual: "🐘", voiceText: "E is for Elephant! The letter E makes an EH sound. EH! Elephant starts with E!" },
      { type: "teach", title: "F is for Fox", content: "F makes an FFF sound! FFF FFF Fox!", character: "boy", visual: "🦊", voiceText: "F is for Fox! The letter F makes an FFF sound like blowing. FFF! Fox starts with F!" },
      { type: "interact", title: "Dog starts with...?", content: "Which letter does DOG start with?", options: ["E", "D", "F", "G"], correct: 1 },
      { type: "quiz", title: "Letter quiz!", content: "Which word starts with F?", options: ["Dog", "Elephant", "Fox", "Apple"], correct: 2 },
    ],
  },
  {
    id: "alpha-phonics-1",
    subjectId: "alphabet",
    ageGroup: "4-6",
    title: "Phonics: Blending",
    description: "Blend sounds to read words",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "Blending Sounds!", content: "Blending means pushing sounds together to make a word!", character: "boy", visual: "🔡" },
      { type: "teach", title: "C-A-T = CAT!", content: "Say each sound slowly then push them together: C... A... T... CAT!", character: "boy", visual: "🐱", voiceText: "When we blend sounds we say them slowly then push them together. C... A... T... CAT! You just read a word!" },
      { type: "teach", title: "D-O-G = DOG!", content: "D... O... G... push them together... DOG!", character: "boy", visual: "🐶", voiceText: "Try this one! D... O... G... push it together... DOG! You're reading!" },
      { type: "experiment", title: "Blending game!", content: "Ask a grown-up to say sounds slowly and you blend them into words!", experiment: { title: "Sound Blending", materials: ["A grown-up to help"], steps: ["Ask the grown-up to say S... U... N slowly", "Blend the sounds together in your head", "What word is it? SUN!", "Try: C-A-P, B-I-G, H-O-T"] } },
      { type: "quiz", title: "Blending quiz!", content: "What word do these sounds make? H-E-N", options: ["Hat", "Hen", "Hot", "Her"], correct: 1 },
    ],
  },
  {
    id: "alpha-vowels-1",
    subjectId: "alphabet",
    ageGroup: "4-6",
    title: "Vowels A E I O U",
    description: "The five special letters",
    coinsReward: 15,
    xpReward: 20,
    slides: [
      { type: "intro", title: "The Vowels!", content: "A, E, I, O, U are special letters called vowels — every word needs at least one!", character: "boy", visual: "AEIOU" },
      { type: "teach", title: "What makes vowels special?", content: "Every single word in English contains at least one vowel!", character: "boy", visual: "⭐", voiceText: "Vowels are the most important letters because every word needs at least one! A, E, I, O, U — learn these and you can read anything!" },
      { type: "funfact", title: "Fun Fact!", content: 'The longest common English word with only one vowel is "STRENGTHS" — 9 letters and just one E!', visual: "💪", funFact: 'Some languages have words with NO vowels! In Welsh, "crwth" (a type of fiddle) has no standard vowels at all!' },
      { type: "interact", title: "Find the vowel!", content: "Which of these is a vowel?", options: ["B", "C", "I", "T"], correct: 2 },
      { type: "quiz", title: "Vowel quiz!", content: "How many vowels are in the word APPLE?", options: ["1", "2", "3", "4"], correct: 1 },
    ],
  },
];
