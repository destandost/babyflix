import { EdgeTTS } from "edge-tts-universal";
import { getEdgeVoice, getTtsProsody, GAME_EDGE_VOICE, type TtsDelivery } from "@/lib/edge-voices";

export const runtime = "nodejs";

const MAX_TEXT_LENGTH = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang")?.trim();
  const text = searchParams.get("text")?.trim();
  const mode = (searchParams.get("mode")?.trim() || "learn") as TtsDelivery;
  const delivery: TtsDelivery = mode === "game" ? "game" : "learn";

  if (!lang || !text) {
    return new Response("Missing lang or text", { status: 400 });
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return new Response("Text too long", { status: 400 });
  }

  const voice =
    delivery === "game" && lang === "en" ? GAME_EDGE_VOICE : getEdgeVoice(lang);
  if (!voice) {
    return new Response("Unsupported language", { status: 400 });
  }

  try {
    const tts = new EdgeTTS(text, voice, getTtsProsody(delivery));
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
