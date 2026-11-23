import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Mail, X } from 'lucide-react';
import { buildEmailUrl, WebsiteProject } from '../data/siteContent';

interface ProjectLightboxProps {
  project: WebsiteProject | null;
  onClose: () => void;
}

export function ProjectLightbox({ project, onClose }: ProjectLightboxProps) {
  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  const emailUrl = buildEmailUrl('websites');

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-3 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-obsidian-border bg-obsidian-surface text-[#F5F4F0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 border-b border-obsidian-border px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h2
                  id="lightbox-project-title"
                  className="truncate font-display text-lg font-semibold text-[#F5F4F0]"
                >
                  {project.clientName} — {project.businessType}
                </h2>
                <p className="mt-0.5 text-xs text-[#96948C]">
                  {project.category} &middot; {project.country} &middot; Full-page design preview (scroll below)
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-obsidian-border bg-obsidian-elevated text-[#C8C6BE] transition-colors duration-150 hover:border-champagne hover:text-champagne-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Body: scrollable screenshot + project notes */}
            <div className="grid flex-1 overflow-y-auto lg:grid-cols-12">
              <div className="max-h-[68vh] overflow-y-auto border-b border-obsidian-border bg-obsidian p-3 sm:p-5 lg:col-span-8 lg:max-h-[75vh] lg:border-r lg:border-b-0">
                <img
                  src={project.imageSrc}
                  alt={project.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full rounded-lg border border-obsidian-border object-cover object-top"
                />
              </div>

              <div className="flex flex-col justify-between space-y-6 p-5 sm:p-6 lg:col-span-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-champagne-light">
                      Overview
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#C8C6BE]">
                      {project.summary}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-[#96948C]">
                      The problem
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#C8C6BE]">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-[#96948C]">
                      What we delivered
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#C8C6BE]">
                      {project.whatIDid}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-[#96948C]">
                      Key elements
                    </h3>
                    <ul className="mt-2 space-y-1.5 text-sm text-[#C8C6BE]">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-champagne"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-3 border-t border-obsidian-border pt-4">
                  <a
                    href={emailUrl}
                    className="luxury-shimmer-btn inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2.5 text-sm font-semibold text-obsidian transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Want something like this? Email us</span>
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
