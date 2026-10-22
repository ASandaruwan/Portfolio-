"use client";

import { AnimatePresence, motion } from "motion/react";
import { sectionIds, sectionNumber, sections } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

const total = String(sections.length).padStart(2, "0");

/**
 * Shows which numbered section (01–06) is in view: a clickable rail on wide
 * screens and a compact pill on smaller ones.
 */
export function ScrollTracker() {
  const active = useActiveSection(sectionIds);
  const activeLabel = sections.find((s) => s.id === active)?.label;

  return (
    <>
      <nav
        aria-label="Section progress"
        className={cn(
          "fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 transition-opacity duration-500 xl:block",
          active ? "opacity-100" : "opacity-50",
        )}
      >
        <ol className="flex flex-col items-end gap-2">
          {sections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center gap-3 rounded-md py-1.5 pl-2"
                >
                  <span
                    className={cn(
                      "text-xs font-medium transition duration-300",
                      isActive
                        ? "translate-x-0 text-foreground opacity-100"
                        : "translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-xs tabular-nums transition-colors",
                      isActive ? "text-accent" : "text-muted/70 group-hover:text-foreground",
                    )}
                  >
                    {sectionNumber(id)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-px transition-all duration-300",
                      isActive ? "w-8 bg-accent" : "w-4 bg-muted/40 group-hover:w-6",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="section-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
            className="fixed right-4 bottom-4 z-40 flex items-center gap-2.5 rounded-full border border-line bg-background/80 py-2 pr-4 pl-3 font-mono text-xs shadow-lg shadow-black/5 backdrop-blur-xl xl:hidden"
          >
            <span className="relative inline-flex h-4 w-5 overflow-hidden text-accent">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute inset-0 tabular-nums"
                >
                  {sectionNumber(active)}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-muted">/ {total}</span>
            <span className="font-sans font-medium text-foreground">{activeLabel}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
