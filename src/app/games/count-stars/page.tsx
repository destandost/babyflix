import { redirect } from "next/navigation";

export default function CountStarsRedirect() {
  redirect("/games/frog-pond");
}
