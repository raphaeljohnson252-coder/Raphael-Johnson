import { useRef, type MouseEvent, type ReactNode } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export const APP_PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.992,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      ease: LUXURY_EASE,
      when: 'beforeChildren' as const,
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.995,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

export function ScrollProgressBar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
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
  yOffset = 26,
}: RevealBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : yOffset,
        scale: shouldReduceMotion ? 1 : 0.99,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: LUXURY_EASE }}
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
  parallaxOffset = -32,
}: HeroEntranceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  const parallaxY = useTransform(
    smoothProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : parallaxOffset]
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ y: parallaxY }}
      className={`min-w-0 ${className}`}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.68,
              delay,
              ease: LUXURY_EASE,
              staggerChildren: 0.09,
              delayChildren: delay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxText({ children, className = '' }: ParallaxTextProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.62,
            ease: LUXURY_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SplitHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduceMotion) {
    return <h1 className={className}>{text}</h1>;
  }

  return (
    <motion.h1
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.036,
          },
        },
      }}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '115%', opacity: 0, rotate: 2 },
              visible: {
                y: '0%',
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.62, ease: LUXURY_EASE },
              },
            }}
          >
            {word}
            {idx < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

export function SpotlightCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(-300);
  const mouseY = useMotionValue(-300);

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.14), transparent 72%)`;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-300);
    mouseY.set(-300);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              transition: { type: 'spring', stiffness: 320, damping: 24 },
            }
      }
      className={`group relative min-w-0 max-w-full overflow-hidden ${className}`}
    >
      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-transparent via-champagne to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
      )}
      {children}
    </motion.div>
  );
}

export function MagneticWrap({
  children,
  className = '',
  strength = 0.22,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(0, { stiffness: 260, damping: 20 });
  const y = useSpring(0, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
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
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.075,
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

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: shouldReduceMotion ? 0 : 22,
          scale: shouldReduceMotion ? 1 : 0.985,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.56, ease: LUXURY_EASE },
        },
      }}
      className={`min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  );
}
