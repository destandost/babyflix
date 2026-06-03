import { FrogPondGame } from "@/components/games/FrogPondGame";
import { GameShellHeader } from "@/components/games/GameShellHeader";
import { PageShell } from "@/components/PageShell";

export default function FrogPondPage() {
  return (
    <PageShell>
      <GameShellHeader title="Frog Pond" character="dragon" />
      <p className="px-5 text-sm font-semibold text-brand-muted">
        Tap the flies — watch the tongue snap!
      </p>
      <div className="mt-4 px-4 pb-8">
        <FrogPondGame />
      </div>
    </PageShell>
  );
}
