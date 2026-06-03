import Link from "next/link";
import { BalanceStepsActivity } from "@/components/learn/BalanceStepsActivity";
import { PageShell } from "@/components/PageShell";

export default function BalanceLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/motor-skills" className="text-sm font-semibold text-lime-700">
        ← Motor Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-lime-600">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          🦩 Balance Steps
        </h1>
        <p className="mt-2 text-violet-700">
          Stand up if you can! Tap left or right when the foot lights up — like a flamingo game.
        </p>
        <div className="mt-6">
          <BalanceStepsActivity />
        </div>
        <p className="mt-6 rounded-xl bg-lime-50 p-4 text-sm text-lime-800">
          <strong>Real-world try:</strong> Stand on one foot for 5 seconds. Hold a grown-up&apos;s hand if you need to!
        </p>
      </article>
    </PageShell>
  );
}
