import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  MapPin,
  PenLine,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { buttonPrimary, buttonSecondary, card } from "@/components/ui/styles";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { getMediumArticles } from "@/lib/medium";
import { cn } from "@/lib/utils";
import { AboutHighlights } from "@/components/ui/AboutHighlights";

const bio = [
  "I'm an Aspiring Software Engineer and undergraduate at the University of Moratuwa, specializing in building fast, accessible web products with modern web technologies.",
  "I have a strong foundation in both frontend and backend technologies, and I enjoy creating seamless user experiences while ensuring robust functionality. My passion lies in developing innovative solutions that make a positive impact on users and businesses alike.",
  "I am also a corporate level student at the Institute of Chartered Accountants of Sri Lanka, where I focus on Accounting and finance, financial reporting, auditing, taxation, management accounting, and corporate finance. This unique combination of technical and business knowledge allows me to approach projects with a holistic perspective, ensuring that the solutions I create are not only technically sound but also aligned with business objectives.",
  "I am constantly learning, exploring new architectures, and seeking meaningful engineering challenges.",
];

const pillars = [
  {
    icon: Code2,
    badge: "Technical Engineering",
    title: "Software & Architecture",
    description:
      "Crafting performant, accessible web apps from responsive user interfaces down to secure backend APIs and data stores.",
    skills: ["Next.js & React", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS", "Clean Code"],
    gradient: "from-indigo-500/10 via-accent/5 to-cyan-500/10",
    accentColor: "text-accent",
  },
  {
    icon: TrendingUp,
    badge: "Business & Strategy",
    title: "Finance & Accounting",
    description:
      "Bridging the gap between software engineering and corporate financial goals through chartered accounting discipline.",
    skills: ["CA Sri Lanka (Corporate)", "Financial Analysis", "Auditing", "Cost Optimization", "Business Logic"],
    gradient: "from-cyan-500/10 via-emerald-500/5 to-indigo-500/10",
    accentColor: "text-accent-2",
  },
];

const facts = [
  { icon: MapPin, label: "Based in", value: siteConfig.location },
  { icon: GraduationCap, label: "Currently", value: "B.Sc. (Hons) in IT & Management · Uni. of Moratuwa" },
  { icon: BookOpen, label: "Chartered Accounting", value: "CA Sri Lanka · Corporate Level" },
  { icon: PenLine, label: "Writing", value: "Tech articles on Medium" },
  { icon: Briefcase, label: "Status", value: "Open for Software Engineering Internships" },
];

export async function About() {
  const mediumArticles = await getMediumArticles();
  const articlesCount = mediumArticles.length;
  const projectsCount = projects.length;

  return (
    <Section id="about" title="Engineer at heart, with a head for business.">
      {/* Dynamic stats highlight bar driven by live data */}
      <Reveal>
        <AboutHighlights
          projectsCount={projectsCount}
          articlesCount={articlesCount}
          yearsCount={3}
        />
      </Reveal>

      {/* Dual-Pillar Interactive Showcase Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} delay={idx * 0.1}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-line/70 bg-gradient-to-br p-6 transition-all duration-300 sm:p-7",
                  pillar.gradient,
                  "hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-surface border border-line/60 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className={cn("size-5", pillar.accentColor)} />
                  </span>
                  <span className="rounded-full border border-line/80 bg-surface/80 px-3 py-1 font-mono text-[11px] font-medium tracking-wide uppercase text-muted">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-line/40">
                  {pillar.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-md bg-surface/90 px-2.5 py-1 text-xs font-medium text-foreground/90 border border-line/50 transition-colors group-hover:border-accent/30"
                    >
                      <CheckCircle2 className="size-3 text-accent shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        {/* Bio content with rich typography & quick actions */}
        <div className="space-y-6">
          <div className="space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg">
            {bio.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p
                  className={cn(
                    i === 0 && "text-lg font-medium text-foreground sm:text-xl",
                    i === 2 && "rounded-2xl border-l-2 border-accent/70 bg-surface-muted/40 p-4 text-base italic text-foreground/90 sm:p-5"
                  )}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Quick action buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonPrimary, "text-xs sm:text-sm")}
              >
                <FileText className="size-4" />
                <span>View Full Resume</span>
                <ArrowUpRight className="size-3.5 opacity-70" />
              </a>
              <a
                href="#contact"
                className={cn(buttonSecondary, "text-xs sm:text-sm")}
              >
                <Sparkles className="size-4 text-accent" />
                <span>Get in Touch</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Quick facts card with animated conic border */}
        <Reveal delay={0.1}>
          <aside
            aria-labelledby="quick-facts-heading"
            className="about-card-glow relative lg:sticky lg:top-28"
          >
            {/* Animated rotating gradient border */}
            <div className="about-gradient-border absolute -inset-px rounded-2xl" />

            <div className={cn(card, "relative z-10 p-6 sm:p-8 backdrop-blur-md")}>
              <div className="flex items-center justify-between">
                <h3
                  id="quick-facts-heading"
                  className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase"
                >
                  <span className="inline-block size-2 rounded-full bg-gradient-to-r from-accent to-accent-2 shadow-sm shadow-accent/50" />
                  Quick facts
                </h3>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available
                </span>
              </div>

              <dl className="mt-6 space-y-5">
                {facts.map(({ icon: Icon, label, value }, idx) => (
                  <div
                    key={label}
                    className="about-fact-item group flex gap-3.5"
                    style={{ "--fact-delay": `${idx * 0.08}s` } as React.CSSProperties}
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent transition-all duration-300 group-hover:from-accent/25 group-hover:to-accent-2/25 group-hover:shadow-md group-hover:shadow-accent/10">
                      <Icon aria-hidden="true" className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-xs font-medium uppercase tracking-wider text-muted">{label}</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* Decorative bottom divider */}
              <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <p className="mt-4 text-center text-xs text-muted/70">
                Moratuwa, Sri Lanka · Open to Remote & On-Site
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
