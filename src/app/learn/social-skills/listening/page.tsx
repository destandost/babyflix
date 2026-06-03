import Link from "next/link";
import { ListeningBodyActivity } from "@/components/learn/ListeningBodyActivity";
import { PageShell } from "@/components/PageShell";

export default function ListeningLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/social-skills" className="text-sm font-semibold text-emerald-700">
        ← Social Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-sky-600">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          👂 Good Listening
        </h1>
        <p className="mt-2 text-violet-700">
          Eyes, ears, quiet body — tap in order like Owl shows. No rushing, no wrong answers.
        </p>
        <div className="mt-6">
          <ListeningBodyActivity />
        </div>
        <p className="mt-6 rounded-xl bg-sky-50 p-4 text-sm text-sky-900">
          <strong>Real-world try:</strong> Play “mirror listen” — you say one sentence, they repeat
          one word back.
        </p>
      </article>
    </PageShell>
  );
}
