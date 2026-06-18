/**
 * Run: node scripts/validate-lesson-counts.mjs
 * Requires a built project or tsx; uses dynamic import of lessons-data.
 */
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const lessonsPath = pathToFileURL(
  path.join(root, "src/lib/lessons-data.ts"),
).href;

const { LESSONS, lessonCountForSubject } = await import(lessonsPath);

const targets = {
  math: 20,
  language: 20,
  alphabet: 15,
  science: 15,
  geography: 15,
  coding: 15,
  "social-skills": 15,
  arts: 12,
  "motor-skills": 10,
};

let ok = true;
for (const [subject, min] of Object.entries(targets)) {
  const count = lessonCountForSubject(subject);
  const pass = count >= min;
  console.log(`${pass ? "✓" : "✗"} ${subject}: ${count} (min ${min})`);
  if (!pass) ok = false;
}

const math = LESSONS.filter((l) => l.subjectId === "math");
console.log(`\nmath lesson ids (${math.length}):`, math.map((l) => l.id).join(", "));

const ids = LESSONS.map((l) => l.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) {
  console.error("Duplicate lesson ids:", [...new Set(dupes)]);
  ok = false;
}

for (const lesson of LESSONS) {
  if (lesson.slides.length < 5) {
    console.error(`✗ ${lesson.id}: only ${lesson.slides.length} slides`);
    ok = false;
  }
  const hasQuestion = lesson.slides.some((s) =>
    ["quiz", "interact", "fillin", "match", "drag"].includes(s.type),
  );
  if (!hasQuestion) {
    console.error(`✗ ${lesson.id}: no quiz/interact/fillin/match/drag slide`);
    ok = false;
  }
  for (const slide of lesson.slides) {
    if (slide.type === "funfact" && !slide.funFact) {
      console.error(`✗ ${lesson.id}: funfact slide missing funFact field`);
      ok = false;
    }
  }
}

console.log(`\nTotal lessons: ${LESSONS.length}`);
process.exit(ok ? 0 : 1);
