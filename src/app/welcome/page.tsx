"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Character } from "@/components/characters/Characters";
import {
  CHILD_AGE_OPTIONS,
  ageLabel,
  getChildAge,
  setChildAge,
  type ChildAge,
} from "@/lib/child-profile";

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdit = searchParams.get("edit") === "1";
  const [selected, setSelected] = useState<ChildAge | null>(() => getChildAge());

  function continueToApp() {
    if (selected === null) return;
    setChildAge(selected);
    router.push("/");
    router.refresh();
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col overflow-y-auto"
      style={{ background: "linear-gradient(160deg, #7B4FFF 0%, #FF4D8D 55%, #FFD600 100%)" }}
    >
      <div className="mx-auto flex w-full max-w-[430px] flex-1 flex-col px-5 py-8">
        <div className="mb-6 flex justify-center">
          <Character id="fox" size={120} animate />
        </div>

        <h1 className="font-display mb-2 text-center text-3xl text-white">
          {isEdit ? "Update age" : "Welcome to babyflix"}
        </h1>
        <p className="mb-8 text-center text-sm font-semibold leading-relaxed text-white/90">
          {isEdit
            ? "We will refresh shows, games, and lessons to match."
            : "How old is your little learner? We will pick the best shows, games, and lessons."}
        </p>

        <div className="mb-6 grid grid-cols-3 gap-3">
          {CHILD_AGE_OPTIONS.map((age) => {
            const active = selected === age;
            return (
              <button
                key={age}
                type="button"
                onClick={() => setSelected(age)}
                className={`rounded-3xl border-[3px] py-5 transition-all active:scale-95 ${
                  active
                    ? "border-brand-yellow bg-white shadow-[0_6px_0_#E6B800]"
                    : "border-white/40 bg-white/20"
                }`}
              >
                <div
                  className={`font-display text-3xl ${active ? "text-brand-purple" : "text-white"}`}
                >
                  {age}
                </div>
                <div
                  className={`mt-1 text-[10px] font-black uppercase tracking-wide ${
                    active ? "text-brand-muted" : "text-white/80"
                  }`}
                >
                  {age === 2 ? "yrs" : "yrs"}
                </div>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <p className="mb-4 text-center text-sm font-bold text-white">
            Perfect picks for {ageLabel(selected)}
          </p>
        )}

        <button
          type="button"
          disabled={selected === null}
          onClick={continueToApp}
          className="btn-primary mb-3 w-full py-4 text-lg disabled:opacity-50"
        >
          {isEdit ? "Save and go back" : "Let's go!"}
        </button>

        {isEdit ? (
          <Link
            href="/"
            className="text-center text-sm font-bold text-white/80 underline-offset-2 hover:underline"
          >
            Cancel
          </Link>
        ) : (
          <p className="text-center text-[11px] font-semibold text-white/70">
            You can change this anytime from the home screen or parent dashboard.
          </p>
        )}
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-brand-purple">
          <span className="font-display text-white">Loading…</span>
        </div>
      }
    >
      <WelcomeContent />
    </Suspense>
  );
}
