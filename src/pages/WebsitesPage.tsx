import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Mail, Maximize2 } from 'lucide-react';
import diabetesBackdrop from '../assets/images/bg_industry_diabetes_clinic_1794878155242.jpg';
import dentalBackdrop from '../assets/images/bg_industry_dental_wellness_1794878154339.jpg';
import websitesBackdrop from '../assets/images/bg_websites_obsidian_1794871448351.jpg';
import homeBackdrop from '../assets/images/bg_home_obsidian_1794871449160.jpg';
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
import { ProjectLightbox } from '../components/ProjectLightbox';
import {
  buildEmailUrl,
  SERVICE_PRICES,
  WEBSITE_PROJECTS,
  WebsiteCategory,
  WebsiteProject,
} from '../data/siteContent';
import { RouteLink } from '../router';

const INCLUDED = [
  'Mobile-friendly design that works on any phone',
  'Clear booking, ordering or contact buttons',
  'Fast-loading pages',
  'Contact form and map',
  'Basic search engine setup',
  'Wording you supply and approve',
];

const CATEGORIES: WebsiteCategory[] = [
  'All',
  'Health & Wellness',
  'Books & Editorial',
  'Studios & Hospitality',
];

const QUESTIONS: FaqItem[] = [
  {
    question: 'How much does it cost?',
    answer: `Starting from ${SERVICE_PRICES.websites}. The final price depends on the size of the project, and we'll send you a clear quote after your free mockup. No obligation. Prices in US dollars.`,
  },
  {
    question: 'Can you use our own wording and photos?',
    answer: 'Yes. We work directly from the wording and images you supply and approve.',
  },
  {
    question: 'Can you improve our current website instead of starting over?',
    answer:
      "Yes. Send us the link and we'll let you know what our team would improve first.",
  },
  {
    question: 'What do you need from us to get started?',
    answer: 'Your logo, photos, services list, and business contact details.',
  },
];

export function WebsitesPage() {
  const [filter, setFilter] = useState<WebsiteCategory>('All');
  const [selectedProject, setSelectedProject] =
    useState<WebsiteProject | null>(null);

  const emailUrl = buildEmailUrl('websites');

  const filteredProjects =
    filter === 'All'
      ? WEBSITE_PROJECTS
      : WEBSITE_PROJECTS.filter((item) => item.category === filter);

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
            diabetesBackdrop,
            dentalBackdrop,
            websitesBackdrop,
            homeBackdrop,
          ]}
          intervalMs={5500}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-22 sm:pb-24 lg:px-8">
          <HeroEntrance className="max-w-3xl space-y-6">
            <SplitHeadline
              text="Websites that make it easy to book, order and contact you"
              className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.1] dark:text-[#F5F4F0]"
            />
            <ParallaxText>
              <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                Clear, fast, mobile-friendly websites for diabetes and health businesses.
              </p>
            </ParallaxText>
            <ParallaxText>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <MagneticWrap>
                  <RouteLink
                    to="/contact"
                    service="Websites"
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
                      {SERVICE_PRICES.websites}
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
                      service="Websites"
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
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <RevealBlock className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-[#F5F4F0]">
                Samples and past work
              </h2>
              <p className="text-sm text-ink-muted dark:text-[#96948C]">
                Click any project preview to scroll through the full-page design capture.
              </p>
            </div>

            {/* Category filter tabs with smooth layoutId indicator */}
            <div
              role="tablist"
              aria-label="Filter website samples by industry"
              className="flex flex-wrap items-center gap-1 rounded-lg border border-ivory-border bg-white p-1 dark:border-obsidian-border dark:bg-obsidian-surface"
            >
              {CATEGORIES.map((category) => {
                const isSelected = filter === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setFilter(category)}
                    className={`relative rounded-md px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-150 ${
                      isSelected
                        ? 'font-semibold text-obsidian'
                        : 'text-ink-muted hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="activeWebsiteCategory"
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 rounded-md bg-champagne"
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          <StaggerGrid key={filter} className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <SpotlightCard className="flex h-full flex-col justify-between rounded-xl border border-ivory-border bg-white p-5 transition-colors duration-200 hover:border-champagne/65 sm:p-6 dark:border-obsidian-border dark:bg-obsidian-surface dark:hover:border-champagne/55">
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      aria-label={`Inspect full-page website capture for ${project.clientName}`}
                      className="group/preview relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-ivory-border bg-obsidian text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border"
                    >
                      <img
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.035]"
                      />
                      <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-black/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors duration-150 group-hover/preview:border-champagne/70 group-hover/preview:text-champagne-light">
                        <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>View full page</span>
                      </span>
                    </button>

                    <div className="mt-5 space-y-1">
                      <p className="text-xs text-ink-muted dark:text-[#96948C]">
                        {project.category} &middot; {project.country}
                      </p>
                      <h3 className="font-display text-xl font-semibold text-ink dark:text-[#F5F4F0]">
                        {project.clientName}, {project.businessType}
                      </h3>
                    </div>

                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                      {project.summary}
                    </p>

                    <dl className="mt-4 space-y-2.5 border-t border-ivory-border pt-4 text-sm leading-relaxed text-ink-muted dark:border-obsidian-border dark:text-[#C8C6BE]">
                      <div>
                        <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                          The problem:
                        </dt>
                        <dd>{project.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                          What we delivered:
                        </dt>
                        <dd>{project.whatIDid}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                          Highlights:
                        </dt>
                        <dd className="mt-1 space-y-1 text-ink-muted dark:text-[#96948C]">
                          {project.highlights.map((item) => (
                            <div key={item}>&bull; {item}</div>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-ink dark:text-[#F5F4F0]">
                          Reference:
                        </dt>
                        <dd className="font-mono-data text-xs text-ink-muted dark:text-[#96948C]">
                          {project.linkLabel}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ivory-border pt-4 dark:border-obsidian-border">
                    <MagneticWrap strength={0.14}>
                      <a
                        href={emailUrl}
                        className="luxury-shimmer-btn inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-champagne px-4 py-2 text-sm font-semibold text-obsidian whitespace-nowrap transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        <span>Want something like this? Email us</span>
                      </a>
                    </MagneticWrap>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-ivory-border bg-ivory px-4 py-2 text-sm font-medium text-ink whitespace-nowrap transition-colors duration-150 hover:border-champagne hover:text-champagne-deep dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#C8C6BE] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                    >
                      Preview full design
                    </button>
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

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
