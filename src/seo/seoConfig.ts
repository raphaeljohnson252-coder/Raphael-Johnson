import {
  BUSINESS_NAME,
  CONTACT_EMAIL,
  getIndustryVideos,
  getPublishedIndustryByPath,
  RoutePath,
  SERVICE_PRICES,
} from '../data/siteContent';

export const SITE_CANONICAL_ORIGIN = 'https://ewixstudio.vercel.app';

export interface RouteSeoMeta {
  title: string;
  description: string;
  keywords: string;
  ogType?: 'website' | 'article';
}

export const ROUTE_SEO: Record<RoutePath, RouteSeoMeta> = {
  '/': {
    title: 'Ewixstudio — Websites, Flyers & AI Videos Worldwide',
    description:
      'Ewixstudio designs clear, fast websites, healthcare flyers and short AI promo videos for clinics, restaurants, real estate and online shops worldwide.',
    keywords:
      'Ewixstudio, Ewix Studio, websites for diabetes clinics, health business web design, medical flyers, AI promo videos, free homepage mockup',
  },
  '/websites': {
    title: 'Websites for Health & Businesses — Ewixstudio',
    description: `Clear, mobile-friendly websites starting from ${SERVICE_PRICES.websites} with booking and contact buttons. Request a free homepage mockup from Ewixstudio.`,
    keywords:
      'Ewixstudio websites, clinic website design, diabetes practice website, booking website design, affordable business websites worldwide',
  },
  '/flyers-and-print': {
    title: 'Healthcare Flyers & Print Design — Ewixstudio',
    description: `Print-ready flyers, posters and clinic handouts starting from ${SERVICE_PRICES.flyers}, matched to your brand colours and approved wording. Email Ewixstudio for a free mockup.`,
    keywords:
      'Ewixstudio flyers, healthcare flyer design, clinic handout design, A4 medical flyer, print and social flyer design',
  },
  '/ai-videos': {
    title: 'Short AI Explainer & Promo Videos — Ewixstudio',
    description: `15 to 60 second captioned AI promo videos starting from ${SERVICE_PRICES.videos} for health clinics, cafes, real estate and online stores worldwide.`,
    keywords:
      'Ewixstudio AI videos, short AI promo videos, captioned explainer videos, business social video ads, vertical and horizontal video clips',
  },
  '/ai-videos/health': {
    title: 'Health Clinic & Dietitian AI Videos — Ewixstudio',
    description:
      'Short, captioned patient-friendly explainer videos for clinics, diabetes educators, dietitians and allied health using wording you approve.',
    keywords:
      'Ewixstudio health videos, diabetes clinic video, dietitian explainer video, patient onboarding video, compliant clinic promo video',
  },
  '/ai-videos/cafes': {
    title: 'Cafe & Restaurant Promo Videos — Ewixstudio',
    description:
      'Short, captioned menu and dish spotlight videos for cafes and restaurants, ready for Instagram, TikTok and your website.',
    keywords:
      'Ewixstudio cafe videos, restaurant promo video, dish spotlight clip, coffee shop reel video, food hospitality video ads',
  },
  '/ai-videos/real-estate': {
    title: 'Real Estate & Listing AI Videos — Ewixstudio',
    description:
      'Short, captioned videos for real estate agents and agencies using your real listing photos, open house details and neighbourhood highlights.',
    keywords:
      'Ewixstudio real estate videos, property listing teaser video, agent introduction video, open house promo video',
  },
  '/ai-videos/online-shops': {
    title: 'Ecommerce & Shopify Product Videos — Ewixstudio',
    description:
      '15-second captioned product demo and promo videos for Shopify and online stores ready for Instagram Reels, TikTok and product pages.',
    keywords:
      'Ewixstudio online shop videos, ecommerce product video, Shopify product clip, 15 second product promo video',
  },
  '/ai-videos/fitness-beauty': {
    title: 'Gym & Salon Promo Videos — Ewixstudio',
    description:
      'Short, captioned class promos and booking videos for gyms, studios and salons worldwide.',
    keywords: 'Ewixstudio gym videos, salon promo video, fitness studio clip',
  },
  '/ai-videos/dental-physio': {
    title: 'Dental, Cosmetic & Physio Videos — Ewixstudio',
    description:
      'Short, captioned clinic introduction and appointment videos for dentists, cosmetic and physio practices.',
    keywords:
      'Ewixstudio dental video, physio clinic video, patient welcome video',
  },
  '/contact': {
    title: 'Contact Ewixstudio — Free Homepage Mockup & Quote',
    description:
      'Send Ewixstudio your website link or project idea for a free homepage mockup, flyer quote or AI video sample. Replies within 24 hours worldwide.',
    keywords:
      'Contact Ewixstudio, ewixstudio25@gmail.com, free website mockup, get a web design quote',
  },
};

function resolveCanonicalOrigin(): string {
  if (typeof window === 'undefined') return SITE_CANONICAL_ORIGIN;
  const host = window.location.hostname;
  if (host === 'ewixstudio.vercel.app') {
    return window.location.origin;
  }
  return window.location.origin || SITE_CANONICAL_ORIGIN;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function buildRouteJsonLd(path: RoutePath, origin: string, meta: RouteSeoMeta) {
  const canonicalUrl = `${origin}${path === '/' ? '/' : path}`;
  const publishedIndustry = getPublishedIndustryByPath(path);

  const breadcrumbItems: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: BUSINESS_NAME,
      item: `${origin}/`,
    },
  ];

  if (path !== '/') {
    if (publishedIndustry) {
      breadcrumbItems.push(
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Videos',
          item: `${origin}/ai-videos`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: publishedIndustry.industryName,
          item: canonicalUrl,
        }
      );
    } else {
      const labelMap: Record<string, string> = {
        '/websites': 'Websites',
        '/flyers-and-print': 'Flyers & Print',
        '/ai-videos': 'AI Videos',
        '/contact': 'Contact',
      };
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: labelMap[path] || meta.title,
        item: canonicalUrl,
      });
    }
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: {
        '@id': `${SITE_CANONICAL_ORIGIN}/#website`,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    },
  ];

  if (publishedIndustry) {
    const videos = getIndustryVideos(publishedIndustry);
    const leadVideo = videos[0];
    if (leadVideo) {
      graph.push({
        '@type': 'VideoObject',
        name: `${leadVideo.title} — ${publishedIndustry.industryName}`,
        description: publishedIndustry.description,
        thumbnailUrl: `${origin}/${leadVideo.thumbnailSrc.replace(/^\/+/, '')}`,
        contentUrl: `${origin}/${leadVideo.videoSrc.replace(/^\/+/, '')}`,
        uploadDate: '2026-11-18T00:00:00Z',
        duration: `PT${leadVideo.length.toUpperCase()}`,
        publisher: {
          '@type': 'Organization',
          name: BUSINESS_NAME,
          email: CONTACT_EMAIL,
        },
      });
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function applyRouteSeo(path: RoutePath) {
  if (typeof document === 'undefined') return;

  const meta = ROUTE_SEO[path] || ROUTE_SEO['/'];
  const origin = resolveCanonicalOrigin();
  const canonicalUrl = `${origin}${path === '/' ? '/' : path}`;
  const ogImageUrl = `${origin}/og-preview.jpg`;

  document.title = meta.title;
  upsertCanonical(canonicalUrl);

  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'keywords', meta.keywords);
  upsertMeta('property', 'og:title', meta.title);
  upsertMeta('property', 'og:description', meta.description);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', ogImageUrl);
  upsertMeta('name', 'twitter:title', meta.title);
  upsertMeta('name', 'twitter:description', meta.description);
  upsertMeta('name', 'twitter:image', ogImageUrl);

  let ldScript = document.getElementById('ewix-route-jsonld');
  if (!ldScript) {
    ldScript = document.createElement('script');
    ldScript.id = 'ewix-route-jsonld';
    ldScript.setAttribute('type', 'application/ld+json');
    document.head.appendChild(ldScript);
  }
  ldScript.textContent = JSON.stringify(buildRouteJsonLd(path, origin, meta));
}
