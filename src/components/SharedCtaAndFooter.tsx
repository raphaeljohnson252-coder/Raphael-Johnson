import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Mail, MessageCircle } from 'lucide-react';
import {
  buildEmailUrl,
  buildWhatsAppUrl,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  ServiceSlug,
  WHATSAPP_NUMBER_DISPLAY,
} from '../data/siteContent';
import { RouteLink, useRouter } from '../router';
import { LegalDocType, LegalModal } from './LegalModal';
import { LUXURY_EASE, MagneticWrap, RevealBlock } from './LuxuryMotion';

function getServiceFromPath(pathname: string): ServiceSlug | undefined {
  if (pathname === '/websites') return 'websites';
  if (pathname === '/flyers-and-print') return 'flyers';
  if (pathname.startsWith('/ai-videos')) return 'videos';
  if (pathname === '/seo-geo-aeo') return 'seo';
  return undefined;
}

export function SharedCtaAndFooter() {
  const { path } = useRouter();
  const activeService = getServiceFromPath(path);
  const emailUrl = buildEmailUrl(activeService);
  const whatsappUrl = buildWhatsAppUrl(activeService);

  const [legalDoc, setLegalDoc] = useState<LegalDocType | null>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 640);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Shared Contact Call To Action (above the footer on every page) */}
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock>
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl space-y-3">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
                  Ready to talk?
                </h2>
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                  Message us on WhatsApp or email your website link—we&apos;ll reply with a free homepage mockup and a clear fixed quote.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <MagneticWrap>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-champagne px-5 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>WhatsApp us</span>
                  </a>
                </MagneticWrap>
                <a
                  href={emailUrl}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ivory-border bg-ivory px-5 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Email us</span>
                </a>
                <RouteLink
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white px-5 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  Get a free mockup
                </RouteLink>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Shared Footer */}
      <footer className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2.5 text-sm text-ink-muted dark:text-[#C8C6BE]">
              <p className="font-medium text-ink dark:text-[#F5F4F0]">
                &copy; 2026 {BUSINESS_NAME}. Websites, print, AI video &amp; Google SEO, GEO and AEO worldwide.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-ink-muted dark:text-[#96948C]">
                <span className="inline-flex items-center gap-1.5">
                  <span>WhatsApp:</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono-data text-ink underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-champagne-deep dark:text-[#E8E6DF] dark:decoration-obsidian-border-strong dark:hover:text-champagne-light"
                  >
                    {WHATSAPP_NUMBER_DISPLAY}
                  </a>
                </span>
                <span aria-hidden="true">&middot;</span>
                <span className="inline-flex items-center gap-1.5">
                  <span>Email:</span>
                  <a
                    href={emailUrl}
                    className="text-ink underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-champagne-deep dark:text-[#E8E6DF] dark:decoration-obsidian-border-strong dark:hover:text-champagne-light"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-ink-muted dark:text-[#C8C6BE]"
              >
                <RouteLink
                  to="/"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  Home
                </RouteLink>
                <RouteLink
                  to="/websites"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  Websites
                </RouteLink>
                <RouteLink
                  to="/flyers-and-print"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  Flyers &amp; Print
                </RouteLink>
                <RouteLink
                  to="/ai-videos"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  AI Videos
                </RouteLink>
                <RouteLink
                  to="/seo-geo-aeo"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  SEO, GEO &amp; AEO
                </RouteLink>
                <RouteLink
                  to="/contact"
                  className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
                >
                  Contact
                </RouteLink>
              </nav>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted dark:text-[#96948C]">
                <button
                  type="button"
                  onClick={() => setLegalDoc('privacy')}
                  className="cursor-pointer underline decoration-ivory-border underline-offset-4 transition-colors hover:text-ink dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                >
                  Privacy Policy
                </button>
                <span aria-hidden="true">&middot;</span>
                <button
                  type="button"
                  onClick={() => setLegalDoc('terms')}
                  className="cursor-pointer underline decoration-ivory-border underline-offset-4 transition-colors hover:text-ink dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Subtle Back-to-Top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: LUXURY_EASE }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed right-5 bottom-5 z-30 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-ivory-border bg-white/95 text-ink shadow-md backdrop-blur-sm transition-colors hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/95 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      <LegalModal activeDoc={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
}
