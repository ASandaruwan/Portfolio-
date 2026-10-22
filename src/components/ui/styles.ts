const buttonBase =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold whitespace-nowrap transition duration-200 disabled:pointer-events-none";

export const buttonPrimary = `${buttonBase} bg-foreground px-6 py-3 text-background shadow-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25`;

export const buttonSecondary = `${buttonBase} border border-line bg-surface px-6 py-3 text-foreground hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md`;

export const buttonSmall =
  "inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-foreground transition hover:border-accent/50 hover:bg-surface-muted";

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export const card = "rounded-2xl border border-line bg-surface";
