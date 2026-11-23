import {
  buildEmailUrl,
  BUSINESS_NAME,
  CONTACT_EMAIL,
  ServiceSlug,
} from '../data/siteContent';
import { RouteLink, useRouter } from '../router';
import { MagneticWrap, RevealBlock } from './LuxuryMotion';

function getServiceFromPath(pathname: string): ServiceSlug | undefined {
  if (pathname === '/websites') return 'websites';
  if (pathname === '/flyers-and-print') return 'flyers';
  if (pathname.startsWith('/ai-videos')) return 'videos';
  return undefined;
}

export function SharedCtaAndFooter() {
  const { path } = useRouter();
  const emailUrl = buildEmailUrl(getServiceFromPath(path));

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
                  Send us your website link and we&apos;ll reply with a free homepage mockup and a clear quote.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <MagneticWrap>
                  <a
                    href={emailUrl}
                    className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    Email us
                  </a>
                </MagneticWrap>
                <RouteLink
                  to="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-ivory px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
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
                &copy; 2026 {BUSINESS_NAME}. Digital design, print and AI video for health businesses.
              </p>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-muted dark:text-[#96948C]">
                <span>Email: </span>
                <a
                  href={emailUrl}
                  className="text-ink underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-champagne-deep dark:text-[#E8E6DF] dark:decoration-obsidian-border-strong dark:hover:text-champagne-light"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>

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
                to="/contact"
                className="whitespace-nowrap transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light"
              >
                Contact
              </RouteLink>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
