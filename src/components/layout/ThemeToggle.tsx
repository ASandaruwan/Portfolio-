"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = mounted ? theme === "dark" : false;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-[3.75rem] shrink-0 cursor-pointer items-center rounded-full border border-line bg-surface-muted px-1 transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Sun aria-hidden="true" className="absolute left-2 size-3.5 text-muted/70" />
      <Moon aria-hidden="true" className="absolute right-2 size-3.5 text-muted/70" />
      <span
        className={cn(
          "relative z-10 grid size-6 place-items-center rounded-full bg-surface shadow-sm ring-1 ring-line transition-transform duration-150 ease-out",
          mounted
            ? isDark
              ? "translate-x-[1.75rem]"
              : "translate-x-0"
            : "dark:translate-x-[1.75rem]"
        )}
      >
        <Sun
          aria-hidden="true"
          className={cn(
            "size-3.5 text-amber-500",
            mounted ? (isDark ? "hidden" : "block") : "dark:hidden"
          )}
        />
        <Moon
          aria-hidden="true"
          className={cn(
            "size-3.5 text-accent",
            mounted ? (isDark ? "block" : "hidden") : "hidden dark:block"
          )}
        />
      </span>
    </button>
  );
}
