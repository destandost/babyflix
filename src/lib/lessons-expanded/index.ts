import { MATH_LESSONS } from "./math";
import { LANGUAGE_LESSONS } from "./language";
import { ALPHABET_LESSONS } from "./alphabet";
import { SCIENCE_LESSONS } from "./science";
import { GEOGRAPHY_LESSONS } from "./geography";
import { CODING_LESSONS } from "./coding";
import { SOCIAL_LESSONS, ARTS_LESSONS, MOTOR_LESSONS } from "./social-arts-motor";
import { SUPPLEMENT_LESSONS } from "./supplement";
import { SCIENCE_GEO_SUPPLEMENT } from "./supplement-science-geo";
import { CODING_SOCIAL_ARTS_MOTOR_SUPPLEMENT } from "./supplement-coding-social-arts-motor";
import type { Lesson } from "../lessons-data";

export const EXPANDED_LESSONS: Lesson[] = [
  ...MATH_LESSONS,
  ...LANGUAGE_LESSONS,
  ...ALPHABET_LESSONS,
  ...SCIENCE_LESSONS,
  ...GEOGRAPHY_LESSONS,
  ...CODING_LESSONS,
  ...SOCIAL_LESSONS,
  ...ARTS_LESSONS,
  ...MOTOR_LESSONS,
  ...SUPPLEMENT_LESSONS,
  ...SCIENCE_GEO_SUPPLEMENT,
  ...CODING_SOCIAL_ARTS_MOTOR_SUPPLEMENT,
];
