import type { CharacterId } from "@/components/characters/Characters";

export interface ShopAvatarItem {
  id: string;
  char: CharacterId;
  name: string;
  price: number;
  owned: boolean;
}

/** Unlockable avatars for the coin shop (wire into shop UI when added). */
export const SHOP_AVATAR_ITEMS: ShopAvatarItem[] = [
  { id: "girl", char: "girl", name: "Lily", price: 40, owned: false },
  { id: "boy", char: "boy", name: "Leo", price: 40, owned: false },
  { id: "grandma", char: "grandma", name: "Grandma", price: 60, owned: false },
  { id: "baby", char: "baby", name: "Baby", price: 30, owned: false },
  { id: "teacher", char: "teacher", name: "Teacher", price: 60, owned: false },
  { id: "lion", char: "lion", name: "Lion", price: 70, owned: false },
  { id: "elephant", char: "elephant", name: "Elephant", price: 80, owned: false },
  { id: "penguin", char: "penguin", name: "Penguin", price: 50, owned: false },
  { id: "owl", char: "owl", name: "Owl", price: 60, owned: false },
  { id: "koala", char: "koala", name: "Koala", price: 50, owned: false },
  { id: "panda", char: "panda", name: "Panda", price: 70, owned: false },
  { id: "giraffe", char: "giraffe", name: "Giraffe", price: 80, owned: false },
  { id: "parrot", char: "parrot", name: "Parrot", price: 60, owned: false },
  { id: "frog", char: "frog", name: "Frog", price: 40, owned: false },
];
