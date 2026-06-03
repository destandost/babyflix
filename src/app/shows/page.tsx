import { PageShell } from "@/components/PageShell";
import { ShowPlayer } from "@/components/shows/ShowPlayer";
import { getPlayableEpisodes } from "@/lib/shows";

export default function ShowsPage() {
  const playable = getPlayableEpisodes();

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        📺 Shows
      </h1>
      <p className="mt-2 max-w-2xl text-violet-700">
        Watch gentle episodes on a tablet or browser.{" "}
        {playable.length > 0
          ? `${playable.length} episode ready to play now.`
          : "Episodes coming soon."}
      </p>

      <div className="mt-8">
        <ShowPlayer />
      </div>
    </PageShell>
  );
}
