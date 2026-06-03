import Link from "next/link";
import { FeelingsMatchActivity } from "@/components/learn/FeelingsMatchActivity";
import { PageShell } from "@/components/PageShell";

export default function FeelingsLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/social-skills" className="text-sm font-semibold text-emerald-700">
        ← Social Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-rose-500">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          😊 Name That Feeling
        </h1>
        <p className="mt-2 text-violet-700">
          Read the little story, then tap the face that fits. Every feeling is normal.
        </p>
        <div className="mt-6">
          <FeelingsMatchActivity />
        </div>
        <p className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
          <strong>Real-world try:</strong> Ask your child how they feel at dinner — happy, tired,
          hungry, or something else.
        </p>
      </article>
    </PageShell>
  );
}
