# babyflix

Educational entertainment for kids ages **2–7**: shows, games, structured learning, leaderboard, and parent progress reports.

## Feature map (from your spec)

| Area | Route | Status |
|------|-------|--------|
| Shows | `/shows` | Placeholder episode list |
| Games | `/games` | Links to module hubs |
| Learning modules | `/learn`, `/learn/[slug]` | Math, language, alphabet, social skills, arts, motor skills |
| Leaderboard | `/leaderboard` | Mock rankings by level/XP |
| Parent reports | `/parents` | Mock weekly progress & highlights |

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS**
- Web-first; structure is ready to add **Expo / React Native** later for mobile

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Next steps (suggested)

1. **Auth & child profiles** — parent account, kid avatars, COPPA-friendly signup
2. **First real game** — e.g. counting or letter match in `/learn/math`
3. **Video shows** — CDN + player component on `/shows`
4. **Leaderboard backend** — XP events, friend/classroom scopes, privacy controls
5. **Parent dialogue** — weekly email + in-app report from real activity data

## Project layout

```
src/
  app/           # Routes (pages)
  components/    # UI (Header, cards, shells)
  lib/           # Types, feature config, mock data
```
