import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { RouteLink, useRouter } from '../router';
import {
  buildEmailUrl,
  BUSINESS_NAME,
  RoutePath,
  ServiceSlug,
} from '../data/siteContent';
import { MagneticWrap } from './LuxuryMotion';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

function getServiceFromPath(path: RoutePath): ServiceSlug | undefined {
  if (path === '/websites') return 'websites';
  if (path === '/flyers-and-print') return 'flyers';
  if (path.startsWith('/ai-videos')) return 'videos';
  return undefined;
}

export function Header({ isDark, onToggleTheme }: HeaderProps) {
  const { path } = useRouter();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isServiceActive =
    path === '/websites' ||
    path === '/flyers-and-print' ||
    path.startsWith('/ai-videos');

  const emailUrl = buildEmailUrl(getServiceFromPath(path));

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [path]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-ivory-border bg-ivory/90 backdrop-blur-md dark:border-obsidian-border dark:bg-obsidian/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand wordmark */}
        <RouteLink
          to="/"
          className="font-display text-xl font-bold tracking-tight text-ink whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne dark:text-[#F5F4F0] dark:hover:text-champagne-light"
        >
          {BUSINESS_NAME}
        </RouteLink>

        {/* Zone 2: Navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-ink-muted dark:text-[#C8C6BE]"
        >
          <RouteLink
            to="/"
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light ${
              path === '/'
                ? 'text-champagne-deep underline decoration-champagne decoration-2 underline-offset-8 dark:text-champagne-light'
                : ''
            }`}
          >
            Home
          </RouteLink>

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              className={`inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-2 transition-colors duration-150 hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne dark:hover:text-champagne-light ${
                isServiceActive
                  ? 'text-champagne-deep underline decoration-champagne decoration-2 underline-offset-8 dark:text-champagne-light'
                  : ''
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-full w-52 pt-1.5"
                >
                  <div className="rounded-lg border border-ivory-border bg-white py-1.5 shadow-2xl dark:border-obsidian-border dark:bg-obsidian-surface">
                    <RouteLink
                      to="/websites"
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={`block px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-ivory-muted hover:text-champagne-deep dark:hover:bg-obsidian-elevated dark:hover:text-champagne-light ${
                        path === '/websites'
                          ? 'font-semibold text-champagne-deep dark:text-champagne-light'
                          : 'text-ink dark:text-[#E8E6DF]'
                      }`}
                    >
                      Websites
                    </RouteLink>
                    <RouteLink
                      to="/flyers-and-print"
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={`block px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-ivory-muted hover:text-champagne-deep dark:hover:bg-obsidian-elevated dark:hover:text-champagne-light ${
                        path === '/flyers-and-print'
                          ? 'font-semibold text-champagne-deep dark:text-champagne-light'
                          : 'text-ink dark:text-[#E8E6DF]'
                      }`}
                    >
                      Flyers &amp; Print
                    </RouteLink>
                    <RouteLink
                      to="/ai-videos"
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className={`block px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-150 hover:bg-ivory-muted hover:text-champagne-deep dark:hover:bg-obsidian-elevated dark:hover:text-champagne-light ${
                        path.startsWith('/ai-videos')
                          ? 'font-semibold text-champagne-deep dark:text-champagne-light'
                          : 'text-ink dark:text-[#E8E6DF]'
                      }`}
                    >
                      AI Videos
                    </RouteLink>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <RouteLink
            to="/contact"
            className={`whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-champagne-deep dark:hover:text-champagne-light ${
              path === '/contact'
                ? 'text-champagne-deep underline decoration-champagne decoration-2 underline-offset-8 dark:text-champagne-light'
                : ''
            }`}
          >
            Contact
          </RouteLink>
        </nav>

        {/* Zone 3: Theme toggle & Sticky primary CTA (Email) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to obsidian black theme'}
            title={isDark ? 'Switch to light mode' : 'Switch to obsidian black theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ivory-border bg-white text-ink-muted transition-colors duration-150 hover:border-champagne hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#C8C6BE] dark:hover:border-champagne/70 dark:hover:text-champagne-light"
          >
            {isDark ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <MagneticWrap>
            <a
              href={emailUrl}
              className="luxury-shimmer-btn inline-flex h-10 items-center justify-center rounded-lg bg-champagne px-4 text-sm font-semibold text-obsidian whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-champagne-light active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
            >
              Message us
            </a>
          </MagneticWrap>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ivory-border bg-white text-ink md:hidden dark:border-obsidian-border dark:bg-obsidian-surface dark:text-[#F5F4F0]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-ivory-border bg-ivory px-4 py-4 md:hidden dark:border-obsidian-border dark:bg-obsidian"
          >
            <div className="flex flex-col space-y-1 text-base font-medium">
              <RouteLink
                to="/"
                className={`rounded-lg px-3 py-2.5 ${
                  path === '/'
                    ? 'bg-ivory-muted text-champagne-deep dark:bg-obsidian-surface dark:text-champagne-light'
                    : 'text-ink dark:text-[#F5F4F0]'
                }`}
              >
                Home
              </RouteLink>
              <div className="px-3 pt-2 pb-1 text-xs font-medium text-ink-muted dark:text-[#8E8C84]">
                Services
              </div>
              <RouteLink
                to="/websites"
                className={`rounded-lg px-5 py-2.5 ${
                  path === '/websites'
                    ? 'bg-ivory-muted text-champagne-deep dark:bg-obsidian-surface dark:text-champagne-light'
                    : 'text-ink-muted dark:text-[#C8C6BE]'
                }`}
              >
                Websites
              </RouteLink>
              <RouteLink
                to="/flyers-and-print"
                className={`rounded-lg px-5 py-2.5 ${
                  path === '/flyers-and-print'
                    ? 'bg-ivory-muted text-champagne-deep dark:bg-obsidian-surface dark:text-champagne-light'
                    : 'text-ink-muted dark:text-[#C8C6BE]'
                }`}
              >
                Flyers &amp; Print
              </RouteLink>
              <RouteLink
                to="/ai-videos"
                className={`rounded-lg px-5 py-2.5 ${
                  path.startsWith('/ai-videos')
                    ? 'bg-ivory-muted text-champagne-deep dark:bg-obsidian-surface dark:text-champagne-light'
                    : 'text-ink-muted dark:text-[#C8C6BE]'
                }`}
              >
                AI Videos
              </RouteLink>
              <RouteLink
                to="/contact"
                className={`rounded-lg px-3 py-2.5 ${
                  path === '/contact'
                    ? 'bg-ivory-muted text-champagne-deep dark:bg-obsidian-surface dark:text-champagne-light'
                    : 'text-ink dark:text-[#F5F4F0]'
                }`}
              >
                Contact
              </RouteLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
