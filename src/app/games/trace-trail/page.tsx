import { TraceTrailGame } from "@/components/games/TraceTrailGame";
import { GameShellHeader } from "@/components/games/GameShellHeader";
import { PageShell } from "@/components/PageShell";

export default function TraceTrailPage() {
  return (
    <PageShell>
      <GameShellHeader title="Trace Trail" character="dino" />
      <p className="px-5 text-sm font-semibold text-brand-muted">
        Follow the dotted path with your finger.
      </p>
      <div className="mt-4 px-4 pb-8">
        <TraceTrailGame />
      </div>
    </PageShell>
  );
}
