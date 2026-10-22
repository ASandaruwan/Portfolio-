"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { applyTheme, getPreferredTheme, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMedia = () => callback();
  const handleStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) callback();
  };

  mediaQuery.addEventListener("change", handleMedia);
  window.addEventListener("storage", handleStorage);
  return () => {
    mediaQuery.removeEventListener("change", handleMedia);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Theme {
  return getPreferredTheme();
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
    window.dispatchEvent(new StorageEvent("storage", { key: THEME_STORAGE_KEY, newValue: next }));
  }, []);

  const toggleTheme = useCallback(() => {
    const isCurrentlyDark =
      document.documentElement.dataset.theme === "dark" ||
      document.documentElement.classList.contains("dark");
    const next: Theme = isCurrentlyDark ? "light" : "dark";
    setTheme(next);
  }, [setTheme]);

  return { theme, setTheme, toggleTheme, mounted };
}
