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

