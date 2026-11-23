import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Check,
  ChevronDown,
  PenLine,
  ThumbsUp,
  X,
} from 'lucide-react';
import {
  BUSINESS_NAME,
  GOOGLE_REVIEWS,
  type ReviewRegion,
  type ReviewServiceCategory,
  type TestimonialData,
} from '../data/siteContent';
import { LUXURY_EASE, RevealBlock } from './LuxuryMotion';

type FilterKey =
  | 'All'
  | 'Nigeria'
  | 'International'
  | 'Websites'
  | 'AI Videos'
  | 'Flyers & Print';

type SortKey = 'relevant' | 'newest' | 'highest' | 'lowest';

const INITIAL_VISIBLE_COUNT = 6;
const TRUNCATE_LENGTH = 205;

const AVATAR_PALETTE = [
  '#1A73E8',
  '#0F9D58',
  '#7B1FA2',
  '#D93025',
  '#00897B',
  '#3949AB',
  '#E67C00',
  '#C2185B',
];

function GoogleGIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
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

function GoogleStar({
  filled,
  half = false,
  sizeClass = 'h-4 w-4',
}: {
  filled: boolean;
  half?: boolean;
  sizeClass?: string;
}) {
  const gradientId = useId();

  if (half) {
    return (
      <svg
        viewBox="0 0 20 20"
        className={sizeClass}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#FBBC05" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradientId})`}
          d="M10 1.4l2.58 5.23 5.77.84-4.18 4.07.99 5.75L10 14.57l-5.16 2.72.99-5.75L1.65 7.47l5.77-.84L10 1.4z"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 20 20"
      className={sizeClass}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={filled ? '#FBBC05' : 'currentColor'}
        fillOpacity={filled ? 1 : 0.2}
        d="M10 1.4l2.58 5.23 5.77.84-4.18 4.07.99 5.75L10 14.57l-5.16 2.72.99-5.75L1.65 7.47l5.77-.84L10 1.4z"
      />
    </svg>
  );
}

function StarRow({
  rating,
  sizeClass = 'h-4 w-4',
}: {
  rating: number;
  sizeClass?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-ink-muted dark:text-[#96948C]"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = rating >= star;
        const isHalf = !isFilled && rating >= star - 0.5;
        return (
          <GoogleStar
            key={star}
            filled={isFilled}
            half={isHalf}
            sizeClass={sizeClass}
          />
        );
      })}
    </span>
  );
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s+/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'C';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

interface GoogleReviewsSectionProps {
  items?: TestimonialData[];
}

export function GoogleReviewsSection({
  items = GOOGLE_REVIEWS,
}: GoogleReviewsSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [reviews, setReviews] = useState<TestimonialData[]>(items);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('All');
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('relevant');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [helpfulIds, setHelpfulIds] = useState<Record<string, boolean>>({});
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Composer form state
  const [draftRating, setDraftRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [draftName, setDraftName] = useState('');
  const [draftBusiness, setDraftBusiness] = useState('');
  const [draftCity, setDraftCity] = useState('');
  const [draftRegion, setDraftRegion] = useState<ReviewRegion>('Nigeria');
  const [draftService, setDraftService] =
    useState<ReviewServiceCategory>('Websites');
  const [draftQuote, setDraftQuote] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedNotice, setSubmittedNotice] = useState(false);

  useEffect(() => {
    if (!isComposerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsComposerOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isComposerOpen]);

  const ratingStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        average: '0.0',
        numericAverage: 0,
        total: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
      };
    }
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    for (const review of reviews) {
      sum += review.rating;
      counts[review.rating] = (counts[review.rating] || 0) + 1;
    }
    const avg = sum / total;
    return {
      average: avg.toFixed(1),
      numericAverage: avg,
      total,
      counts,
    };
  }, [reviews]);

  const filterCounts = useMemo(() => {
    return {
      All: reviews.length,
      Nigeria: reviews.filter((r) => r.region === 'Nigeria').length,
      International: reviews.filter((r) => r.region === 'International').length,
      Websites: reviews.filter((r) => r.serviceCategory === 'Websites').length,
      'AI Videos': reviews.filter((r) => r.serviceCategory === 'AI Videos')
        .length,
      'Flyers & Print': reviews.filter(
        (r) => r.serviceCategory === 'Flyers & Print'
      ).length,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const base = reviews.filter((review) => {
      if (starFilter !== null && review.rating !== starFilter) {
        return false;
      }
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Nigeria' || activeFilter === 'International') {
        return review.region === activeFilter;
      }
      return review.serviceCategory === activeFilter;
    });

    const sorted = [...base];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => a.daysAgo - b.daysAgo);
    } else if (sortBy === 'highest') {
      sorted.sort((a, b) => b.rating - a.rating || a.daysAgo - b.daysAgo);
    } else if (sortBy === 'lowest') {
      sorted.sort((a, b) => a.rating - b.rating || a.daysAgo - b.daysAgo);
    }
    return sorted;
  }, [reviews, activeFilter, starFilter, sortBy]);

  const visibleReviews = filteredReviews.slice(0, visibleCount);
  const remainingCount = Math.max(0, filteredReviews.length - visibleCount);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHelpful = (id: string) => {
    setHelpfulIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectFilter = (nextFilter: FilterKey) => {
    setActiveFilter(nextFilter);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleToggleStarBar = (star: number) => {
    if (ratingStats.counts[star] === 0) return;
    setStarFilter((prev) => (prev === star ? null : star));
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = draftName.trim();
    const trimmedCity = draftCity.trim();
    const trimmedQuote = draftQuote.trim();

    if (trimmedName.length < 2) {
      setFormError('Please enter your name.');
      return;
    }
    if (trimmedCity.length < 2) {
      setFormError('Please enter your city and country.');
      return;
    }
    if (trimmedQuote.length < 15) {
      setFormError('Please share at least a short sentence about your experience.');
      return;
    }

    const color =
      AVATAR_PALETTE[reviews.length % AVATAR_PALETTE.length];

    const newReview: TestimonialData = {
      id: `client-review-${Date.now()}`,
      clientName: trimmedName,
      role: 'Verified Client',
      business: draftBusiness.trim() || 'Business Owner',
      specialty: draftService,
      service: draftService,
      serviceCategory: draftService,
      region: draftRegion,
      city: trimmedCity,
      rating: Math.min(5, Math.max(1, draftRating)) as 1 | 2 | 3 | 4 | 5,
      relativeTime: 'Just now',
      daysAgo: 0,
      reviewerReviewCount: 1,
      avatarColor: color,
      helpfulCount: 0,
      quote: trimmedQuote,
    };

    setReviews((prev) => [newReview, ...prev]);
    setActiveFilter('All');
    setStarFilter(null);
    setSortBy('newest');
    setVisibleCount((prev) => Math.max(prev, INITIAL_VISIBLE_COUNT));
    setDraftName('');
    setDraftBusiness('');
    setDraftCity('');
    setDraftQuote('');
    setDraftRating(5);
    setFormError('');
    setIsComposerOpen(false);
    setSubmittedNotice(true);
    window.setTimeout(() => setSubmittedNotice(false), 5000);
  };

  const filterKeys: FilterKey[] = [
    'All',
    'Nigeria',
    'International',
    'Websites',
    'AI Videos',
    'Flyers & Print',
  ];

  return (
    <section
      id="client-reviews"
      aria-label="Google reviews for Ewixstudio"
      className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Section Title */}
        <RevealBlock className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-medium text-ink-muted dark:text-[#C8C6BE]">
              <GoogleGIcon className="h-4 w-4 shrink-0" />
              <span>Google Reviews</span>
              <span aria-hidden="true">&middot;</span>
              <span>Nigeria &amp; Worldwide</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              What our clients say on Google
            </h2>
          </div>

          <p className="text-sm text-ink-muted dark:text-[#96948C]">
            Feedback from clinics, restaurants, agencies, and online shops
          </p>
        </RevealBlock>

        {/* Google Business Profile Summary Panel */}
        <RevealBlock delay={0.05} className="mt-8">
          <div className="rounded-xl border border-ivory-border bg-white p-6 sm:p-8 dark:border-obsidian-border dark:bg-obsidian-surface">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              {/* Left: Rating Score + Google Logo */}
              <div className="space-y-2 lg:col-span-4">
                <div className="flex items-center gap-2.5">
                  <GoogleGIcon className="h-6 w-6 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                      {BUSINESS_NAME}
                    </p>
                    <p className="text-xs text-ink-muted dark:text-[#96948C]">
                      Web Design, Flyers &amp; AI Video Studio
                    </p>
                  </div>
                </div>

                <div className="flex items-baseline gap-3 pt-2">
                  <span className="font-display text-5xl font-bold tracking-tight text-ink tabular-nums dark:text-[#F5F4F0]">
                    {ratingStats.average}
                  </span>
                  <div className="space-y-1">
                    <StarRow
                      rating={ratingStats.numericAverage}
                      sizeClass="h-5 w-5"
                    />
                    <p className="text-xs text-ink-muted tabular-nums dark:text-[#96948C]">
                      Based on {ratingStats.total} reviews
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle: Authentic 5-to-1 Google Rating Histogram */}
              <div className="space-y-2 lg:col-span-5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingStats.counts[star] || 0;
                  const pct =
                    ratingStats.total > 0
                      ? Math.round((count / ratingStats.total) * 100)
                      : 0;
                  const isSelected = starFilter === star;
                  const isInteractive = count > 0;

                  return (
                    <button
                      key={star}
                      type="button"
                      disabled={!isInteractive}
                      onClick={() => handleToggleStarBar(star)}
                      aria-pressed={isSelected}
                      aria-label={`Filter by ${star} star reviews (${count})`}
                      className={`group flex w-full items-center gap-3 rounded-md px-1.5 py-0.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                        isInteractive
                          ? 'cursor-pointer hover:bg-ivory dark:hover:bg-obsidian'
                          : 'cursor-default opacity-60'
                      } ${
                        isSelected
                          ? 'bg-ivory ring-1 ring-champagne/70 dark:bg-obsidian'
                          : ''
                      }`}
                    >
                      <span className="font-mono-data w-4 shrink-0 text-xs font-medium text-ink dark:text-[#F5F4F0]">
                        {star}
                      </span>
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ivory-muted dark:bg-obsidian-elevated">
                        <div
                          className="h-full rounded-full bg-[#FBBC05] transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-mono-data w-6 shrink-0 text-right text-xs text-ink-muted dark:text-[#96948C]">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Write a Review CTA */}
              <div className="flex flex-col items-start gap-2.5 lg:col-span-3 lg:items-end">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(true)}
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1A73E8] px-5 py-2.5 text-sm font-medium text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1557B0] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
                >
                  <PenLine className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Write a review</span>
                </button>
                <p className="text-xs text-ink-muted lg:text-right dark:text-[#96948C]">
                  {filterCounts.Nigeria} Nigeria &middot;{' '}
                  {filterCounts.International} International
                </p>
              </div>
            </div>
          </div>
        </RevealBlock>

        {/* Live confirmation banner after submitting a review */}
        <AnimatePresence>
          {submittedNotice && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="status"
              className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-ivory-border bg-white px-4 py-3 text-sm text-ink dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#F5F4F0]"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-[#34A853]" aria-hidden="true" />
                <span>Your review has been added to the top of the list. Thank you for sharing your feedback!</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmittedNotice(false)}
                aria-label="Dismiss review notice"
                className="cursor-pointer p-1 text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Filter Tabs + Sort Bar */}
        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div
            role="tablist"
            aria-label="Filter reviews by region or service"
            className="flex flex-wrap items-center gap-1.5"
          >
            {filterKeys.map((key) => {
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleSelectFilter(key)}
                  className={`inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                    isActive
                      ? 'border-ink bg-ink text-ivory dark:border-[#F5F4F0] dark:bg-[#F5F4F0] dark:text-obsidian'
                      : 'border-ivory-border bg-white text-ink-muted hover:border-ink/40 hover:text-ink dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#C8C6BE] dark:hover:border-obsidian-border-strong dark:hover:text-[#F5F4F0]'
                  }`}
                >
                  <span>{key}</span>
                  <span className="font-mono-data opacity-75">
                    ({filterCounts[key]})
                  </span>
                </button>
              );
            })}

            {starFilter !== null && (
              <button
                type="button"
                onClick={() => setStarFilter(null)}
                className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-lg border border-champagne/70 bg-white px-3 py-1.5 text-xs font-medium text-champagne-deep whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne dark:bg-obsidian-surface dark:text-champagne-light"
              >
                <span>{starFilter} stars only</span>
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
            <label
              htmlFor="google-reviews-sort"
              className="text-xs text-ink-muted whitespace-nowrap dark:text-[#96948C]"
            >
              Sort by
            </label>
            <div className="relative">
              <select
                id="google-reviews-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="min-h-9 cursor-pointer appearance-none rounded-lg border border-ivory-border bg-white py-1.5 pr-8 pl-3 text-xs font-medium text-ink transition-colors duration-150 hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#F5F4F0] dark:hover:border-obsidian-border-strong"
              >
                <option value="relevant">Most relevant</option>
                <option value="newest">Newest</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-ink-muted dark:text-[#96948C]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Google Review Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="mt-8 rounded-xl border border-ivory-border bg-white p-8 text-center dark:border-obsidian-border dark:bg-obsidian-surface">
            <p className="text-sm text-ink-muted dark:text-[#C8C6BE]">
              No reviews match the selected filter combination.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('All');
                setStarFilter(null);
              }}
              className="mt-3 inline-flex min-h-9 cursor-pointer items-center rounded-lg border border-ivory-border px-4 py-1.5 text-xs font-medium text-ink transition-colors hover:border-champagne dark:border-obsidian-border-strong dark:text-[#F5F4F0]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleReviews.map((review) => {
              const isLong = review.quote.length > TRUNCATE_LENGTH;
              const isExpanded = Boolean(expandedIds[review.id]);
              const displayQuote =
                isLong && !isExpanded
                  ? `${review.quote.slice(0, TRUNCATE_LENGTH).trimEnd()}...`
                  : review.quote;
              const isHelpful = Boolean(helpfulIds[review.id]);
              const currentHelpful = review.helpfulCount + (isHelpful ? 1 : 0);

              return (
                <article
                  key={review.id}
                  className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-5 transition-colors duration-200 hover:border-ink/25 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-obsidian-border-strong"
                >
                  <div>
                    {/* Reviewer Identity Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {/* Google-style colored initial avatar + Local Guide star */}
                        <div className="relative shrink-0">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold text-white select-none"
                            style={{ backgroundColor: review.avatarColor }}
                            aria-hidden="true"
                          >
                            {getInitials(review.clientName)}
                          </div>
                          {review.isLocalGuide && (
                            <span
                              title="Google Local Guide"
                              aria-label="Local Guide"
                              className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#F57C00] text-white dark:border-obsidian-surface"
                            >
                              <svg
                                viewBox="0 0 12 12"
                                className="h-2.5 w-2.5"
                                aria-hidden="true"
                              >
                                <path
                                  fill="currentColor"
                                  d="M6 1l1.45 2.95 3.25.47-2.35 2.3.55 3.23L6 8.42 3.1 9.95l.55-3.23L1.3 4.42l3.25-.47L6 1z"
                                />
                              </svg>
                            </span>
                          )}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-display text-sm font-semibold text-ink dark:text-[#F5F4F0]">
                            {review.clientName}
                          </h3>
                          <p className="truncate text-xs text-ink-muted dark:text-[#96948C]">
                            {review.isLocalGuide ? 'Local Guide · ' : ''}
                            <span className="tabular-nums">
                              {review.reviewerReviewCount}{' '}
                              {review.reviewerReviewCount === 1
                                ? 'review'
                                : 'reviews'}
                            </span>{' '}
                            &middot; {review.city}
                          </p>
                        </div>
                      </div>

                      <GoogleGIcon className="mt-0.5 h-4 w-4 shrink-0 opacity-90" />
                    </div>

                    {/* Stars + Relative Date + Service */}
                    <div className="mt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted dark:text-[#96948C]">
                      <StarRow rating={review.rating} sizeClass="h-3.5 w-3.5" />
                      <span>{review.relativeTime}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{review.service}</span>
                    </div>

                    {/* Review Body */}
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/90 dark:text-[#E2E0D8]">
                      {displayQuote}
                      {isLong && (
                        <>
                          {' '}
                          <button
                            type="button"
                            onClick={() => toggleExpand(review.id)}
                            className="cursor-pointer font-medium text-[#1A73E8] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] dark:text-[#8AB4F8]"
                          >
                            {isExpanded ? 'Less' : 'More'}
                          </button>
                        </>
                      )}
                    </p>

                    {/* Attributable business & role line */}
                    <p className="mt-3 text-xs text-ink-muted dark:text-[#96948C]">
                      {review.business} &middot; {review.role}
                    </p>

                    {/* Optional Response from the Owner */}
                    {review.ownerResponse && (
                      <div className="mt-4 rounded-lg border border-ivory-border bg-ivory/80 p-3.5 dark:border-obsidian-border dark:bg-obsidian/80">
                        <div className="flex items-center gap-1.5 text-xs">
                          <span className="font-semibold text-ink dark:text-[#F5F4F0]">
                            Response from the owner
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-ink-muted dark:text-[#96948C]"
                          >
                            &middot;
                          </span>
                          <span className="text-ink-muted dark:text-[#96948C]">
                            {review.ownerResponse.relativeTime}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                          {review.ownerResponse.text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Helpful Button */}
                  <div className="mt-4 flex items-center justify-between border-t border-ivory-border pt-3 dark:border-obsidian-border">
                    <button
                      type="button"
                      onClick={() => toggleHelpful(review.id)}
                      aria-pressed={isHelpful}
                      className={`inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne ${
                        isHelpful
                          ? 'bg-[#1A73E8]/12 text-[#1A73E8] dark:bg-[#8AB4F8]/15 dark:text-[#8AB4F8]'
                          : 'text-ink-muted hover:bg-ivory hover:text-ink dark:text-[#96948C] dark:hover:bg-obsidian dark:hover:text-[#F5F4F0]'
                      }`}
                    >
                      <ThumbsUp
                        className={`h-3.5 w-3.5 ${isHelpful ? 'fill-current' : ''}`}
                        aria-hidden="true"
                      />
                      <span>Helpful</span>
                      {currentHelpful > 0 && (
                        <span className="font-mono-data">
                          ({currentHelpful})
                        </span>
                      )}
                    </button>

                    <span className="text-xs text-ink-muted dark:text-[#96948C]">
                      Posted on Google
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More / Show All Controls */}
        {filteredReviews.length > INITIAL_VISIBLE_COUNT && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {remainingCount > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + 6, filteredReviews.length)
                    )
                  }
                  className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-ivory-border bg-white px-5 py-2.5 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  Load more reviews ({remainingCount} more)
                </button>
                {remainingCount > 6 && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(filteredReviews.length)}
                    className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-ink-muted whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]"
                  >
                    View all {filteredReviews.length} reviews
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-ivory-border bg-white px-5 py-2.5 text-sm font-medium text-ink-muted whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-ink/40 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#C8C6BE] dark:hover:border-obsidian-border-strong dark:hover:text-[#F5F4F0]"
              >
                Show fewer reviews
              </button>
            )}
          </div>
        )}
      </div>

      {/* Interactive "Write a Review" Modal */}
      <AnimatePresence>
        {isComposerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
            onClick={() => setIsComposerOpen(false)}
          >
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 12 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.97, y: 8 }
              }
              transition={{ duration: 0.24, ease: LUXURY_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-xl border border-ivory-border bg-white p-6 shadow-2xl sm:p-7 dark:border-obsidian-border-strong dark:bg-obsidian-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <GoogleGIcon className="h-5 w-5 shrink-0" />
                  <div>
                    <h3
                      id="write-review-title"
                      className="font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]"
                    >
                      Review {BUSINESS_NAME}
                    </h3>
                    <p className="text-xs text-ink-muted dark:text-[#96948C]">
                      Share your experience with our team
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  aria-label="Close review form"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-ivory-border text-ink-muted transition-colors hover:text-ink dark:border-obsidian-border dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
                {/* Interactive Star Selector */}
                <div>
                  <span className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]">
                    Your rating
                  </span>
                  <div
                    className="mt-1.5 flex items-center gap-1"
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverRating || draftRating) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onClick={() => setDraftRating(star)}
                          aria-label={`Rate ${star} out of 5 stars`}
                          className="cursor-pointer rounded p-1 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-champagne"
                        >
                          <GoogleStar filled={active} sizeClass="h-7 w-7" />
                        </button>
                      );
                    })}
                    <span className="font-mono-data ml-2 text-xs text-ink-muted dark:text-[#96948C]">
                      {draftRating}.0 / 5.0
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="review-name"
                      className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                    >
                      Your name *
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="e.g. Dr. Segun Adeola"
                      className="mt-1 w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#7A7870]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="review-city"
                      className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                    >
                      City &amp; country *
                    </label>
                    <input
                      id="review-city"
                      type="text"
                      value={draftCity}
                      onChange={(e) => setDraftCity(e.target.value)}
                      placeholder="e.g. Lagos, Nigeria"
                      className="mt-1 w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#7A7870]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="review-region"
                      className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                    >
                      Region
                    </label>
                    <select
                      id="review-region"
                      value={draftRegion}
                      onChange={(e) =>
                        setDraftRegion(e.target.value as ReviewRegion)
                      }
                      className="mt-1 w-full rounded-lg border border-ivory-border bg-ivory px-3 py-2 text-sm text-ink focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0]"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="International">International</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="review-service"
                      className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                    >
                      Service
                    </label>
                    <select
                      id="review-service"
                      value={draftService}
                      onChange={(e) =>
                        setDraftService(e.target.value as ReviewServiceCategory)
                      }
                      className="mt-1 w-full rounded-lg border border-ivory-border bg-ivory px-3 py-2 text-sm text-ink focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0]"
                    >
                      <option value="Websites">Websites</option>
                      <option value="AI Videos">AI Videos</option>
                      <option value="Flyers & Print">Flyers &amp; Print</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="review-business"
                      className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                    >
                      Business
                    </label>
                    <input
                      id="review-business"
                      type="text"
                      value={draftBusiness}
                      onChange={(e) => setDraftBusiness(e.target.value)}
                      placeholder="Clinic or brand"
                      className="mt-1 w-full rounded-lg border border-ivory-border bg-ivory px-3 py-2 text-sm text-ink placeholder:text-ink-muted/60 focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#7A7870]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="review-quote"
                    className="block text-xs font-medium text-ink-muted dark:text-[#C8C6BE]"
                  >
                    Your review *
                  </label>
                  <textarea
                    id="review-quote"
                    rows={4}
                    value={draftQuote}
                    onChange={(e) => setDraftQuote(e.target.value)}
                    placeholder="Share details of your project, communication, and results..."
                    className="mt-1 w-full resize-none rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-[#1A73E8] focus:outline-none dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#7A7870]"
                  />
                </div>

                {formError && (
                  <p className="text-xs font-medium text-[#D93025] dark:text-[#F28B82]">
                    {formError}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsComposerOpen(false)}
                    className="min-h-10 cursor-pointer rounded-lg border border-ivory-border px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink dark:border-obsidian-border-strong dark:text-[#C8C6BE] dark:hover:text-[#F5F4F0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="min-h-10 cursor-pointer rounded-lg bg-[#1A73E8] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1557B0] active:scale-[0.98]"
                  >
                    Post review
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
