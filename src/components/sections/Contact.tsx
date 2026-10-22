import { Mail } from "lucide-react";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/Section";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { buttonPrimary, card, container } from "@/components/ui/styles";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 size-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div className={cn(container, "grid gap-12 lg:grid-cols-2 lg:gap-16")}>
        <Reveal>
          <SectionEyebrow id="contact" />
          <h2 id="contact-heading" className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Want to work together, or just <span className="text-gradient">say hi?</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-pretty text-muted">
            Whether it&apos;s an internship, a project, or a question about something I wrote, my inbox is
            open. I&apos;ll get back to you as soon as I can.
          </p>
          <a href={`mailto:${siteConfig.email}`} className={cn(buttonPrimary, "mt-8 max-w-full")}>
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{siteConfig.email}</span>
          </a>
          <SocialLinks className="mt-8" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className={cn(card, "p-6 shadow-xl shadow-accent/5 sm:p-8")}>
            <h3 className="text-lg font-semibold">Send a message</h3>
            <p className="mt-1 text-sm text-muted">All fields are required.</p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
