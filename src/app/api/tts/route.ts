import { EdgeTTS } from "edge-tts-universal";
import { DUOLINGO_PROSODY, getEdgeVoice } from "@/lib/edge-voices";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang")?.trim();
  const text = searchParams.get("text")?.trim();

  if (!lang || !text) {
    return new Response("Missing lang or text", { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return new Response("Text too long", { status: 400 });
  }

  const voice = getEdgeVoice(lang);
  if (!voice) {
    return new Response("Unsupported language", { status: 400 });
  }

  try {
    const tts = new EdgeTTS(text, voice, DUOLINGO_PROSODY);
    const result = await tts.synthesize();
    const buffer = Buffer.from(await result.audio.arrayBuffer());

    return new Response(buffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch (error) {
    console.error("TTS synthesis failed:", error);
    return new Response("TTS failed", { status: 502 });
  }
}
