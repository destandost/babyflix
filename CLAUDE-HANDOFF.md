# babyflix — handoff for Claude (or any AI)

Copy this entire file into Claude, or share the repo link after you push the branch.

---

## Links

| What | URL |
|------|-----|
| **GitHub repo** | https://github.com/destandost/babyflix |
| **Current branch** | `cursor/neural-voice-learn-arcade` |
| **Latest commit** | `1260781` — *Add neural TTS, expanded Learn hub, and voice-enabled Arcade games.* |
| **Branch on GitHub** (after push) | https://github.com/destandost/babyflix/tree/cursor/neural-voice-learn-arcade |
| **Local dev** | http://localhost:3000 |

Push the branch if the GitHub link 404s:

```bash
git push -u origin cursor/neural-voice-learn-arcade
```

---

## What this app is

**babyflix** — kids learning app, ages **2–7**. Web-first (Next.js). Two main areas:

1. **Learn** (`/learn`) — subjects, lessons, quizzes, language word library with 🔊 audio, XP → leaderboard  
2. **Arcade** (`/games`) — play-only mini-games (no Learn cross-links): Frog Pond, Paint Studio, Bubble Catch, Trace Trail

Also: `/shows`, `/leaderboard`, `/parents` (mock data).

---

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind 4  
- **Speech:** Microsoft Edge neural TTS via `edge-tts-universal` → `GET /api/tts?lang=&text=`  
- Optional offline phrase MP3s in `public/audio/phrases/{lang}/{phraseId}.mp3`  
- XP/leaderboard: `localStorage` in `src/lib/xp.ts`

---

## User preferences (important)

- Likes **Frog Pond** and **Paint Studio**  
- Dislikes hard timers / quiz pressure in Arcade  
- **Learn and Arcade must stay separate** (no cross-promo links)  
- Rejected chipmunk/high-pitch browser “kid voice” — use **clear neural TTS** (Duolingo-style), normal pitch, slightly faster rate (`+8%`)  
- Wants **same neural voice on all Arcade game buttons** (`GameButton` + `speakGame()`)

---

## Speech architecture

```
Tap 🔊 or GameButton
  → speakPhrase / speakGame
  → static MP3 if public/audio/phrases/... exists
  → else fetch /api/tts (Edge neural voice)
  → else browser TTS fallback
```

| File | Role |
|------|------|
| `src/lib/edge-voices.ts` | Neural voice per language (`en` = JennyNeural for games) |
| `src/lib/speech.ts` | Client playback, cache, `speakGame()` |
| `src/app/api/tts/route.ts` | Server MP3 synthesis (`runtime = "nodejs"`) |
| `src/components/language/SpeakButton.tsx` | Learn language 🔊 |
| `src/components/games/GameButton.tsx` | Arcade buttons → `speakGame()` |
| `scripts/generate-phrase-audio.ts` | `npm run generate:audio` — cache phrase MP3s |

**Note:** Finnish static cache may be incomplete (0 files under `fi/`); live API uses `fi-FI-NooraNeural`.

---

## Learn structure

- Hub: `/learn` — 6 subjects grid  
- Per subject: `/learn/{subject}` + activities (e.g. `/learn/language`, `/learn/motor-skills/balance`)  
- Quizzes: `/learn/quiz/[moduleId]` — math, language, alphabet, social-skills, arts, motor-skills  
- **Language:** 28 built-in languages + custom; `src/lib/languages.ts`, `PhraseList`, dynamic `LanguageQuiz` in chosen language  
- **XP:** `recordQuizResult()` — 10 XP per correct + 15 perfect bonus  

Key libs: `lessons.ts`, `learn-nav.ts`, `quizzes.ts`, `language-vocabulary.ts`, `language-quiz.ts`

---

## Arcade games (`src/lib/games.ts`)

| Game | Route | Component |
|------|-------|-----------|
| Bubble Catch | `/games/bubble-catch` | `BubbleCatchGame.tsx` |
| Trace Trail | `/games/trace-trail` | `TraceTrailGame.tsx` |
| Frog Pond | `/games/frog-pond` | `FrogPondGame.tsx` |
| Paint Studio | `/games/paint-studio` | `PaintStudioGame.tsx` |

Redirects: letter-garden, word-match, etc. → paint-studio.

---

## Commands

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run generate:audio   # optional: pre-cache phrase MP3s (needs network)
```

---

## Suggested next work

1. Push `cursor/neural-voice-learn-arcade` and open PR  
2. Finish Finnish phrase cache: `npm run generate:audio` (after `fi` voice fix)  
3. Add neural voice to **Learn activity buttons** (feelings, balance, etc.) if desired  
4. Auth, real video on `/shows`, backend leaderboard  

---

## Project root

`/Users/destandost/Projects/babyflix`

---

*Generated for sharing with Claude — update commit hash after new commits.*
