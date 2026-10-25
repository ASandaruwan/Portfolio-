import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonPrimary, buttonSecondary, container } from "@/components/ui/styles";
import { siteConfig } from "@/data/site";
import { resolveImageSrc } from "@/lib/images";
import { cn } from "@/lib/utils";

// The hero animates with CSS rather than <Reveal> so it's visible before hydration.
const enter = "animate-fade-up motion-reduce:animate-none";
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

const profileSrc = resolveImageSrc(siteConfig.profileImage) ?? "/images/profile.svg";

// A CV hosted elsewhere (e.g. Google Drive) opens in a new tab; a local PDF downloads.
const resumeLinkProps = /^https?:\/\//.test(siteConfig.resumeUrl)
  ? { target: "_blank", rel: "noopener noreferrer" }
  : { download: true };

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Background: soft glows over a faded grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-40 -right-32 size-[26rem] rounded-full bg-accent-2/15 blur-3xl" />
      </div>

      <div className={cn(container, "grid items-center gap-16 lg:grid-cols-[1.25fr_1fr] lg:gap-12")}>
        <div className="text-center lg:text-left">
          <p className={cn(enter, "font-mono text-sm text-accent sm:text-base")}>Hello, I&apos;m</p>
          <h1
            id="hero-heading"
            className={cn(enter, "mt-3 text-5xl leading-[1.05] font-bold tracking-tight sm:text-6xl lg:text-7xl")}
            style={delay(60)}
          >
            Achira <span className="text-gradient">Sandaruwan</span>
          </h1>
          <p className={cn(enter, "mt-6 text-lg font-medium text-foreground/90 sm:text-xl")} style={delay(120)}>
            {siteConfig.role}
          </p>
          <p className={cn(enter, "mx-auto mt-4 max-w-xl text-lg text-pretty text-muted lg:mx-0")} style={delay(180)}>
            {siteConfig.tagline}
          </p>

          <div
            className={cn(enter, "mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start")}
            style={delay(240)}
          >
            <a href="#projects" className={cn(buttonPrimary, "w-full sm:w-auto")}>
              See my work
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
            <a href={siteConfig.resumeUrl} {...resumeLinkProps} className={cn(buttonSecondary, "w-full sm:w-auto")}>
              <Download aria-hidden="true" className="size-4" />
              Download CV
            </a>
          </div>

          <div className={enter} style={delay(300)}>
            <SocialLinks className="mt-8 justify-center lg:justify-start" />
          </div>
        </div>

        <figure className={cn(enter, "relative mx-auto w-full max-w-sm")} style={delay(180)}>
          <div
            aria-hidden="true"
            className="absolute -inset-3 rounded-[2.25rem] bg-linear-to-br from-accent/50 via-accent-2/30 to-transparent opacity-70 blur-2xl"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-2xl shadow-accent/10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-surface-muted">
              <Image
                src={profileSrc}
                alt={`Portrait of ${siteConfig.name}`}
                fill
                priority
                sizes="(min-width: 640px) 384px, 90vw"
                unoptimized={profileSrc.includes("googleusercontent.com") || profileSrc.endsWith(".svg")}
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-background/85 px-4 py-2 text-xs font-medium whitespace-nowrap shadow-lg backdrop-blur-xl sm:text-sm">
            <MapPin aria-hidden="true" className="size-4 text-accent" />
            {siteConfig.location}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
