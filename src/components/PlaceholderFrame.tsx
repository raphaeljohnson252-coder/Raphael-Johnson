import { FileText, Globe, Play } from 'lucide-react';

interface PlaceholderFrameProps {
  kind: 'website' | 'flyer' | 'video';
  label: string;
  aspectClass?: string;
}

export function PlaceholderFrame({
  kind,
  label,
  aspectClass,
}: PlaceholderFrameProps) {
  const defaultAspect =
    kind === 'flyer'
      ? 'aspect-[4/5]'
      : kind === 'video'
        ? 'aspect-video'
        : 'aspect-[16/10]';

  return (
    <div
      className={`relative w-full overflow-hidden rounded-lg border border-dashed border-ivory-border bg-ivory dark:border-obsidian-border-strong dark:bg-obsidian ${aspectClass || defaultAspect}`}
    >
      {kind === 'website' && (
        <div className="flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center justify-between border-b border-ivory-border pb-2.5 dark:border-obsidian-border">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-ivory-border dark:bg-obsidian-border-strong" />
              <span className="h-2 w-2 rounded-full bg-ivory-border dark:bg-obsidian-border-strong" />
              <span className="h-2 w-2 rounded-full bg-ivory-border dark:bg-obsidian-border-strong" />
            </div>
            <Globe
              className="h-4 w-4 text-ink-muted dark:text-[#96948C]"
              aria-hidden="true"
            />
          </div>
          <div className="my-auto space-y-2.5 px-2">
            <div className="h-2.5 w-2/3 rounded bg-ivory-border dark:bg-obsidian-elevated" />
            <div className="h-2 w-full rounded bg-ivory-muted dark:bg-obsidian-surface" />
            <div className="h-2 w-4/5 rounded bg-ivory-muted dark:bg-obsidian-surface" />
            <div className="pt-2">
              <div className="h-6 w-24 rounded bg-champagne/25 dark:bg-champagne/20" />
            </div>
          </div>
          <div className="text-xs font-medium text-ink-muted dark:text-[#96948C]">
            {label}
          </div>
        </div>
      )}

      {kind === 'flyer' && (
        <div className="flex h-full flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted dark:text-[#96948C]">
              Print &amp; social layout
            </span>
            <FileText
              className="h-4 w-4 text-ink-muted dark:text-[#96948C]"
              aria-hidden="true"
            />
          </div>
          <div className="mx-auto my-auto w-4/5 space-y-3 rounded-md border border-ivory-border bg-white p-4 dark:border-obsidian-border dark:bg-obsidian-surface">
            <div className="h-3 w-3/4 rounded bg-ivory-border dark:bg-obsidian-elevated" />
            <div className="h-16 w-full rounded bg-ivory-muted dark:bg-obsidian-elevated/70" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-ivory-muted dark:bg-obsidian-border" />
              <div className="h-2 w-5/6 rounded bg-ivory-muted dark:bg-obsidian-border" />
            </div>
          </div>
          <div className="text-xs font-medium text-ink-muted dark:text-[#96948C]">
            {label}
          </div>
        </div>
      )}

      {kind === 'video' && (
        <div className="flex h-full flex-col justify-between p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-ink-muted dark:text-[#96948C]">
              Video thumbnail
            </span>
            <span className="font-mono-data text-xs text-ink-muted dark:text-[#96948C]">
              15–60s
            </span>
          </div>
          <div className="my-auto flex flex-col items-center justify-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne/45 bg-white text-champagne-deep transition-transform duration-200 group-hover:scale-105 dark:border-champagne/50 dark:bg-obsidian-surface dark:text-champagne-light">
              <Play className="h-5 w-5 translate-x-0.5" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-medium text-ink-muted dark:text-[#96948C]">
            <span>{label}</span>
            <span>Captions included</span>
          </div>
        </div>
      )}
    </div>
  );
}
