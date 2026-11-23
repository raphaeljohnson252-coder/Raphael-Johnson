import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { LUXURY_EASE } from './LuxuryMotion';

interface PageHeroBackdropProps {
  imageSrc?: string;
  images?: string[];
  videos?: string[];
  intervalMs?: number;
}

export function PageHeroBackdrop({
  imageSrc,
  images,
  videos,
  intervalMs = 5500,
}: PageHeroBackdropProps) {
  const shouldReduceMotion = useReducedMotion();

  const imageList =
    images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];
  const videoList = videos && videos.length > 0 ? videos : [];
  const hasVideos = videoList.length > 0 && !shouldReduceMotion;
  const totalSlides = hasVideos ? videoList.length : imageList.length;

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [totalSlides]);

  useEffect(() => {
    if (shouldReduceMotion || totalSlides <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, totalSlides, intervalMs]);

  const safeIndex = totalSlides > 0 ? activeIndex % totalSlides : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-ivory dark:bg-obsidian"
    >
      <div className="relative h-full w-full">
        <AnimatePresence initial={false} mode="sync">
          {hasVideos ? (
            <motion.div
              key={`video-bg-${safeIndex}-${videoList[safeIndex]}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: LUXURY_EASE }}
              className="absolute inset-0 h-full w-full"
            >
              <video
                src={videoList[safeIndex]}
                autoPlay
                muted
                playsInline
                preload="metadata"
                onEnded={() => {
                  if (videoList.length > 1) {
                    setActiveIndex((prev) => (prev + 1) % videoList.length);
                  }
                }}
                className="h-full w-full object-cover object-center opacity-30 dark:opacity-50"
              />
            </motion.div>
          ) : (
            imageList.length > 0 && (
              <motion.div
                key={`img-bg-${safeIndex}-${imageList[safeIndex]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: LUXURY_EASE }}
                className="absolute inset-0 h-full w-full"
              >
                <img
                  src={imageList[safeIndex]}
                  alt=""
                  loading={safeIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={safeIndex === 0 ? 'high' : 'low'}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center opacity-25 dark:opacity-50"
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Measured contrast scrim for both light ivory and obsidian black modes */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/80 via-ivory/85 to-ivory dark:from-obsidian/55 dark:via-obsidian/70 dark:to-obsidian" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.10),transparent_58%)]" />
    </div>
  );
}
