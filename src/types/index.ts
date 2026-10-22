import type { LucideIcon } from "lucide-react";

export interface NavSection {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /**
   * Screenshot(s): a file in /public, a direct URL, a Google Drive share link,
   * or an array of image links for multi-image carousel. Empty or omitted shows a placeholder.
   */
  image?: string | string[];
  /** Optional additional screenshots for carousel display */
  images?: string[];
  tags: string[];
  /** Repository link for the "View Source" button. */
  sourceUrl: string;
  /** Deployed site for the "Live Demo" button. Empty or omitted hides the button. */
  liveUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  /** Full Medium article link. */
  url: string;
  /** ISO 8601 date, e.g. "2026-05-14". */
  publishedAt: string;
  /**
   * Cover override: a file in /public or a Google Drive share link. Empty or
   * omitted uses the article's cover from Medium, then a placeholder.
   */
  image?: string;
  tags: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface StackCategory {
  name: string;
  icon: LucideIcon;
  items: string[];
}
