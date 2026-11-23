import { useState } from 'react';
import { ArrowRight, Check, MapPin, Search, Sparkles } from 'lucide-react';
import { RouteLink } from '../router';

type ExampleCategory = 'All' | 'Google SEO' | 'GEO' | 'AEO';

interface ServiceSetupExample {
  id: string;
  businessType: string;
  primaryLayer: Exclude<ExampleCategory, 'All'>;
  layerLabel: string;
  searchQuery: string;
  exampleDomain: string;
  typicalTitle: string;
  typicalDescription: string;
  typicalProblem: string;
  setupTitle: string;
  setupDescription: string;
  setupHighlight: string;
  whatWeWillDo: string[];
}

const SETUP_EXAMPLES: ServiceSetupExample[] = [
  {
    id: 'clinic-google-seo',
    businessType: 'Local Clinic or Health Practice',
    primaryLayer: 'Google SEO',
    layerLabel: 'Google SEO & Maps',
    searchQuery: 'diabetes clinic near me online booking',
    exampleDomain: 'yourclinic.com',
    typicalTitle: 'Home | Clinic Name',
    typicalDescription:
      'Welcome to our website. Contact us for more information about our services and opening hours...',
    typicalProblem:
      'Vague page title, no service keywords, no location signal, and an incomplete Google Maps listing.',
    setupTitle: 'Your Clinic Name — Diabetes Care, Checkups & Online Booking',
    setupDescription:
      'Specialist care, routine screening, accepted insurance/HMO details, clinic hours, and simple online appointment booking in your city.',
    setupHighlight:
      'Clean service + city page title · Google Business Profile & Maps details aligned · Clear booking links',
    whatWeWillDo: [
      'Write clear page titles and meta descriptions around the exact services and city you serve',
      'Clean up your headings, URLs, internal links, and mobile loading speed',
      'Align your website details with your Google Business Profile for stronger Maps visibility',
    ],
  },
  {
    id: 'service-business-seo',
    businessType: 'Real Estate, Legal, or Service Business',
    primaryLayer: 'Google SEO',
    layerLabel: 'Google SEO Structure',
    searchQuery: 'verified property advisor in [your city]',
    exampleDomain: 'yourbusiness.com',
    typicalTitle: 'Your Business — Official Site',
    typicalDescription:
      'We provide quality services to clients. Reach out to our team today to discuss your needs...',
    typicalProblem:
      'Everything crammed onto one generic homepage with no dedicated pages for core services or target areas.',
    setupTitle: 'Your Business — Core Service & Advisory in [Your City]',
    setupDescription:
      'Dedicated service pages explaining what you offer, who you help, how your process works, and how serious clients can request a consultation.',
    setupHighlight:
      'Dedicated service pages · Clean sitemap & Google Search Console indexing · Structured business markup',
    whatWeWillDo: [
      'Map out the high-intent search terms serious buyers type right before enquiring',
      'Structure separate, focused pages for your main services instead of burying everything on one page',
      'Set up clean sitemap.xml, robots.txt, and Google Search Console so new pages index properly',
    ],
  },
  {
    id: 'brand-geo-ai-search',
    businessType: 'Online Store or Specialist Brand',
    primaryLayer: 'GEO',
    layerLabel: 'GEO · AI Search Visibility',
    searchQuery: 'best [your product or service] that delivers to [your region]',
    exampleDomain: 'yourbrand.com',
    typicalTitle: 'How AI tools see an unoptimized site',
    typicalDescription:
      'AI tools like ChatGPT, Gemini, and Google AI Overviews skip the brand because key facts—what you sell, pricing, delivery regions, and credentials—are vague or trapped inside images.',
    typicalProblem:
      'No plain-text facts or structured entity schema for AI models to read and trust.',
    setupTitle: 'How we structure your site for AI recommendations',
    setupDescription:
      'Your site states clearly in readable text and structured data who you are, what you offer, where you serve, and why clients trust you—making it easy for AI search tools to understand and reference your business.',
    setupHighlight:
      'Readable service/product facts · Organization & Service JSON-LD schema · Consistent public brand info',
    whatWeWillDo: [
      'Install clean JSON-LD schema (Organization, Service, or Product) so AI crawlers read your business accurately',
      'Replace vague filler copy with clear, factual descriptions of your offers, locations, and process',
      'Keep your business name, description, and contact details consistent across your site and profiles',
    ],
  },
  {
    id: 'booking-aeo-direct-answer',
    businessType: 'Clinic, Consultant, or Appointment Business',
    primaryLayer: 'AEO',
    layerLabel: 'AEO · Direct Search Answers',
    searchQuery: 'how does [your service] work and what does it cost?',
    exampleDomain: 'yourpractice.com',
    typicalTitle: 'How Google handles missing answers',
    typicalDescription:
      'When prospects search practical pre-booking questions, Google pulls answers from generic third-party blogs because your website never answers those questions directly.',
    typicalProblem:
      'Important client questions are missing or buried inside long, unstructured paragraphs.',
    setupTitle: 'Direct answer block built on your own website',
    setupDescription:
      'A clear 40–60 word plain-English answer explaining what happens during a first visit, typical turnaround, and how to book—paired with FAQ schema so Google can surface your answer directly.',
    setupHighlight:
      'Built for Featured Snippets & People Also Ask · FAQPage schema installed · Direct enquiry link below each answer',
    whatWeWillDo: [
      'Turn your clients’ real pre-booking questions into clear H2/H3 sections on your key pages',
      'Write short, straightforward 40–60 word direct answers Google and voice search can easily pull',
      'Add valid FAQPage structured data and place a clear contact or booking link right beneath the answers',
    ],
  },
];

function GoogleSmallMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
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

export function SeoRealTimeExamples() {
  const [category, setCategory] = useState<ExampleCategory>('All');
  const [typicalViewMap, setTypicalViewMap] = useState<Record<string, boolean>>(
    {}
  );

  const categories: ExampleCategory[] = ['All', 'Google SEO', 'GEO', 'AEO'];

  const visibleExamples =
    category === 'All'
      ? SETUP_EXAMPLES
      : SETUP_EXAMPLES.filter((item) => item.primaryLayer === category);

  const setCardView = (id: string, showTypical: boolean) => {
    setTypicalViewMap((prev) => ({ ...prev, [id]: showTypical }));
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div
          role="tablist"
          aria-label="Filter examples by visibility layer"
          className="flex flex-wrap items-center gap-1.5"
        >
          {categories.map((item) => {
            const isActive = category === item;
            const count =
              item === 'All'
                ? SETUP_EXAMPLES.length
                : SETUP_EXAMPLES.filter((e) => e.primaryLayer === item).length;

            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCategory(item)}
                className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                  isActive
                    ? 'border-champagne bg-champagne font-semibold text-obsidian'
                    : 'border-ivory-border bg-ivory text-ink-muted hover:border-champagne/60 hover:text-ink dark:border-obsidian-border dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]'
                }`}
              >
                <span>{item}</span>
                <span className="font-mono-data opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        <p className="text-xs text-ink-muted dark:text-[#96948C]">
          Illustrative examples of what we set up for your website—not fabricated client stats.
        </p>
      </div>

      {/* 2-Column Setup Examples Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visibleExamples.map((example) => {
          const isTypical = Boolean(typicalViewMap[example.id]);
          const isGeo = example.primaryLayer === 'GEO';

          return (
            <article
              key={example.id}
              className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-5 sm:p-6 dark:border-obsidian-border dark:bg-obsidian"
            >
              <div className="space-y-4">
                {/* Header + Toggle */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono-data text-xs text-champagne-deep dark:text-champagne-light">
                      Example &middot; {example.layerLabel}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                      {example.businessType}
                    </h3>
                  </div>

                  <div
                    role="group"
                    aria-label={`Compare typical site versus our setup for ${example.businessType}`}
                    className="inline-grid shrink-0 grid-cols-2 rounded-lg border border-ivory-border bg-white p-0.5 dark:border-obsidian-border-strong dark:bg-obsidian-surface"
                  >
                    <button
                      type="button"
                      onClick={() => setCardView(example.id, true)}
                      aria-pressed={isTypical}
                      className={`min-h-7 cursor-pointer rounded-md px-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
                        isTypical
                          ? 'bg-ink text-ivory dark:bg-[#F5F4F0] dark:text-obsidian'
                          : 'text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]'
                      }`}
                    >
                      Typical site
                    </button>
                    <button
                      type="button"
                      onClick={() => setCardView(example.id, false)}
                      aria-pressed={!isTypical}
                      className={`min-h-7 cursor-pointer rounded-md px-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                        !isTypical
                          ? 'bg-champagne text-obsidian'
                          : 'text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]'
                      }`}
                    >
                      Our setup
                    </button>
                  </div>
                </div>

                {/* White Google / AI Search Example Box */}
                <div className="rounded-lg border border-[#DADCE0] bg-white p-4 text-[#202124]">
                  {/* Example Search Query */}
                  <div className="flex items-center gap-2 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5">
                    {isGeo ? (
                      <Sparkles
                        className="h-3.5 w-3.5 shrink-0 text-[#1A73E8]"
                        aria-hidden="true"
                      />
                    ) : (
                      <GoogleSmallMark />
                    )}
                    <span className="truncate text-xs text-[#202124]">
                      {example.searchQuery}
                    </span>
                    <Search
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-[#5F6368]"
                      aria-hidden="true"
                    />
                  </div>

                  {isTypical ? (
                    <div className="mt-3.5 space-y-2 rounded-md border border-[#E8EAED] bg-[#F8F9FA] p-3">
                      <p className="text-[11px] font-medium text-[#A50E0E]">
                        Common issue before setup
                      </p>
                      <p className="text-sm font-medium text-[#3C4043]">
                        {example.typicalTitle}
                      </p>
                      <p className="text-xs leading-relaxed text-[#5F6368]">
                        {example.typicalDescription}
                      </p>
                      <p className="border-t border-[#E8EAED] pt-2 text-[11px] text-[#5F6368]">
                        {example.typicalProblem}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`mt-3.5 space-y-2 rounded-md border p-3 ${
                        isGeo
                          ? 'border-[#D2E3FC] bg-[#F4F8FE]'
                          : 'border-[#E8EAED] bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span className="font-medium text-[#4D5156]">
                          https://{example.exampleDomain}
                        </span>
                        <span className="font-semibold text-[#137333]">
                          Structured for {example.primaryLayer}
                        </span>
                      </div>

                      <p
                        className={`text-sm font-medium leading-snug ${
                          isGeo ? 'text-[#174EA6]' : 'text-[#1A0DAB]'
                        }`}
                      >
                        {example.setupTitle}
                      </p>

                      <p className="text-xs leading-relaxed text-[#4D5156]">
                        {example.setupDescription}
                      </p>

                      <div className="flex items-start gap-1.5 border-t border-[#E8EAED] pt-2 text-[11px] text-[#3C4043]">
                        {example.primaryLayer === 'Google SEO' ? (
                          <MapPin
                            className="mt-0.5 h-3 w-3 shrink-0 text-[#EA4335]"
                            aria-hidden="true"
                          />
                        ) : (
                          <Check
                            className="mt-0.5 h-3 w-3 shrink-0 text-[#137333]"
                            aria-hidden="true"
                          />
                        )}
                        <span>{example.setupHighlight}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Plain-English Work List */}
                <div className="space-y-2 pt-1">
                  <p className="text-xs font-semibold text-ink dark:text-[#F5F4F0]">
                    What we will do for your business:
                  </p>
                  <ul className="space-y-1.5">
                    {example.whatWeWillDo.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted dark:text-[#C8C6BE]"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne-deep dark:text-champagne-light"
                          aria-hidden="true"
                        />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                <RouteLink
                  to="/contact"
                  service="Google SEO, GEO & AEO"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-champagne-deep transition-colors hover:text-ink dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                >
                  <span>Ask about setting this up for your business</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </RouteLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
