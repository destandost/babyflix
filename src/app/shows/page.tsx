import { PageShell } from "@/components/PageShell";
import { PlaceholderBanner } from "@/components/PlaceholderBanner";

const SHOWS = [
  { title: "Counting Forest", emoji: "🌲", duration: "8 min" },
  { title: "Letter Parade", emoji: "🎪", duration: "10 min" },
  { title: "Kindness Club", emoji: "💛", duration: "12 min" },
];

export default function ShowsPage() {
  return (
    <PageShell>
      <h1 className="font-display text-3xl font-extrabold text-violet-900">
        📺 Shows
      </h1>
      <p className="mt-2 text-violet-700">
        Short, gentle episodes kids can watch on a tablet or browser.
      </p>

      <PlaceholderBanner
        title="Coming soon"
        message="Video playback and episode library will plug in here."
      />

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {SHOWS.map((show) => (
          <li
            key={show.title}
            className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md ring-1 ring-violet-100"
          >
            <span className="text-4xl" aria-hidden>
              {show.emoji}
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-violet-900">
                {show.title}
              </h2>
              <p className="text-sm text-violet-600">{show.duration}</p>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
