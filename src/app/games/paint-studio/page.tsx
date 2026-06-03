import { PaintStudioGame } from "@/components/games/PaintStudioGame";
import { PageShell } from "@/components/PageShell";

export default function PaintStudioPage() {
  return (
    <PageShell>
      <div className="px-4 pb-8">
        <PaintStudioGame />
      </div>
    </PageShell>
  );
}
