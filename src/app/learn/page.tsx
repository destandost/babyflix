"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { getSubjectHref, SUBJECTS } from "@/lib/learn-data";
import {
  getStreak,
  getSubjectProgress,
  getTotalCoins,
  getTotalXP,
  type SubjectProgress,
} from "@/lib/rewards";
import { lessonCountForSubject } from "@/lib/lessons-data";

export default function LearnPage() {
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [progress, setProgress] = useState<Record<string, SubjectProgress>>({});

  useEffect(() => {
    const s = getStreak();
    setStreak(s.currentStreak);
    setTotalXP(getTotalXP());
    setTotalCoins(getTotalCoins());
    const p: Record<string, SubjectProgress> = {};
    SUBJECTS.forEach((sub) => {
      p[sub.id] = getSubjectProgress(sub.id);
    });
    setProgress(p);
  }, []);

  return (
    <PageShell>
      <div className="min-h-screen bg-brand-off pb-8">
        <div className="flex items-center justify-between px-5 pb-2 pt-6">
          <div>
            <h1 className="font-display text-3xl text-brand-text">Learn Hub</h1>
            <p className="text-sm font-semibold text-brand-muted">Pick a subject and start!</p>
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

        <div className="px-4">
          <h2 className="font-display mb-3 text-xl text-brand-text">All Subjects</h2>
          <div className="grid grid-cols-2 gap-3">
            {SUBJECTS.map((subject) => {
              const prog = progress[subject.id] ?? {
                lessonsCompleted: 0,
                completedLessonIds: [],
                xp: 0,
                coins: 0,
                quizzesPassed: 0,
                badges: [],
              };
              const total = lessonCountForSubject(subject.id) || subject.totalLessons;
              const completed = prog.completedLessonIds.length;
              const pct = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;
              return (
                <Link
                  key={subject.id}
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
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
