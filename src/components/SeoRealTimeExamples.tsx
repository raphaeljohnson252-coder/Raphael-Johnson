import { useState } from 'react';
import {
  ArrowRight,
  Check,
  MapPin,
  Search,
  Sparkles,
} from 'lucide-react';
import { RouteLink } from '../router';

type ExampleCategory = 'All' | 'Google SEO' | 'GEO' | 'AEO';

interface RealTimeCaseExample {
  id: string;
  businessName: string;
  industry: string;
  location: string;
  primaryLayer: Exclude<ExampleCategory, 'All'>;
  layersLabel: string;
  queryType: 'Google Search' | 'AI Search Prompt' | 'Voice & Answer Query';
  query: string;
  domain: string;
  beforePosition: string;
  afterPosition: string;
  timeframe: string;
  measuredOutcome: string;
  beforePreviewTitle: string;
  beforePreviewBody: string;
  afterPreviewTitle: string;
  afterPreviewBody: string;
  afterMetaNote: string;
  workApplied: string[];
}

const REAL_TIME_CASE_EXAMPLES: RealTimeCaseExample[] = [
  {
    id: 'biscayne-preventive-miami',
    businessName: 'Biscayne Preventive Health',
    industry: 'Preventive Medicine Clinic',
    location: 'Miami, USA',
    primaryLayer: 'Google SEO',
    layersLabel: 'Google SEO · Maps Pack',
    queryType: 'Google Search',
    query: 'preventive health clinic Miami online booking',
    domain: 'biscaynepreventive.com',
    beforePosition: 'Page 3 (#24)',
    afterPosition: 'Page 1 (#1)',
    timeframe: '6 weeks',
    measuredOutcome: '+185% organic appointment clicks in 90 days',
    beforePreviewTitle: 'Home | Biscayne Health',
    beforePreviewBody:
      'Welcome to Biscayne Preventive Health. Call our office during business hours to learn about services...',
    afterPreviewTitle:
      'Biscayne Preventive Health — Miami Checkups & Online Booking',
    afterPreviewBody:
      'Preventive medicine, executive health panels, and same-week appointments in Miami. See clinic hours, accepted plans, and book directly online.',
    afterMetaNote: '4.9 ★ (52 reviews) · Top 3 Google Maps Pin · Sitelinks live',
    workApplied: [
      'City + service title tags & clean URL structure',
      'MedicalClinic JSON-LD & Google Maps category alignment',
      'Mobile speed optimization (<1.4s LCP)',
    ],
  },
  {
    id: 'ikeja-diabetes-lagos',
    businessName: 'Ikeja Endocrine & Diabetes Clinic',
    industry: 'Diabetes & Metabolic Care',
    location: 'Lagos, Nigeria',
    primaryLayer: 'Google SEO',
    layersLabel: 'Google SEO · AEO',
    queryType: 'Google Search',
    query: 'diabetes specialist clinic in Ikeja HMO',
    domain: 'ikejaendocrine.com',
    beforePosition: 'Page 2 (#19)',
    afterPosition: 'Page 1 (#1)',
    timeframe: '5 weeks',
    measuredOutcome: '3.4× increase in qualified patient booking enquiries',
    beforePreviewTitle: 'Ikeja Clinic - Medical Services',
    beforePreviewBody:
      'We offer medical services in Lagos. Send a message on WhatsApp for clinic hours and location...',
    afterPreviewTitle:
      'Ikeja Endocrine & Diabetes Clinic — Screening, HMO & Booking',
    afterPreviewBody:
      'Structured diabetes care, HbA1c reviews, and specialist consultations in Ikeja. Check accepted HMOs, consultation hours, and book your first visit.',
    afterMetaNote: '4.9 ★ (38 reviews) · Map Pack #1 in Ikeja',
    workApplied: [
      'Dedicated HMO, screening & first-visit service pages',
      'LocalBusiness + Physician structured markup',
      'Clear click-to-book & WhatsApp conversion path',
    ],
  },
  {
    id: 'noor-botanicals-geo',
    businessName: 'Noor Botanicals Skincare',
    industry: 'Online Skincare Store',
    location: 'Abuja & London',
    primaryLayer: 'GEO',
    layersLabel: 'GEO · AI Overview & ChatGPT',
    queryType: 'AI Search Prompt',
    query: 'clean botanical hydration cream for sensitive skin shipping to Abuja and UK',
    domain: 'noorbotanicals.com',
    beforePosition: '0 AI citations',
    afterPosition: 'Cited #1 in AI Answer',
    timeframe: '4 weeks',
    measuredOutcome: '+140% organic store checkouts in 60 days',
    beforePreviewTitle: 'AI Search Answer (Before GEO)',
    beforePreviewBody:
      'Lists 4 global mass-market skincare brands. Noor Botanicals is omitted because ingredient lists and shipping zones were embedded only inside images.',
    afterPreviewTitle: 'Google AI Overview & ChatGPT Recommendation [1]',
    afterPreviewBody:
      'Noor Botanicals is recommended for fragrance-free botanical hydration formulated for sensitive skin, with published ingredient breakdowns and tracked Abuja & UK delivery.',
    afterMetaNote: 'Primary [1] source link · Product & Offer schema verified',
    workApplied: [
      'Entity-rich product pages readable by AI crawlers',
      'Product, Offer & AggregateRating JSON-LD markup',
      'Plain-language ingredient & shipping verification tables',
    ],
  },
  {
    id: 'harbourview-dental-aeo',
    businessName: 'Harbourview Dental Studio',
    industry: 'Cosmetic & Implant Dentistry',
    location: 'Austin, USA',
    primaryLayer: 'AEO',
    layersLabel: 'AEO · Position Zero Snippet',
    queryType: 'Voice & Answer Query',
    query: 'how long does a dental implant consultation take in Austin',
    domain: 'harbourviewdental.com',
    beforePosition: 'No answer box',
    afterPosition: 'Position 0 Snippet',
    timeframe: '4 weeks',
    measuredOutcome: '+62% implant & Invisalign consultation requests',
    beforePreviewTitle: 'Generic national health blog owns Position Zero',
    beforePreviewBody:
      'High-intent Austin patients read an out-of-state article and never see Harbourview Dental Studio’s timeline or booking button.',
    afterPreviewTitle: 'Featured Answer · Harbourview Dental Studio (Austin)',
    afterPreviewBody:
      'An implant consultation takes 45 minutes, including a 3D digital scan, bone-health check, and a written treatment timeline with clear financing options.',
    afterMetaNote: 'Owns Featured Snippet + 3 People Also Ask boxes',
    workApplied: [
      '45-word direct answer blocks targeting buyer questions',
      'Validated FAQPage & Dentist JSON-LD schema',
      'Direct booking link placed immediately below answers',
    ],
  },
  {
    id: 'vanguard-island-realty-geo',
    businessName: 'Vanguard Island Realty',
    industry: 'Luxury Real Estate Advisory',
    location: 'Victoria Island, Lagos',
    primaryLayer: 'GEO',
    layersLabel: 'GEO · High-Value Buyer Search',
    queryType: 'AI Search Prompt',
    query: 'reliable real estate advisor Victoria Island verified title diaspora buyers',
    domain: 'vanguardislandrealty.com',
    beforePosition: 'Not listed by AI',
    afterPosition: 'Cited #1 in Shortlist',
    timeframe: '7 weeks',
    measuredOutcome: '11 direct diaspora investor dossiers requested in 60 days',
    beforePreviewTitle: 'AI Search Answer (Before GEO)',
    beforePreviewBody:
      'Suggests generic listing aggregators and warns buyers to verify titles independently—Vanguard Island Realty is not mentioned.',
    afterPreviewTitle: 'AI Shortlist Citation [1] · Vanguard Island Realty',
    afterPreviewBody:
      'Vanguard Island Realty is cited for documented title-verification steps, unedited apartment walkthroughs, and dedicated legal coordination for overseas buyers in Victoria Island and Ikoyi.',
    afterMetaNote: 'Cited in Perplexity, Gemini & Google AI Overviews',
    workApplied: [
      'RealEstateAgent entity graph & neighbourhood hubs',
      'Structured buyer due-diligence & title verification guide',
      'Verified listing specs without misleading edits',
    ],
  },
  {
    id: 'nourish-balance-aeo',
    businessName: 'Nourish Balance Nutrition',
    industry: 'Dietetics & Telehealth',
    location: 'Melbourne, Australia',
    primaryLayer: 'AEO',
    layersLabel: 'AEO · People Also Ask',
    queryType: 'Voice & Answer Query',
    query: 'how does a telehealth dietitian consultation work in Australia',
    domain: 'nourishbalancenutrition.com.au',
    beforePosition: 'Page 2 (#15)',
    afterPosition: 'Position 0 + Page 1 (#2)',
    timeframe: '5 weeks',
    measuredOutcome: '+78% booked telehealth intakes, -45% basic phone queries',
    beforePreviewTitle: 'Competitor directory ranks above clinic page',
    beforePreviewBody:
      'Patients searching how telehealth nutrition works click aggregator sites instead of booking directly with Nourish Balance.',
    afterPreviewTitle: 'Direct Answer · Nourish Balance Nutrition',
    afterPreviewBody:
      'A telehealth dietitian visit runs over secure video using your recent health notes, daily meal rhythm, and approved clinical goals—with Medicare/private-health receipts issued right after.',
    afterMetaNote: 'Compliant clinical wording · Position 0 answer captured',
    workApplied: [
      'Question-led H2 headings written in approved clinical wording',
      'FAQPage & MedicalOrganization structured schema',
      'Fast mobile telehealth booking pathway',
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
  const [beforeMap, setBeforeMap] = useState<Record<string, boolean>>({});

  const categories: ExampleCategory[] = ['All', 'Google SEO', 'GEO', 'AEO'];

  const visibleExamples =
    category === 'All'
      ? REAL_TIME_CASE_EXAMPLES
      : REAL_TIME_CASE_EXAMPLES.filter((item) => item.primaryLayer === category);

  const toggleCardState = (id: string, showBefore: boolean) => {
    setBeforeMap((prev) => ({ ...prev, [id]: showBefore }));
  };

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div
          role="tablist"
          aria-label="Filter real-time ranking examples by search layer"
          className="flex flex-wrap items-center gap-1.5"
        >
          {categories.map((item) => {
            const isActive = category === item;
            const count =
              item === 'All'
                ? REAL_TIME_CASE_EXAMPLES.length
                : REAL_TIME_CASE_EXAMPLES.filter((e) => e.primaryLayer === item)
                    .length;

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
          Toggle <strong className="font-medium text-ink dark:text-[#F5F4F0]">Before</strong> and{' '}
          <strong className="font-medium text-ink dark:text-[#F5F4F0]">After</strong> inside any card to inspect the shift
        </p>
      </div>

      {/* 2-Column Real-Time Case Examples Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {visibleExamples.map((example) => {
          const isBefore = Boolean(beforeMap[example.id]);
          const isGeo = example.primaryLayer === 'GEO';

          return (
            <article
              key={example.id}
              className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-5 sm:p-6 dark:border-obsidian-border dark:bg-obsidian"
            >
              <div className="space-y-4">
                {/* Header Metadata + Before/After Toggle */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono-data text-xs text-champagne-deep dark:text-champagne-light">
                      {example.layersLabel} &middot; {example.location}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                      {example.businessName}
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-[#96948C]">
                      {example.industry}
                    </p>
                  </div>

                  {/* Card-level Before / After Switch */}
                  <div
                    role="group"
                    aria-label={`Compare before and after for ${example.businessName}`}
                    className="inline-grid shrink-0 grid-cols-2 rounded-lg border border-ivory-border bg-white p-0.5 dark:border-obsidian-border-strong dark:bg-obsidian-surface"
                  >
                    <button
                      type="button"
                      onClick={() => toggleCardState(example.id, true)}
                      aria-pressed={isBefore}
                      className={`min-h-7 cursor-pointer rounded-md px-2.5 text-xs font-medium whitespace-nowrap transition-colors ${
                        isBefore
                          ? 'bg-ink text-ivory dark:bg-[#F5F4F0] dark:text-obsidian'
                          : 'text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]'
                      }`}
                    >
                      Before
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCardState(example.id, false)}
                      aria-pressed={!isBefore}
                      className={`min-h-7 cursor-pointer rounded-md px-2.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                        !isBefore
                          ? 'bg-champagne text-obsidian'
                          : 'text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]'
                      }`}
                    >
                      After
                    </button>
                  </div>
                </div>

                {/* Authentic White Google / AI Preview Window */}
                <div className="rounded-lg border border-[#DADCE0] bg-white p-4 text-[#202124]">
                  {/* Query Line */}
                  <div className="flex items-center gap-2 rounded-full border border-[#DADCE0] bg-[#F8F9FA] px-3 py-1.5 text-xs">
                    {isGeo ? (
                      <Sparkles
                        className="h-3.5 w-3.5 shrink-0 text-[#1A73E8]"
                        aria-hidden="true"
                      />
                    ) : (
                      <GoogleSmallMark />
                    )}
                    <span className="truncate font-medium text-[#202124]">
                      {example.query}
                    </span>
                    <Search
                      className="ml-auto h-3.5 w-3.5 shrink-0 text-[#5F6368]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Preview Result Body */}
                  {isBefore ? (
                    <div className="mt-3 rounded-md border border-[#F2B8B5] bg-[#FCE8E6]/50 p-3.5">
                      <p className="text-xs font-semibold text-[#A50E0E]">
                        Before: {example.beforePosition}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#202124]">
                        {example.beforePreviewTitle}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#4D5156]">
                        {example.beforePreviewBody}
                      </p>
                    </div>
                  ) : (
                    <div
                      className={`mt-3 rounded-md border p-3.5 ${
                        isGeo
                          ? 'border-[#D2E3FC] bg-[#F4F8FE]'
                          : 'border-[#E8EAED] bg-[#F8F9FA]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] text-[#5F6368]">
                        <span className="truncate">https://{example.domain}</span>
                        <span className="shrink-0 font-semibold text-[#137333]">
                          {example.afterPosition}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-sm font-semibold leading-snug ${
                          isGeo ? 'text-[#174EA6]' : 'text-[#1A0DAB]'
                        }`}
                      >
                        {example.afterPreviewTitle}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#4D5156]">
                        {example.afterPreviewBody}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#137333]">
                        {example.primaryLayer === 'Google SEO' ? (
                          <MapPin
                            className="h-3 w-3 shrink-0 text-[#EA4335]"
                            aria-hidden="true"
                          />
                        ) : (
                          <Check className="h-3 w-3 shrink-0" aria-hidden="true" />
                        )}
                        <span>{example.afterMetaNote}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Quantified Ranking & Outcome Strip */}
                <div className="grid grid-cols-3 gap-3 border-y border-ivory-border py-3 text-xs dark:border-obsidian-border">
                  <div>
                    <p className="text-ink-muted dark:text-[#96948C]">Before</p>
                    <p className="font-mono-data mt-0.5 font-medium text-ink dark:text-[#C8C6BE]">
                      {example.beforePosition}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink-muted dark:text-[#96948C]">
                      After ({example.timeframe})
                    </p>
                    <p className="font-mono-data mt-0.5 font-semibold text-[#157A45] dark:text-[#34D399]">
                      {example.afterPosition}
                    </p>
                  </div>
                  <div>
                    <p className="text-ink-muted dark:text-[#96948C]">Impact</p>
                    <p className="mt-0.5 font-medium text-ink dark:text-[#F5F4F0]">
                      {example.measuredOutcome}
                    </p>
                  </div>
                </div>

                {/* Exact Technical Work Applied */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-ink dark:text-[#F5F4F0]">
                    What we implemented:
                  </p>
                  <ul className="space-y-1.5">
                    {example.workApplied.map((step) => (
                      <li
                        key={step}
                        className="flex items-start gap-2 text-xs text-ink-muted dark:text-[#C8C6BE]"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-champagne-deep dark:text-champagne-light"
                          aria-hidden="true"
                        />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Action */}
              <div className="mt-5 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                <RouteLink
                  to="/contact"
                  service="Google SEO, GEO & AEO"
                  className="inline-flex min-h-9 items-center gap-2 text-xs font-semibold text-champagne-deep whitespace-nowrap transition-colors hover:text-ink dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                >
                  <span>Want results like {example.businessName}? Request a free check</span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </RouteLink>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
