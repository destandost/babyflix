import { redirect } from "next/navigation";

export default function SnackShackRedirect() {
  redirect("/games/feed-the-animal");
}
