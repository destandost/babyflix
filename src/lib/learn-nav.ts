import type { LearningModule } from "./types";
import { LEARNING_MODULES } from "./features";
import { getModuleLessons, type LessonItem } from "./lessons";

/** Canonical URL for each subject (dedicated hub under /learn/[id]). */
export function getLearnModuleHref(moduleId: string): string {
  return `/learn/${moduleId}`;
}

export function getLearningModule(moduleId: string): LearningModule | undefined {
  return LEARNING_MODULES.find((m) => m.id === moduleId);
}

/** Learn-only activities (paths under /learn/, never Arcade). */
export function getLearnActivities(moduleId: string): LessonItem[] {
  return getModuleLessons(moduleId).filter(
    (l) =>
      l.status === "ready" &&
      l.id !== "hub" &&
      Boolean(l.href?.startsWith("/learn/")),
  );
}

export function countReadyLearnActivities(moduleId: string): number {
  return getLearnActivities(moduleId).length;
}

export function getLockedLessons(moduleId: string): LessonItem[] {
  return getModuleLessons(moduleId).filter((l) => l.status === "locked");
}

export function learnModuleCardBlurb(moduleId: string): string {
  const learnReady = countReadyLearnActivities(moduleId);
  const locked = getLockedLessons(moduleId).length;
  const mod = getLearningModule(moduleId);
  if (!mod) return "";

  const quizBit = " · quiz";

  if (learnReady === 0) {
    return locked > 0 ? `Quiz ready${quizBit}` : `${mod.description}${quizBit}`;
  }
  const readyLabel = `${learnReady} activit${learnReady === 1 ? "y" : "ies"}${quizBit}`;
  return locked > 0 ? `${readyLabel} · ${locked} more soon` : readyLabel;
}
