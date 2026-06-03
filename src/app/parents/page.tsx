import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";
import { MOCK_PARENT_REPORT } from "@/lib/features";

const MODULE_PROGRESS = [
  { id: "math", name: "Math", icon: "🔢", pct: 72, color: "#FF4D8D" },
  { id: "language", name: "Language", icon: "🗣️", pct: 45, color: "#7B4FFF" },
  { id: "alphabet", name: "Alphabet", icon: "🔤", pct: 60, color: "#00C9B1" },
  { id: "social", name: "Social Skills", icon: "🤝", pct: 38, color: "#FF6B4A" },
];

export default function ParentsPage() {
  const report = MOCK_PARENT_REPORT;

  return (
    <PageShell>
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
      </div>

      <PlaceholderBanner
        title="Parent dialogue (coming soon)"
        message="Email digests, in-app messages, and weekly summaries will connect here."
      />

      <div className="mx-4 mb-4 grid grid-cols-3 gap-2.5">
        {[
          { label: "Sessions", value: String(report.modulesCompleted + report.gamesPlayed), color: "#FF4D8D" },
          { label: "Stars", value: "142", color: "#7B4FFF" },
          { label: "Hours", value: "4.2h", color: "#00C9B1" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[18px] border border-brand-border bg-white p-3.5 text-center"
          >
            <div className="font-display text-2xl" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="mt-0.5 text-[10px] font-semibold text-brand-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mx-4 mb-4 rounded-3xl border border-brand-border bg-white p-4">
        <h3 className="font-display mb-3 text-base text-brand-text">Module Progress</h3>
        {MODULE_PROGRESS.map((m) => (
          <div key={m.id} className="mb-3 last:mb-0">
            <div className="mb-1 flex justify-between">
              <span className="text-xs font-black text-brand-text">
                {m.icon} {m.name}
              </span>
              <span className="text-xs font-semibold text-brand-muted">{m.pct}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-brand-border">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${m.pct}%`, background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <section className="mx-4 mb-8 rounded-3xl border border-brand-border bg-white p-6">
        <p className="text-sm font-black uppercase tracking-wide text-brand-muted">
          {report.periodLabel}
        </p>
        <h2 className="font-display mt-1 text-2xl text-brand-text">{report.childName}</h2>
        <h3 className="font-display mt-6 text-lg text-brand-text">Highlights</h3>
        <ul className="mt-3 space-y-2">
          {report.highlights.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-2xl bg-brand-off px-4 py-3 text-sm font-semibold text-brand-text"
            >
              <span className="text-brand-teal" aria-hidden>
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
