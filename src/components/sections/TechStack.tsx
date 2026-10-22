import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { stack } from "@/data/stack";

// Bento layout on large screens: two wide cards on top, three below.
const spans = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "sm:col-span-2 lg:col-span-2"];

export function TechStack() {
  return (
    <Section id="stack" title="Tools I build with">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {stack.map(({ name, icon: Icon, items }, i) => (
          <Reveal key={name} delay={i * 0.06} className={spans[i]}>
            <article className="group h-full rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="text-base font-semibold">{name}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-background px-3 py-1.5 text-sm font-medium"
                  >
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-linear-to-br from-accent to-accent-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
