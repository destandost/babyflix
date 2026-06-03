"use client";

import { useEffect, useState } from "react";
import { speakPhrase, warmupSpeechVoices, usesNeuralTts } from "@/lib/speech";

interface SpeakButtonProps {
  text: string;
  languageId: string;
  phraseId?: string;
  label?: string;
  className?: string;
}

export function SpeakButton({
  text,
  languageId,
  phraseId,
  label = "Listen",
  className = "",
}: SpeakButtonProps) {
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    warmupSpeechVoices();
  }, []);

  const listen = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await speakPhrase(text, languageId, phraseId);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={listen}
      disabled={busy}
      className={`inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-display text-sm font-bold text-violet-800 shadow-md ring-2 ring-violet-200 transition hover:scale-105 active:scale-95 disabled:opacity-60 ${className}`}
      aria-label={`${label}: ${text}`}
      title={usesNeuralTts(languageId) ? "Clear voice (like Duolingo)" : "Listen"}
    >
      <span aria-hidden>{busy ? "⏳" : "🔊"}</span>
      {label}
    </button>
  );
}
