"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface AboutHighlightsProps {
  projectsCount?: number;
  articlesCount?: number;
  yearsCount?: number;
}

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return count;
}

function StatItem({ stat, inView }: { stat: Stat; inView: boolean }) {
  const count = useCountUp(stat.value, inView);

  return (
    <div className="about-stat-item group relative flex flex-col items-center justify-center gap-1 py-3 px-2 sm:py-4 sm:px-4 text-center">
      <div className="flex items-baseline gap-0.5">
        <span className="text-2xl font-bold tracking-tight text-gradient sm:text-4xl">
          {count}
        </span>
        {stat.suffix && (
          <span className="text-lg font-bold text-accent sm:text-2xl">
            {stat.suffix}
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium tracking-wider text-muted uppercase sm:text-xs">
        {stat.label}
      </span>
    </div>
  );
}

export function AboutHighlights({
  projectsCount = 3,
  articlesCount = 4,
  yearsCount = 3,
}: AboutHighlightsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const stats: Stat[] = [
    { value: projectsCount, suffix: "+", label: "Projects Built" },
    { value: articlesCount, suffix: "+", label: "Medium Articles" },
    { value: yearsCount, suffix: "+", label: "Years Coding" },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="about-highlights-bar grid grid-cols-3 divide-x divide-line/40 rounded-2xl border border-line/60 bg-surface/80 p-2 backdrop-blur-sm sm:p-4"
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} inView={inView} />
      ))}
    </div>
  );
}
