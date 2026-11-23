import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ivory-border border-y border-ivory-border dark:divide-obsidian-border dark:border-obsidian-border">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-champagne-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne dark:hover:text-champagne-light"
            >
              <span className="font-display text-base font-semibold text-ink sm:text-lg dark:text-[#F5F4F0]">
                {item.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 dark:text-[#96948C] ${
                  isOpen ? 'rotate-180 text-champagne-deep dark:text-champagne-light' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pr-8 text-base leading-relaxed text-ink-muted dark:text-[#C8C6BE]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
