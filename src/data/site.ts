import type { NavSection } from "@/types";

export const siteConfig = {
  name: "Achira Sandaruwan",
  shortName: "Achira",
  title: "Achira Sandaruwan — Aspiring Software Engineer",
  role: "Aspiring Software Engineer · Undergraduate at University of Moratuwa",
  tagline: "I build fast, accessible web products end to end.",
  description:
    "Portfolio of Achira Sandaruwan, an aspiring software engineer and University of Moratuwa undergraduate building fast, accessible, full-stack web products with React, Next.js, TypeScript and Node.js.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "achirasandaruwan123@gmail.com",
  location: "Katubedda, Moratuwa, Sri Lanka",
  resumeUrl: "https://drive.google.com/file/d/1IgGMLRfABsItJ4oUnXW9KfNMGta6c7lS/view?usp=sharing",
  // Google Drive share link ("Anyone with the link can view")
  profileImage: "https://drive.google.com/file/d/1l35EJ6nZ3zw5jHewtIklr6YvtdHwg7A7/view?usp=sharing",
  // TODO: replace with your real profile URLs.
  socials: {
    github: "https://github.com/ASandaruwan",
    linkedin: "https://www.linkedin.com/in/achira-sandaruwan-7802b6306/?isSelfProfile=true",
    medium: "https://medium.com/@achirasandaruwan123",
  },
  keywords: [
    "Achira Sandaruwan",
    "Software Engineer",
    "Full-stack developer",
    "University of Moratuwa",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Sri Lanka",
    "Portfolio",
  ],
} as const;

export const sections = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "articles", label: "Articles" },
  { id: "contact", label: "Contact" },
] as const satisfies readonly NavSection[];

export type SectionId = (typeof sections)[number]["id"];

export const sectionIds: readonly SectionId[] = sections.map((s) => s.id);

/** "01", "02", … for a section id, following its order in `sections`. */
export function sectionNumber(id: SectionId): string {
  return String(sectionIds.indexOf(id) + 1).padStart(2, "0");
}
