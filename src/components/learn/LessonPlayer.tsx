"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Character, type CharacterId } from "@/components/characters/Characters";
import { CompletionScreen } from "@/components/games/CompletionScreen";
import type { Subject } from "@/lib/learn-data";
import type { Lesson, LessonSlide } from "@/lib/lessons-data";
import { completeLesson } from "@/lib/rewards";
import { SFX } from "@/lib/sounds";
import { speakGame } from "@/lib/speech";

interface LessonPlayerProps {
  lesson: Lesson;
  subjectData: Subject;
  lessonCount: number;
}

export function LessonPlayer({ lesson, subjectData, lessonCount }: LessonPlayerProps) {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [gameTaps, setGameTaps] = useState(0);
  const [matchLeftSelected, setMatchLeftSelected] = useState<number | null>(null);
  const [matchedLeft, setMatchedLeft] = useState<Set<number>>(() => new Set());
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const slide = lesson.slides[slideIndex];
  const isLast = slideIndex === lesson.slides.length - 1;
  const isInteractiveSlide =
    slide.type === "quiz" ||
    slide.type === "interact" ||
    slide.type === "fillin" ||
    slide.type === "match" ||
    slide.type === "drag";
  const isGameSlide = slide.type === "game";
  const isInfoSlide =
    slide.type === "funfact" || slide.type === "experiment";

  const shuffledMatchRights = useMemo(() => {
    if (slide.type !== "match" || !slide.pairs) return [];
    return [...slide.pairs.map((p) => p[1])].sort(() => Math.random() - 0.5);
  }, [slideIndex, slide.type, slide.pairs]);

  const fillinCorrectIndex =
    slide.type === "fillin" && slide.blankOptions && slide.blank
      ? slide.blankOptions.findIndex((o) => o === slide.blank)
      : -1;

  useEffect(() => {
    setMatchLeftSelected(null);
    setMatchedLeft(new Set());
    setSelected(null);
    setAnswered(false);

    if (
      slide.voiceText &&
      (slide.type === "teach" || slide.type === "story" || slide.type === "intro")
    ) {
      void speakGame(slide.voiceText);
    }
    if (slide.type === "funfact" && slide.funFact) {
      void speakGame(slide.funFact);
    }
    if (slide.type === "game") {
      setGameTaps(0);
      void speakGame(slide.voiceText ?? "Tap the star three times!");
    }
  }, [slideIndex, slide]);

  const finishLesson = useCallback(() => {
    setCoinsEarned(lesson.coinsReward);
    completeLesson(
      subjectData.id,
      lesson.id,
      lesson.xpReward,
      lesson.coinsReward,
      lessonCount,
    );
    SFX.win.play();
    setDone(true);
  }, [lesson, subjectData.id, lessonCount]);

  const advance = useCallback(() => {
    setSelected(null);
    setAnswered(false);
    setMatchLeftSelected(null);
    setMatchedLeft(new Set());
    if (isLast) {
      finishLesson();
    } else {
      setSlideIndex((i) => i + 1);
    }
  }, [isLast, finishLesson]);

  const handleAnswer = (idx: number, correctIndex: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === correctIndex) {
      SFX.correct.play();
      void speakGame("Correct! Well done!");
      setCorrectCount((c) => c + 1);
    } else {
      SFX.wrong.play();
      void speakGame("Not quite! Try the next one!");
    }
    setTimeout(advance, 1400);
  };

  const handleQuizAnswer = (idx: number) => {
    if (!slide.options || slide.correct === undefined) return;
    handleAnswer(idx, slide.correct);
  };

  const handleFillinAnswer = (idx: number) => {
    if (fillinCorrectIndex < 0) return;
    handleAnswer(idx, fillinCorrectIndex);
  };

  const handleMatchLeft = (leftIdx: number) => {
    if (answered || matchedLeft.has(leftIdx)) return;
    setMatchLeftSelected(leftIdx);
  };

  const handleMatchRight = (rightIdx: number) => {
    if (
      answered ||
      matchLeftSelected === null ||
      !slide.pairs ||
      slide.type !== "match"
    ) {
      return;
    }
    const expected = slide.pairs[matchLeftSelected][1];
    const picked = shuffledMatchRights[rightIdx];
    if (picked === expected) {
      const next = new Set(matchedLeft);
      next.add(matchLeftSelected);
      setMatchedLeft(next);
      setMatchLeftSelected(null);
      SFX.correct.play();
      if (next.size === slide.pairs.length) {
        setAnswered(true);
        setCorrectCount((c) => c + 1);
        void speakGame("All matched! Well done!");
        setTimeout(advance, 1400);
      }
    } else {
      SFX.wrong.play();
      setMatchLeftSelected(null);
    }
  };

  const handleGameTap = () => {
    const next = gameTaps + 1;
    setGameTaps(next);
    SFX.pop.play();
    if (next >= 3) {
      SFX.correct.play();
      setTimeout(advance, 600);
    }
  };

  const goBack = () => {
    if (slideIndex > 0 && !isInteractiveSlide) {
      setSlideIndex((i) => i - 1);
      setAnswered(false);
      setSelected(null);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || isInteractiveSlide || answered) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStart.current.y);
    if (Math.abs(dx) > 60 && dy < 80) {
      if (dx < 0) advance();
      else goBack();
    }
    touchStart.current = null;
  };

  const stars: 1 | 2 | 3 =
    correctCount === 0 ? 1 : correctCount <= 1 ? 2 : 3;

  if (done) {
    return (
      <CompletionScreen
        coinsEarned={coinsEarned}
        stars={stars}
        characterId={subjectData.character}
        onPlayAgain={() => {
          setSlideIndex(0);
          setDone(false);
          setCorrectCount(0);
          setGameTaps(0);
        }}
      />
    );
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center gap-3 border-b-2 border-brand-border px-5 py-4">
        <button
          type="button"
          onClick={() => router.push(`/learn/${subjectData.id}`)}
          className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-brand-off text-lg font-bold text-brand-text active:scale-90"
        >
          ←
        </button>
        <div className="min-w-0 flex-1">
          <div className="truncate font-display text-base text-brand-text">{lesson.title}</div>
          <div className="mt-1 flex gap-1">
            {lesson.slides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < slideIndex ? "w-2 bg-brand-teal" : i === slideIndex ? "flex-1" : "w-2 bg-brand-border"
                }`}
                style={
                  i === slideIndex
                    ? { background: subjectData.gradient, minWidth: 24 }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
        <div className="rounded-[14px] bg-brand-yellow px-3 py-1.5 text-sm font-black text-yellow-900">
          🪙 {lesson.coinsReward}
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        {slide.character && (
          <div className="mb-4 animate-pop">
            <Character id={slide.character as CharacterId} size={110} animate />
          </div>
        )}
        {slide.visual && !slide.character && (
          <div className="animate-pop mb-6 text-6xl">{slide.visual}</div>
        )}
        <h2 className="font-display mb-2 text-2xl text-brand-text">{slide.title}</h2>
        <p className="mb-6 max-w-sm text-base font-semibold leading-relaxed text-brand-text">
          {slide.content}
        </p>
        {slide.visual && slide.character && (
          <div className="mb-4 text-4xl">{slide.visual}</div>
        )}

        {slide.type === "funfact" && slide.funFact && (
          <div className="w-full max-w-sm rounded-[20px] border-2 border-brand-yellow bg-yellow-50 px-5 py-4 text-left">
            <p className="font-display text-sm font-bold text-yellow-900">✨ Wow!</p>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-yellow-900">
              {slide.funFact}
            </p>
          </div>
        )}

        {slide.type === "experiment" && slide.experiment && (
          <div className="w-full max-w-sm rounded-[20px] border-2 border-brand-teal bg-teal-50 px-5 py-4 text-left">
            <p className="font-display text-lg font-bold text-teal-900">
              🧪 {slide.experiment.title}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-teal-800">
              You will need
            </p>
            <ul className="mt-1 list-inside list-disc text-sm font-semibold text-teal-900">
              {slide.experiment.materials.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-teal-800">Steps</p>
            <ol className="mt-1 list-inside list-decimal text-sm font-semibold text-teal-900">
              {slide.experiment.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        )}

        {(slide.type === "quiz" || slide.type === "interact") && slide.options && (
          <div className="grid w-full grid-cols-2 gap-3">
            {slide.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleQuizAnswer(i)}
                className={`min-h-12 rounded-[18px] border-[2.5px] p-4 font-display text-base transition-all active:scale-95 ${
                  !answered
                    ? "border-[#E8E8F4] bg-white text-brand-text hover:border-brand-purple hover:bg-brand-purple/5"
                    : i === slide.correct
                      ? "border-brand-teal bg-teal-50 text-teal-700"
                      : i === selected
                        ? "border-brand-pink bg-pink-50 text-pink-700"
                        : "border-[#E8E8F4] bg-white text-brand-text opacity-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {slide.type === "fillin" && slide.blankOptions && (
          <div className="grid w-full grid-cols-2 gap-3">
            {slide.blankOptions.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleFillinAnswer(i)}
                className={`min-h-12 rounded-[18px] border-[2.5px] p-4 font-display text-base transition-all active:scale-95 ${
                  !answered
                    ? "border-[#E8E8F4] bg-white text-brand-text hover:border-brand-purple hover:bg-brand-purple/5"
                    : i === fillinCorrectIndex
                      ? "border-brand-teal bg-teal-50 text-teal-700"
                      : i === selected
                        ? "border-brand-pink bg-pink-50 text-pink-700"
                        : "border-[#E8E8F4] bg-white text-brand-text opacity-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {slide.type === "match" && slide.pairs && (
          <div className="grid w-full max-w-md grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <p className="font-display text-xs font-bold text-brand-muted">Tap left</p>
              {slide.pairs.map(([left], i) => (
                <button
                  key={left}
                  type="button"
                  onClick={() => handleMatchLeft(i)}
                  disabled={matchedLeft.has(i)}
                  className={`min-h-12 rounded-[18px] border-[2.5px] p-3 font-display text-base transition-all active:scale-95 ${
                    matchedLeft.has(i)
                      ? "border-brand-teal bg-teal-50 text-teal-700 opacity-60"
                      : matchLeftSelected === i
                        ? "border-brand-purple bg-brand-purple/10 text-brand-text"
                        : "border-[#E8E8F4] bg-white text-brand-text"
                  }`}
                >
                  {left}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display text-xs font-bold text-brand-muted">Then right</p>
              {shuffledMatchRights.map((right, i) => (
                <button
                  key={`${right}-${i}`}
                  type="button"
                  onClick={() => handleMatchRight(i)}
                  className="min-h-12 rounded-[18px] border-[2.5px] border-[#E8E8F4] bg-white p-3 font-display text-base text-brand-text transition-all active:scale-95"
                >
                  {right}
                </button>
              ))}
            </div>
          </div>
        )}

        {isGameSlide && (
          <button
            type="button"
            onClick={handleGameTap}
            className="flex h-28 w-28 items-center justify-center rounded-full text-6xl transition active:scale-90"
            style={{
              background: subjectData.gradient,
              boxShadow: subjectData.shadow,
            }}
          >
            ⭐
          </button>
        )}
        {isGameSlide && (
          <p className="mt-4 font-display text-lg text-brand-muted">
            Taps: {gameTaps} / 3
          </p>
        )}

        {answered &&
          (slide.type === "quiz" ||
            slide.type === "interact" ||
            slide.type === "fillin") && (
            <p
              className={`mt-4 font-display text-lg ${
                selected ===
                (slide.type === "fillin" ? fillinCorrectIndex : slide.correct)
                  ? "text-brand-teal"
                  : "text-brand-pink"
              }`}
            >
              {selected ===
              (slide.type === "fillin" ? fillinCorrectIndex : slide.correct)
                ? "🎉 Correct!"
                : "😅 Not quite!"}
            </p>
          )}
        {!isInteractiveSlide && !isGameSlide && !isInfoSlide && (
          <p className="mt-2 text-xs font-semibold text-brand-muted">
            Swipe left for next · Swipe right to go back
          </p>
        )}
      </div>

      {(!isInteractiveSlide && !isGameSlide) || isInfoSlide ? (
        <div className="px-5 pb-8">
          <button
            type="button"
            onClick={advance}
            className="w-full rounded-[20px] py-4 font-display text-xl text-white transition-transform active:scale-[0.97]"
            style={{ background: subjectData.gradient, boxShadow: subjectData.shadow }}
          >
            {isLast ? "Finish! 🎉" : "Next →"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
