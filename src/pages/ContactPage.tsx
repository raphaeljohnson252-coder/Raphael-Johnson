import React, { useEffect, useState } from 'react';
import { Check, CheckCircle2, Copy, Mail } from 'lucide-react';
import contactBackdrop from '../assets/images/bg_contact_obsidian_1794871451107.jpg';
import diabetesBackdrop from '../assets/images/bg_industry_diabetes_clinic_1794878155242.jpg';
import homeBackdrop from '../assets/images/bg_home_obsidian_1794871449160.jpg';
import {
  HeroEntrance,
  MagneticWrap,
  ParallaxText,
  SplitHeadline,
  SpotlightCard,
} from '../components/LuxuryMotion';
import { PageHeroBackdrop } from '../components/PageHeroBackdrop';
import {
  BUSINESS_NAME,
  CONTACT_EMAIL,
  EMAIL_HREF,
} from '../data/siteContent';
import { useRouter } from '../router';

const SERVICE_OPTIONS = ['Websites', 'Flyers & Print', 'AI Videos', 'Not sure'];

export function ContactPage() {
  const { preselectedService } = useRouter();

  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [service, setService] = useState(
    SERVICE_OPTIONS.includes(preselectedService)
      ? preselectedService
      : 'Websites'
  );
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedService && SERVICE_OPTIONS.includes(preselectedService)) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!message.trim()) {
      setError('Please add a short message about what you need.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const composedMessageText = [
    `Name: ${name.trim()}`,
    businessName.trim() ? `Business name: ${businessName.trim()}` : '',
    websiteLink.trim() ? `Website link: ${websiteLink.trim()}` : '',
    `Which service: ${service}`,
    '',
    message.trim(),
  ]
    .filter((line) => line !== undefined && line !== '')
    .join('\n');

  const composedEmailHref = (() => {
    const subject = encodeURIComponent(
      `Portfolio enquiry (${service}) — ${businessName.trim() || name.trim()}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        businessName.trim() ? `Business name: ${businessName.trim()}` : '',
        websiteLink.trim() ? `Website link: ${websiteLink.trim()}` : '',
        `Which service: ${service}`,
        '',
        message.trim(),
      ]
        .filter((line) => line !== undefined)
        .join('\n')
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  })();

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${CONTACT_EMAIL}\n\n${composedMessageText}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden">
        <PageHeroBackdrop
          images={[contactBackdrop, diabetesBackdrop, homeBackdrop]}
          intervalMs={6000}
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-18 sm:px-6 sm:pt-22 sm:pb-24 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left column: Headline, text, direct email button */}
            <HeroEntrance className="space-y-6 lg:col-span-5">
              <ParallaxText>
                <p className="font-mono-data text-xs tracking-wider text-champagne-deep uppercase dark:text-champagne-light">
                  {BUSINESS_NAME} &middot; New Project Enquiries
                </p>
              </ParallaxText>
              <SplitHeadline
                text="Let's look at your website"
                className="font-display text-3xl font-bold tracking-tight text-ink text-balance sm:text-5xl sm:leading-[1.1] dark:text-[#F5F4F0]"
              />
              <ParallaxText>
                <p className="text-base leading-relaxed text-ink-muted sm:text-lg dark:text-[#C8C6BE]">
                  Send us your website link and we&apos;ll reply with one specific improvement and a free homepage mockup. No obligation.
                </p>
              </ParallaxText>

              <ParallaxText>
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <MagneticWrap>
                    <a
                      href={EMAIL_HREF}
                      className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>Email us ({CONTACT_EMAIL})</span>
                    </a>
                  </MagneticWrap>
                </div>
              </ParallaxText>

              <ParallaxText>
                <p className="pt-4 text-sm leading-relaxed text-ink-muted dark:text-[#96948C]">
                  Partnering with diabetes clinics, health practices, and wellness brands globally. All consultations and mockups are handled directly via email, with responses within 24 hours.
                </p>
              </ParallaxText>
            </HeroEntrance>

            {/* Right column: Email enquiry form */}
            <HeroEntrance delay={0.14} parallaxOffset={-14} className="lg:col-span-7">
              <SpotlightCard className="rounded-xl border border-ivory-border bg-white/95 p-6 backdrop-blur-md sm:p-8 dark:border-obsidian-border dark:bg-obsidian-surface/90">
                <div className="relative z-10">
                  {submitted ? (
                    <div className="space-y-5 py-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2
                          className="mt-0.5 h-6 w-6 shrink-0 text-[#157A45] dark:text-[#34D399]"
                          aria-hidden="true"
                        />
                        <div className="space-y-2">
                          <h2 className="font-display text-xl font-semibold text-ink dark:text-[#F5F4F0]">
                            Email ready for {BUSINESS_NAME}
                          </h2>
                          <p className="text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                            Open your email app to send this straight to{' '}
                            <span className="font-medium text-ink dark:text-champagne-light">
                              {CONTACT_EMAIL}
                            </span>{' '}
                            or copy the message below.
                          </p>
                        </div>
                      </div>

                      <div className="rounded-lg border border-ivory-border bg-ivory p-4 text-sm text-ink-muted dark:border-obsidian-border dark:bg-obsidian dark:text-[#C8C6BE]">
                        <p>
                          <strong className="text-ink dark:text-[#F5F4F0]">
                            Name:
                          </strong>{' '}
                          {name}
                        </p>
                        {businessName && (
                          <p className="mt-1">
                            <strong className="text-ink dark:text-[#F5F4F0]">
                              Business name:
                            </strong>{' '}
                            {businessName}
                          </p>
                        )}
                        {websiteLink && (
                          <p className="mt-1">
                            <strong className="text-ink dark:text-[#F5F4F0]">
                              Website link:
                            </strong>{' '}
                            {websiteLink}
                          </p>
                        )}
                        <p className="mt-1">
                          <strong className="text-ink dark:text-[#F5F4F0]">
                            Which service:
                          </strong>{' '}
                          {service}
                        </p>
                        <p className="mt-1">
                          <strong className="text-ink dark:text-[#F5F4F0]">
                            Message:
                          </strong>{' '}
                          {message}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <MagneticWrap>
                          <a
                            href={composedEmailHref}
                            className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            <span>Send via Email</span>
                          </a>
                        </MagneticWrap>
                        <button
                          type="button"
                          onClick={handleCopyMessage}
                          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-ivory-border bg-white px-5 py-3 text-sm font-medium text-ink whitespace-nowrap transition-colors duration-150 hover:border-champagne hover:text-champagne-deep dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:hover:border-champagne-light dark:hover:text-champagne-light"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 text-[#157A45] dark:text-[#34D399]" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" aria-hidden="true" />
                              <span>Copy message</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setSubmitted(false)}
                          className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-ink-muted whitespace-nowrap transition-colors duration-150 hover:text-ink dark:text-[#96948C] dark:hover:text-[#F5F4F0]"
                        >
                          Edit message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-sm font-medium text-ink dark:text-[#F5F4F0]"
                          >
                            Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1.5 block w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25 dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#78766E] dark:focus:border-champagne-light"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-business"
                            className="block text-sm font-medium text-ink dark:text-[#F5F4F0]"
                          >
                            Business name
                          </label>
                          <input
                            id="contact-business"
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="mt-1.5 block w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25 dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#78766E] dark:focus:border-champagne-light"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="contact-website"
                            className="block text-sm font-medium text-ink dark:text-[#F5F4F0]"
                          >
                            Website link
                          </label>
                          <input
                            id="contact-website"
                            type="url"
                            placeholder="https://"
                            value={websiteLink}
                            onChange={(e) => setWebsiteLink(e.target.value)}
                            className="mt-1.5 block w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25 dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#78766E] dark:focus:border-champagne-light"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-service"
                            className="block text-sm font-medium text-ink dark:text-[#F5F4F0]"
                          >
                            Which service
                          </label>
                          <select
                            id="contact-service"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="mt-1.5 block w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-base text-ink focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25 dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:focus:border-champagne-light"
                          >
                            {SERVICE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-ink dark:text-[#F5F4F0]"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="mt-1.5 block w-full rounded-lg border border-ivory-border bg-ivory px-3.5 py-2.5 text-base text-ink placeholder:text-ink-muted/60 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25 dark:border-obsidian-border-strong dark:bg-obsidian dark:text-[#F5F4F0] dark:placeholder:text-[#78766E] dark:focus:border-champagne-light"
                        />
                      </div>

                      {error && (
                        <p
                          role="alert"
                          className="text-sm font-medium text-[#B91C1C] dark:text-[#FCA5A5]"
                        >
                          {error}
                        </p>
                      )}

                      <div>
                        <MagneticWrap>
                          <button
                            type="submit"
                            className="luxury-shimmer-btn inline-flex min-h-11 items-center justify-center rounded-lg bg-champagne px-6 py-3 text-sm font-semibold text-obsidian whitespace-nowrap transition-all duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                          >
                            Prepare email message
                          </button>
                        </MagneticWrap>
                      </div>
                    </form>
                  )}
                </div>
              </SpotlightCard>
            </HeroEntrance>
          </div>
        </div>
      </section>
    </div>
  );
}
