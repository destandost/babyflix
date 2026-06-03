export type LearningModuleId =
  | "math"
  | "language"
  | "alphabet"
  | "social-skills"
  | "arts"
  | "motor-skills";

export interface LearningModule {
  id: LearningModuleId;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export interface ChildProfile {
  id: string;
  displayName: string;
  avatarEmoji: string;
  level: number;
  xp: number;
}

export interface ProgressReport {
  childId: string;
  periodLabel: string;
  modulesCompleted: number;
  gamesPlayed: number;
  showsWatched: number;
  highlights: string[];
}
