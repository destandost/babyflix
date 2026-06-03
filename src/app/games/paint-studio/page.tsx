import Link from "next/link";
import { PaintStudioGame } from "@/components/games/PaintStudioGame";
import { PageShell } from "@/components/PageShell";

export default function PaintStudioPage() {
  return (
    <PageShell className="!bg-[#fff5f8]">
      <Link
        href="/games"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← Arcade
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-violet-900">
        🎨 Paint Studio
      </h1>
      <p className="mt-1 text-violet-600">
        Draw with brushes, stamp stickers, and save masterpieces.
      </p>
      <div className="mt-6">
        <PaintStudioGame />
      </div>
    </PageShell>
  );
}
