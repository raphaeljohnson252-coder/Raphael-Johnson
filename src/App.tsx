/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'motion/react';
import { Header } from './components/Header';
import { LUXURY_EASE, ScrollProgressBar } from './components/LuxuryMotion';
import { SharedCtaAndFooter } from './components/SharedCtaAndFooter';
import { getPublishedIndustryByPath } from './data/siteContent';
import { HomePage } from './pages/HomePage';
import {
  LazyAiVideoIndustryPage,
  LazyAiVideosPage,
  LazyContactPage,
  LazyFlyersPage,
  LazySeoGeoAeoPage,
  LazyWebsitesPage,
} from './routeLoaders';
import { RouterProvider, useRouter } from './router';
import { applyRouteSeo } from './seo/seoConfig';

function RouteFallback() {
  return (
    <div
      aria-busy="true"
      className="min-h-[60vh] bg-ivory dark:bg-obsidian"
    />
  );
}

function AppShell() {
  const { path } = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return true;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    applyRouteSeo(path);
  }, [path]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        try {
          localStorage.setItem('ewixstudio-theme', 'dark');
        } catch {
          // ignore storage errors
        }
      } else {
        document.documentElement.classList.remove('dark');
        try {
          localStorage.setItem('ewixstudio-theme', 'light');
        } catch {
          // ignore storage errors
        }
      }
      return next;
    });
  };

  const activeIndustry = getPublishedIndustryByPath(path);

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-ivory text-ink dark:bg-obsidian dark:text-[#F5F4F0]">
      <ScrollProgressBar />
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      <main className="relative min-w-0 flex-1 overflow-x-clip">
        <motion.div
          key={path}
          initial={shouldReduceMotion ? false : { opacity: 0.01, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.16, ease: LUXURY_EASE }}
        >
          <Suspense fallback={<RouteFallback />}>
            {path === '/' && <HomePage />}
            {path === '/websites' && <LazyWebsitesPage />}
            {path === '/flyers-and-print' && <LazyFlyersPage />}
            {path === '/ai-videos' && <LazyAiVideosPage />}
            {activeIndustry && (
              <LazyAiVideoIndustryPage industry={activeIndustry} />
            )}
            {path === '/seo-geo-aeo' && <LazySeoGeoAeoPage />}
            {path === '/contact' && <LazyContactPage />}
          </Suspense>
        </motion.div>
      </main>
      <SharedCtaAndFooter />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider>
        <AppShell />
      </RouterProvider>
    </MotionConfig>
  );
}
