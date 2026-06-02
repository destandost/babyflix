import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { LEARNING_MODULES } from "@/lib/features";
import { MINI_GAMES } from "@/lib/games";

interface ModulePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LEARNING_MODULES.map((mod) => ({ slug: mod.id }));
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { slug } = await params;
  const mod = LEARNING_MODULES.find((m) => m.id === slug);

  if (!mod) {
    notFound();
  }

  type Lesson = {
    title: string;
    status: "ready" | "locked";
    href?: string;
    badge?: string;
  };

  const mathGame = MINI_GAMES.find((g) => g.moduleId === "math");

  const lessons: Lesson[] =
    slug === "math"
      ? [
          {
            title: "Count the Stars",
            status: "ready",
            href: mathGame?.href,
            badge: "HARD",
          },
          { title: "Level 1", status: "locked" },
          { title: "Level 2", status: "locked" },
          { title: "Challenge", status: "locked" },
        ]
      : [
          { title: "Warm-up", status: "locked" },
          { title: "Level 1", status: "locked" },
          { title: "Level 2", status: "locked" },
          { title: "Challenge", status: "locked" },
        ];

  return (
    <PageShell>
      <Link
        href="/learn"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← All modules
      </Link>

      <div
        className={`mt-4 rounded-3xl bg-gradient-to-br ${mod.color} p-6 text-white shadow-lg sm:p-8`}
      >
        <span className="text-5xl" aria-hidden>
          {mod.emoji}
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">{mod.title}</h1>
        <p className="mt-2 max-w-xl text-white/95">{mod.description}</p>
      </div>

      {slug !== "math" && (
        <PlaceholderBanner
          title="Lessons & games"
          message="Add quizzes, drag-and-drop, and motor activities per level here."
        />
      )}

      <ul className="mt-6 space-y-3">
        {lessons.map((lesson, i) => {
          const row = (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-display font-bold text-violet-800">
                  {i + 1}
                </span>
                <span className="font-display font-bold text-violet-900">
                  {lesson.title}
                </span>
                {lesson.badge && (
                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-700">
                    {lesson.badge}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold text-violet-600">
                {lesson.status === "ready" ? "Play →" : "🔒 Locked"}
              </span>
            </>
          );

          const className = `flex items-center justify-between rounded-2xl px-5 py-4 shadow-sm ring-1 ${
            lesson.status === "ready"
              ? "bg-white ring-violet-100"
              : "bg-violet-50/50 ring-violet-100 opacity-70"
          }`;

          if (lesson.href && lesson.status === "ready") {
            return (
              <li key={lesson.title}>
                <Link href={lesson.href} className={`${className} block transition hover:ring-violet-300`}>
                  {row}
                </Link>
              </li>
            );
          }

          return (
            <li key={lesson.title} className={className}>
              {row}
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
