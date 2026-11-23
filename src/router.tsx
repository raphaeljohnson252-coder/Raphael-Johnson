import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PUBLISHED_AI_VIDEO_INDUSTRIES, RoutePath } from './data/siteContent';

const VALID_ROUTES: RoutePath[] = [
  '/',
  '/websites',
  '/flyers-and-print',
  '/ai-videos',
  ...PUBLISHED_AI_VIDEO_INDUSTRIES.map((industry) => industry.path),
  '/contact',
];

function getBasePrefix(): string {
  const base = import.meta.env.BASE_URL || '/';
  return base === '/' ? '' : base.replace(/\/+$/, '');
}

function normalizePath(pathname: string): RoutePath {
  const basePrefix = getBasePrefix();
  let relative = pathname;
  if (basePrefix && pathname.startsWith(basePrefix)) {
    relative = pathname.slice(basePrefix.length) || '/';
  }
  const trimmed = relative.replace(/\/+$/, '') || '/';
  if (VALID_ROUTES.includes(trimmed as RoutePath)) {
    return trimmed as RoutePath;
  }
  if (trimmed.startsWith('/ai-videos/')) {
    return '/ai-videos';
  }
  return '/';
}

function buildFullHref(
  to: RoutePath,
  options?: { hash?: string; service?: string }
): string {
  const basePrefix = getBasePrefix();
  const routeSegment = to === '/' ? '/' : to;
  const search = options?.service
    ? `?service=${encodeURIComponent(options.service)}`
    : '';
  const hash = options?.hash ? `#${options.hash}` : '';
  return `${basePrefix}${routeSegment}${search}${hash}`;
}

interface RouterContextValue {
  path: RoutePath;
  preselectedService: string;
  navigate: (
    to: RoutePath,
    options?: { hash?: string; service?: string }
  ) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  preselectedService: '',
  navigate: () => {},
});

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<RoutePath>(() => {
    const initialPath = normalizePath(window.location.pathname);
    return initialPath;
  });
  const [preselectedService, setPreselectedService] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('service') || '';
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
      const params = new URLSearchParams(window.location.search);
      setPreselectedService(params.get('service') || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback(
    (to: RoutePath, options?: { hash?: string; service?: string }) => {
      const nextUrl = buildFullHref(to, options);
      const currentFull = `${window.location.pathname}${window.location.search}`;
      const basePrefix = getBasePrefix();
      const targetPathnameAndSearch = `${basePrefix}${to}${options?.service ? `?service=${encodeURIComponent(options.service)}` : ''}`;

      if (currentFull !== targetPathnameAndSearch) {
        window.history.pushState({}, '', nextUrl);
      }

      setPath(to);
      setPreselectedService(options?.service || '');

      if (options?.hash) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const el = document.getElementById(options.hash!);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 40);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    },
    []
  );

  return (
    <RouterContext.Provider value={{ path, preselectedService, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: RoutePath;
  hash?: string;
  service?: string;
}

export function RouteLink({
  to,
  hash,
  service,
  onClick,
  children,
  ...rest
}: NavLinkProps) {
  const { navigate } = useRouter();
  const href = buildFullHref(to, { hash, service });

  return (
    <a
      href={href}
      onClick={(e) => {
        if (
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey ||
          e.button !== 0
        ) {
          return;
        }
        e.preventDefault();
        onClick?.(e);
        navigate(to, { hash, service });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
