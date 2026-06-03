import { FeatureCard } from "@/components/FeatureCard";
import { HomeLanguageBanner } from "@/components/language/HomeLanguageBanner";
import { PageShell } from "@/components/PageShell";
import { HOME_SECTIONS } from "@/lib/features";

export default function HomePage() {
  return (
    <PageShell>
      <section className="mb-8 text-center sm:mb-10">
        <p className="text-5xl sm:text-6xl" aria-hidden>
          🍼✨
        </p>
        <h1 className="font-display mt-3 text-3xl font-extrabold text-violet-900 sm:text-4xl">
          Welcome to babyflix
        </h1>
        <p className="mx-auto mt-2 max-w-lg text-base text-violet-700 sm:text-lg">
          Shows, games, and lessons for curious kids ages 2–7. Pick something
          fun below!
        </p>
      </section>

      <HomeLanguageBanner />

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {HOME_SECTIONS.map((section) => (
          <FeatureCard key={section.href} {...section} />
        ))}
      </div>
    </PageShell>
  );
}
