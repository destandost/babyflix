import Link from "next/link";
import { FingerGymActivity } from "@/components/learn/FingerGymActivity";
import { PageShell } from "@/components/PageShell";

export default function FingerGymPage() {
  return (
    <PageShell>
      <Link href="/learn/motor-skills" className="text-sm font-semibold text-lime-700">
        ← Motor Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-amber-600">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          💪 Finger Gym
        </h1>
        <p className="mt-2 text-violet-700">
          Watch the pattern, then tap the fingers in the same order. Builds focus and small-muscle control.
        </p>
        <div className="mt-6">
          <FingerGymActivity />
        </div>
        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Real-world try:</strong> Pinch clothespins, tear paper strips, or squish play dough!
        </p>
      </article>
    </PageShell>
  );
}
