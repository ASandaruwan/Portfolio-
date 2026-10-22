import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <Section id="journey" title="Education & milestones">
      {/* ::before draws the vertical line connecting every milestone. */}
      <ol className="relative max-w-3xl before:absolute before:top-2 before:bottom-2 before:left-[19.5px] before:w-px before:bg-linear-to-b before:from-accent before:via-accent-2/60 before:to-transparent">
        {journey.map(({ period, title, description, icon: Icon }, i) => (
          <li key={title} className="relative pb-10 pl-16 last:pb-0">
            <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-line bg-surface text-accent shadow-sm ring-4 ring-background">
              <Icon aria-hidden="true" className="size-[18px]" />
            </span>
            <Reveal delay={i * 0.08}>
              <div className="rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
                <p className="font-mono text-xs text-accent">{period}</p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
