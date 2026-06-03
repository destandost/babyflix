export const BUDDY_REACTIONS = [
  "Yay!",
  "Hehe!",
  "Wowee!",
  "Again!",
  "So sparkly!",
  "Silly!",
  "Boing!",
  "Tee-hee!",
];

export const SNACK_REACTIONS = [
  "Nom nom!",
  "Crunch!",
  "Yummy tum!",
  "More please!",
  "Burp!",
  "Delish!",
];

export function randomFrom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
