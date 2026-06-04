import { redirect } from "next/navigation";

export default function CountStarsRedirect() {
  redirect("/games/number-bonds");
}
