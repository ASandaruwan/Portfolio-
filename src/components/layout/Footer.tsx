import { ArrowUp } from "lucide-react";
import { container } from "@/components/ui/styles";
import { cn } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={cn(
          container,
          "flex flex-col items-center justify-between gap-4 pt-8 pb-20 text-center sm:flex-row sm:text-left xl:pb-8",
        )}
      >
        <p className="text-sm text-muted">
          © 2026 Achira Sandaruwan. Designed & Developed by Achira Sandaruwan.
        </p>
        <a
          href="#top"
          className="group inline-flex items-center gap-2 rounded-full text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Back to top
          <span className="grid size-8 place-items-center rounded-full border border-line transition group-hover:-translate-y-0.5 group-hover:border-accent/50">
            <ArrowUp aria-hidden="true" className="size-4" />
          </span>
        </a>
      </div>
    </footer>
  );
}
