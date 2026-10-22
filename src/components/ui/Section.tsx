import type { ReactNode } from "react";
import { sectionNumber, sections, type SectionId } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { container } from "./styles";

interface SectionProps {
  id: SectionId;
  title: ReactNode;
  description?: ReactNode;
  /** Rendered opposite the heading on wide screens, e.g. a "view all" link. */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** "01 —— ABOUT" label shown above a section heading. */
export function SectionEyebrow({ id }: { id: SectionId }) {
  const label = sections.find((s) => s.id === id)?.label;

  return (
    <p className="flex items-center gap-3 font-mono text-sm">
      <span className="text-accent">{sectionNumber(id)}</span>
      <span aria-hidden="true" className="h-px w-10 bg-accent/40" />
      <span className="tracking-[0.2em] text-muted uppercase">{label}</span>
    </p>
  );
}

/** A numbered page section with a consistent heading block. */
export function Section({ id, title, description, action, className, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-20 sm:py-28", className)}>
      <div className={container}>
        <div className="mb-12 flex flex-col gap-6 sm:mb-16 sm:flex-row sm:items-end sm:justify-between">
          <Reveal className="max-w-2xl">
            <SectionEyebrow id={id} />
            <h2 id={headingId} className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            {description ? <p className="mt-4 text-pretty text-muted">{description}</p> : null}
          </Reveal>
          {action ? (
            <Reveal delay={0.1} className="shrink-0">
              {action}
            </Reveal>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
