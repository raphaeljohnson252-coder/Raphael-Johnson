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
    subtitle: 'Search Engine Optimization',
    description:
      'Put your business on page one when ready-to-buy clients search Google and Google Maps for what you offer.',
    points: [
      'High-intent service & local/global keyword targeting',
      'Technical page speed, mobile indexing & clean URL architecture',
      'Google Business Profile & map-pack authority alignment',
    ],
  },
  {
    index: '02',
    title: 'GEO',
    subtitle: 'Generative Engine Optimization',
    description:
      'Position your brand so AI search engines—ChatGPT, Gemini, Perplexity, and Google AI Overviews—cite and recommend your business.',
    points: [
      'Entity clarity so AI models understand exactly who you serve',
      'Structured proof, verifiable facts & authoritative service pages',
      'Brand consistency across your site and public profiles',
    ],
  },
  {
    index: '03',
    title: 'AEO',
    subtitle: 'Answer Engine Optimization',
    description:
      'Win direct answers, featured snippets, and voice searches by answering the exact questions decision-makers ask before booking.',
    points: [
      'Question-led content hierarchy & concise answer blocks',
      'Schema.org JSON-LD markup (Service, FAQ, Organization & Local)',
      'Clear conversion paths from search answer directly to enquiry',
    ],
  },
];

const INCLUDED = [
  'Complete website & search visibility audit covering Google Search, Maps, and AI answer engines',
  'On-page Google SEO setup: titles, meta descriptions, heading hierarchy, internal links, and image alt tags',
  'Schema.org structured data (JSON-LD) built for Google Rich Results and generative AI crawlers',
  'GEO & AEO copy structuring so high-value prospects find clear answers and trust your authority immediately',
  'Google Business Profile optimization guidance to improve local and regional map rankings',
  'Clean sitemap, robots.txt, and Google Search Console indexing readiness',
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Free visibility check',
    text: 'Share your website or business name. We inspect where you currently appear on Google and AI answer engines and show you the biggest missed opportunities.',
  },
  {
    number: '02',
    title: 'High-value search mapping',
    text: 'We identify the exact search terms and questions higher-tier clients use right before they book, enquire, or purchase.',
  },
  {
    number: '03',
    title: 'SEO, GEO & AEO buildout',
    text: 'We implement technical SEO, structured schema data, authoritative service copy, and answer-ready sections across your site.',
  },
  {
    number: '04',
    title: 'Rank, measure & refine',
    text: 'We submit your updated structure for fast indexing and remain available for ongoing ranking improvements as your business grows.',
  },
];

const QUESTIONS: FaqItem[] = [
  {
    question: 'What is the difference between Google SEO, GEO, and AEO?',
    answer:
      'Google SEO helps your website rank higher in traditional Google Search and Google Maps results. GEO (Generative Engine Optimization) helps your business get cited and recommended inside AI tools like ChatGPT, Gemini, Perplexity, and Google AI Overviews. AEO (Answer Engine Optimization) structures your pages to win featured snippets, People Also Ask boxes, and direct voice answers.',
  },
  {
    question: 'How does this make my business visible to higher-value clients?',
    answer:
      'Decision-makers and higher-budget buyers rarely scroll past the first few Google results or the top AI-recommended providers. By aligning your technical SEO, authority signals, and clear service answers with high-intent search queries, your business shows up at the exact moment serious buyers are comparing options.',
  },
  {
    question: 'How much does Google SEO, GEO & AEO cost?',
    answer: `Starting from ${SERVICE_PRICES.seo}. After a free visibility check and short email exchange, we send a fixed quote based on the size of your website and goals. Prices in US dollars.`,
  },
  {
    question: 'Can you optimize a website we already have?',
    answer:
      'Yes. We can optimize your existing website directly, or combine SEO, GEO, and AEO with a fresh website build so your design and search rankings work together from day one.',
  },
];

export function SeoGeoAeoPage() {
  const emailUrl = buildEmailUrl('seo');

  const scrollToPillars = () => {
    const el = document.getElementById('visibility-pillars');
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
                {BUSINESS_NAME} &middot; Search &amp; AI Visibility
              </p>
            </ParallaxText>
            <SplitHeadline
              text="Google SEO, GEO & AEO that gets your business visible and ranked"
              className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.1] dark:text-[#F5F4F0]"
            />
            <ParallaxText>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                We help businesses rank higher on Google and appear in AI-powered search answers—putting your brand in front of higher-value clients and decision-makers actively looking for what you offer.
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
                  onClick={scrollToPillars}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  How SEO, GEO &amp; AEO work
                </button>
              </div>
            </ParallaxText>
          </HeroEntrance>
        </div>
      </section>

      {/* Three Pillars: Google SEO, GEO & AEO */}
      <section
        id="visibility-pillars"
        className="scroll-mt-20 border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
                Three layers of modern visibility
              </h2>
              <p className="max-w-2xl text-base text-ink-muted dark:text-[#C8C6BE]">
                Clients no longer search in just one place. We optimize your presence across Google Search, AI assistants, and direct answer engines together.
              </p>
            </div>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <StaggerItem key={pillar.index}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-6 transition-colors duration-200 hover:border-champagne/70 sm:p-7 dark:border-obsidian-border dark:bg-obsidian dark:hover:border-champagne/60">
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
      <section className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
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

              <SpotlightCard className="flex flex-col justify-between rounded-xl border border-ivory-border bg-white p-7 lg:col-span-5 dark:border-obsidian-border dark:bg-obsidian-surface">
                <div className="relative z-10 space-y-4">
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                    Pricing &amp; free visibility check
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    Starting from{' '}
                    <span className="font-mono-data font-semibold text-ink dark:text-champagne-light">
                      {SERVICE_PRICES.seo}
                    </span>
                    . Send us your website or business name for a free visibility review, followed by a clear fixed quote with no hidden retainers.
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
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ivory-border bg-ivory px-4 py-3 text-sm font-medium text-ink whitespace-nowrap transition-colors duration-150 hover:border-champagne hover:text-champagne-deep dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
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
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              How we rank your business
            </h2>
            <p className="font-editorial text-lg italic text-ink-muted dark:text-[#C8C6BE]">
              Clear steps built for long-term search and AI visibility
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
      <section className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
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
