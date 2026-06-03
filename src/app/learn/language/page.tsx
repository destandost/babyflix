import Link from "next/link";
import { LanguagePicker } from "@/components/language/LanguagePicker";
import { PhraseList } from "@/components/language/PhraseList";
import { PageShell } from "@/components/PageShell";
import { LANGUAGES } from "@/lib/languages";
import { PHRASE_COUNT } from "@/lib/phrases";

export default function LanguageLearnPage() {
  return (
    <PageShell>
      <Link
        href="/learn"
        className="text-sm font-semibold text-violet-600 hover:text-violet-800"
      >
        ← Learn
      </Link>

      <div className="mt-4 rounded-3xl bg-gradient-to-br from-violet-400 to-purple-600 p-6 text-white shadow-lg sm:p-8">
        <span className="text-5xl" aria-hidden>
          🗣️
        </span>
        <h1 className="font-display mt-3 text-3xl font-extrabold">Language</h1>
        <p className="mt-2 max-w-xl text-white/95">
          Choose any language you want to learn — {LANGUAGES.length} built-in
          languages, {PHRASE_COUNT} words each with 🔊 audio, plus a custom option.
        </p>
      </div>

      <section className="mt-8">
        <Link
          href="/learn/quiz/language"
          className="flex gap-4 rounded-3xl bg-gradient-to-br from-amber-300 to-orange-400 p-5 text-white shadow-lg transition hover:scale-[1.01]"
        >
          <span className="text-4xl" aria-hidden>
            📝
          </span>
          <div>
            <p className="font-display text-lg font-extrabold">Word Match quiz</p>
            <p className="text-sm text-white/95">
              5 questions in your chosen language — Spanish, Turkish, Japanese, and more
            </p>
            <span className="mt-2 inline-block text-sm font-bold text-amber-100">
              Start quiz →
            </span>
          </div>
        </Link>
      </section>

      <div className="mt-8">
        <LanguagePicker />
      </div>

      <PhraseList />
    </PageShell>
  );
}
