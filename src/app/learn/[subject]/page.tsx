"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { getLearnActivities } from "@/lib/learn-nav";
import { getSubject, getSubjectHref, type SubjectId } from "@/lib/learn-data";
import { getLessonsForSubject, lessonCountForSubject } from "@/lib/lessons-data";
import { getSubjectProgress, type SubjectProgress } from "@/lib/rewards";

const RESERVED = new Set(["language", "quiz", "badges"]);

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject as string;
  const subjectData = getSubject(subjectId);
  const lessons = getLessonsForSubject(subjectId);
  const activities = getLearnActivities(subjectId);
  const [progress, setProgress] = useState<SubjectProgress | null>(null);

  useEffect(() => {
    if (RESERVED.has(subjectId)) {
      router.replace(getSubjectHref(subjectId as SubjectId));
      return;
    }
    setProgress(getSubjectProgress(subjectId));
  }, [subjectId, router]);

  if (RESERVED.has(subjectId)) {
    return null;
  }

  if (!subjectData) {
    return (
      <PageShell>
        <div className="p-8 text-center">
          <p className="font-display text-brand-text">Subject not found</p>
          <Link href="/learn" className="mt-4 text-brand-purple">
            ← Learn Hub
          </Link>
        </div>
      </PageShell>
    );
  }

  const lessonTotal = lessonCountForSubject(subjectId) || lessons.length;
  const completedIds = progress?.completedLessonIds ?? [];
  const pct =
    lessonTotal > 0
      ? Math.min(100, Math.round((completedIds.length / lessonTotal) * 100))
      : 0;

  return (
    <PageShell className="!pt-0">
      <div className="min-h-screen bg-brand-off pb-8">
        <div className="relative overflow-hidden" style={{ background: subjectData.gradient, minHeight: 200 }}>
          <button
            type="button"
            onClick={() => router.push("/learn")}
            className="absolute left-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-[14px] bg-white/20 text-lg font-bold text-white backdrop-blur active:scale-90"
          >
            ←
          </button>
          <div className="absolute bottom-0 right-4">
            <Character id={subjectData.character} size={120} animate />
          </div>
          <div className="relative z-10 px-5 pb-8 pt-16">
            <div className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-black text-white">
              {subjectData.icon} {subjectData.name}
            </div>
            <h1 className="font-display mb-1 text-3xl text-white">{subjectData.name}</h1>
            <p className="mb-4 text-sm font-semibold text-white/80">{subjectData.description}</p>
            <div className="flex items-center gap-2 pr-28">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-white transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-xs font-bold text-white/90">
                {progress?.xp ?? 0} XP
              </span>
            </div>
          </div>
        </div>

        <div className="mx-4 my-4 grid grid-cols-3 gap-2.5">
          <div className="rounded-[16px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-xl" style={{ color: subjectData.color }}>
              {completedIds.length}
            </div>
            <div className="text-[10px] font-semibold text-brand-muted">Lessons</div>
          </div>
          <div className="rounded-[16px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-xl" style={{ color: subjectData.color }}>
              {progress?.xp ?? 0}
            </div>
            <div className="text-[10px] font-semibold text-brand-muted">XP</div>
          </div>
          <div className="rounded-[16px] border border-brand-border bg-white p-3 text-center">
            <div className="font-display text-xl" style={{ color: subjectData.color }}>
              🪙 {progress?.coins ?? 0}
            </div>
            <div className="text-[10px] font-semibold text-brand-muted">Coins</div>
          </div>
        </div>

        <div className="px-4">
            <h2 className="font-display mb-3 text-xl text-brand-text">Lessons</h2>
            {lessons.length === 0 ? (
              <p className="text-sm font-semibold text-brand-muted">New lessons coming soon!</p>
            ) : (
              <div className="flex flex-col gap-3">
                {lessons.map((lesson, i) => {
                  const done = completedIds.includes(lesson.id);
                  const current =
                    !done &&
                    (i === 0 || completedIds.includes(lessons[i - 1]?.id ?? ""));
                  const locked =
                    !done &&
                    i > 0 &&
                    !completedIds.includes(lessons[i - 1]?.id ?? "");
                  return (
                    <Link
                      key={lesson.id}
                      href={locked ? "#" : `/learn/${subjectId}/${lesson.id}`}
                      onClick={(e) => locked && e.preventDefault()}
                      className={`flex items-center gap-4 rounded-[20px] border-[2.5px] bg-white p-4 transition-all active:scale-[0.98] ${
                        done
                          ? "border-brand-teal bg-teal-50"
                          : current
                            ? "border-brand-purple"
                            : "border-brand-border opacity-60"
                      }`}
                      style={current ? { borderColor: subjectData.color } : undefined}
                    >
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display text-lg ${
                          done
                            ? "bg-brand-teal text-white"
                            : current
                              ? "text-white"
                              : "bg-brand-off text-[#C0C0D8]"
                        }`}
                        style={current ? { background: subjectData.gradient } : undefined}
                      >
                        {done ? "✓" : locked ? "🔒" : i + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-display text-[15px] text-brand-text">
                          {lesson.title}
                        </div>
                        <div className="mt-0.5 text-xs font-semibold text-brand-muted">
                          {lesson.description}
                        </div>
                        <div className="mt-1.5 flex gap-3">
                          <span className="text-[10px] font-black text-yellow-600">
                            🪙 +{lesson.coinsReward}
                          </span>
                          <span className="text-[10px] font-black text-brand-purple">
                            ⭐ +{lesson.xpReward} XP
                          </span>
                        </div>
                      </div>
                      {!locked && <span className="text-xl font-bold text-[#D0D0E8]">→</span>}
                    </Link>
                  );
                })}
              </div>
            )}
            {LEARNING_MODULES.some((m) => m.id === subjectId) && (
              <Link
                href={`/learn/quiz/${subjectId}`}
                className="mt-4 flex items-center justify-between rounded-[20px] border-2 border-brand-border bg-white p-4 active:scale-[0.98]"
              >
                <div>
                  <div className="font-display text-brand-text">Subject Quiz</div>
                  <div className="text-xs font-semibold text-brand-muted">Earn bonus XP</div>
                </div>
                <span className="text-xl">📝</span>
              </Link>
            )}
            {activities.length > 0 && (
              <>
                <h2 className="font-display mb-3 mt-6 text-xl text-brand-text">Activities</h2>
                <div className="flex flex-col gap-2">
                  {activities.map((act) => (
                    <Link
                      key={act.id}
                      href={act.href ?? `/learn/${subjectId}`}
                      className="flex items-center justify-between rounded-[18px] border border-brand-border bg-white p-4 active:scale-[0.98]"
                    >
                      <div>
                        <div className="font-display text-sm text-brand-text">{act.title}</div>
                        <div className="text-xs text-brand-muted">{act.description}</div>
                      </div>
                      <span className="text-brand-muted">→</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
      </div>
    </PageShell>
  );
}
