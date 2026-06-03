import Link from "next/link";
import { KindWordsActivity } from "@/components/learn/KindWordsActivity";
import { PageShell } from "@/components/PageShell";

export default function FriendsLessonPage() {
  return (
    <PageShell>
      <Link href="/learn/social-skills" className="text-sm font-semibold text-emerald-700">
        ← Social Skills
      </Link>
      <article className="mt-4">
        <p className="text-xs font-bold uppercase text-violet-500">Activity</p>
        <h1 className="font-display text-3xl font-extrabold text-violet-900">
          💬 Making Friends
        </h1>
        <p className="mt-2 text-violet-700">
          Pick words that help someone feel welcome. Kind choices build friendships.
        </p>
        <div className="mt-6">
          <KindWordsActivity />
        </div>
        <p className="mt-6 rounded-xl bg-violet-50 p-4 text-sm text-violet-900">
          <strong>Real-world try:</strong> Practice one greeting before a playdate: wave, smile, and
          say hi by name.
        </p>
      </article>
    </PageShell>
  );
}
