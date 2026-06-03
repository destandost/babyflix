const WATCHED_KEY = "babyflix-shows-watched";

export function getWatchedEpisodeIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function markEpisodeWatched(id: string): void {
  const watched = new Set(getWatchedEpisodeIds());
  watched.add(id);
  localStorage.setItem(WATCHED_KEY, JSON.stringify([...watched]));
}

export function getWatchedCount(): number {
  return getWatchedEpisodeIds().length;
}
