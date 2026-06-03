import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const LETTERS = [
  { letter: "A", sound: "ah", word: "apple", emoji: "🍎" },
  { letter: "B", sound: "buh", word: "ball", emoji: "⚽" },
  { letter: "C", sound: "kuh", word: "cat", emoji: "🐱" },
  { letter: "D", sound: "duh", word: "dog", emoji: "🐶" },
  { letter: "E", sound: "eh", word: "egg", emoji: "🥚" },
  { letter: "F", sound: "fuh", word: "fish", emoji: "🐟" },
];

export default function LetterSoundsLessonPage() {
  return (
    <PageShell>
      <Link
        href="/learn/alphabet"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← Alphabet lessons
      </Link>

      <article className="mt-4 rounded-3xl bg-white p-6 shadow-lg ring-2 ring-amber-100 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-amber-600">
          Lesson 1 · Study mode
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-violet-900">
          🔤 Letter sounds A–F
        </h1>
        <p className="mt-3 text-lg text-violet-700">
          Say the letter, then the sound, then the word. A grown-up can help with
          tricky sounds.
        </p>

        <ul className="mt-8 space-y-3">
          {LETTERS.map((item) => (
            <li
              key={item.letter}
              className="flex items-center gap-4 rounded-2xl bg-amber-50 px-5 py-4"
            >
              <span className="font-display text-4xl font-extrabold text-amber-700">
                {item.letter}
              </span>
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <div>
                <p className="font-display text-lg font-bold text-violet-900">
                  {item.word}
                </p>
                <p className="text-sm text-violet-600">Sounds like “{item.sound}”</p>
              </div>
            </li>
          ))}
        </ul>
      </article>

      <section className="mt-8 rounded-2xl border-4 border-dashed border-amber-200 bg-amber-50 p-5">
        <p className="font-display font-bold text-amber-900">Ready for the quiz?</p>
        <p className="mt-1 text-sm text-amber-800">
          Try the Letter Quiz when you know A–F sounds.
        </p>
        <Link
          href="/learn/quiz/alphabet"
          className="mt-3 inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-3 font-display font-bold text-white"
        >
          Letter Quiz →
        </Link>
      </section>
    </PageShell>
  );
}
