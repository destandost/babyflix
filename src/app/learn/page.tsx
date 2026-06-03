import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { learnModuleCardBlurb, getLearnModuleHref } from "@/lib/learn-nav";

export default function LearnPage() {
  return (
    <PageShell>
      <div className="rounded-3xl bg-gradient-to-br from-teal-400 to-cyan-600 px-6 py-8 text-white shadow-lg sm:px-8">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">📚 Learn</h1>
        <p className="mt-2 max-w-xl text-teal-50">
          Calm study path — activities, lessons, and quizzes. Everything here earns XP on the
          leaderboard.
        </p>
      </div>

      <section className="mt-8">
        <h2 className="font-display text-xl font-bold text-violet-900">Subjects</h2>
        <p className="mt-1 text-sm text-violet-600">
          Pick a subject for activities and a subject quiz.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEARNING_MODULES.map((mod) => {
            const blurb = learnModuleCardBlurb(mod.id);
            return (
              <li key={mod.id}>
                <Link
                  href={getLearnModuleHref(mod.id)}
                  className={`group flex min-h-[148px] flex-col justify-between rounded-3xl bg-gradient-to-br ${mod.color} p-5 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:min-h-[168px] sm:p-6`}
                >
                  <span className="text-4xl sm:text-5xl" aria-hidden>
                    {mod.emoji}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold sm:text-2xl">{mod.title}</h2>
                    <p className="mt-1 text-sm font-medium text-white/90">{mod.description}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-white/75">
                      {blurb}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl bg-violet-50 px-5 py-4 text-center">
        <p className="text-sm text-violet-700">
          <span className="font-display font-bold text-violet-900">Language lab</span> has 28+
          languages and a word library with audio.
        </p>
        <Link
          href="/learn/language"
          className="mt-2 inline-block font-display text-sm font-bold text-teal-600 hover:text-teal-800"
        >
          Open language lab →
        </Link>
      </section>
    </PageShell>
  );
}
