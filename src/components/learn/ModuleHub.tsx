import Link from "next/link";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { SUBJECT_UI } from "@/lib/ui-catalog";
import {
  getLearnActivities,
  getLearningModule,
  getLockedLessons,
} from "@/lib/learn-nav";
import { getModuleQuiz, getQuizHref } from "@/lib/quizzes";

interface ModuleHubProps {
  moduleId: string;
}

export function ModuleHub({ moduleId }: ModuleHubProps) {
  const mod = getLearningModule(moduleId);
  if (!mod) return null;

  const activities = getLearnActivities(moduleId);
  const locked = getLockedLessons(moduleId);
  const quiz = getModuleQuiz(moduleId);
  const ui = SUBJECT_UI[moduleId];

  return (
    <PageShell>
      <Link
        href="/learn"
        className="mx-4 text-sm font-black text-brand-purple"
      >
        ← Learn
      </Link>

      <div
        className="relative mx-4 mt-4 overflow-hidden rounded-4xl p-6 text-white sm:p-8"
        style={
          ui
            ? { background: ui.gradient, boxShadow: ui.shadow }
            : undefined
        }
      >
        {ui && <Character id={ui.character} size={72} className="mb-3" />}
        <h1 className="font-display text-3xl font-extrabold">{mod.title}</h1>
        <p className="mt-2 max-w-xl text-white/95">{mod.description}</p>
        <p className="mt-3 text-sm font-semibold text-white/80">
          {activities.length > 0
            ? `${activities.length} activit${activities.length === 1 ? "y" : "ies"} · quiz · study path`
            : quiz
              ? "Quiz ready · more activities coming soon"
              : "More coming soon"}
        </p>
      </div>

      {quiz && (
        <section className="mt-8">
          <Link
            href={getQuizHref(moduleId)}
            className="flex gap-4 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-6 text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl"
          >
            <span className="text-5xl" aria-hidden>
              📝
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-extrabold">{quiz.title}</p>
              <p className="mt-1 text-sm text-white/95">{quiz.subtitle}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-amber-100">
                {moduleId === "language"
                  ? "5 questions in your language"
                  : `${quiz.questions.length} questions`}{" "}
                · XP counts on leaderboard →
              </p>
            </div>
          </Link>
        </section>
      )}

      {activities.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-bold text-violet-900">Activities</h2>
          <ul className="mt-4 space-y-3">
            {activities.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={lesson.href!}
                  className="flex gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-violet-100 transition hover:ring-violet-300"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-violet-900">{lesson.title}</p>
                    <p className="text-sm text-violet-600">{lesson.description}</p>
                    {lesson.duration && (
                      <p className="mt-1 text-xs font-semibold text-violet-400">
                        {lesson.duration}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 self-center text-sm font-semibold text-teal-600">
                    Start →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {locked.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-violet-400">Coming soon</h2>
          <ul className="mt-3 space-y-2">
            {locked.map((lesson) => (
              <li
                key={lesson.id}
                className="rounded-xl bg-violet-50/80 px-4 py-3 text-sm text-violet-500"
              >
                <span className="font-display font-bold">{lesson.title}</span>
                <span className="text-violet-400"> · 🔒</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {activities.length === 0 && !quiz && (
        <p className="mt-8 rounded-2xl bg-violet-50 px-5 py-4 text-center text-violet-600">
          New activities are on the way. Check back soon!
        </p>
      )}
    </PageShell>
  );
}
