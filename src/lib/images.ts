// Matches the file ID in Drive links like ".../file/d/<id>/view?usp=sharing" or ".../open?id=<id>".
const DRIVE_FILE_ID = /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)([\w-]{10,})/;

/**
 * Normalizes an image value from the data files for next/image:
 * - "" or undefined → undefined (callers show a placeholder)
 * - an array of strings → resolves the first image
 * - a Google Drive share link → direct image URL via lh3.googleusercontent.com
 * - anything else, e.g. "/images/projects/app.png", is returned unchanged
 */
export function resolveImageSrc(src: string | string[] | undefined): string | undefined {
  if (Array.isArray(src)) {
    return resolveImageSrc(src[0]);
  }
  if (typeof src !== "string") return undefined;

  const value = src.trim();
  if (!value) return undefined;

  const driveId = value.match(DRIVE_FILE_ID)?.[1];
  return driveId ? `https://lh3.googleusercontent.com/d/${driveId}` : value;
}

/**
 * Resolves one or multiple image sources (strings, arrays, or undefined) into
 * an array of clean, direct image URLs.
 */
export function resolveImageSrcs(
  src: string | string[] | undefined,
  extra?: string[] | undefined
): string[] {
  const rawList: string[] = [];

  if (Array.isArray(src)) {
    rawList.push(...src);
  } else if (typeof src === "string") {
    rawList.push(src);
  }

  if (Array.isArray(extra)) {
    rawList.push(...extra);
  }

  return rawList
    .map((item) => (typeof item === "string" ? resolveImageSrc(item) : undefined))
    .filter((item): item is string => Boolean(item && item.trim() !== ""));
}

export type VideoSource =
  | { type: "file"; src: string }
  | { type: "embed"; src: string };

/**
 * Parses and normalizes video sources:
 * - Local files (e.g. "/videos/demo.mp4") or direct video links -> { type: "file", src }
 * - YouTube, Vimeo, Google Drive video previews -> { type: "embed", src: "<embed-url>" }
 */
export function resolveVideoSrc(url: string | undefined): VideoSource | undefined {
  if (!url) return undefined;
  const value = url.trim();
  if (!value) return undefined;

  // YouTube
  const ytMatch = value.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  if (ytMatch) {
    return { type: "embed", src: `https://www.youtube.com/embed/${ytMatch[1]}` };
  }

  // Google Drive video preview
  const driveId = value.match(DRIVE_FILE_ID)?.[1];
  if (driveId) {
    return { type: "embed", src: `https://drive.google.com/file/d/${driveId}/preview` };
  }

  // Vimeo
  const vimeoMatch = value.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return { type: "embed", src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Direct video file (e.g. /videos/project.mp4 or direct URL)
  return { type: "file", src: value };
}

