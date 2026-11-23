import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, X } from 'lucide-react';
import { buildEmailUrl, VideoSample } from '../data/siteContent';

interface VideoLightboxProps {
  video: VideoSample | null;
  onClose: () => void;
}

export function VideoLightbox({ video, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!video) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, onClose]);

  const emailUrl = buildEmailUrl('videos');

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {video && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-video-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-obsidian-border bg-obsidian-surface text-[#F5F4F0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 border-b border-obsidian-border px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h2
                  id="lightbox-video-title"
                  className="truncate font-display text-lg font-semibold text-[#F5F4F0]"
                >
                  {video.title}
                </h2>
                <p className="mt-0.5 text-xs text-[#96948C]">
                  {video.category} &middot; {video.length} &middot; {video.whereUsed}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close video player"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-obsidian-border bg-obsidian-elevated text-[#C8C6BE] transition-colors duration-150 hover:border-champagne hover:text-champagne-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Video player */}
            <div className="bg-black p-3 sm:p-5">
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-obsidian-border bg-black">
                <video
                  key={video.id}
                  src={video.videoSrc}
                  poster={video.thumbnailSrc}
                  controls
                  playsInline
                  className="h-full w-full object-contain"
                >
                  <track
                    kind="captions"
                    src={video.captionsSrc}
                    srcLang="en"
                    label="English captions"
                    default
                  />
                </video>
              </div>
            </div>

            {/* Footer notes & CTA */}
            <div className="flex flex-col justify-between gap-4 border-t border-obsidian-border px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <p className="max-w-xl text-sm leading-relaxed text-[#C8C6BE]">
                {video.whatItExplains}
              </p>
              <a
                href={emailUrl}
                className="luxury-shimmer-btn inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-champagne px-5 py-2.5 text-sm font-semibold text-obsidian whitespace-nowrap transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Want a video like this? Email us</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
