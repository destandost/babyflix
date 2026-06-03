import { BubbleCatchGame } from "@/components/games/BubbleCatchGame";
import { GameShellHeader } from "@/components/games/GameShellHeader";
import { PageShell } from "@/components/PageShell";

export default function BubbleCatchPage() {
  return (
    <PageShell>
      <GameShellHeader title="Bubble Catch" character="fish" />
      <p className="px-5 text-sm font-semibold text-brand-muted">
        Drag the basket and catch falling bubbles!
      </p>
      <div className="mt-4 px-4 pb-8">
        <BubbleCatchGame />
      </div>
    </PageShell>
  );
}
