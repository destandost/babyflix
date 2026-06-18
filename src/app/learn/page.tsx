import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";
<<<<<<< Updated upstream
import { LEARNING_MODULES } from "@/lib/features";
=======
import { getChildAge } from "@/lib/child-profile";
import { getSubjectHref } from "@/lib/learn-data";
import { getRecommendationsForAge, type RecommendableSubject } from "@/lib/recommendations";
import {
  getStreak,
  getSubjectProgress,
  getTotalCoins,
  getTotalXP,
  type SubjectProgress,
} from "@/lib/rewards";
import { lessonCountForSubject } from "@/lib/lessons-data";
>>>>>>> Stashed changes

function SubjectCard({
  subject,
  prog,
}: {
  subject: RecommendableSubject;
  prog: SubjectProgress;
}) {
  const total = lessonCountForSubject(subject.id) || subject.totalLessons;
  const completed = prog.completedLessonIds.length;
  const pct = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  return (
    <Link
      href={getSubjectHref(subject.id)}
      className="relative block overflow-hidden rounded-[22px] p-4 text-left transition-transform active:scale-[0.96]"
      style={{ background: subject.gradient, boxShadow: subject.shadow }}
    >
      <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full bg-white/10" />
      <div className="relative z-10">
        <Character id={subject.character} size={56} className="mb-2" />
        <div className="font-display text-[15px] text-white">{subject.name}</div>
        <div className="mt-0.5 text-[10px] font-semibold leading-tight text-white/70">
          {subject.description}
        </div>
        <span className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-[8px] font-black text-white">
          Ages {subject.minAge}–{subject.maxAge}
        </span>
        <div className="mt-3">
          <div className="mb-1 flex justify-between">
            <span className="text-[9px] font-bold text-white/70">
              {completed}/{total} lessons
            </span>
            <span className="text-[9px] font-bold text-white/70">{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
            <div
              className="h-full rounded-full bg-white transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function LearnPage() {
<<<<<<< Updated upstream
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        📚 Learning via Games
      </h1>
      <p className="mt-2 max-w-2xl text-violet-700">
        Structured modules from your feature list: math, language, alphabet,
        social skills, arts, and motor skills.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_MODULES.map((mod) => (
          <FeatureCard
            key={mod.id}
            href={`/learn/${mod.id}`}
            title={mod.title}
            description={mod.description}
            emoji={mod.emoji}
            color={mod.color}
          />
        ))}
=======
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [progress, setProgress] = useState<Record<string, SubjectProgress>>({});
  const [childAge, setChildAge] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<RecommendableSubject[]>([]);

  useEffect(() => {
    const s = getStreak();
    setStreak(s.currentStreak);
    setTotalXP(getTotalXP());
    setTotalCoins(getTotalCoins());

    const age = getChildAge();
    setChildAge(age);
    if (age === null) return;

    const rec = getRecommendationsForAge(age);
    setSubjects(rec.subjects);

    const p: Record<string, SubjectProgress> = {};
    rec.subjects.forEach((sub) => {
      p[sub.id] = getSubjectProgress(sub.id);
    });
    setProgress(p);
  }, []);

  return (
    <PageShell>
      <div className="bg-brand-off pb-6">
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <div>
            <h1 className="font-display text-3xl text-brand-text">Learn Hub</h1>
            <p className="text-sm font-semibold text-brand-muted">
              {childAge !== null
                ? `Lessons for age ${childAge} only`
                : "Pick a subject and start!"}
            </p>
            {childAge !== null && (
              <Link
                href="/welcome?edit=1"
                className="text-xs font-black text-brand-purple"
              >
                Change age →
              </Link>
            )}
          </div>
          <Link
            href="/learn/badges"
            className="rounded-full bg-brand-yellow px-4 py-2 text-sm font-black text-yellow-900 shadow-sm"
          >
            🏆 Badges
          </Link>
        </div>

        <div className="mx-4 mb-4 mt-3 grid grid-cols-3 gap-2.5">
          <div className="rounded-[18px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-2xl text-orange-500">🔥 {streak}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">Day Streak</div>
          </div>
          <div className="rounded-[18px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-2xl text-brand-purple">{totalXP}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">Learn XP</div>
          </div>
          <div className="rounded-[18px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-2xl text-yellow-600">🪙 {totalCoins}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">Coins</div>
          </div>
        </div>

        {streak > 0 && (
          <div
            className="mx-4 mb-4 flex items-center gap-3 rounded-[20px] p-4"
            style={{ background: "linear-gradient(135deg, #FF6B4A, #FFD600)" }}
          >
            <span className="text-4xl">🔥</span>
            <div>
              <div className="font-display text-lg text-white">{streak} Day Streak!</div>
              <div className="text-xs font-semibold text-white/80">Keep coming back every day!</div>
            </div>
          </div>
        )}

        {subjects.length === 0 && childAge !== null ? (
          <div className="mx-4 rounded-3xl border-2 border-brand-border bg-white p-6 text-center">
            <p className="font-display text-base text-brand-text">No lessons for this age yet</p>
            <p className="mt-2 text-sm font-semibold text-brand-muted">
              Update your child&apos;s age to unlock subjects.
            </p>
            <Link
              href="/welcome?edit=1"
              className="btn-primary mt-4 inline-block px-6 py-3 text-sm"
            >
              Update age
            </Link>
          </div>
        ) : (
          <div className="px-4">
            <div className="grid grid-cols-2 gap-3 pb-2">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  prog={
                    progress[subject.id] ?? {
                      lessonsCompleted: 0,
                      completedLessonIds: [],
                      xp: 0,
                      coins: 0,
                      quizzesPassed: 0,
                      badges: [],
                    }
                  }
                />
              ))}
            </div>
          </div>
        )}
>>>>>>> Stashed changes
      </div>
    </PageShell>
  );
}
