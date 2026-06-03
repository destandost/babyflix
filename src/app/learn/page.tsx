import Link from "next/link";
import { Character } from "@/components/characters/Characters";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";
import { learnModuleCardBlurb, getLearnModuleHref } from "@/lib/learn-nav";
import { SUBJECT_UI } from "@/lib/ui-catalog";

export default function LearnPage() {
  return (
    <PageShell>
      <div
        className="mx-4 mb-5 rounded-4xl p-5"
        style={{
          background: "linear-gradient(135deg, #FFD600, #FF6B4A)",
          boxShadow: "0 8px 32px rgba(255,214,0,0.3)",
        }}
      >
        <h1 className="font-display mb-1 text-2xl text-white">Learn Hub ⭐</h1>
        <p className="text-sm font-semibold text-white/85">
          Pick a subject and start earning XP!
        </p>
      </div>

      <div className="mb-3 px-5">
        <h2 className="font-display text-xl text-brand-text">Subjects</h2>
        <p className="mt-1 text-sm font-semibold text-brand-muted">
          Activities and quizzes — all earn XP.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 px-4 pb-6">
        {LEARNING_MODULES.map((mod) => {
          const ui = SUBJECT_UI[mod.id];
          const blurb = learnModuleCardBlurb(mod.id);
          if (!ui) return null;
          return (
            <li key={mod.id}>
              <Link
                href={getLearnModuleHref(mod.id)}
                className="relative flex min-h-[148px] flex-col justify-between overflow-hidden rounded-3xl p-4 text-white transition-transform active:scale-[0.97]"
                style={{ background: ui.gradient, boxShadow: ui.shadow }}
              >
                <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
                <Character id={ui.character} size={52} className="relative z-10" />
                <div className="relative z-10">
                  <h2 className="font-display text-lg leading-tight">{mod.title}</h2>
                  <p className="mt-1 text-xs font-bold text-white/85">{mod.description}</p>
                  <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-white/70">
                    {blurb}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mx-4 mb-8 rounded-3xl border border-brand-border bg-brand-off p-4 text-center">
        <p className="text-sm font-semibold text-brand-muted">
          <span className="font-display font-bold text-brand-text">Language lab</span> — 28+
          languages with 🔊 audio
        </p>
        <Link
          href="/learn/language"
          className="btn-primary mt-3 inline-block text-sm"
        >
          Open language lab
        </Link>
      </section>
    </PageShell>
  );
}
