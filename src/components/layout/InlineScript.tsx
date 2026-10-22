"use client";

/**
 * A script that runs while the HTML is parsed, before React loads. On the client
 * it renders as `text/plain`, so React never re-runs it or warns about rendering
 * a <script> (the pattern from Next.js's "Preventing flash before hydration" guide).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
