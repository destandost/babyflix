"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getEpisode, SHOW_EPISODES } from "@/lib/shows";
import { getWatchedEpisodeIds, markEpisodeWatched } from "@/lib/show-progress";

const DEFAULT_EPISODE_ID = "counting-forest-1";

export function ShowPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeId, setActiveId] = useState(DEFAULT_EPISODE_ID);
  const [isPlaying, setIsPlaying] = useState(false);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);

  const active = getEpisode(activeId) ?? getEpisode(DEFAULT_EPISODE_ID)!;

  useEffect(() => {
    setWatchedIds(getWatchedEpisodeIds());
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    videoRef.current?.load();
  }, [activeId]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !active.videoUrl) return;

    if (video.paused) {
      void video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [active.videoUrl]);

  const handleEnded = () => {
    setIsPlaying(false);
    markEpisodeWatched(active.id);
    setWatchedIds(getWatchedEpisodeIds());
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <section className="overflow-hidden rounded-3xl bg-slate-900 shadow-xl ring-2 ring-indigo-200">
        <div className="relative aspect-video bg-black">
          {active.videoUrl ? (
            <>
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                src={active.videoUrl}
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleEnded}
              />
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/35 transition hover:bg-black/45"
                  aria-label={`Play ${active.title}`}
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-4xl shadow-lg">
                    ▶️
                  </span>
                  <span className="font-display text-lg font-bold text-white">
                    Tap to play
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center text-white/80">
              <span className="text-5xl" aria-hidden>
                🔒
              </span>
              <p className="font-display text-xl font-bold text-white">Coming soon</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-5">
          <div>
            <p className="font-display text-lg font-bold text-white">
              {active.emoji} {active.title}
            </p>
            <p className="text-sm text-indigo-200">{active.duration}</p>
          </div>
          {active.videoUrl && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="rounded-full bg-indigo-500 px-5 py-2 font-display text-sm font-bold text-white transition hover:bg-indigo-400"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          )}
        </div>
      </section>

      <aside>
        <h2 className="font-display text-lg font-bold text-violet-900">Episodes</h2>
        <ul className="mt-3 space-y-2">
          {SHOW_EPISODES.map((episode) => {
            const isActive = episode.id === activeId;
            const isWatched = watchedIds.includes(episode.id);
            const playable = Boolean(episode.videoUrl);

            return (
              <li key={episode.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(episode.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-violet-900 shadow-sm ring-1 ring-violet-100 hover:ring-violet-300"
                  }`}
                >
                  <span className="text-3xl" aria-hidden>
                    {episode.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="font-display font-bold">{episode.title}</span>
                    <span
                      className={`mt-0.5 block text-sm ${
                        isActive ? "text-indigo-100" : "text-violet-600"
                      }`}
                    >
                      {episode.duration}
                      {episode.moduleTag && ` · ${episode.moduleTag}`}
                    </span>
                    {!playable && (
                      <span
                        className={`mt-1 inline-block text-xs font-bold uppercase ${
                          isActive ? "text-indigo-200" : "text-violet-400"
                        }`}
                      >
                        Soon
                      </span>
                    )}
                    {isWatched && (
                      <span
                        className={`mt-1 ml-2 inline-block text-xs font-bold ${
                          isActive ? "text-emerald-200" : "text-emerald-600"
                        }`}
                      >
                        ✓ Watched
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-4 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-700">
          Tip: drop your own MP4 into{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">public/shows/</code> and
          point <code className="rounded bg-white px-1 py-0.5 text-xs">videoUrl</code> in{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs">src/lib/shows.ts</code>.
        </p>
      </aside>
    </div>
  );
}
