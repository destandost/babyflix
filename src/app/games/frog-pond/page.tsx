import Link from "next/link";
import { FrogPondGame } from "@/components/games/FrogPondGame";
import { PageShell } from "@/components/PageShell";

export default function FrogPondPage() {
  return (
    <PageShell className="!bg-[#ecfdf5]">
      <Link
        href="/games"
        className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
      >
        ← Arcade
      </Link>
      <h1 className="font-display mt-4 text-3xl font-extrabold text-emerald-950">
        🐸 Frog Pond
      </h1>
      <p className="mt-1 text-emerald-700">
        Flies pop up around the pond — tap them and watch the tongue snap!
      </p>
      <div className="mt-6">
        <FrogPondGame />
      </div>
    </PageShell>
  );
}
