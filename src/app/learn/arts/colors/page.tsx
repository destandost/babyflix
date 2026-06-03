import Link from "next/link";
import { ColorMixActivity } from "@/components/learn/ColorMixActivity";
import { PageShell } from "@/components/PageShell";

export default function ColorMixLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/arts" className="text-sm font-semibold text-pink-700">
        ← Arts
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-pink-500">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          🎨 Color Mix Lab
        </h1>
        <p className="mt-2 text-violet-700">
          Tap two primary colors and discover what they make together.
        </p>
        <div className="mt-6">
          <ColorMixActivity />
        </div>
        <p className="mt-6 rounded-xl bg-pink-50 p-4 text-sm text-pink-900">
          <strong>Real-world try:</strong> Mix finger paints — red + yellow = orange!
        </p>
      </article>
    </PageShell>
  );
}
