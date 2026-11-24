import { useState } from 'react';
import { ArrowRight, Check, Maximize2, MessageCircle } from 'lucide-react';
import homeBackdrop from '../assets/images/bg_home_obsidian_1794871449160.jpg';
import diabetesBackdrop from '../assets/images/bg_industry_diabetes_clinic_1794878155242.jpg';
import dentalBackdrop from '../assets/images/bg_industry_dental_wellness_1794878154339.jpg';
import flyerTrifoldBackdrop from '../assets/images/bg_flyer_trifold_obsidian_1794878154751.jpg';
import contactBackdrop from '../assets/images/bg_contact_obsidian_1794871451107.jpg';
import { GlucoseTraceHeroVisual } from '../components/GlucoseTraceHeroVisual';
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
import { FlyerLightbox } from '../components/FlyerLightbox';
import { PageHeroBackdrop } from '../components/PageHeroBackdrop';
import { ProjectLightbox } from '../components/ProjectLightbox';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { VideoLightbox } from '../components/VideoLightbox';
import {
  buildWhatsAppUrl,
  BUSINESS_NAME,
  FLYER_SAMPLES,
  FlyerSample,
  REAL_TESTIMONIAL,
  RoutePath,
  SERVICE_PRICES,
  SERVICE_TURNAROUNDS,
  VIDEO_SAMPLES,
  VideoSample,
  WEBSITE_PROJECTS,
  WebsiteProject,
} from '../data/siteContent';
import { RouteLink, useRouter } from '../router';

const SERVICES = [
  {
    index: '01',
    title: 'Websites',
    description: 'Clear, fast sites with booking or ordering buttons.',
    price: `Min. ${SERVICE_PRICES.websites}`,
    turnaround: SERVICE_TURNAROUNDS.websites,
    button: 'See website work',
    to: '/websites' as RoutePath,
  },
  {
    index: '02',
    title: 'Flyers & Print',
    description: 'Flyers, posters and handouts that match your brand.',
    price: `Min. ${SERVICE_PRICES.flyers}`,
    turnaround: SERVICE_TURNAROUNDS.flyers,
    button: 'See flyer work',
    to: '/flyers-and-print' as RoutePath,
  },
  {
    index: '03',
    title: 'AI Videos',
    description: 'Short explainers and social clips in plain language.',
    price: `Min. ${SERVICE_PRICES.videos}`,
    turnaround: SERVICE_TURNAROUNDS.videos,
    button: 'See video work',
    to: '/ai-videos' as RoutePath,
  },
  {
    index: '04',
    title: 'Google SEO, GEO & AEO',
    description:
      'Get visible to higher-value clients, rank on Google, and show up in AI search answers.',
    price: `Min. ${SERVICE_PRICES.seo}`,
    turnaround: SERVICE_TURNAROUNDS.seo,
    button: 'See SEO examples',
    to: '/seo-geo-aeo' as RoutePath,
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Free mockup',
    text: 'Share your website or idea and our team sends a homepage mockup at no cost.',
  },
  {
    number: '02',
    title: 'Quote',
    text: 'After a short discovery exchange, we send a fixed quote for the whole project, so you know the cost before we begin.',
  },
  {
    number: '03',
    title: 'Build and review',
    text: "We design and build using your wording, photos and branding. You review each milestone and we refine until you're happy.",
  },
  {
    number: '04',
    title: 'Launch and support',
    text: 'We publish the work and remain available for ongoing updates.',
  },
];

const MARQUEE_ITEMS = [
  'Websites for health clinics',
  'Flyers & Print',
  'Plain-language AI Videos',
  'Google SEO, GEO & AEO Ranking',
  'Working with clients worldwide',
  'Free homepage mockup',
];

export function HomePage() {
  const { navigate } = useRouter();
  const [selectedProject, setSelectedProject] =
    useState<WebsiteProject | null>(null);
  const [selectedFlyer, setSelectedFlyer] = useState<FlyerSample | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoSample | null>(null);

  const featuredWebsite = WEBSITE_PROJECTS[0]; // Midtown Dental
  const featuredFlyers = [FLYER_SAMPLES[0], FLYER_SAMPLES[3], FLYER_SAMPLES[4]];
  const featuredVideo = VIDEO_SAMPLES[0]; // Diabetes Care Clinic Explainer

  const heroImages = [
    homeBackdrop,
    diabetesBackdrop,
    flyerTrifoldBackdrop,
    dentalBackdrop,
    contactBackdrop,
  ];

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-w-0 overflow-x-clip">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <PageHeroBackdrop images={heroImages} intervalMs={5500} />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <HeroEntrance className="space-y-6 lg:col-span-6">
              <ParallaxText>
                <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                  {BUSINESS_NAME} &middot; Health &amp; Clinic Creative Studio
                </p>
              </ParallaxText>
              <SplitHeadline
                text="Websites and videos for diabetes and health businesses"
                className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.08] dark:text-[#F5F4F0]"
              />
              <ParallaxText>
                <p className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                  We design clear, mobile-friendly websites, flyers, short AI videos, and Google SEO, GEO &amp; AEO visibility systems that help higher-value clients find you on Google, trust what you offer, and get in touch.
                </p>
              </ParallaxText>
              <ParallaxText>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <MagneticWrap>
                    <RouteLink
                      to="/contact"
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a free mockup
                    </RouteLink>
                  </MagneticWrap>
                  <button
                    type="button"
                    onClick={scrollToFeatured}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ivory-border bg-white/90 px-6 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian-surface/85 dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                  >
                    See our work
                  </button>
                </div>
              </ParallaxText>
            </HeroEntrance>

            <HeroEntrance delay={0.14} parallaxOffset={-16} className="lg:col-span-6">
              <div className="hero-float-card">
                <GlucoseTraceHeroVisual />
              </div>
            </HeroEntrance>
          </div>
        </div>
      </section>

      {/* Subtle architectural marquee divider */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-t border-ivory-border bg-ivory py-3.5 dark:border-obsidian-border dark:bg-obsidian"
      >
        <div className="studio-marquee-track text-xs tracking-[0.18em] text-ink-muted uppercase dark:text-[#96948C]">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${dup}-${item}`} className="flex items-center">
                  <span className="px-6 whitespace-nowrap">{item}</span>
                  <span className="text-champagne-deep dark:text-champagne-light">
                    &middot;
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* What we make */}
      <section className="border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              What we make
            </h2>
            <p className="font-editorial text-lg italic text-ink-muted dark:text-[#C8C6BE]">
              Four focused services built to get your business seen and booked
            </p>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <StaggerItem key={service.title}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-6 transition-colors duration-200 hover:border-champagne/70 sm:p-7 dark:border-obsidian-border dark:bg-obsidian dark:hover:border-champagne/60">
                  <div className="relative z-10 space-y-3">
                    <span className="font-mono-data block text-xs text-champagne-deep dark:text-champagne-light">
                      {service.index}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink dark:text-[#F5F4F0]">
                      {service.title}
                    </h3>
                    <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      {service.description}
                    </p>
                    <p className="font-mono-data pt-1 text-sm font-medium text-ink dark:text-[#E6C86E]">
                      {service.price} &middot; {service.turnaround}
                    </p>
                    <p className="text-xs text-ink-muted dark:text-[#96948C]">
                      Minimum starting rate in US dollars.
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 border-t border-ivory-border pt-5 dark:border-obsidian-border">
                    <RouteLink
                      to={service.to}
                      className="inline-flex min-h-10 items-center gap-2 text-sm font-medium text-champagne-deep whitespace-nowrap transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne dark:text-champagne-light dark:hover:text-[#F5F4F0]"
                    >
                      <span>{service.button}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </RouteLink>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Featured work (asymmetric bento: flagship Website capture + Flyers & Videos tiles) */}
      <section
        id="featured-work"
        className="scroll-mt-20 border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              Featured work
            </h2>
            <p className="text-sm text-ink-muted dark:text-[#96948C]">
              Select a service tile to explore work and samples
            </p>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Tile 1: Flagship Website Capture (Bento wide span) */}
            <StaggerItem className="min-w-0 lg:col-span-7">
              <SpotlightCard className="h-full rounded-xl border border-ivory-border bg-white transition-colors duration-200 hover:border-champagne/75 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/65">
                <button
                  type="button"
                  onClick={() => navigate('/websites')}
                  className="relative z-10 flex h-full w-full min-w-0 flex-col justify-between p-4 text-left sm:p-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                  <div className="aspect-[16/10] w-full min-w-0 overflow-hidden rounded-lg border border-ivory-border bg-obsidian dark:border-obsidian-border">
                    <img
                      src={featuredWebsite.imageSrc}
                      alt={featuredWebsite.imageAlt}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top transition-[object-position] duration-[3200ms] ease-in-out group-hover:object-bottom"
                    />
                  </div>
                  <div className="mt-5 flex w-full min-w-0 items-center justify-between gap-3 px-1">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-ink dark:text-[#F5F4F0]">
                        {featuredWebsite.clientName}, Websites
                      </p>
                      <p className="mt-0.5 text-sm text-ink-muted dark:text-[#96948C]">
                        {featuredWebsite.businessType}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-champagne-deep dark:text-[#96948C] dark:group-hover:text-champagne-light"
                      aria-hidden="true"
                    />
                  </div>
                </button>
              </SpotlightCard>
            </StaggerItem>

            {/* Stacked right column: Flyers & Print + AI Videos */}
            <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              <StaggerItem className="min-w-0">
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-4 transition-colors duration-200 hover:border-champagne/75 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/65">
                  <div className="relative z-10 flex h-full w-full min-w-0 flex-col justify-between">
                    <div className="grid aspect-[16/9] w-full min-w-0 grid-cols-3 gap-2 overflow-hidden rounded-lg border border-ivory-border bg-obsidian p-2 sm:gap-2.5 sm:p-2.5 dark:border-obsidian-border">
                      {featuredFlyers.map((flyer) => (
                        <button
                          key={flyer.id}
                          type="button"
                          onClick={() => setSelectedFlyer(flyer)}
                          aria-label={`View flyer layout: ${flyer.title}`}
                          className="group/flyer relative h-full w-full min-w-0 cursor-pointer overflow-hidden rounded-md border border-obsidian-border bg-obsidian-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                        >
                          <img
                            src={flyer.imageSrc}
                            alt={flyer.imageAlt}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/flyer:scale-[1.04]"
                          />
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-2 px-1 sm:flex-nowrap">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-medium text-ink dark:text-[#F5F4F0]">
                          Healthcare Flyer Styles, Flyers &amp; Print
                        </p>
                        <p className="mt-0.5 truncate text-xs text-ink-muted dark:text-[#96948C]">
                          A4 handouts, posters &amp; clinic social cards
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedFlyer(featuredFlyers[1])}
                          aria-label="Expand healthcare flyer preview"
                          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-ivory-border bg-ivory px-2.5 text-xs font-medium text-champagne-deep transition-colors duration-150 hover:border-champagne hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-champagne-light dark:hover:border-champagne-light dark:hover:text-[#F5F4F0]"
                        >
                          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Expand</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/flyers-and-print')}
                          aria-label="Go to Flyers & Print page"
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-ivory-border bg-ivory text-ink-muted transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                        >
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>

              <StaggerItem className="min-w-0">
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-4 transition-colors duration-200 hover:border-champagne/75 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/65">
                  <div className="relative z-10 flex h-full w-full min-w-0 flex-col justify-between">
                    <div className="relative aspect-[16/9] w-full min-w-0 overflow-hidden rounded-lg border border-ivory-border bg-black dark:border-obsidian-border">
                      <video
                        src={featuredVideo.videoSrc}
                        poster={featuredVideo.thumbnailSrc}
                        controls
                        playsInline
                        preload="none"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex w-full min-w-0 flex-wrap items-center justify-between gap-2 px-1 sm:flex-nowrap">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-medium text-ink dark:text-[#F5F4F0]">
                          {featuredVideo.title}, AI Videos
                        </p>
                        <p className="mt-0.5 text-xs text-ink-muted dark:text-[#96948C]">
                          {featuredVideo.category} &middot;{' '}
                          <span className="font-mono-data">{featuredVideo.length}</span>
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVideo(featuredVideo);
                          }}
                          aria-label={`Expand ${featuredVideo.title} in full-screen player`}
                          className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-ivory-border bg-ivory px-2.5 text-xs font-medium text-champagne-deep transition-colors duration-150 hover:border-champagne hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-champagne-light dark:hover:border-champagne-light dark:hover:text-[#F5F4F0]"
                        >
                          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Expand</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/ai-videos')}
                          aria-label="Go to AI Videos page"
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-ivory-border bg-ivory text-ink-muted transition-colors duration-150 hover:border-champagne hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                        >
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            </div>
          </StaggerGrid>
        </div>
      </section>

      {/* Selected Website Designs Gallery (all 8 uploaded screenshots) */}
      <section className="cv-auto border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
                Website designs by {BUSINESS_NAME}
              </h2>
              <p className="max-w-2xl text-base text-ink-muted dark:text-[#C8C6BE]">
                Click any website to inspect the full-page design, layout structure, and problem solved.
              </p>
            </div>
            <RouteLink
              to="/websites"
              className="inline-flex items-center gap-2 text-sm font-medium text-champagne-deep whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-ink dark:text-champagne-light dark:hover:text-[#F5F4F0]"
            >
              <span>See all website case studies</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </RouteLink>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WEBSITE_PROJECTS.map((project) => (
              <StaggerItem key={project.id}>
                <SpotlightCard className="h-full rounded-xl border border-ivory-border bg-ivory transition-colors duration-200 hover:border-champagne/75 dark:border-obsidian-border dark:bg-obsidian dark:hover:border-champagne/65">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="relative z-10 flex h-full w-full min-w-0 flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ivory-border bg-obsidian-surface dark:border-obsidian-border">
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-top transition-[object-position] duration-[3200ms] ease-in-out group-hover:object-bottom"
                      />
                      <div className="absolute right-2.5 bottom-2.5 flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-black/80 text-champagne-light opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
                      <div>
                        <p className="text-xs text-ink-muted dark:text-[#96948C]">
                          {project.category}
                        </p>
                        <h3 className="mt-1 font-display text-base font-semibold text-ink dark:text-[#F5F4F0]">
                          {project.clientName}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                          {project.summary}
                        </p>
                      </div>
                    </div>
                  </button>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* How it works */}
      <section className="cv-auto border-t border-ivory-border bg-ivory dark:border-obsidian-border dark:bg-obsidian">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance sm:text-3xl dark:text-[#F5F4F0]">
              How it works
            </h2>
            <p className="font-editorial text-lg italic text-ink-muted dark:text-[#C8C6BE]">
              From free mockup to launch in four clear steps
            </p>
          </RevealBlock>

          <StaggerGrid className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
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

      {/* Clear Minimum Pricing & About Ewixstudio */}
      <section className="cv-auto border-t border-ivory-border bg-white dark:border-obsidian-border dark:bg-obsidian-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left 7 cols: Transparent Minimum Pricing Table */}
              <SpotlightCard className="flex flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-7 sm:p-9 lg:col-span-7 dark:border-obsidian-border dark:bg-obsidian">
                <div className="relative z-10 space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                      Transparent minimum prices
                    </p>
                    <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance dark:text-[#F5F4F0]">
                      Clear starting rates, fixed quotes up front
                    </h2>
                    <p className="text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      Every project starts with a free homepage mockup or visibility check—followed by a fixed quote in US dollars before any work begins.
                    </p>
                  </div>

                  <div className="divide-y divide-ivory-border border-y border-ivory-border dark:divide-obsidian-border dark:border-obsidian-border">
                    {[
                      {
                        label: 'Websites',
                        price: SERVICE_PRICES.websites,
                        turnaround: SERVICE_TURNAROUNDS.websites,
                        note: 'Mobile-friendly design, booking/contact flow & speed setup',
                      },
                      {
                        label: 'Flyers & Print',
                        price: SERVICE_PRICES.flyers,
                        turnaround: SERVICE_TURNAROUNDS.flyers,
                        note: 'Print-ready PDF + social formats matched to your brand',
                      },
                      {
                        label: 'AI Promo Videos',
                        price: SERVICE_PRICES.videos,
                        turnaround: SERVICE_TURNAROUNDS.videos,
                        note: 'Captioned vertical & horizontal short clips in plain language',
                      },
                      {
                        label: 'Google SEO, GEO & AEO',
                        price: SERVICE_PRICES.seo,
                        turnaround: SERVICE_TURNAROUNDS.seo,
                        note: 'On-page SEO, structured schema, Maps & AI search readiness',
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex flex-col justify-between gap-1.5 py-3.5 sm:flex-row sm:items-center sm:gap-4"
                      >
                        <div className="min-w-0">
                          <p className="font-display text-sm font-semibold text-ink dark:text-[#F5F4F0]">
                            {row.label}
                          </p>
                          <p className="text-xs text-ink-muted dark:text-[#96948C]">
                            {row.note}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-0.5">
                          <span className="font-mono-data text-sm font-semibold text-ink dark:text-champagne-light">
                            From {row.price}
                          </span>
                          <span className="font-mono-data text-xs text-ink-muted dark:text-[#96948C]">
                            {row.turnaround}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 mt-7 flex flex-wrap items-center gap-3">
                  <MagneticWrap>
                    <RouteLink
                      to="/contact"
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-5 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      Get a fixed quote
                    </RouteLink>
                  </MagneticWrap>
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ivory-border bg-white px-5 py-3 text-sm font-medium text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-champagne hover:text-champagne-deep dark:border-obsidian-border-strong dark:bg-obsidian-surface dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </SpotlightCard>

              {/* Right 5 cols: About Ewixstudio */}
              <SpotlightCard className="flex flex-col justify-between rounded-xl border border-ivory-border bg-ivory p-7 sm:p-9 lg:col-span-5 dark:border-obsidian-border dark:bg-obsidian">
                <div className="relative z-10 space-y-4">
                  <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                    About {BUSINESS_NAME}
                  </p>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-ink text-balance dark:text-[#F5F4F0]">
                    Direct studio work—no agency layers or bloated retainers
                  </h2>
                  <p className="text-sm leading-relaxed text-ink-muted sm:text-base dark:text-[#C8C6BE]">
                    {BUSINESS_NAME} is an independent creative studio helping clinics, health businesses, restaurants, real estate advisors, and online brands look credible online and get found on Google.
                  </p>
                  <ul className="space-y-2.5 border-t border-ivory-border pt-4 text-sm text-ink-muted dark:border-obsidian-border dark:text-[#C8C6BE]">
                    {[
                      'Direct communication via WhatsApp or email—no middlemen',
                      'Free homepage preview or visibility check before you commit',
                      'Written in wording you approve, respecting healthcare advertising standards',
                      'Delivered remotely for clients worldwide with clear turnaround dates',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-champagne-deep dark:text-champagne-light"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {REAL_TESTIMONIAL && (
                  <blockquote className="relative z-10 mt-6 rounded-lg border border-ivory-border bg-white p-5 dark:border-obsidian-border dark:bg-obsidian-surface">
                    <p className="text-base italic leading-relaxed text-ink dark:text-[#F5F4F0]">
                      &ldquo;{REAL_TESTIMONIAL.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-sm text-ink-muted dark:text-[#96948C]">
                      &mdash; {REAL_TESTIMONIAL.clientName}, {REAL_TESTIMONIAL.business},{' '}
                      {REAL_TESTIMONIAL.city}
                    </footer>
                  </blockquote>
                )}
              </SpotlightCard>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviewsSection />

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <FlyerLightbox
        flyer={selectedFlyer}
        onClose={() => setSelectedFlyer(null)}
      />

      <VideoLightbox
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
