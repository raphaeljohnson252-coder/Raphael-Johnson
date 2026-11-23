import { useState } from 'react';
import { Check, Mail, Maximize2 } from 'lucide-react';
import flyerTrifoldBackdrop from '../assets/images/bg_flyer_trifold_obsidian_1794878154751.jpg';
import flyerSpreadBackdrop from '../assets/images/bg_flyer_editorial_spread_1794878154314.jpg';
import flyersBackdrop from '../assets/images/bg_flyers_obsidian_1794871450441.jpg';
import { FaqItem, FaqList } from '../components/FaqList';
import { FlyerLightbox } from '../components/FlyerLightbox';
import {
  HeroEntrance,
  MagneticWrap,
  ParallaxText,
  RevealBlock,
  SplitHeadline,
  SpotlightCard,
  StaggerGrid,
  StaggerItem,
} from '../components/LuxuryMotion';
import { PageHeroBackdrop } from '../components/PageHeroBackdrop';
import {
  buildEmailUrl,
  FLYER_SAMPLES,
  FlyerSample,
  SERVICE_PRICES,
} from '../data/siteContent';
import { RouteLink } from '../router';

const INCLUDED = [
  'Print-ready files and a digital version for social media',
  'Sizes such as A4, A5 and social posts: [confirm sizes]',
  'Colours, fonts and logo matched to your brand',
  'Wording you supply and approve',
];

const QUESTIONS: FaqItem[] = [
  {
    question: 'How much does it cost?',
    answer: `Starting from ${SERVICE_PRICES.flyers}. The final price depends on the size and number of designs, and we'll send you a clear quote after your free mockup. No obligation. Prices in US dollars.`,
  },
  {
    question: 'Do you handle printing?',
    answer:
      'We supply press-ready files formatted for any local or commercial print partner you prefer.',
  },
  {
    question: 'Can the flyer match our existing website?',
    answer: 'Yes. Colours, fonts, and layout style are matched seamlessly to your brand.',
  },
];

export function FlyersPage() {
  const emailUrl = buildEmailUrl('flyers');
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerSample | null>(null);

  const scrollToSamples = () => {
    const el = document.getElementById('samples');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PageHeroBackdrop
          images={[
            flyerTrifoldBackdrop,
            flyerSpreadBackdrop,
            flyersBackdrop,
          ]}
          intervalMs={5500}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-22 sm:pb-24 lg:px-8">
          <HeroEntrance className="max-w-3xl space-y-6">
            <SplitHeadline
              text="Flyers and print that match your brand"
              className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.1] dark:text-[#F5F4F0]"
            />
            <ParallaxText>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                Flyers, posters and handouts that look like your website, so patients recognise you everywhere.
              </p>
            </ParallaxText>
            <ParallaxText>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticWrap>
                  <RouteLink
                    to="/contact"
                    service="Flyers & Print"
                    className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    Get a free mockup
                  </RouteLink>
                </MagneticWrap>
                <button
                  type="button"
                  onClick={scrollToSamples}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  See samples
                </button>
              </div>
            </ParallaxText>
          </HeroEntrance>
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
                  What&apos;s included
                </h2>
                <ul className="mt-6 space-y-4">
                  {INCLUDED.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base text-ink-muted dark:text-[#C8C6BE]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-champagne-deep dark:text-champagne-light"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <SpotlightCard className="flex flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-7 lg:col-span-5 dark:border-obsidian-border dark:bg-obsidian">
                <div className="relative z-10 space-y-4">
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                    Pricing &amp; turnaround
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    Starting from{' '}
                    <span className="font-mono-data font-semibold text-ink dark:text-champagne-light">
                      {SERVICE_PRICES.flyers}
                    </span>
                    . Every project is quoted after a free mockup and a short chat, so you only pay for what you need.
                  </p>
                  <p className="text-xs text-ink-muted dark:text-[#96948C]">
                    Prices in US dollars.
                  </p>
                  <p className="text-sm font-medium text-ink-muted dark:text-[#96948C]">
                    Turnaround: [time].
                  </p>
                </div>
                <div className="relative z-10 mt-8">
                  <MagneticWrap>
                    <RouteLink
                      to="/contact"
                      service="Flyers & Print"
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a quote
                    </RouteLink>
                  </MagneticWrap>
                </div>
              </SpotlightCard>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Samples and past work */}
      <section
        id="samples"
        className="scroll-mt-20 border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
              Flyer styles &amp; formats
            </h2>
            <p className="max-w-xl text-sm text-ink-muted dark:text-[#96948C]">
              Explore healthcare flyer styles — select any layout to view full size or message us for a custom version matched to your clinic.
            </p>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FLYER_SAMPLES.map((sample) => (
              <StaggerItem key={sample.id}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-5 transition-colors duration-200 hover:border-champagne/65 sm:p-6 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/55">
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => setSelectedFlyer(sample)}
                      aria-label={`View full size flyer: ${sample.title}`}
                      className="group/preview relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-lg border border-ivory-border bg-obsidian text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border"
                    >
                      <img
                        src={sample.imageSrc}
                        alt={sample.imageAlt}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-90"
                      />
                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/75 px-2.5 py-1 text-xs font-medium text-[#F5F4F0] backdrop-blur-xs transition-colors duration-150 group-hover/preview:border-champagne group-hover/preview:text-champagne-light">
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>View flyer</span>
                      </span>
                    </button>

                    <p className="mt-4 text-xs text-ink-muted dark:text-[#96948C]">
                      {sample.styleLabel} &middot; {sample.format}
                    </p>
                    <h3 className="mt-1.5 font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      {sample.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      {sample.summary}
                    </p>
                    <dl className="mt-3 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      <div>
                        <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                          Ideal use:
                        </dt>
                        <dd>{sample.whereUsed}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="relative z-10 mt-6 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                    <MagneticWrap strength={0.14} className="w-full">
                      <a
                        href={emailUrl}
                        className="luxury-shimmer-btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2 text-xs font-semibold text-obsidian whitespace-nowrap transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne sm:text-sm"
                      >
                        <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Want a flyer like this? Email us</span>
                      </a>
                    </MagneticWrap>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Questions & Cross-links */}
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock className="max-w-3xl">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
              Questions
            </h2>
            <div className="mt-8">
              <FaqList items={QUESTIONS} />
            </div>
            <p className="mt-10 text-base text-ink-muted dark:text-[#C8C6BE]">
              Also see:{' '}
              <RouteLink
                to="/websites"
                className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
              >
                Websites
              </RouteLink>{' '}
              <span aria-hidden="true" className="mx-2 text-ink-muted dark:text-[#96948C]">
                |
              </span>{' '}
              <RouteLink
                to="/ai-videos"
                className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
              >
                AI Videos
              </RouteLink>
            </p>
          </RevealBlock>
        </div>
      </section>
      <FlyerLightbox
        flyer={selectedFlyer}
        onClose={() => setSelectedFlyer(null)}
      />
    </div>
  );
}
