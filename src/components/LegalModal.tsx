import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import {
  BUSINESS_NAME,
  CONTACT_EMAIL,
  WHATSAPP_NUMBER_DISPLAY,
} from '../data/siteContent';

export type LegalDocType = 'privacy' | 'terms';

interface LegalModalProps {
  activeDoc: LegalDocType | null;
  onClose: () => void;
}

export function LegalModal({ activeDoc, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!activeDoc) return;
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
  }, [activeDoc, onClose]);

  if (typeof document === 'undefined') return null;

  const isPrivacy = activeDoc === 'privacy';

  return createPortal(
    <AnimatePresence>
      {activeDoc && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-ivory-border bg-white text-ink shadow-2xl dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#F5F4F0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-ivory-border px-5 py-4 sm:px-6 dark:border-obsidian-border">
              <div>
                <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                  {BUSINESS_NAME} &middot; Legal
                </p>
                <h2
                  id="legal-modal-title"
                  className="mt-0.5 font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]"
                >
                  {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close legal notice"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-ivory-border bg-ivory text-ink-muted transition-colors hover:border-champagne hover:text-ink dark:border-obsidian-border dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-5 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-ink-muted sm:px-6 dark:text-[#C8C6BE]">
              {isPrivacy ? (
                <>
                  <p className="text-xs text-ink-muted dark:text-[#96948C]">
                    Last updated: 2026
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      1. Information we receive
                    </h3>
                    <p>
                      When you contact {BUSINESS_NAME} by email ({CONTACT_EMAIL}) or business WhatsApp ({WHATSAPP_NUMBER_DISPLAY}), we only receive the details you choose to share—such as your name, business name, website link, and project notes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      2. How we use your details
                    </h3>
                    <p>
                      Your information is used strictly to review your website, prepare a mockup or project quote, communicate about active work, and deliver your finished files. We never sell, rent, or trade your contact details to third parties.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      3. Browser storage &amp; cookies
                    </h3>
                    <p>
                      This website stores a single local preference in your browser solely to remember your light or dark theme selection. We do not run invasive advertising trackers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      4. Data requests &amp; removal
                    </h3>
                    <p>
                      You may request deletion of any project emails, messages, or draft files at any time by writing to {CONTACT_EMAIL}.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-ink-muted dark:text-[#96948C]">
                    Last updated: 2026
                  </p>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      1. Quotes &amp; minimum pricing
                    </h3>
                    <p>
                      Starting prices displayed on this website (in US dollars) represent minimum project rates. Every project receives a clear, written fixed quote after reviewing your scope—there are no hidden charges or automatic monthly retainers unless specifically requested.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      2. Typical turnaround times
                    </h3>
                    <p>
                      Standard delivery estimates are 5–7 days for websites, 3–5 days for flyers and print, 2–5 days for short AI promo videos, and 7–10 days for Google SEO, GEO &amp; AEO setup. Timelines begin once project details and required assets are confirmed.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      3. Revisions &amp; client approval
                    </h3>
                    <p>
                      Reasonable revision rounds are included prior to final sign-off so wording, layout, and branding match your business accurately.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      4. Ownership &amp; rights
                    </h3>
                    <p>
                      Upon final payment, you receive full usage ownership of your final website code, print-ready flyer files, video deliverables, and on-page SEO/schema work created specifically for your project.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end border-t border-ivory-border px-5 py-3.5 sm:px-6 dark:border-obsidian-border">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg bg-champagne px-5 py-2 text-sm font-semibold text-obsidian transition-colors hover:bg-champagne-light"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
