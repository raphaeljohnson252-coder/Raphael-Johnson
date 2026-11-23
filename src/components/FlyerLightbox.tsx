import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, X } from 'lucide-react';
import { buildEmailUrl, FlyerSample } from '../data/siteContent';

interface FlyerLightboxProps {
  flyer: FlyerSample | null;
  onClose: () => void;
}

export function FlyerLightbox({ flyer, onClose }: FlyerLightboxProps) {
  useEffect(() => {
    if (!flyer) return;
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
  }, [flyer, onClose]);

  const emailUrl = buildEmailUrl('flyers');

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {flyer && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-flyer-title"
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
                  id="lightbox-flyer-title"
                  className="truncate font-display text-lg font-semibold text-[#F5F4F0]"
                >
                  {flyer.title}
                </h2>
                <p className="mt-0.5 text-xs text-[#96948C]">
                  {flyer.styleLabel} &middot; {flyer.format}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close flyer preview"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-obsidian-border bg-obsidian-elevated text-[#C8C6BE] transition-colors duration-150 hover:border-champagne hover:text-champagne-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="grid flex-1 overflow-y-auto lg:grid-cols-12">
              <div className="flex items-center justify-center border-b border-obsidian-border bg-obsidian p-4 sm:p-6 lg:col-span-7 lg:border-r lg:border-b-0">
                <img
                  src={flyer.imageSrc}
                  alt={flyer.imageAlt}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto rounded-lg border border-obsidian-border object-contain"
                />
              </div>

              <div className="flex flex-col justify-between space-y-6 p-5 sm:p-6 lg:col-span-5">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-champagne-light">
                      Layout direction
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#C8C6BE]">
                      {flyer.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-[#96948C]">
                      Format &amp; output
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#C8C6BE]">
                      {flyer.format} — customised to your clinic logo, colours, and approved wording.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-[#96948C]">
                      Ideal use
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#C8C6BE]">
                      {flyer.whereUsed}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-obsidian-border pt-4">
                  <a
                    href={emailUrl}
                    className="luxury-shimmer-btn inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2.5 text-sm font-semibold text-obsidian transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Want a flyer like this? Email us</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
