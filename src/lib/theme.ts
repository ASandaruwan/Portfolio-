export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Stored choice, falling back to the OS preference. Browser only. */
export function getPreferredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
  }
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.setAttribute("data-theme", theme);
  if (theme === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
  }
}

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Synchronously sets data-theme and classList so styles match immediately.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.dataset.theme=t;r.setAttribute("data-theme",t);if(t==="dark"){r.classList.add("dark");r.classList.remove("light")}else{r.classList.remove("dark");r.classList.add("light")}}catch(e){}})()`;
