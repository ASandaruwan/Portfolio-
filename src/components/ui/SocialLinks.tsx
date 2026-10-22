import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "./BrandIcons";

const links = [
  { label: "GitHub", href: siteConfig.socials.github, icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: LinkedInIcon },
  { label: "Medium", href: siteConfig.socials.medium, icon: MediumIcon },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            title={label}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-foreground"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
