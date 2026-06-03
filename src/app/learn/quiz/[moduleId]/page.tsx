import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageQuiz } from "@/components/learn/LanguageQuiz";
import { SubjectQuiz } from "@/components/learn/SubjectQuiz";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { getLearningModule } from "@/lib/learn-nav";
import { getModuleQuiz, isValidQuizModule } from "@/lib/quizzes";

interface QuizPageProps {
  params: Promise<{ moduleId: string }>;
}

export function generateStaticParams() {
  return LEARNING_MODULES.map((mod) => ({ moduleId: mod.id }));
}

export default async function ModuleQuizPage({ params }: QuizPageProps) {
  const { moduleId } = await params;

  if (!isValidQuizModule(moduleId)) {
    notFound();
  }

  const mod = getLearningModule(moduleId);

  if (!mod) {
    notFound();
  }

  if (moduleId === "language") {
    return (
      <PageShell>
        <Link
          href="/learn/language"
          className="text-sm font-semibold text-violet-600 hover:text-violet-800"
        >
          ← Language lab
        </Link>

        <div className={`mt-4 rounded-3xl bg-gradient-to-br ${mod.color} p-6 text-white shadow-lg`}>
          <span className="text-4xl" aria-hidden>
            📝
          </span>
          <h1 className="font-display mt-2 text-3xl font-extrabold">Word Match Quiz</h1>
          <p className="mt-2 text-white/95">
            Uses the language you picked — questions and answers in that language, not just
            Turkish or English.
          </p>
          <p className="mt-2 text-sm font-semibold text-white/80">
            5 questions · 10 XP per right · +15 perfect bonus
          </p>
        </div>

        <div className="mt-8">
          <LanguageQuiz />
        </div>
      </PageShell>
    );
  }

  const quiz = getModuleQuiz(moduleId);
  if (!quiz) {
    notFound();
  }

  return (
    <PageShell>
      <Link
        href={`/learn/${moduleId}`}
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← {mod.title}
      </Link>

      <div className={`mt-4 rounded-3xl bg-gradient-to-br ${mod.color} p-6 text-white shadow-lg`}>
        <span className="text-4xl" aria-hidden>
          📝
        </span>
        <h1 className="font-display mt-2 text-3xl font-extrabold">{quiz.title}</h1>
        <p className="mt-2 text-white/95">{quiz.subtitle}</p>
        <p className="mt-2 text-sm font-semibold text-white/80">
          {quiz.questions.length} questions · 10 XP per right · +15 perfect bonus · counts on
          leaderboard
        </p>
      </div>

      <div className="mt-8">
        <SubjectQuiz quiz={quiz} moduleTitle={mod.title} moduleEmoji={mod.emoji} />
      </div>
    </PageShell>
  );
}
