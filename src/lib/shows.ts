export interface ShowEpisode {
  id: string;
  title: string;
  description: string;
  emoji: string;
  duration: string;
  /** Set when the episode can be played */
  videoUrl?: string;
  moduleTag?: string;
}

/**
 * Replace `videoUrl` with `/shows/your-file.mp4` after adding MP4s to `public/shows/`.
 * The sample URL is a short placeholder clip for development.
 */
export const SHOW_EPISODES: ShowEpisode[] = [
  {
    id: "counting-forest-1",
    title: "Counting Forest",
    description: "Count animals and trees from 1 to 10 in the forest.",
    emoji: "🌲",
    duration: "8 min",
    moduleTag: "Math",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "letter-parade-1",
    title: "Letter Parade",
    description: "Letters dance through town — coming soon.",
    emoji: "🎪",
    duration: "10 min",
    moduleTag: "Alphabet",
  },
  {
    id: "kindness-club-1",
    title: "Kindness Club",
    description: "Friends learn to share and listen — coming soon.",
    emoji: "💛",
    duration: "12 min",
    moduleTag: "Social skills",
  },
];

export function getPlayableEpisodes() {
  return SHOW_EPISODES.filter((e) => e.videoUrl);
}

export function getEpisode(id: string) {
  return SHOW_EPISODES.find((e) => e.id === id);
}
