import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";
import { LEARNING_MODULES } from "@/lib/features";

export default function LearnPage() {
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        📚 Learning via Games
      </h1>
      <p className="mt-2 max-w-2xl text-violet-700">
        Structured modules from your feature list: math, language, alphabet,
        social skills, arts, and motor skills.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LEARNING_MODULES.map((mod) => (
          <FeatureCard
            key={mod.id}
            href={`/learn/${mod.id}`}
            title={mod.title}
            description={mod.description}
            emoji={mod.emoji}
            color={mod.color}
          />
        ))}
      </div>
    </PageShell>
  );
}
