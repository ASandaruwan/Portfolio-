import { articles as fallbackArticles } from "@/data/articles";
import { siteConfig } from "@/data/site";
import type { Article } from "@/types";

/** Medium's post ID: the hex suffix of an article URL ("…-names-8c80c13cac50") or "/p/<id>". */
export function mediumPostId(articleUrl: string): string | undefined {
  try {
    const { pathname } = new URL(articleUrl);
    return pathname.match(/(?:-|^\/p\/)([0-9a-f]{8,16})\/?$/)?.[1];
  } catch {
    return undefined;
  }
}

function formatTag(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Automatically syncs articles directly from Achira's live Medium RSS feed.
 * When a new article is posted to Medium, it automatically appears here and
 * updates the total article count.
 *
 * If the feed is unreachable, it seamlessly falls back to the static data
 * in src/data/articles.ts.
 */
export async function getMediumArticles(): Promise<Article[]> {
  const handle = siteConfig.socials.medium.match(/medium\.com\/(@[\w.-]+)/)?.[1];
  if (!handle) return fallbackArticles;

  try {
    const response = await fetch(`https://medium.com/feed/${handle}`, {
      // Re-sync with Medium automatically every hour
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.warn(`[medium] RSS feed responded with status ${response.status}; using fallback articles.`);
      return fallbackArticles;
    }

    const xml = await response.text();
    const items: Article[] = [];

    for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
      const titleMatch =
        item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/);
      const title = titleMatch?.[1]?.trim();
      if (!title) continue;

      const link = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim()?.split("?")[0] || "";
      const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1]?.trim();
      const guid = item.match(/<guid[^>]*>https:\/\/medium\.com\/p\/([0-9a-f]+)<\/guid>/)?.[1];

      let publishedAt = "";
      if (pubDate) {
        const d = new Date(pubDate);
        if (!isNaN(d.getTime())) {
          publishedAt = d.toISOString().split("T")[0];
        }
      }

      // Extract categories/tags from CDATA
      const rawCategories = [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map(
        (m) => m[1]
      );
      const tags = rawCategories.slice(0, 3).map(formatTag);

      // Extract high-res story cover image (skipping Medium 1x1 stat pixels)
      const image = item.match(
        /<img[^>]+src="(https:\/\/(?:cdn-images-1|miro)\.medium\.com\/[^"]+)"/
      )?.[1];

      const id = guid || mediumPostId(link) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      items.push({
        id,
        title,
        url: link,
        publishedAt,
        image: image || "",
        tags: tags.length > 0 ? tags : ["Tech", "Engineering"],
      });
    }

    if (items.length > 0) {
      return items;
    }

    return fallbackArticles;
  } catch (error) {
    console.warn("[medium] Could not fetch live Medium feed; using fallback articles.", error);
    return fallbackArticles;
  }
}

/**
 * Cover images of your Medium articles, keyed by post ID.
 */
export async function getMediumCoverImages(): Promise<Record<string, string>> {
  const articlesList = await getMediumArticles();
  const covers: Record<string, string> = {};

  for (const article of articlesList) {
    if (article.image) {
      covers[article.id] = article.image;
      const pid = mediumPostId(article.url);
      if (pid) covers[pid] = article.image;
    }
  }

  return covers;
}
