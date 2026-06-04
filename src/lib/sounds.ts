import { Howl } from "howler";

function sfx(src: string, volume: number) {
  return new Howl({ src: [src], volume, html5: true });
}

export const SFX = {
  correct: sfx("/audio/sfx/correct.wav", 0.7),
  wrong: sfx("/audio/sfx/wrong.wav", 0.5),
  pop: sfx("/audio/sfx/pop.wav", 0.6),
  whoosh: sfx("/audio/sfx/whoosh.wav", 0.5),
  coin: sfx("/audio/sfx/coin.wav", 0.6),
  win: sfx("/audio/sfx/win.wav", 0.8),
  tick: sfx("/audio/sfx/tick.wav", 0.4),
};
