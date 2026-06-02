import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { LEARNING_MODULES } from "@/lib/features";

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

  const lessons = [
    { title: "Warm-up", status: "ready" as const },
    { title: "Level 1", status: "ready" as const },
    { title: "Level 2", status: "locked" as const },
    { title: "Challenge", status: "locked" as const },
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

      <PlaceholderBanner
        title="Lessons & games"
        message="Add quizzes, drag-and-drop, and motor activities per level here."
      />

      <ul className="mt-6 space-y-3">
        {lessons.map((lesson, i) => (
          <li
            key={lesson.title}
            className={`flex items-center justify-between rounded-2xl px-5 py-4 shadow-sm ring-1 ${
              lesson.status === "ready"
                ? "bg-white ring-violet-100"
                : "bg-violet-50/50 ring-violet-100 opacity-70"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-display font-bold text-violet-800">
                {i + 1}
              </span>
              <span className="font-display font-bold text-violet-900">
                {lesson.title}
              </span>
            </div>
            <span className="text-sm font-semibold text-violet-600">
              {lesson.status === "ready" ? "Start" : "🔒 Locked"}
            </span>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
