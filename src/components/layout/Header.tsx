"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { container } from "@/components/ui/styles";
import { sectionIds, sectionNumber, sections, siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="relative border-b border-line/70 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
        <nav aria-label="Primary" className={cn(container, "flex h-16 items-center justify-between gap-6")}>
          <a href="#top" className="group flex items-center gap-2.5 rounded-lg" aria-label={`${siteConfig.name}, back to top`}>
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-accent to-accent-2 text-base font-bold text-white shadow-md shadow-accent/30 transition group-hover:rotate-[-6deg]"
            >
              A
            </span>
            <span className="text-base font-semibold tracking-tight">{siteConfig.shortName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative isolate rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-surface-muted ring-1 ring-line"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface text-foreground transition hover:border-accent/50 md:hidden"
            >
              {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-0.5 origin-left bg-linear-to-r from-accent to-accent-2"
          style={{ scaleX: progress }}
        />
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-b border-line/70 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <ul className={cn(container, "flex flex-col py-3")}>
              {sections.map(({ id, label }) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex items-center gap-4 rounded-xl px-3 py-3 text-base font-medium transition-colors",
                        isActive ? "bg-surface-muted text-foreground" : "text-muted hover:text-foreground",
                      )}
                    >
                      <span className="font-mono text-xs text-accent">{sectionNumber(id)}</span>
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
