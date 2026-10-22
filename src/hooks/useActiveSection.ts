"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently being read: the last one whose top
 * has crossed `threshold` (a fraction of the viewport height). Returns `null`
 * while the visitor is above the first section, e.g. on the hero.
 *
 * `ids` should be a stable (module-level) array.
 */
export function useActiveSection<T extends string>(
  ids: readonly T[],
  threshold = 0.35,
): T | null {
  const [active, setActive] = useState<T | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * threshold;
      let current: T | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // The last section may be too short to reach the line; treat the page bottom as reaching it.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && ids.length > 0) current = ids[ids.length - 1];

      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, threshold]);

  return active;
}
