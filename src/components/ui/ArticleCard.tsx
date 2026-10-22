import Image from "next/image";
import { ArrowRight, Newspaper } from "lucide-react";
import type { Article } from "@/types";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { Tag } from "./Tag";

// Fixed locale and time zone so server and client render the same string.
const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

interface ArticleCardProps {
  article: Article;
  /** Resolved cover image; a placeholder is shown when undefined. */
  imageSrc: string | undefined;
  index: number;
}

export function ArticleCard({ article, imageSrc, index }: ArticleCardProps) {
  const { title, url, publishedAt, tags } = article;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 focus-within:border-accent/40 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
      <div className="relative aspect-[2/1] overflow-hidden border-b border-line">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
            unoptimized={imageSrc.includes("medium.com") || imageSrc.includes("googleusercontent.com") || imageSrc.endsWith(".svg")}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder icon={Newspaper} variant={index + 1} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <time dateTime={publishedAt} className="font-mono text-xs text-muted">
          {dateFormat.format(new Date(publishedAt))}
        </time>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-balance">{title}</h3>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          {/* The ::after overlay makes the whole card clickable. */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            Read on Medium
            <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-1" />
            <span className="sr-only">: {title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
