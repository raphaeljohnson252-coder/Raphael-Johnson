import { lazy } from 'react';
import { RoutePath } from './data/siteContent';

const loadWebsitesPage = () =>
  import('./pages/WebsitesPage').then((m) => ({ default: m.WebsitesPage }));
const loadFlyersPage = () =>
  import('./pages/FlyersPage').then((m) => ({ default: m.FlyersPage }));
const loadAiVideosPage = () =>
  import('./pages/AiVideosPage').then((m) => ({ default: m.AiVideosPage }));
const loadAiVideoIndustryPage = () =>
  import('./pages/AiVideoIndustryPage').then((m) => ({
    default: m.AiVideoIndustryPage,
  }));
const loadSeoGeoAeoPage = () =>
  import('./pages/SeoGeoAeoPage').then((m) => ({ default: m.SeoGeoAeoPage }));
const loadContactPage = () =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }));

export const LazyWebsitesPage = lazy(loadWebsitesPage);
export const LazyFlyersPage = lazy(loadFlyersPage);
export const LazyAiVideosPage = lazy(loadAiVideosPage);
export const LazyAiVideoIndustryPage = lazy(loadAiVideoIndustryPage);
export const LazySeoGeoAeoPage = lazy(loadSeoGeoAeoPage);
export const LazyContactPage = lazy(loadContactPage);

const prefetched = new Set<string>();

export function prefetchRoute(to: RoutePath): void {
  let key: string = to;
  let loader: (() => Promise<unknown>) | undefined;

  if (to === '/websites') {
    loader = loadWebsitesPage;
  } else if (to === '/flyers-and-print') {
    loader = loadFlyersPage;
  } else if (to === '/ai-videos') {
    loader = loadAiVideosPage;
  } else if (to.startsWith('/ai-videos/')) {
    key = '/ai-videos/*';
    loader = loadAiVideoIndustryPage;
  } else if (to === '/seo-geo-aeo') {
    loader = loadSeoGeoAeoPage;
  } else if (to === '/contact') {
    loader = loadContactPage;
  }

  if (!loader || prefetched.has(key)) return;
  prefetched.add(key);
  loader().catch(() => {
    prefetched.delete(key);
  });
}
