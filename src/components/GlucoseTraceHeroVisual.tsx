import { useEffect, useState } from 'react';

interface ActiveCheckpoint {
  x: number;
  y: number;
  time: string;
  label: string;
  windowNote: string;
}

const ACTIVE_CHECKPOINTS: ActiveCheckpoint[] = [
  {
    x: 56,
    y: 118,
    time: '00:00',
    label: 'Active · Global Night Desk',
    windowNote: 'Client daytime overlap worldwide',
  },
  {
    x: 150,
    y: 96,
    time: '04:00',
    label: 'Peak Focus · Mockup Builds',
    windowNote: 'Deep design sprints & fast email replies',
  },
  {
    x: 246,
    y: 108,
    time: '09:00',
    label: 'Peak Studio · Client Reviews',
    windowNote: 'Homepage previews, websites & edits',
  },
  {
    x: 342,
    y: 94,
    time: '14:00',
    label: 'Peak Production · AI Videos & Print',
    windowNote: 'Flyers, clinic handouts & motion clips',
  },
  {
    x: 438,
    y: 112,
    time: '19:00',
    label: 'Active · Evening Revisions',
    windowNote: 'Same-day refinements & delivery checks',
  },
  {
    x: 526,
    y: 100,
    time: '23:59',
    label: 'Always Active · 24h Coverage',
    windowNote: 'Send your brief anytime via email',
  },
];

function formatLagosTime(): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return 'Active now';
  }
}

export function GlucoseTraceHeroVisual() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lagosTime, setLagosTime] = useState<string>(formatLagosTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLagosTime(formatLagosTime());
    }, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const currentPoint =
    activeIndex !== null
      ? ACTIVE_CHECKPOINTS[activeIndex]
      : ACTIVE_CHECKPOINTS[5];

  return (
    <div
      className="w-full rounded-xl border border-ivory-border bg-white/95 p-6 backdrop-blur-md sm:p-7 dark:border-obsidian-border dark:bg-obsidian-surface/90"
      aria-label="24-hour active studio hours trace showing continuous availability across global time zones"
      role="img"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-ivory-border pb-3 dark:border-obsidian-border">
        <span className="font-mono-data text-xs text-ink-muted dark:text-[#C8C6BE]">
          {activeIndex !== null ? (
            <>
              {currentPoint.time} &middot; {currentPoint.label}
            </>
          ) : (
            <>Lagos {lagosTime} WAT &middot; Always Active</>
          )}
        </span>
        <span className="font-mono-data text-xs text-[#157A45] dark:text-[#34D399]">
          24h Active Band
        </span>
      </div>

      <svg
        viewBox="0 0 560 280"
        className="h-auto w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="targetBandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Horizontal faint reference grid lines */}
        <line
          x1="48"
          y1="42"
          x2="536"
          y2="42"
          className="stroke-ivory-border dark:stroke-obsidian-border"
          strokeWidth="1"
        />
        <line
          x1="48"
          y1="232"
          x2="536"
          y2="232"
          className="stroke-ivory-border dark:stroke-obsidian-border"
          strokeWidth="1"
        />

        {/* Continuous Always-Active Target Band */}
        <rect
          x="48"
          y="76"
          width="488"
          height="108"
          rx="4"
          fill="url(#targetBandGrad)"
        />
        <line
          x1="48"
          y1="76"
          x2="536"
          y2="76"
          className="stroke-[#16A34A]/45 dark:stroke-[#34D399]/40"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />
        <line
          x1="48"
          y1="184"
          x2="536"
          y2="184"
          className="stroke-[#16A34A]/45 dark:stroke-[#34D399]/40"
          strokeWidth="1.25"
          strokeDasharray="4 4"
        />

        {/* Availability level labels */}
        <text
          x="40"
          y="80"
          textAnchor="end"
          className="fill-[#157A45] dark:fill-[#34D399] font-mono-data text-[11px]"
        >
          Peak
        </text>
        <text
          x="40"
          y="133"
          textAnchor="end"
          className="fill-ink-muted dark:fill-[#96948C] font-mono-data text-[11px]"
        >
          Active
        </text>
        <text
          x="40"
          y="187"
          textAnchor="end"
          className="fill-[#157A45] dark:fill-[#34D399] font-mono-data text-[11px]"
        >
          Ready
        </text>

        {/* Smooth 24h continuous active trace staying consistently inside the active band */}
        <path
          d="M 56 118 C 92 118, 114 96, 150 96 C 186 96, 210 108, 246 108 C 282 108, 306 94, 342 94 C 378 94, 402 112, 438 112 C 474 112, 496 100, 526 100"
          className="glucose-trace-path stroke-champagne-deep dark:stroke-champagne-light"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ ['--trace-length' as string]: '560' }}
        />

        {/* Interactive hover checkpoints across the 24-hour clock */}
        {ACTIVE_CHECKPOINTS.map((point, idx) => (
          <g key={point.time}>
            {activeIndex === idx && (
              <line
                x1={point.x}
                y1="42"
                x2={point.x}
                y2="232"
                className="stroke-champagne-deep/35 dark:stroke-champagne-light/35"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            )}
            <circle
              cx={point.x}
              cy={point.y}
              r={idx === 5 || activeIndex === idx ? 5 : 3.5}
              className={`${
                idx === 5 ? 'glucose-trace-endpoint' : ''
              } fill-champagne-deep transition-transform duration-150 dark:fill-champagne-light`}
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="18"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
            />
          </g>
        ))}

        {/* Endpoint halo */}
        <circle
          cx="526"
          cy="100"
          r="9"
          className="glucose-trace-endpoint pointer-events-none stroke-champagne-deep/35 dark:stroke-champagne-light/40"
          strokeWidth="2"
        />

        {/* 24-hour time axis labels */}
        <text
          x="56"
          y="256"
          className="fill-ink-muted dark:fill-[#96948C] font-mono-data text-[11px]"
        >
          00:00
        </text>
        <text
          x="212"
          y="256"
          className="fill-ink-muted dark:fill-[#96948C] font-mono-data text-[11px]"
        >
          08:00
        </text>
        <text
          x="368"
          y="256"
          className="fill-ink-muted dark:fill-[#96948C] font-mono-data text-[11px]"
        >
          16:00
        </text>
        <text
          x="526"
          y="256"
          textAnchor="end"
          className="fill-ink-muted dark:fill-[#96948C] font-mono-data text-[11px]"
        >
          24:00
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted dark:text-[#96948C]">
        <span>{currentPoint.windowNote}</span>
        <span>Always open for email briefs</span>
      </div>
    </div>
  );
}
