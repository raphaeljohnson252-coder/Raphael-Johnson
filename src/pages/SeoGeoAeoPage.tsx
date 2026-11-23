import { Check, Mail } from 'lucide-react';
import websitesBackdrop from '../assets/images/bg_websites_obsidian_1794871448351.jpg';
import homeBackdrop from '../assets/images/bg_home_obsidian_1794871449160.jpg';
import contactBackdrop from '../assets/images/bg_contact_obsidian_1794871451107.jpg';
import { FaqItem, FaqList } from '../components/FaqList';
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
import { SeoRealTimeExamples } from '../components/SeoRealTimeExamples';
import {
  buildEmailUrl,
  BUSINESS_NAME,
  SERVICE_PRICES,
} from '../data/siteContent';
import { RouteLink } from '../router';

const PILLARS = [
  {
    index: '01',
    title: 'Google SEO',
    subtitle: 'Search & Google Maps',
    description:
      'We set up your website structure, page titles, speed, and Google Business alignment so people searching Google for your service can find you.',
    points: [
      'Service and location keywords built into page titles and headings',
      'Clean mobile-friendly layout, fast load time, and proper indexing',
      'Google Business Profile guidance to help you show up on Maps',
    ],
  },
  {
    index: '02',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    description:
      'More buyers now ask ChatGPT, Gemini, Perplexity, and Google AI Overviews who to hire. We structure your site so AI tools can accurately read and mention your business.',
    points: [
      'Plain, factual service pages instead of vague filler text',
      'Structured Organization and Service data AI crawlers understand',
      'Consistent business details across your website and public listings',
    ],
  },
  {
    index: '03',
    title: 'AEO',
    subtitle: 'Answer Engine Optimization',
    description:
      'We write and mark up clear answers to the real questions clients ask before they book—giving your site a real shot at Featured Snippets and People Also Ask boxes.',
    points: [
      'Question-led headings based on what real customers ask',
      'Short, direct 40–60 word answers written in plain English',
      'Valid FAQPage schema with clear enquiry buttons right underneath',
    ],
  },
];

const INCLUDED = [
  'A straight, honest review of your current website and how it appears on Google and AI search tools',
  'On-page Google SEO setup: titles, meta descriptions, headings, internal links, and image alt text',
  'Clean Schema.org JSON-LD markup (Organization, Service, LocalBusiness, and FAQPage)',
  'GEO & AEO copy improvements so both people and AI search engines understand what you offer immediately',
  'Practical Google Business Profile improvements for local search and Maps visibility',
  'Clean sitemap, robots.txt, and Google Search Console indexing setup',
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Free visibility check',
    text: 'Send us your website link or business name. We check how you currently show up on Google and reply with the clearest fixes we can make.',
  },
  {
    number: '02',
    title: 'Search & question mapping',
    text: 'We list the exact services, locations, and pre-booking questions your ideal clients actually type when looking for a business like yours.',
  },
  {
    number: '03',
    title: 'Hands-on setup',
    text: 'We update your page titles, descriptions, headings, structured schema code, answer sections, and indexing files directly on your site.',
  },
  {
    number: '04',
    title: 'Submit & hand over',
    text: 'We submit your updated pages to Google Search Console and walk you through everything we changed in plain language.',
  },
];

const QUESTIONS: FaqItem[] = [
  {
    question: 'What is the difference between Google SEO, GEO, and AEO?',
    answer:
      'Google SEO helps your website show up higher in Google Search and Google Maps. GEO (Generative Engine Optimization) helps AI tools like ChatGPT, Gemini, Perplexity, and Google AI Overviews understand and mention your business. AEO (Answer Engine Optimization) structures clear answers on your pages so Google can feature them directly in search and voice results.',
  },
  {
    question: 'Are the examples on this page past clients?',
    answer:
      'No—the examples above are sample previews showing the exact before-and-after setup we build for a business website. Every real project is tailored to your own business name, services, location, and customers.',
  },
  {
    question: 'How much does Google SEO, GEO & AEO cost?',
    answer: `Starting from ${SERVICE_PRICES.seo}. After checking your website and chatting briefly by email, we send a clear fixed quote based on how many pages you have and what needs work. Prices in US dollars.`,
  },
  {
    question: 'Can you work on a website I already have?',
    answer:
      'Yes. We can set up SEO, GEO, and AEO on your existing website, or build it directly into a new website from the start.',
  },
];

export function SeoGeoAeoPage() {
  const emailUrl = buildEmailUrl('seo');

  const scrollToExamples = () => {
    const el = document.getElementById('setup-examples');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PageHeroBackdrop
          images={[websitesBackdrop, homeBackdrop, contactBackdrop]}
          intervalMs={5500}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-22 sm:pb-24 lg:px-8">
          <HeroEntrance className="max-w-3xl space-y-6">
            <ParallaxText>
              <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                {BUSINESS_NAME} &middot; Google SEO, GEO &amp; AEO
              </p>
            </ParallaxText>
            <SplitHeadline
              text="Help the right clients find your business on Google and AI search"
              className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.08] dark:text-[#F5F4F0]"
            />
            <ParallaxText>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                We set up your website&apos;s technical SEO, clear service structure, and structured data so your business is easier to find, trust, and rank on Google, Google Maps, and AI search tools.
              </p>
            </ParallaxText>
            <ParallaxText>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticWrap>
                  <RouteLink
                    to="/contact"
                    service="Google SEO, GEO & AEO"
                    className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    Get a free visibility check
                  </RouteLink>
                </MagneticWrap>
                <button
                  type="button"
                  onClick={scrollToExamples}
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  See examples of what we set up
                </button>
              </div>
            </ParallaxText>
          </HeroEntrance>
        </div>
      </section>

      {/* Examples of What We Will Set Up */}
      <section
        id="setup-examples"
        className="scroll-mt-20 border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                What we will set up for you
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
                Examples of how we improve your search presence
              </h2>
              <p className="max-w-2xl text-base text-ink-muted dark:text-[#C8C6BE]">
                Here is what a typical unoptimized website looks like compared to how we structure yours for Google Search, Google Maps, AI recommendations (GEO), and direct answers (AEO).
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.04} className="mt-10">
            <SeoRealTimeExamples />
          </RevealBlock>
        </div>
      </section>

      {/* Three Layers: Google SEO, GEO & AEO */}
      <section
        id="visibility-pillars"
        className="cv-auto scroll-mt-20 border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
                What Google SEO, GEO &amp; AEO cover
              </h2>
              <p className="max-w-2xl text-base text-ink-muted dark:text-[#C8C6BE]">
                In plain terms, here are the three areas we work on so your business is easier to find wherever people search.
              </p>
            </div>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.index}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-6 transition-colors duration-200 hover:border-champagne/70 sm:p-7 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/60">
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono-data text-xs text-champagne-deep dark:text-champagne-light">
                        {pillar.index}
                      </span>
                      <span className="text-xs text-ink-muted dark:text-[#96948C]">
                        {pillar.subtitle}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink dark:text-[#F5F4F0]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      {pillar.description}
                    </p>
                    <ul className="space-y-2.5 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-ink-muted dark:text-[#C8C6BE]"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-champagne-deep dark:text-champagne-light"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* What's Included & Pricing */}
      <section className="cv-auto border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
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
                    Pricing &amp; free visibility check
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    Starting from{' '}
                    <span className="font-mono-data font-semibold text-ink dark:text-champagne-light">
                      {SERVICE_PRICES.seo}
                    </span>
                    . Send us your website link or business name—we&apos;ll review it for free and reply with a clear fixed quote and no hidden monthly retainers.
                  </p>
                  <p className="text-xs text-ink-muted dark:text-[#96948C]">
                    Prices in US dollars.
                  </p>
                </div>
                <div className="relative z-10 mt-8 flex flex-wrap items-center gap-3">
                  <MagneticWrap>
                    <RouteLink
                      to="/contact"
                      service="Google SEO, GEO & AEO"
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a quote
                    </RouteLink>
                  </MagneticWrap>
                  <a
                    href={emailUrl}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ivory-border bg-white px-4 py-3 text-sm font-medium text-ink whitespace-nowrap transition-colors duration-150 hover:border-champagne hover:text-champagne-deep dark:border-obsidian-border-strong dark:bg-obsidian-surface dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Email us</span>
                  </a>
                </div>
              </SpotlightCard>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Process */}
      <section className="cv-auto border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              How we work
            </h2>
            <p className="font-editorial text-lg italic text-ink-muted dark:text-[#C8C6BE]">
              Straightforward steps from review to setup
            </p>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <StaggerItem key={step.number}>
                <div className="group space-y-3 border-t border-ivory-border pt-6 transition-colors duration-200 hover:border-champagne dark:border-obsidian-border">
                  <div className="font-mono-data text-sm font-medium text-champagne-deep transition-transform duration-200 group-hover:translate-x-0.5 dark:text-champagne-light">
                    {index + 1}.
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    {step.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Questions & Cross-links */}
      <section className="cv-auto border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
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
                to="/flyers-and-print"
                className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
              >
                Flyers &amp; Print
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
    </div>
  );
}
