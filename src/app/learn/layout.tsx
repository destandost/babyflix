"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { getChildAge } from "@/lib/child-profile";
import {
  getLearnSubjectFromPath,
  isSubjectAppropriateForAge,
} from "@/lib/recommendations";

export default function LearnLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  useEffect(() => {
    const age = getChildAge();
    if (age === null) return;

    const subjectId = getLearnSubjectFromPath(pathname);
    if (!subjectId) return;

    if (!isSubjectAppropriateForAge(subjectId, age)) {
      router.replace("/learn");
    }
  }, [pathname, router]);

  return children;
}
