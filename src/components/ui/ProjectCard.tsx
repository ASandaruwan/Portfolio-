"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, FolderGit2, Play, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { resolveImageSrcs, resolveVideoSrc } from "@/lib/images";
import type { Project } from "@/types";
import { GitHubIcon } from "./BrandIcons";
import { ImagePlaceholder } from "./ImagePlaceholder";
import { buttonSmall } from "./styles";
import { Tag } from "./Tag";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { title, description, sourceUrl } = project;
  const images = resolveImageSrcs(project.image, project.images);
  const videoSource = resolveVideoSrc(project.video);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const [showVideo, setShowVideo] = useState(false);

  const liveUrl = project.liveUrl?.trim();
  const tags = project.tags.filter((tag) => tag.trim() !== "");

  const hasMultipleImages = images.length > 1;
  const activeImage = images[currentIndex];
  const isImageFailed = !activeImage || failedIndices.has(currentIndex);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
      <div className="relative aspect-video overflow-hidden border-b border-line bg-surface-muted">
        {showVideo && videoSource ? (
          videoSource.type === "embed" ? (
            <iframe
              src={videoSource.src}
              title={`Demo video for ${title}`}
              className="size-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={videoSource.src}
              controls
              playsInline
              className="size-full object-cover"
            />
          )
        ) : !isImageFailed ? (
          <Image
            key={activeImage}
            src={activeImage}
            alt={`Screenshot ${currentIndex + 1} of ${title}`}
            fill
            sizes="(min-width: 1152px) 560px, (min-width: 768px) 50vw, 100vw"
            unoptimized={activeImage.includes("googleusercontent.com") || activeImage.endsWith(".svg")}
            onError={() => {
              setFailedIndices((prev) => new Set(prev).add(currentIndex));
            }}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder icon={FolderGit2} variant={index} />
        )}

        {/* Media mode toggle if video is available */}
        {videoSource && (
          <div className="absolute top-3 left-3 z-20 flex items-center rounded-lg border border-white/15 bg-black/60 p-0.5 backdrop-blur-md">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowVideo(false);
              }}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                !showVideo ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
              }`}
            >
              <ImageIcon className="size-3" />
              Photos
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowVideo(true);
              }}
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                showVideo ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
              }`}
            >
              <Play className="size-3 fill-current" />
              Video
            </button>
          </div>
        )}

        {/* Carousel controls if there are multiple screenshots */}
        {!showVideo && hasMultipleImages && (
          <>
            {/* Slide counter badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-0.5 font-mono text-[11px] font-medium text-white/95 backdrop-blur-md border border-white/10 shadow-sm pointer-events-none">
              <span>{currentIndex + 1}</span>
              <span className="opacity-50">/</span>
              <span>{images.length}</span>
            </div>

            {/* Navigation arrows (reveals on hover on desktop, always visible on mobile/focus) */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={`Previous image of ${title}`}
              className="absolute left-2.5 top-1/2 z-20 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-line/80 bg-surface/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-surface focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={`Next image of ${title}`}
              className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2 flex size-8 items-center justify-center rounded-full border border-line/80 bg-surface/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-surface focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>

            {/* Pagination indicator dots */}
            <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 backdrop-blur-md border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentIndex(i);
                  }}
                  aria-label={`View image ${i + 1} of ${images.length} for ${title}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technologies used in ${title}`}>
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-3 pt-6">
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={buttonSmall}>
            <GitHubIcon className="size-3.5" />
            View Source
            <span className="sr-only"> of {title} (opens in a new tab)</span>
          </a>
          {liveUrl ? (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={buttonSmall}>
              <ExternalLink aria-hidden="true" className="size-3.5" />
              Live Demo
              <span className="sr-only"> of {title} (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
