import { useRef, type MouseEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const APP_PAGE_VARIANTS = {
  initial: {
    opacity: 0.01,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.18,
      ease: LUXURY_EASE,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.002,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-champagne-deep via-champagne to-champagne-light"
    />
  );
}

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function RevealBlock({
  children,
  className = '',
  delay = 0,
  yOffset = 12,
}: RevealBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{
        duration: 0.32,
        delay: Math.min(delay, 0.08),
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HeroEntranceProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  parallaxOffset?: number;
}

export function HeroEntrance({
  children,
  className = '',
  delay = 0,
}: HeroEntranceProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`min-w-0 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.98, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.24,
        delay: Math.min(delay, 0.06),
        ease: LUXURY_EASE,
      }}
      className={`min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxText({ children, className = '' }: ParallaxTextProps) {
  return <div className={className}>{children}</div>;
}

export function SplitHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return <h1 className={className}>{text}</h1>;
}

export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rectRef = useRef<DOMRect | null>(null);
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.13), transparent 72%)`;

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    rectRef.current = rect;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    mouseX.set(-300);
    mouseY.set(-300);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative min-w-0 max-w-full overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-1 ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-champagne to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      )}
      {children}
    </div>
  );
}

export function MagneticWrap({
  children,
  className = '',
  strength = 0.18,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const rectRef = useRef<DOMRect | null>(null);
  const x = useSpring(0, { stiffness: 320, damping: 24 });
  const y = useSpring(0, { stiffness: 320, damping: 24 });

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    rectRef.current = rect;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  if (shouldReduceMotion) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGrid({ children, className = '' }: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.04 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.03,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`min-w-0 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 10,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.26, ease: LUXURY_EASE },
        },
      }}
      className={`min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
