import { useEffect, useState } from 'react';
import { Check, Maximize2 } from 'lucide-react';
import videosBackdrop from '../assets/images/bg_videos_obsidian_1794871450112.jpg';
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
  AiVideoIndustryConfig,
  getIndustryVideos,
  PUBLISHED_AI_VIDEO_INDUSTRIES,
  SERVICE_PRICES,
  VideoSample,
} from '../data/siteContent';
import { RouteLink } from '../router';

interface AiVideoIndustryPageProps {
  industry: AiVideoIndustryConfig;
}

const HOW_IT_WORKS_STEPS = [
  {
    number: '1.',
    title: 'Free sample',
    text: 'Message us your business name, services and photos and we will send a free tailored concept.',
  },
  {
    number: '2.',
    title: 'Quote',
    text: `Starting from ${SERVICE_PRICES.videos}. We send a clear fixed quote after a short chat, so you only pay for what you need. Prices in US dollars.`,
  },
  {
    number: '3.',
    title: 'Delivery',
    text: 'We deliver captioned vertical and horizontal exports ready for your website and social channels.',
  },
];

export function AiVideoIndustryPage({ industry }: AiVideoIndustryPageProps) {
  const videos = getIndustryVideos(industry);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<VideoSample | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setSelectedVideo(null);
  }, [industry.slug]);

  const hasExtraVideoGallery =
    (industry.slug === 'cafes' || industry.slug === 'health') &&
    videos.length > 1;
  const activeVideo = hasExtraVideoGallery
    ? videos[0]
    : (videos[activeIndex] ?? videos[0]);
  const extraVideos = hasExtraVideoGallery ? videos.slice(1) : [];
  const otherIndustries = PUBLISHED_AI_VIDEO_INDUSTRIES.filter(
    (item) => item.slug !== industry.slug
  );

  return (
    <div>
      {/* Hero + Video right at top */}
      <section className="relative overflow-hidden">
        <PageHeroBackdrop
          images={[videosBackdrop]}
          intervalMs={7500}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-14 sm:px-6 sm:pt-12 sm:pb-20 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-ink-muted dark:text-[#96948C]"
          >
            <RouteLink
              to="/ai-videos"
              className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
            >
              AI Videos
            </RouteLink>
            <span aria-hidden="true">&gt;</span>
            <span className="font-medium text-ink dark:text-[#F5F4F0]">
              {industry.industryName}
            </span>
          </nav>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Industry headline & description */}
            <HeroEntrance className="space-y-5 lg:col-span-5">
              <SplitHeadline
                text={industry.headline}
                className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-4xl sm:leading-[1.12] dark:text-[#F5F4F0]"
              />
              <ParallaxText>
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                  {industry.description}
                </p>
              </ParallaxText>
              <ParallaxText>
                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <MagneticWrap>
                    <a
                      href={industry.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a free sample
                    </a>
                  </MagneticWrap>
                  <RouteLink
                    to="/contact"
                    service="AI Videos"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                  >
                    Get a quote
                  </RouteLink>
                </div>
              </ParallaxText>
            </HeroEntrance>

            {/* Right: Responsive video at top without scrolling */}
            <HeroEntrance delay={0.1} parallaxOffset={-12} className="lg:col-span-7">
              {activeVideo && (
                <SpotlightCard className="rounded-xl border border-ivory-border bg-white/95 p-4 backdrop-blur-md sm:p-5 dark:border-obsidian-border dark:bg-obsidian-surface/90">
                  <div className="relative z-10 space-y-3.5">
                    <div
                      className={`relative w-full overflow-hidden rounded-lg border border-ivory-border bg-black dark:border-obsidian-border ${
                        activeVideo.aspectRatio === '9:16'
                          ? 'mx-auto aspect-[9/16] max-w-xs'
                          : 'aspect-video'
                      }`}
                    >
                      <video
                        key={activeVideo.id}
                        src={activeVideo.videoSrc}
                        poster={activeVideo.thumbnailSrc}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      >
                        <track
                          kind="captions"
                          src={activeVideo.captionsSrc}
                          srcLang="en"
                          label="English captions"
                          default
                        />
                      </video>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                      <p className="text-xs text-ink-muted dark:text-[#96948C]">
                        {activeVideo.title} &middot;{' '}
                        <span className="font-mono-data">
                          {activeVideo.length}
                        </span>{' '}
                        &middot; Captions on
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(activeVideo)}
                        aria-label={`Open ${activeVideo.title} in full-screen player`}
                        className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-champagne-deep transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                      >
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Expand</span>
                      </button>
                    </div>

                    {!hasExtraVideoGallery && videos.length > 1 && (
                      <div
                        role="tablist"
                        aria-label={`Select sample video for ${industry.industryName}`}
                        className="flex flex-wrap items-center gap-2 border-t border-ivory-border pt-3 dark:border-obsidian-border"
                      >
                        {videos.map((item, idx) => {
                          const isCurrent = idx === activeIndex;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              role="tab"
                              aria-selected={isCurrent}
                              onClick={() => setActiveIndex(idx)}
                              className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                                isCurrent
                                  ? 'bg-champagne font-semibold text-obsidian'
                                  : 'border border-ivory-border bg-ivory text-ink-muted hover:border-champagne hover:text-ink dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:border-champagne-light dark:hover:text-[#F5F4F0]'
                              }`}
                            >
                              {item.title}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <p className="px-1 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      Sample concept. I&apos;ll make a version with your business name, services and photos.
                    </p>
                  </div>
                </SpotlightCard>
              )}
            </HeroEntrance>
          </div>
        </div>
      </section>

      {/* Additional Sample Concepts */}
      {extraVideos.length > 0 && (
        <section className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
            <StaggerGrid
              className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
                extraVideos.length >= 3 ? 'lg:grid-cols-3' : ''
              }`}
            >
              {extraVideos.map((video) => (
                <StaggerItem key={video.id}>
                  <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white/95 p-4 backdrop-blur-md sm:p-5 dark:border-obsidian-border dark:bg-obsidian-surface/90">
                    <div className="relative z-10 space-y-3.5">
                      <div
                        className={`relative w-full overflow-hidden rounded-lg border border-ivory-border bg-black dark:border-obsidian-border ${
                          video.aspectRatio === '9:16'
                            ? 'mx-auto aspect-[9/16] max-w-xs'
                            : 'aspect-video'
                        }`}
                      >
                        <video
                          src={video.videoSrc}
                          poster={video.thumbnailSrc}
                          controls
                          playsInline
                          preload="metadata"
                          className="h-full w-full object-cover"
                        >
                          <track
                            kind="captions"
                            src={video.captionsSrc}
                            srcLang="en"
                            label="English captions"
                            default
                          />
                        </video>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                        <p className="text-xs text-ink-muted dark:text-[#96948C]">
                          <span className="font-mono-data">{video.length}</span>{' '}
                          &middot; Captions on
                        </p>
                        <button
                          type="button"
                          onClick={() => setSelectedVideo(video)}
                          aria-label={`Open ${video.title} in full-screen player`}
                          className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-champagne-deep transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                        >
                          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Expand</span>
                        </button>
                      </div>

                      <h3 className="px-1 font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                        {video.title}
                      </h3>

                      <p className="px-1 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                        Sample concept. I&apos;ll make a version with your business name, services and photos.
                      </p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerGrid>
          </div>
        </section>
      )}

      {/* Video ideas for you + Short How it works */}
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <RevealBlock>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-6 lg:col-span-7">
                <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
                  Video ideas for you
                </h2>
                <ul className="space-y-4">
                  {industry.ideas.map((idea) => (
                    <li
                      key={idea}
                      className="flex items-start gap-3 text-base text-ink-muted dark:text-[#C8C6BE]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-champagne-deep dark:text-champagne-light"
                        aria-hidden="true"
                      />
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>

                {industry.note && (
                  <p className="rounded-lg border border-ivory-border bg-ivory px-5 py-4 text-sm leading-relaxed text-ink-muted dark:border-obsidian-border dark:bg-obsidian dark:text-[#C8C6BE]">
                    {industry.note}
                  </p>
                )}
              </div>

              <SpotlightCard className="flex flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-7 lg:col-span-5 dark:border-obsidian-border dark:bg-obsidian">
                <div className="relative z-10 space-y-5">
                  <h3 className="font-display text-lg font-semibold text-ink dark:text-[#F5F4F0]">
                    How it works
                  </h3>
                  <ol className="space-y-4">
                    {HOW_IT_WORKS_STEPS.map((step) => (
                      <li key={step.title} className="space-y-1">
                        <p className="text-sm font-semibold text-ink dark:text-[#F5F4F0]">
                          <span className="font-mono-data mr-1.5 text-champagne-deep dark:text-champagne-light">
                            {step.number}
                          </span>
                          {step.title}
                        </p>
                        <p className="text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                          {step.text}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="relative z-10 mt-8">
                  <MagneticWrap className="w-full">
                    <a
                      href={industry.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="luxury-shimmer-btn inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-champagne px-5 py-3 text-sm font-semibold text-obsidian whitespace-nowrap transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a free sample for my business
                    </a>
                  </MagneticWrap>
                </div>
              </SpotlightCard>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <RevealBlock className="space-y-3 text-base text-ink-muted dark:text-[#C8C6BE]">
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
              <span aria-hidden="true" className="mx-2 text-ink-muted dark:text-[#96948C]">
                |
              </span>
              <RouteLink
                to="/ai-videos"
                className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
              >
                All AI Videos
              </RouteLink>
              {otherIndustries.map((item) => (
                <span key={item.slug} className="inline-flex items-center">
                  <span aria-hidden="true" className="mx-2 text-ink-muted dark:text-[#96948C]">
                    |
                  </span>
                  <RouteLink
                    to={item.path}
                    className="font-medium text-champagne-deep underline decoration-ivory-border underline-offset-4 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:decoration-obsidian-border-strong dark:hover:text-[#F5F4F0]"
                  >
                    {item.industryName}
                  </RouteLink>
                </span>
              ))}
            </p>
            <p className="font-medium text-ink dark:text-[#F5F4F0]">
              Need more than one? Ask about a website, flyers and video package.
            </p>
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
