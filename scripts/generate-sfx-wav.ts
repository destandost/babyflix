/**
 * Generates short placeholder SFX as WAV (Howler-compatible).
 * Run: npx tsx scripts/generate-sfx-wav.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public/audio/sfx");

function writeWav(filename: string, freq: number, durationSec: number, volume = 0.4) {
  const sampleRate = 22050;
  const samples = Math.floor(sampleRate * durationSec);
  const data = Buffer.alloc(samples * 2);
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    const env = Math.min(1, i / 200) * Math.max(0, 1 - (i - samples + 400) / 400);
    const sample = Math.sin(2 * Math.PI * freq * t) * env * volume;
    data.writeInt16LE(Math.max(-32767, Math.min(32767, Math.floor(sample * 32767))), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + data.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(data.length, 40);
  writeFileSync(join(OUT, filename), Buffer.concat([header, data]));
}

mkdirSync(OUT, { recursive: true });
writeWav("correct.wav", 880, 0.25);
writeWav("wrong.wav", 220, 0.2);
writeWav("pop.wav", 660, 0.08);
writeWav("whoosh.wav", 400, 0.15);
writeWav("coin.wav", 1200, 0.12);
writeWav("win.wav", 523, 0.5);
writeWav("tick.wav", 900, 0.05);
console.log("Wrote SFX to", OUT);
