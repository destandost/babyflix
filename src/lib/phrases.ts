export interface Phrase {
  id: string;
  emoji: string;
  english: string;
}

export const PHRASES: Phrase[] = [
  { id: "hello", emoji: "👋", english: "Hello" },
  { id: "goodbye", emoji: "👋", english: "Goodbye" },
  { id: "thanks", emoji: "🙏", english: "Thank you" },
  { id: "please", emoji: "💜", english: "Please" },
  { id: "yes", emoji: "✅", english: "Yes" },
  { id: "no", emoji: "❌", english: "No" },
  { id: "one", emoji: "1️⃣", english: "One" },
  { id: "two", emoji: "2️⃣", english: "Two" },
  { id: "three", emoji: "3️⃣", english: "Three" },
  { id: "cat", emoji: "🐱", english: "Cat" },
  { id: "dog", emoji: "🐶", english: "Dog" },
  { id: "bird", emoji: "🐦", english: "Bird" },
  { id: "water", emoji: "💧", english: "Water" },
  { id: "apple", emoji: "🍎", english: "Apple" },
  { id: "mom", emoji: "👩", english: "Mom" },
  { id: "dad", emoji: "👨", english: "Dad" },
  { id: "red", emoji: "🔴", english: "Red" },
  { id: "blue", emoji: "🔵", english: "Blue" },
  { id: "friend", emoji: "🤝", english: "Friend" },
  { id: "night", emoji: "🌙", english: "Good night" },
  { id: "love", emoji: "❤️", english: "Love" },
  { id: "house", emoji: "🏠", english: "House" },
];

export const PHRASE_COUNT = PHRASES.length;

export type PhraseId = (typeof PHRASES)[number]["id"];
