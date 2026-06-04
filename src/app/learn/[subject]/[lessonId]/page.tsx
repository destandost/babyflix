"use client";

import { useParams, useRouter } from "next/navigation";
import { LessonPlayer } from "@/components/learn/LessonPlayer";
import { getSubject } from "@/lib/learn-data";
import { getLessonById, lessonCountForSubject } from "@/lib/lessons-data";

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.subject as string;
  const lessonId = params.lessonId as string;
  const lesson = getLessonById(lessonId);
  const subjectData = getSubject(subjectId);

  if (!lesson || !subjectData || lesson.subjectId !== subjectId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8">
        <p className="font-display text-brand-text">Lesson not found</p>
        <button
          type="button"
          onClick={() => router.push("/learn")}
          className="mt-4 text-brand-purple"
        >
          ← Learn Hub
        </button>
      </div>
    );
  }

  return (
    <LessonPlayer
      lesson={lesson}
      subjectData={subjectData}
      lessonCount={lessonCountForSubject(subjectId)}
    />
  );
}
