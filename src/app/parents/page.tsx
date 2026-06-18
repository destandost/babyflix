import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { MOCK_PARENT_REPORT } from "@/lib/features";

export default function ParentsPage() {
  const report = MOCK_PARENT_REPORT;

  return (
    <PageShell>
<<<<<<< Updated upstream
      <h1 className="font-display text-3xl font-extrabold text-slate-800">
        👨‍👩‍👧 Parent information
      </h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Çocukların progress&apos;iyle ilgili aileye rapor — progress reports and
        dialogue for families.
      </p>
=======
      <div
        className="mx-4 mb-5 rounded-4xl p-5"
        style={{
          background: "linear-gradient(135deg, #00D4FF, #7B4FFF)",
          boxShadow: "0 8px 32px rgba(123,79,255,0.3)",
        }}
      >
        <h1 className="font-display mb-1 text-2xl text-white">Parent Dashboard</h1>
        <p className="text-sm font-semibold text-white/85">
          Progress reports for families
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/shop"
            className="inline-block rounded-full bg-brand-yellow px-4 py-2 text-xs font-black text-brand-text"
          >
            Coin shop
          </Link>
          <Link
            href="/welcome?edit=1"
            className="inline-block rounded-full bg-white/25 px-4 py-2 text-xs font-black text-white"
          >
            Child&apos;s age
          </Link>
        </div>
      </div>
>>>>>>> Stashed changes

      <PlaceholderBanner
        title="Parent dialogue (coming soon)"
        message="Email digests, in-app messages, and weekly summaries will connect here."
      />

      <section className="mt-6 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {report.periodLabel}
        </p>
        <h2 className="font-display mt-1 text-2xl font-bold text-slate-900">
          {report.childName}
        </h2>

        <dl className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-2xl bg-violet-50 py-4">
            <dt className="text-sm text-violet-600">Lessons</dt>
            <dd className="font-display text-2xl font-bold text-violet-900">
              {report.modulesCompleted}
            </dd>
          </div>
          <div className="rounded-2xl bg-sky-50 py-4">
            <dt className="text-sm text-sky-600">Games</dt>
            <dd className="font-display text-2xl font-bold text-sky-900">
              {report.gamesPlayed}
            </dd>
          </div>
          <div className="rounded-2xl bg-indigo-50 py-4">
            <dt className="text-sm text-indigo-600">Shows</dt>
            <dd className="font-display text-2xl font-bold text-indigo-900">
              {report.showsWatched}
            </dd>
          </div>
        </dl>

        <h3 className="font-display mt-8 text-lg font-bold text-slate-800">
          Highlights
        </h3>
        <ul className="mt-3 space-y-2">
          {report.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-xl bg-slate-50 px-4 py-3 text-slate-700"
            >
              <span aria-hidden>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
