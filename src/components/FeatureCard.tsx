import Link from "next/link";
import { Character, type CharacterId } from "@/components/characters/Characters";

interface FeatureCardProps {
  href: string;
  title: string;
  description: string;
  character: CharacterId;
  gradient: string;
  shadow: string;
}

export function FeatureCard({
  href,
  title,
  description,
  character,
  gradient,
  shadow,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[120px] overflow-hidden rounded-3xl p-4 text-left text-white transition-transform active:scale-[0.97]"
      style={{ background: gradient, boxShadow: shadow }}
    >
      <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10" />
      <div className="relative z-10 flex flex-1 flex-col justify-between">
        <Character id={character} size={56} className="mb-2" />
        <div>
          <h2 className="font-display text-lg leading-tight">{title}</h2>
          <p className="mt-1 text-xs font-bold text-white/80">{description}</p>
        </div>
      </div>
    </Link>
  );
}
