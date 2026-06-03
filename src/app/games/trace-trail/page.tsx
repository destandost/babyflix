import Link from "next/link";
import { TraceTrailGame } from "@/components/games/TraceTrailGame";
import { PageShell } from "@/components/PageShell";

export default function TraceTrailPage() {
  return (
    <PageShell className="!bg-lime-50">
      <Link href="/games" className="text-sm font-semibold text-lime-800">
        ← Arcade
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-lime-950">✏️ Trace Trail</h1>
      <p className="mt-1 text-lime-800">Follow the dotted paths with your finger.</p>
      <div className="mt-6">
        <TraceTrailGame />
      </div>
    </PageShell>
  );
}
