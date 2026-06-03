/** Microsoft neural voices — clear, upbeat, Duolingo-style delivery. */
export const DUOLINGO_PROSODY = {
  rate: "+8%",
  volume: "+0%",
  pitch: "+0Hz",
} as const;

/**
 * Friendly neural voices per babyflix language (female/clear, similar to language apps).
 * @see https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support
 */
export const EDGE_VOICES: Record<string, string> = {
  en: "en-US-JennyNeural",
  es: "es-ES-ElviraNeural",
  fr: "fr-FR-DeniseNeural",
  de: "de-DE-KatjaNeural",
  it: "it-IT-ElsaNeural",
  pt: "pt-BR-FranciscaNeural",
  nl: "nl-NL-ColetteNeural",
  tr: "tr-TR-EmelNeural",
  ru: "ru-RU-SvetlanaNeural",
  pl: "pl-PL-ZofiaNeural",
  sv: "sv-SE-SofieNeural",
  ar: "ar-SA-ZariyahNeural",
  zh: "zh-CN-XiaoxiaoNeural",
  ja: "ja-JP-NanamiNeural",
  ko: "ko-KR-SunHiNeural",
  hi: "hi-IN-SwaraNeural",
  vi: "vi-VN-HoaiMyNeural",
  id: "id-ID-GadisNeural",
  el: "el-GR-AthinaNeural",
  he: "he-IL-HilaNeural",
  uk: "uk-UA-PolinaNeural",
  ro: "ro-RO-AlinaNeural",
  hu: "hu-HU-NoemiNeural",
  fi: "fi-FI-NooraNeural",
  da: "da-DK-ChristelNeural",
  no: "nb-NO-PernilleNeural",
  cs: "cs-CZ-VlastaNeural",
  sw: "sw-KE-ZuriNeural",
  ga: "ga-IE-OrlaNeural",
  cy: "cy-GB-NiaNeural",
};

export function getEdgeVoice(languageId: string): string | undefined {
  return EDGE_VOICES[languageId];
}

export function hasEdgeVoice(languageId: string): boolean {
  return Boolean(getEdgeVoice(languageId));
}
