import Link from "next/link";
import { PageShell } from "@/components/PageShell";

const NUMBERS = [
  { n: 1, emoji: "🌙" },
  { n: 2, emoji: "🐥" },
  { n: 3, emoji: "🎈" },
  { n: 4, emoji: "🧸" },
  { n: 5, emoji: "⭐" },
];

export default function CountingLessonPage() {
  return (
    <PageShell>
      <Link
        href="/learn/math"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← Math lessons
      </Link>

      <article className="mt-4 rounded-3xl bg-white p-6 shadow-lg ring-2 ring-sky-100 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-600">
          Lesson 1 · Study mode
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold text-violet-900">
          🔢 Counting 1–5
        </h1>
        <p className="mt-3 text-lg text-violet-700">
          Point to each picture and say the number out loud. Take your time — no
          timer in lessons!
        </p>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {NUMBERS.map(({ n, emoji }) => (
            <li
              key={n}
              className="flex items-center gap-4 rounded-2xl bg-sky-50 px-5 py-4"
            >
              <span className="font-display text-4xl font-extrabold text-sky-600">
                {n}
              </span>
              <span className="text-4xl" aria-hidden>
                {emoji.repeat(Math.min(n, 3))}
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-8 rounded-xl bg-teal-50 px-4 py-3 text-teal-800">
          <strong>Try it:</strong> Count five things in your room — books, toes,
          or stuffed animals!
        </p>
      </article>

      <section className="mt-8 rounded-2xl border-4 border-dashed border-amber-200 bg-amber-50 p-5">
        <p className="font-display font-bold text-amber-900">Ready for the quiz?</p>
        <p className="mt-1 text-sm text-amber-800">
          Test your counting with the Math quiz — earn XP on the leaderboard.
        </p>
        <Link
          href="/learn/quiz/math"
          className="mt-3 inline-block rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-3 font-display font-bold text-white"
        >
          Number Check quiz →
        </Link>
      </section>
    </PageShell>
  );
}
