"use client";

import { useEffect } from "react";
import { SCIENCE_FACTS } from "../../lib/scienceFacts";
import { useFarmStore } from "../../store/farmStore";
import { SvgIcon } from "../FarmSvgDefs";

export function SciencePopup() {
  const factId = useFarmStore((s) => s.scienceFactId);
  const dismissScience = useFarmStore((s) => s.dismissScience);

  useEffect(() => {
    if (!factId) return;
    const t = setTimeout(() => dismissScience(), 8000);
    return () => clearTimeout(t);
  }, [factId, dismissScience]);

  if (!factId) return null;
  const fact = SCIENCE_FACTS[factId];
  if (!fact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-4xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex justify-center">
          <SvgIcon id={fact.svgId} size={80} />
        </div>
        <h3 className="font-display mb-2 text-center text-xl text-brand-text">{fact.title}</h3>
        <p className="mb-4 text-center text-sm font-semibold leading-relaxed text-brand-muted">
          {fact.fact}
        </p>
        <button
          type="button"
          onClick={() => dismissScience()}
          className="btn-primary w-full py-3 font-display"
        >
          Cool! +15 XP
        </button>
      </div>
    </div>
  );
}
