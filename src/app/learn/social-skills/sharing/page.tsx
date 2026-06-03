import Link from "next/link";
import { SharingTurnsActivity } from "@/components/learn/SharingTurnsActivity";
import { PageShell } from "@/components/PageShell";

export default function SharingLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/social-skills" className="text-sm font-semibold text-emerald-700">
        ← Social Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-amber-600">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          🤝 Sharing Practice
        </h1>
        <p className="mt-2 text-violet-700">
          Pass the ball between Bear and Bunny. Tap Share each time — taking turns feels fair.
        </p>
        <div className="mt-6">
          <SharingTurnsActivity />
        </div>
        <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Real-world try:</strong> Use a timer or song — when it ends, switch who holds the
          toy.
        </p>
      </article>
    </PageShell>
  );
}
