import { SUBJECTS, type SubjectId } from "@/lib/learn-data";
import { addXp } from "@/lib/xp";

const STREAK_KEY = "babyflix_streak";
const DAILY_LESSONS_KEY = "babyflix_daily_lessons";

export interface StreakData {
  currentStreak: number;
  lastLearnDate: string;
  longestStreak: number;
}

export interface SubjectProgress {
  lessonsCompleted: number;
  completedLessonIds: string[];
  xp: number;
  coins: number;
  quizzesPassed: number;
  badges: string[];
}

export const BADGES = {
  first_lesson: {
    id: "first_lesson",
    name: "First Step!",
    icon: "👣",
    description: "Complete your first lesson",
  },
  streak_3: {
    id: "streak_3",
    name: "3 Day Streak!",
    icon: "🔥",
    description: "Learn 3 days in a row",
  },
  streak_7: {
    id: "streak_7",
    name: "Week Warrior!",
    icon: "⚡",
    description: "Learn 7 days in a row",
  },
  perfect_quiz: {
    id: "perfect_quiz",
    name: "Perfect Score!",
    icon: "💯",
    description: "Get 100% on a quiz",
  },
  subject_master: {
    id: "subject_master",
    name: "Subject Master!",
    icon: "🏆",
    description: "Complete all lessons in a subject",
  },
  coin_collector: {
    id: "coin_collector",
    name: "Coin Collector!",
    icon: "🪙",
    description: "Earn 100 coins from learning",
  },
  speed_learner: {
    id: "speed_learner",
    name: "Speed Learner!",
    icon: "🚀",
    description: "Complete 3 lessons in one day",
  },
  explorer: {
    id: "explorer",
    name: "Explorer!",
    icon: "🗺️",
    description: "Try all 9 subjects",
  },
} as const;

function progressKey(subjectId: string) {
  return `babyflix_progress_${subjectId}`;
}

const emptyProgress = (): SubjectProgress => ({
  lessonsCompleted: 0,
  completedLessonIds: [],
  xp: 0,
  coins: 0,
  quizzesPassed: 0,
  badges: [],
});

export function getStreak(): StreakData {
  if (typeof window === "undefined") {
    return { currentStreak: 0, lastLearnDate: "", longestStreak: 0 };
  }
  const data = localStorage.getItem(STREAK_KEY);
  return data
    ? (JSON.parse(data) as StreakData)
    : { currentStreak: 0, lastLearnDate: "", longestStreak: 0 };
}

function getDailyLessonCount(): { date: string; count: number } {
  if (typeof window === "undefined") return { date: "", count: 0 };
  try {
    const raw = localStorage.getItem(DAILY_LESSONS_KEY);
    if (!raw) return { date: "", count: 0 };
    return JSON.parse(raw) as { date: string; count: number };
  } catch {
    return { date: "", count: 0 };
  }
}

function bumpDailyLessonCount(): number {
  const today = new Date().toDateString();
  const daily = getDailyLessonCount();
  const count = daily.date === today ? daily.count + 1 : 1;
  localStorage.setItem(DAILY_LESSONS_KEY, JSON.stringify({ date: today, count }));
  return count;
}

export function updateStreak(): StreakData {
  if (typeof window === "undefined") return getStreak();
  const today = new Date().toDateString();
  const streak = getStreak();
  if (streak.lastLearnDate === today) return streak;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const newStreak =
    streak.lastLearnDate === yesterday ? streak.currentStreak + 1 : 1;
  const updated: StreakData = {
    currentStreak: newStreak,
    lastLearnDate: today,
    longestStreak: Math.max(newStreak, streak.longestStreak),
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  return updated;
}

export function getSubjectProgress(subjectId: string): SubjectProgress {
  if (typeof window === "undefined") return emptyProgress();
  const data = localStorage.getItem(progressKey(subjectId));
  if (!data) return emptyProgress();
  try {
    const parsed = JSON.parse(data) as SubjectProgress;
    return {
      ...emptyProgress(),
      ...parsed,
      completedLessonIds: parsed.completedLessonIds ?? [],
      badges: parsed.badges ?? [],
    };
  } catch {
    return emptyProgress();
  }
}

export function checkBadges(
  subjectId: string,
  progress: SubjectProgress,
  streak: StreakData,
  dailyLessonCount: number,
  totalLessonsInSubject: number,
): string[] {
  const newBadges: string[] = [];
  if (progress.lessonsCompleted >= 1) newBadges.push("first_lesson");
  if (progress.coins >= 100) newBadges.push("coin_collector");
  if (streak.currentStreak >= 3) newBadges.push("streak_3");
  if (streak.currentStreak >= 7) newBadges.push("streak_7");
  if (dailyLessonCount >= 3) newBadges.push("speed_learner");
  if (
    totalLessonsInSubject > 0 &&
    progress.completedLessonIds.length >= totalLessonsInSubject
  ) {
    newBadges.push("subject_master");
  }

  const touchedSubjects = SUBJECTS.filter(
    (s) => getSubjectProgress(s.id).completedLessonIds.length > 0,
  ).length;
  if (touchedSubjects >= SUBJECTS.length) newBadges.push("explorer");

  return newBadges;
}

export function updateSubjectProgress(
  subjectId: string,
  update: Partial<SubjectProgress>,
  totalLessonsInSubject = 0,
): SubjectProgress {
  const current = getSubjectProgress(subjectId);
  const mergedBadges = [...new Set([...current.badges, ...(update.badges ?? [])])];
  const completedLessonIds = update.completedLessonIds ?? current.completedLessonIds;
  const updated: SubjectProgress = {
    lessonsCompleted: completedLessonIds.length,
    completedLessonIds,
    xp: current.xp + (update.xp ?? 0),
    coins: current.coins + (update.coins ?? 0),
    quizzesPassed: current.quizzesPassed + (update.quizzesPassed ?? 0),
    badges: mergedBadges,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(progressKey(subjectId), JSON.stringify(updated));
  }
  const streak = getStreak();
  const daily = getDailyLessonCount();
  const earned = checkBadges(
    subjectId,
    updated,
    streak,
    daily.date === new Date().toDateString() ? daily.count : 0,
    totalLessonsInSubject,
  );
  if (earned.length > 0) {
    updated.badges = [...new Set([...updated.badges, ...earned])];
    if (typeof window !== "undefined") {
      localStorage.setItem(progressKey(subjectId), JSON.stringify(updated));
    }
  }
  return updated;
}

/** Complete a lesson once — awards coins, subject XP, and global XP. */
export function completeLesson(
  subjectId: SubjectId,
  lessonId: string,
  xp: number,
  coins: number,
  totalLessonsInSubject: number,
): SubjectProgress {
  const current = getSubjectProgress(subjectId);
  if (current.completedLessonIds.includes(lessonId)) {
    return current;
  }

  updateStreak();
  const dailyCount = bumpDailyLessonCount();
  if (xp > 0) addXp(xp);

  const completedLessonIds = [...current.completedLessonIds, lessonId];
  return updateSubjectProgress(
    subjectId,
    {
      lessonsCompleted: 1,
      completedLessonIds,
      xp,
      coins,
    },
    totalLessonsInSubject,
  );
}

export function awardPerfectQuizBadge(subjectId: SubjectId): void {
  const current = getSubjectProgress(subjectId);
  updateSubjectProgress(subjectId, {
    quizzesPassed: 1,
    badges: [...current.badges, "perfect_quiz"],
  });
}

export function getTotalCoins(): number {
  return SUBJECTS.reduce((sum, s) => sum + getSubjectProgress(s.id).coins, 0);
}

export function getTotalXP(): number {
  return SUBJECTS.reduce((sum, s) => sum + getSubjectProgress(s.id).xp, 0);
}

export function getAllEarnedBadges(): string[] {
  const all: string[] = [];
  SUBJECTS.forEach((s) => {
    all.push(...getSubjectProgress(s.id).badges);
  });
  return [...new Set(all)];
}

export function countSubjectsTouched(): number {
  return SUBJECTS.filter((s) => getSubjectProgress(s.id).completedLessonIds.length > 0)
    .length;
}
