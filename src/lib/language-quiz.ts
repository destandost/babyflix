import type { LanguageDefinition } from "./languages";
import { getPhraseEntries } from "./language-vocabulary";
import type { QuizQuestion } from "./quizzes";

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** Builds a quiz in the learner's chosen language (not English). */
export function buildLanguageQuizQuestions(
  language: LanguageDefinition,
  count = 5,
): QuizQuestion[] {
  const entries = getPhraseEntries(language);
  if (entries.length < 3) return [];

  const picked = shuffle(entries).slice(0, Math.min(count, entries.length));

  return picked.map((entry, index) => {
    const wrong = shuffle(entries.filter((e) => e.phrase.id !== entry.phrase.id)).slice(0, 2);
    const options = shuffle([
      { id: entry.word, label: entry.word },
      ...wrong.map((w) => ({ id: w.word, label: w.word })),
    ]);

    return {
      id: `lang-${language.id}-${entry.phrase.id}-${index}`,
      prompt: `What is “${entry.phrase.english}” in ${language.name}?`,
      sceneEmoji: entry.phrase.emoji,
      options,
      correctId: entry.word,
    };
  });
}
