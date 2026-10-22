import { About } from "@/components/sections/About";
import { Articles } from "@/components/sections/Articles";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { TechStack } from "@/components/sections/TechStack";
import { siteConfig } from "@/data/site";
import { resolveImageSrc } from "@/lib/images";

const profileImage = resolveImageSrc(siteConfig.profileImage);

// Structured data so search engines can show a rich result for the person.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: profileImage ? new URL(profileImage, siteConfig.url).toString() : undefined,
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Aspiring Software Engineer",
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Moratuwa",
    addressCountry: "LK",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Moratuwa" },
    { "@type": "HighSchool", name: "Ibbagamuwa Central College" },
  ],
  knowsAbout: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Full-stack web development"],
  sameAs: Object.values(siteConfig.socials),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Journey />
      <TechStack />
      <Projects />
      <Articles />
      <Contact />
    </>
  );
}
