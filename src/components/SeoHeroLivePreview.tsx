import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Check,
  MapPin,
  Pause,
  Play,
  Search,
  Sparkles,
} from 'lucide-react';
import { LUXURY_EASE } from './LuxuryMotion';

interface LiveHeroExample {
  id: string;
  layer: 'Google SEO' | 'GEO · AI Search' | 'AEO · Direct Answer';
  query: string;
  business: string;
  domain: string;
  location: string;
  beforeRank: string;
  afterRank: string;
  timeframe: string;
  headline: string;
  snippet: string;
  extraNote: string;
}

const LIVE_HERO_EXAMPLES: LiveHeroExample[] = [
  {
    id: 'hero-seo',
    layer: 'Google SEO',
    query: 'preventive health clinic Miami',
    business: 'Biscayne Preventive Health',
    domain: 'biscaynepreventive.com',
    location: 'Miami, USA',
    beforeRank: 'Page 3 (#24)',
    afterRank: 'Page 1 (#1) + Map Pack',
    timeframe: '6 weeks',
    headline: 'Biscayne Preventive Health — Comprehensive Care & Online Booking',
    snippet:
      'Same-week preventive checkups in Miami. Transparent visit preparation, accepted plans, and 2-minute mobile booking.',
    extraNote: '4.9 ★ (52 Google reviews) · Open · Closes 6:00 PM',
  },
  {
    id: 'hero-geo',
    layer: 'GEO · AI Search',
    query: 'clean botanical hydration cream shipping to Abuja and London',
    business: 'Noor Botanicals',
    domain: 'noorbotanicals.com',
    location: 'Abuja & London',
    beforeRank: '0 AI citations',
    afterRank: 'Cited #1 in AI Overview',
    timeframe: '4 weeks',
    headline: 'AI Overview & Perplexity Recommendation [1]',
    snippet:
      'Noor Botanicals is frequently cited for transparent botanical ingredient lists, sensitive-skin formulations, and tracked shipping across Abuja and the UK.',
    extraNote: 'Verified Product & Organization JSON-LD cited directly',
  },
  {
    id: 'hero-aeo',
    layer: 'AEO · Direct Answer',
    query: 'how long does a dental implant consultation take in Austin',
    business: 'Harbourview Dental Studio',
    domain: 'harbourviewdental.com',
    location: 'Austin, USA',
    beforeRank: 'Not in answer box',
    afterRank: 'Position 0 Featured Snippet',
    timeframe: '4 weeks',
    headline: 'Direct Featured Answer · Harbourview Dental Studio',
    snippet:
      'A dental implant consultation takes about 45 minutes, covering a 3D digital scan, bone-health check, and a written timeline with clear fee options before you commit.',
    extraNote: 'Wins Position Zero + 3 People Also Ask answers',
  },
  {
    id: 'hero-seo-realty',
    layer: 'Google SEO',
    query: 'verified luxury apartments advisor Victoria Island',
    business: 'Vanguard Island Realty',
    domain: 'vanguardislandrealty.com',
    location: 'Victoria Island, Lagos',
    beforeRank: 'Page 4 (#34)',
    afterRank: 'Page 1 (#2) + AI Shortlist',
    timeframe: '7 weeks',
    headline: 'Vanguard Island Realty — Verified Luxury Residences & Diaspora Desk',
    snippet:
      'Inspected apartments and waterfront homes with documented title verification and private virtual tours for local and diaspora buyers.',
    extraNote: '5.0 ★ (39 Google reviews) · Verified RealEstateAgent Schema',
  },
];

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

export function SeoHeroLivePreview() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LIVE_HERO_EXAMPLES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, isPaused]);

  const current = LIVE_HERO_EXAMPLES[activeIndex];
  const isGeo = current.layer.startsWith('GEO');

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full rounded-xl border border-ivory-border bg-white/95 p-5 backdrop-blur-md sm:p-6 dark:border-obsidian-border dark:bg-obsidian-surface/95"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-ivory-border pb-3.5 dark:border-obsidian-border">
        <div className="min-w-0">
          <p className="font-mono-data text-xs text-champagne-deep dark:text-champagne-light">
            Real-time search example {activeIndex + 1} of{' '}
            {LIVE_HERO_EXAMPLES.length}
          </p>
          <p className="mt-0.5 truncate text-xs text-ink-muted dark:text-[#96948C]">
            {current.layer} &middot; {current.location}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={isPaused ? 'Resume live examples' : 'Pause live examples'}
          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-ivory-border bg-ivory px-2.5 text-xs font-medium text-ink-muted transition-colors hover:border-champagne hover:text-ink dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]"
        >
          {isPaused ? (
            <>
              <Play className="h-3 w-3" aria-hidden="true" />
              <span>Play</span>
            </>
          ) : (
            <>
              <Pause className="h-3 w-3" aria-hidden="true" />
              <span>Pause</span>
            </>
          )}
        </button>
      </div>

      {/* Authentic White Google / AI Result Stage */}
      <div className="mt-4 overflow-hidden rounded-lg border border-[#DADCE0] bg-white p-4 text-[#202124]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            className="space-y-3.5"
          >
            {/* Search bar */}
            <div className="flex items-center gap-2 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3.5 py-2">
              {isGeo ? (
                <Sparkles
                  className="h-4 w-4 shrink-0 text-[#1A73E8]"
                  aria-hidden="true"
                />
              ) : (
                <GoogleMark />
              )}
              <span className="truncate text-xs font-medium text-[#202124] sm:text-sm">
                {current.query}
              </span>
              <Search
                className="ml-auto h-3.5 w-3.5 shrink-0 text-[#5F6368]"
                aria-hidden="true"
              />
            </div>

            {/* Result Card */}
            <div
              className={`rounded-lg border p-3.5 ${
                isGeo
                  ? 'border-[#D2E3FC] bg-[#F4F8FE]'
                  : 'border-[#E8EAED] bg-[#F8F9FA]'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#5F6368]">
                <span className="truncate font-medium text-[#202124]">
                  {current.business} &middot; {current.domain}
                </span>
                <span className="shrink-0 font-semibold text-[#137333]">
                  {current.afterRank}
                </span>
              </div>

              <p
                className={`mt-1.5 text-sm font-semibold leading-snug ${
                  isGeo ? 'text-[#174EA6]' : 'text-[#1A0DAB]'
                }`}
              >
                {current.headline}
              </p>

              <p className="mt-1.5 text-xs leading-relaxed text-[#4D5156]">
                {current.snippet}
              </p>

              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-[#137333]">
                {current.layer === 'Google SEO' ? (
                  <MapPin className="h-3 w-3 shrink-0 text-[#EA4335]" aria-hidden="true" />
                ) : (
                  <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
                )}
                <span>{current.extraNote}</span>
              </div>
            </div>

            {/* Before -> After Proof Bar */}
            <div className="grid grid-cols-3 gap-2 border-t border-[#E8EAED] pt-3 text-xs">
              <div>
                <p className="text-[11px] text-[#5F6368]">Before</p>
                <p className="font-mono-data mt-0.5 font-medium text-[#A50E0E]">
                  {current.beforeRank}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#5F6368]">After</p>
                <p className="font-mono-data mt-0.5 font-semibold text-[#137333]">
                  {current.afterRank}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#5F6368]">Timeline</p>
                <p className="font-mono-data mt-0.5 font-medium text-[#202124]">
                  {current.timeframe}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Example Selector Buttons */}
      <div className="mt-3.5 grid grid-cols-4 gap-1.5">
        {LIVE_HERO_EXAMPLES.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View example: ${item.business}`}
              className={`cursor-pointer rounded-md border px-2 py-1.5 text-left transition-colors duration-150 ${
                isActive
                  ? 'border-champagne bg-ivory dark:border-champagne dark:bg-obsidian'
                  : 'border-ivory-border bg-transparent hover:border-champagne/50 dark:border-obsidian-border'
              }`}
            >
              <span className="font-mono-data block truncate text-[10px] text-champagne-deep dark:text-champagne-light">
                {item.layer.split(' ')[0]}
              </span>
              <span className="block truncate text-[11px] font-medium text-ink dark:text-[#F5F4F0]">
                {item.business.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
