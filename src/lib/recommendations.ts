import {
  ageFitScore,
  getChildAge,
  isAgeInRange,
  parseAgeRangeString,
  parseAgesTag,
  type AgeRange,
} from "@/lib/child-profile";
import { GAMES, type Game } from "@/lib/games";
import { SUBJECTS, type Subject } from "@/lib/learn-data";
import { SHOW_CATALOG } from "@/lib/ui-catalog";

export interface RecommendableShow {
  id: string;
  name: string;
  character: (typeof SHOW_CATALOG)[number]["character"];
  gradient: string;
  episodes: number;
  ageRange: string;
  badge: string;
  category: string;
  minAge: number;
  maxAge: number;
}

export interface RecommendableGame extends Game {
  minAge: number;
  maxAge: number;
}

export interface RecommendableSubject extends Subject {
  minAge: number;
  maxAge: number;
}

const SUBJECT_AGE_RANGES: Record<string, AgeRange> = {
  alphabet: { min: 2, max: 6 },
  math: { min: 3, max: 7 },
  language: { min: 3, max: 7 },
  "social-skills": { min: 2, max: 7 },
  arts: { min: 2, max: 7 },
  "motor-skills": { min: 2, max: 5 },
  science: { min: 4, max: 7 },
  coding: { min: 5, max: 7 },
  geography: { min: 4, max: 7 },
};

const GAME_AGE_RANGES: Record<string, AgeRange> = {
  "sprout-valley": { min: 4, max: 7 },
};

function enrichShows(): RecommendableShow[] {
  return SHOW_CATALOG.map((show) => {
    const range = parseAgeRangeString(show.ageRange);
    return { ...show, minAge: range.min, maxAge: range.max };
  });
}

function enrichGames(): RecommendableGame[] {
  return GAMES.map((game) => {
    const fromTag = game.tags.map(parseAgesTag).find(Boolean);
    const range = GAME_AGE_RANGES[game.id] ?? fromTag ?? { min: 2, max: 7 };
    return { ...game, minAge: range.min, maxAge: range.max };
  });
}

function enrichSubjects(): RecommendableSubject[] {
  return SUBJECTS.map((subject) => {
    const range = SUBJECT_AGE_RANGES[subject.id] ?? { min: 2, max: 7 };
    return { ...subject, minAge: range.min, maxAge: range.max };
  });
}

function sortByFit<T extends { minAge: number; maxAge: number }>(items: T[], childAge: number): T[] {
  return [...items].sort((a, b) => {
    const scoreA = ageFitScore(childAge, { min: a.minAge, max: a.maxAge });
    const scoreB = ageFitScore(childAge, { min: b.minAge, max: b.maxAge });
    return scoreB - scoreA;
  });
}

export function getRecommendationsForAge(childAge: number) {
  const shows = enrichShows();
  const games = enrichGames();
  const subjects = enrichSubjects();

  const recommendedShows = sortByFit(
    shows.filter((s) => isAgeInRange(childAge, { min: s.minAge, max: s.maxAge })),
    childAge,
  );
  const recommendedGames = sortByFit(
    games.filter((g) => isAgeInRange(childAge, { min: g.minAge, max: g.maxAge })),
    childAge,
  );
  const recommendedSubjects = sortByFit(
    subjects.filter((s) => isAgeInRange(childAge, { min: s.minAge, max: s.maxAge })),
    childAge,
  );

  return {
    shows: recommendedShows,
    games: recommendedGames,
    subjects: recommendedSubjects,
    allShows: shows,
    allGames: games,
    allSubjects: subjects,
  };
}

export function getRecommendationsForStoredAge() {
  const age = getChildAge();
  if (age === null) return null;
  return getRecommendationsForAge(age);
}

export function getSubjectAgeRange(subjectId: string): AgeRange {
  return SUBJECT_AGE_RANGES[subjectId] ?? { min: 2, max: 7 };
}

export function getGameAgeRange(gameId: string): AgeRange {
  const game = enrichGames().find((g) => g.id === gameId);
  return game ? { min: game.minAge, max: game.maxAge } : { min: 2, max: 7 };
}

export function getShowAgeRange(showId: string): AgeRange {
  const show = enrichShows().find((s) => s.id === showId);
  return show ? { min: show.minAge, max: show.maxAge } : { min: 2, max: 7 };
}

export function isSubjectAppropriateForAge(subjectId: string, childAge: number): boolean {
  return isAgeInRange(childAge, getSubjectAgeRange(subjectId));
}

export function isGameAppropriateForAge(gameId: string, childAge: number): boolean {
  return isAgeInRange(childAge, getGameAgeRange(gameId));
}

export function isShowAppropriateForAge(showId: string, childAge: number): boolean {
  return isAgeInRange(childAge, getShowAgeRange(showId));
}

/** Subject id from /learn/... paths, or null for hub-only routes. */
export function getLearnSubjectFromPath(pathname: string): string | null {
  if (!pathname.startsWith("/learn")) return null;
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length < 2) return null;
  const segment = parts[1];
  if (segment === "badges") return null;
  if (segment === "quiz") return parts[2] ?? null;
  const valid = new Set<string>(enrichSubjects().map((s) => s.id));
  return valid.has(segment) ? segment : null;
}
