"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honors the visitor's reduced-motion setting for every animation on the page. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
