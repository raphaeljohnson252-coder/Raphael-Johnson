import { useState } from 'react';
import { ArrowRight, Check, Mail, Maximize2 } from 'lucide-react';
import videosBackdrop from '../assets/images/bg_videos_obsidian_1794871450112.jpg';
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
import { VideoLightbox } from '../components/VideoLightbox';
import {
  buildEmailUrl,
  getIndustryVideos,
  MORE_VIDEO_SAMPLES,
  PUBLISHED_AI_VIDEO_INDUSTRIES,
  SERVICE_PRICES,
  VIDEO_SAMPLES,
  VideoSample,
} from '../data/siteContent';
import { RouteLink } from '../router';

const INCLUDED = [
  'Script based on wording you supply and approve',
  'Captions on every video',
  'Vertical (Instagram, TikTok) and horizontal (website, YouTube) versions',
  'Branding matched to your business',
];

const QUESTIONS: FaqItem[] = [
  {
    question: 'How much does it cost?',
    answer: `Starting from ${SERVICE_PRICES.videos}. The final price depends on length and number of videos, and we'll send you a clear quote after a short chat. No obligation. Prices in US dollars.`,
  },
  {
    question: 'Do we need to supply the script?',
    answer: 'You can, or our team can draft a script for your review and approval.',
  },
  {
    question: 'Can you avoid health claims?',
    answer: 'Yes. We follow the approved wording supplied by your clinic or compliance team.',
  },
];

export function AiVideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoSample | null>(null);
  const emailUrl = buildEmailUrl('videos');

  const scrollToSamples = () => {
    const el = document.getElementById('samples-by-industry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const heroVideos = VIDEO_SAMPLES.slice(0, 4).map((sample) => sample.videoSrc);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PageHeroBackdrop
          imageSrc={videosBackdrop}
          videos={heroVideos}
          intervalMs={7500}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-22 sm:pb-24 lg:px-8">
          <HeroEntrance className="max-w-3xl space-y-6">
            <SplitHeadline
              text="Short videos that explain what you do in plain language"
              className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.1] dark:text-[#F5F4F0]"
            />
            <ParallaxText>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                15 to 60 second explainers and social clips for diabetes and health businesses.
              </p>
            </ParallaxText>
            <ParallaxText>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticWrap>
                  <RouteLink
                    to="/contact"
                    service="AI Videos"
                    className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    Get a free sample
                  </RouteLink>
                </MagneticWrap>
                <button
                  type="button"
                  onClick={scrollToSamples}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                >
                  Watch samples
                </button>
              </div>
            </ParallaxText>
          </HeroEntrance>
        </div>
      </section>

      {/* Samples by industry */}
      <section
        id="samples-by-industry"
        className="scroll-mt-20 border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
                Samples by industry
              </h2>
              <p className="text-sm text-ink-muted dark:text-[#96948C]">
                Choose an industry to watch the sample video and explore ideas for your business.
              </p>
            </div>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {PUBLISHED_AI_VIDEO_INDUSTRIES.map((industry) => {
              const industryVideos = getIndustryVideos(industry);
              const leadVideo = industryVideos[0];
              if (!leadVideo) return null;

              return (
                <StaggerItem key={industry.slug}>
                  <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-5 transition-colors duration-200 hover:border-champagne/65 sm:p-6 dark:border-obsidian-border dark:bg-obsidian dark:hover:border-champagne/55">
                    <div className="relative z-10">
                      <RouteLink
                        to={industry.path}
                        aria-label={`Watch sample for ${industry.industryName}`}
                        className="group/preview relative block aspect-video w-full overflow-hidden rounded-lg border border-ivory-border bg-black dark:border-obsidian-border"
                      >
                        <img
                          src={leadVideo.thumbnailSrc}
                          alt={`${industry.industryName} sample thumbnail — ${leadVideo.title}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/preview:scale-[1.03]"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                        />
                        <span className="font-mono-data absolute right-3 bottom-3 rounded-md border border-white/15 bg-black/80 px-2.5 py-1 text-xs font-medium text-[#F5F4F0]">
                          {leadVideo.length}
                        </span>
                      </RouteLink>

                      <h3 className="mt-5 font-display text-xl font-semibold text-ink dark:text-[#F5F4F0]">
                        {industry.industryName}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                        {industry.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                      <MagneticWrap strength={0.14} className="w-full">
                        <RouteLink
                          to={industry.path}
                          className="luxury-shimmer-btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2 text-sm font-semibold text-obsidian whitespace-nowrap transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                        >
                          <span>Watch the sample</span>
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </RouteLink>
                      </MagneticWrap>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      {/* What's included & Pricing */}
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
                    Pricing &amp; turnaround
                  </h3>
                  <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    Starting from{' '}
                    <span className="font-mono-data font-semibold text-ink dark:text-champagne-light">
                      {SERVICE_PRICES.videos}
                    </span>
                    . Every project is quoted after a short chat, so you only pay for what you need.
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
                      service="AI Videos"
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

      {/* More samples (non-industry-specific showcase clips) */}
      {MORE_VIDEO_SAMPLES.length > 0 && (
        <section
          id="samples"
          className="scroll-mt-20 border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface"
        >
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
                  More samples
                </h2>
                <p className="text-sm text-ink-muted dark:text-[#96948C]">
                  Play any sample inline with captions or open it in the full-screen viewer.
                </p>
              </div>
            </RevealBlock>

            <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
              {MORE_VIDEO_SAMPLES.map((sample) => (
                <StaggerItem key={sample.id}>
                  <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-5 transition-colors duration-200 hover:border-champagne/65 sm:p-6 dark:border-obsidian-border dark:bg-obsidian dark:hover:border-champagne/55">
                    <div className="relative z-10">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-ivory-border bg-black dark:border-obsidian-border">
                        <video
                          src={sample.videoSrc}
                          poster={sample.thumbnailSrc}
                          controls
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        >
                          <track
                            kind="captions"
                            src={sample.captionsSrc}
                            srcLang="en"
                            label="English captions"
                            default
                          />
                        </video>
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <p className="text-xs text-ink-muted dark:text-[#96948C]">
                          {sample.category} &middot;{' '}
                          <span className="font-mono-data">{sample.length}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(sample)}
                          aria-label={`Open ${sample.title} in full-screen player`}
                          className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-champagne-deep transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                        >
                          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Expand</span>
                        </button>
                      </div>

                      <h3 className="mt-1.5 font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                        {sample.title}
                      </h3>

                      <dl className="mt-3 space-y-2 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                        <div>
                          <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                            What it explains:
                          </dt>
                          <dd>{sample.whatItExplains}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                            Where it is used:
                          </dt>
                          <dd>{sample.whereUsed}</dd>
                        </div>
                      </dl>
                    </div>

                    <div className="relative z-10 mt-6 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                      <MagneticWrap strength={0.14} className="w-full">
                        <a
                          href={emailUrl}
                          className="luxury-shimmer-btn inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2 text-sm font-semibold text-obsidian whitespace-nowrap transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          <span>Want a video like this? Email us</span>
                        </a>
                      </MagneticWrap>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

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

            <div className="mt-10 space-y-3 text-base text-ink-muted dark:text-[#C8C6BE]">
              <p className="flex flex-wrap items-center gap-y-2">
                <span className="mr-2">Also see:</span>
                <RouteLink
                  to="/websites"
                  className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                >
                  Websites
                </RouteLink>
                <span aria-hidden="true" className="mx-2 text-ink-muted dark:text-[#96948C]">
                  |
                </span>
                <RouteLink
                  to="/flyers-and-print"
                  className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                >
                  Flyers &amp; Print
                </RouteLink>
                {PUBLISHED_AI_VIDEO_INDUSTRIES.map((industry) => (
                  <span key={industry.slug} className="inline-flex items-center">
                    <span aria-hidden="true" className="mx-2 text-ink-muted dark:text-[#96948C]">
                      |
                    </span>
                    <RouteLink
                      to={industry.path}
                      className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                    >
                      {industry.industryName}
                    </RouteLink>
                  </span>
                ))}
              </p>
              <p className="font-medium text-ink dark:text-[#F5F4F0]">
                Need more than one? Ask about a website, flyers and video package.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      <VideoLightbox
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}

