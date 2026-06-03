/**
 * Optional: cache all phrase MP3s locally (same neural voices as /api/tts).
 * Run: npm run generate:audio
 */
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { EdgeTTS } from "edge-tts-universal";
import { LANGUAGES } from "../src/lib/languages";
import { PHRASES, type PhraseId } from "../src/lib/phrases";
import { DUOLINGO_PROSODY, getEdgeVoice } from "../src/lib/edge-voices";

const OUT = join(process.cwd(), "public/audio/phrases");
const PHRASE_DELAY_MS = 250;

async function synthesizePhrase(word: string, voice: string): Promise<Buffer> {
  const attempts = 4;
  let lastErr: unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      const tts = new EdgeTTS(word, voice, DUOLINGO_PROSODY);
      const result = await tts.synthesize();
      const buffer = Buffer.from(await result.audio.arrayBuffer());
      if (buffer.length > 0) return buffer;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 600 * (i + 1)));
    }
  }

  throw lastErr;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  let created = 0;
  let failed = 0;

  for (const lang of LANGUAGES) {
    const voice = getEdgeVoice(lang.id);
    if (!voice) {
      console.log(`skip ${lang.id} (no neural voice)`);
      continue;
    }

    const dir = join(OUT, lang.id);
    mkdirSync(dir, { recursive: true });
    console.log(`→ ${lang.id} (${voice})`);

    for (const phrase of PHRASES) {
      const word = lang.translations[phrase.id as PhraseId]?.trim();
      if (!word) continue;

      const file = join(dir, `${phrase.id}.mp3`);
      if (existsSync(file)) continue;

      try {
        const buffer = await synthesizePhrase(word, voice);
        writeFileSync(file, buffer);
        created++;
        if (created % 25 === 0) console.log(`… ${created} files`);
        await sleep(PHRASE_DELAY_MS);
      } catch (err) {
        failed++;
        console.error(`  ✗ ${lang.id}/${phrase.id}:`, err);
      }
    }
  }

  console.log(`Done. Created ${created} mp3 files in ${OUT}`);
  if (failed > 0) {
    console.error(`${failed} phrase(s) failed — re-run to retry.`);
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
