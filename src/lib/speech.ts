import { getEdgeVoice, hasEdgeVoice, type TtsDelivery } from "./edge-voices";

/** Browser fallback only when Edge TTS is unavailable */
export const SPEECH_LOCALES: Record<string, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
  tr: "tr-TR",
  ru: "ru-RU",
  pl: "pl-PL",
  sv: "sv-SE",
  ar: "ar-SA",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  hi: "hi-IN",
  vi: "vi-VN",
  id: "id-ID",
  el: "el-GR",
  he: "he-IL",
  uk: "uk-UA",
  ro: "ro-RO",
  hu: "hu-HU",
  fi: "fi-FI",
  da: "da-DK",
  no: "nb-NO",
  sw: "sw-KE",
  ga: "ga-IE",
  cy: "cy-GB",
  cs: "cs-CZ",
};

const SPEECH_FALLBACK = { rate: 0.92, pitch: 1.0 } as const;
const GAME_SPEECH_FALLBACK = { rate: 1.1, pitch: 1.14 } as const;

let activeAudio: HTMLAudioElement | null = null;
const audioUrlCache = new Map<string, string>();
/** HEAD probe cache for pre-generated phrase MP3s under public/audio/phrases */
const staticPhraseExists = new Map<string, boolean>();

function staticPhraseUrl(languageId: string, phraseId: string): string {
  return `/audio/phrases/${languageId}/${phraseId}.mp3`;
}

export function canSpeak(): boolean {
  return typeof window !== "undefined";
}

export function stopSpeech(): void {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function playAudioUrl(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    stopSpeech();
    const audio = new Audio(url);
    activeAudio = audio;

    const finish = (ok: boolean) => {
      if (activeAudio === audio) activeAudio = null;
      resolve(ok);
    };

    audio.onended = () => finish(true);
    audio.onerror = () => finish(false);
    audio.play().then(() => {}).catch(() => finish(false));
  });
}

async function hasStaticPhrase(languageId: string, phraseId: string): Promise<boolean> {
  const url = staticPhraseUrl(languageId, phraseId);
  const cached = staticPhraseExists.get(url);
  if (cached === true) return true;
  if (cached === false) return false;

  try {
    const res = await fetch(url, { method: "HEAD" });
    const exists = res.ok;
    staticPhraseExists.set(url, exists);
    return exists;
  } catch {
    staticPhraseExists.set(url, false);
    return false;
  }
}

async function speakViaStaticPhrase(
  languageId: string,
  phraseId: string,
): Promise<boolean> {
  if (!hasEdgeVoice(languageId) || !phraseId.trim()) return false;
  if (!(await hasStaticPhrase(languageId, phraseId))) return false;
  return playAudioUrl(staticPhraseUrl(languageId, phraseId));
}

async function speakViaEdgeTts(
  text: string,
  languageId: string,
  delivery: TtsDelivery = "learn",
): Promise<boolean> {
  if (!hasEdgeVoice(languageId)) return false;

  const cacheKey = `${languageId}:${delivery}:${text}`;
  let url = audioUrlCache.get(cacheKey);

  if (!url) {
    try {
      const params = new URLSearchParams({
        lang: languageId,
        text,
        mode: delivery,
      });
      const res = await fetch(`/api/tts?${params}`);
      if (!res.ok) return false;

      const blob = await res.blob();
      if (!blob.size) return false;

      url = URL.createObjectURL(blob);
      audioUrlCache.set(cacheKey, url);
    } catch {
      return false;
    }
  }

  return playAudioUrl(url);
}

const PREFERRED_VOICE = /google|microsoft|natural|neural|samantha|karen|moira|yuna|kyoko|amelie|paulina/i;
const AVOID_VOICE = /bad news|bahh|bells|boing|bubbles|cellos|wobble|fred|ralph|bruce|zarvox|junior/i;

function pickFallbackVoice(
  locale: string,
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | undefined {
  const langPrefix = locale.split("-")[0].toLowerCase();
  const pool = voices.filter(
    (v) => v.lang === locale || v.lang.toLowerCase().startsWith(langPrefix),
  );
  const inLang = pool.length > 0 ? pool : voices;

  return (
    inLang.find((v) => PREFERRED_VOICE.test(v.name) && !AVOID_VOICE.test(v.name)) ??
    inLang.find((v) => !AVOID_VOICE.test(v.name)) ??
    inLang[0]
  );
}

function speakTextFallback(
  text: string,
  languageId: string,
  delivery: TtsDelivery = "learn",
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) {
    return;
  }

  const locale = SPEECH_LOCALES[languageId] ?? "en-US";
  const tone = delivery === "game" ? GAME_SPEECH_FALLBACK : SPEECH_FALLBACK;

  const run = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = locale;
    utterance.rate = tone.rate;
    utterance.pitch = tone.pitch;
    const voice = pickFallbackVoice(locale, window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    run();
    return;
  }

  const onVoices = () => {
    window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    run();
  };
  window.speechSynthesis.addEventListener("voiceschanged", onVoices);
  window.speechSynthesis.getVoices();
}

/** Duolingo-style neural voice: cached MP3 → Edge API → browser fallback. */
export async function speakPhrase(
  text: string,
  languageId: string,
  phraseId?: string,
  delivery: TtsDelivery = "learn",
): Promise<void> {
  if (!canSpeak() || !text.trim()) return;

  if (phraseId && delivery === "learn") {
    const fromStatic = await speakViaStaticPhrase(languageId, phraseId);
    if (fromStatic) return;
  }

  const played = await speakViaEdgeTts(text, languageId, delivery);
  if (played) return;

  speakTextFallback(text, languageId, delivery);
}

/** Punch up short game lines for kid-friendly delivery (skip single-letter phonics). */
export function energizeGameText(text: string): string {
  const t = text.trim();
  if (!t || t.length === 1) return t;
  if (/[!?.]$/.test(t)) return t;
  return `${t}!`;
}

export function speakText(text: string, languageId: string): void {
  void speakPhrase(text, languageId);
}

export function warmupSpeechVoices(): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.getVoices();
}

export function usesNeuralTts(languageId: string): boolean {
  return hasEdgeVoice(languageId);
}

/** Arcade & mini-games — same clear English neural voice as language practice. */
export const GAME_SPEECH_LANG = "en";

export function speakGame(text: string): Promise<void> {
  return speakPhrase(energizeGameText(text), GAME_SPEECH_LANG, undefined, "game");
}
