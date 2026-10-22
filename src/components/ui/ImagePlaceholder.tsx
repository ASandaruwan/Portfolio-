import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const gradients = [
  "from-indigo-500/25 via-violet-500/10 to-cyan-400/25",
  "from-cyan-500/25 via-sky-400/10 to-emerald-400/25",
  "from-fuchsia-500/20 via-rose-400/10 to-amber-300/25",
  "from-emerald-500/20 via-teal-400/10 to-indigo-400/25",
];

interface ImagePlaceholderProps {
  icon: LucideIcon;
  /** Picks one of the gradient presets; pass the card index for variety. */
  variant?: number;
}

/** Decorative stand-in for a missing thumbnail or cover image. */
export function ImagePlaceholder({ icon: Icon, variant = 0 }: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex size-full items-center justify-center overflow-hidden bg-surface-muted bg-linear-to-br",
        gradients[variant % gradients.length],
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <span className="relative grid size-14 place-items-center rounded-2xl border border-line bg-surface/80 text-muted shadow-sm backdrop-blur transition duration-500 group-hover:scale-110 group-hover:text-accent">
        <Icon className="size-6" />
      </span>
    </div>
  );
}
