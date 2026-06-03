import Link from "next/link";
import { BubbleCatchGame } from "@/components/games/BubbleCatchGame";
import { PageShell } from "@/components/PageShell";

export default function BubbleCatchPage() {
  return (
    <PageShell className="!bg-sky-50">
      <Link href="/games" className="text-sm font-semibold text-sky-700">
        ← Arcade
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-sky-950">🫧 Bubble Catch</h1>
      <p className="mt-1 text-sky-700">Move the basket — catch bubbles!</p>
      <div className="mt-6">
        <BubbleCatchGame />
      </div>
    </PageShell>
  );
}
