import Link from "next/link";

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

export function FeatureCard({
  href,
  title,
  description,
  emoji,
  color,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={`group flex min-h-[140px] flex-col justify-between rounded-3xl bg-gradient-to-br ${color} p-5 text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:min-h-[160px] sm:p-6`}
    >
      <span className="text-4xl sm:text-5xl" aria-hidden>
        {emoji}
      </span>
      <div>
        <h2 className="font-display text-xl font-bold sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm font-medium text-white/90 sm:text-base">
          {description}
        </p>
      </div>
    </Link>
  );
}
