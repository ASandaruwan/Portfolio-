import { ArrowUpRight } from "lucide-react";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { MediumIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { buttonSecondary } from "@/components/ui/styles";
import { siteConfig } from "@/data/site";
import { resolveImageSrc } from "@/lib/images";
import { getMediumArticles } from "@/lib/medium";

export async function Articles() {
  const articles = await getMediumArticles();

  // A cover set in the data file wins; otherwise use the one from Medium.
  const coverFor = (url: string, image: string | undefined) => {
    return resolveImageSrc(image) || image || undefined;
  };

  return (
    <Section
      id="articles"
      title="Latest articles"
      description="Notes on what I'm learning — web development, tooling, and the occasional career lesson."
      action={
        <a
          href={siteConfig.socials.medium}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonSecondary}
        >
          <MediumIcon className="size-4" />
          Read all on Medium
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      }
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {articles.map((article, i) => (
          <li key={article.id}>
            <Reveal delay={(i % 2) * 0.08} className="h-full">
              <ArticleCard article={article} imageSrc={coverFor(article.url, article.image)} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
