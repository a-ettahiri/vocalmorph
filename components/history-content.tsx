'use client';

/* Figma 593:4624 — Frame 133, 731.07x1268. Players/icons/thumb byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const HISTORY_TITLE = {
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '3.24rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;

const DROPDOWN_TEXT = {
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: '1.2rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;

const TODAY_TEXT = {
  fontSize: '1.25rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  letterSpacing: '-0.04em',
  color: '#C9C9D1',
} as const;

const CARD_TITLE = {
  fontSize: '2.7rem',
  fontWeight: 800,
  lineHeight: '3.24rem',
  letterSpacing: '-0.04em',
  color: '#FFFFFF',
} as const;

const DURATION = {
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: '2.16rem',
  letterSpacing: '-0.04em',
  color: '#FFFFFF',
  fontFamily: "'JetBrains Mono', monospace",
} as const;

const DOWNLOAD_TEXT = {
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: '1.35rem',
  letterSpacing: '-0.02em',
  color: '#07070D',
} as const;

const BADGE_TEXT = {
  fontSize: '0.75rem',
  fontWeight: 600,
  lineHeight: '0.9rem',
  letterSpacing: '0.02em',
} as const;

export type HistoryCategoryType = 'voice-clone' | 'de-noise' | 'persona-voice';

export interface HistoryItem {
  id: string;
  title: string;
  duration: string;
  player: string;
  type: HistoryCategoryType;
  typeLabel: string;
  badgeBg: string;
  badgeText: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'voice-clone', label: 'Voice Clone' },
  { id: 'de-noise', label: 'De-noise' },
  { id: 'persona-voice', label: 'Persona Voice' },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

const HISTORY_DATA: HistoryItem[] = [
  {
    id: '1',
    title: 'Elon Musk',
    duration: '1:22',
    player: '/history/player.svg',
    type: 'persona-voice',
    typeLabel: 'Persona Voice',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeText: '#93C5FD',
  },
  {
    id: '2',
    title: 'Steve Jobs',
    duration: '2:03',
    player: '/history/player2.svg',
    type: 'persona-voice',
    typeLabel: 'Persona Voice',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeText: '#93C5FD',
  },
  {
    id: '3',
    title: 'Studio Mic Vocal',
    duration: '0:48',
    player: '/history/player.svg',
    type: 'voice-clone',
    typeLabel: 'Voice Clone',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#D8B4FE',
  },
  {
    id: '4',
    title: 'Podcast Cleaned',
    duration: '3:15',
    player: '/history/player2.svg',
    type: 'de-noise',
    typeLabel: 'De-noise',
    badgeBg: 'rgba(34, 197, 94, 0.15)',
    badgeText: '#86EFAC',
  },
  {
    id: '5',
    title: 'Custom Voice Clone',
    duration: '1:14',
    player: '/history/player.svg',
    type: 'voice-clone',
    typeLabel: 'Voice Clone',
    badgeBg: 'rgba(168, 85, 247, 0.15)',
    badgeText: '#D8B4FE',
  },
  {
    id: '6',
    title: 'Interview Background Audio',
    duration: '2:40',
    player: '/history/player2.svg',
    type: 'de-noise',
    typeLabel: 'De-noise',
    badgeBg: 'rgba(34, 197, 94, 0.15)',
    badgeText: '#86EFAC',
  },
];

/** Title component that smoothly slides on hover if text overflows */
function SlidingTitle({ title }: { title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflowDist, setOverflowDist] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current && textRef.current) {
        const diff = textRef.current.scrollWidth - containerRef.current.clientWidth;
        setOverflowDist(diff > 0 ? diff : 0);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [title]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-w-0 flex-1 overflow-hidden cursor-default"
    >
      <motion.p
        ref={textRef}
        style={CARD_TITLE}
        className="inline-block whitespace-nowrap select-none"
        animate={{
          x: isHovered && overflowDist > 0 ? -overflowDist - 8 : 0,
        }}
        transition={{
          duration: overflowDist > 0 ? Math.max(1.2, overflowDist / 60) : 0.25,
          ease: 'easeInOut',
        }}
      >
        {title}
      </motion.p>

      {/* Opacity fade gradients to visually signal overflow and provide a soft edge */}
      {overflowDist > 0 && (
        <>
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-[1.5rem] bg-gradient-to-r from-[#1A1A23] to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-[2.5rem] bg-gradient-to-l from-[#1A1A23] via-[#1A1A23]/85 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </>
      )}
    </div>
  );
}

function HistoryCard({ item }: { item: HistoryItem }) {
  return (
    <div
      className="flex w-[45.691875rem] flex-col rounded-[0.375rem] bg-[#1A1A23] p-[0.675rem] gap-[1rem] transition-all duration-300 hover:ring-1 hover:ring-white/20"
    >
      <div className="flex w-[44.341875rem] flex-row items-center gap-[1.35rem]">
        <img
          src="/history/thumb.png"
          alt=""
          width={180}
          height={180}
          referrerPolicy="no-referrer"
          className="h-[11.25rem] w-[11.25rem] flex-none rounded-[0.25rem] object-cover"
        />
        <div className="flex w-[31.741875rem] flex-col gap-[0.875rem]">
          {/* Header row: Title + Badge on left, Duration spaced out on right */}
          <div className="flex w-[31.741875rem] flex-row items-center justify-between gap-[1.25rem] px-[0.675rem]">
            <div className="flex items-center gap-[0.75rem] min-w-0 flex-1 overflow-hidden">
              <SlidingTitle title={item.title} />
              <span
                style={{ ...BADGE_TEXT, backgroundColor: item.badgeBg, color: item.badgeText }}
                className="flex-none whitespace-nowrap rounded-full px-[0.625rem] py-[0.1875rem] uppercase leading-none"
              >
                {item.typeLabel}
              </span>
            </div>
            <p style={DURATION} className="flex-none ml-auto whitespace-nowrap pl-[0.5rem]">
              {item.duration}
            </p>
          </div>
          <img
            src={item.player}
            alt=""
            width={508}
            height={99}
            referrerPolicy="no-referrer"
            className="h-[6.17625rem] w-[31.741875rem] flex-none"
          />
        </div>
      </div>
      <button
        type="button"
        aria-label={`Download ${item.title}`}
        className="flex h-[3.15rem] w-[44.341875rem] cursor-pointer flex-row items-center justify-center gap-[0.5rem] rounded-[5.56875rem] bg-[#F0F0F7] px-[2.7rem] py-[0.9rem] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <img
          src="/history/download.svg"
          alt=""
          width={16}
          height={18}
          referrerPolicy="no-referrer"
          className="h-[1.125rem] w-[1rem] flex-none"
        />
        <span style={DOWNLOAD_TEXT}>Download</span>
      </button>
    </div>
  );
}

export default function HistoryContent() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter history items by selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return HISTORY_DATA;
    }
    return HISTORY_DATA.filter((item) => item.type === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryLabel =
    selectedCategory === 'all'
      ? 'Category'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Category';

  const clearFilter = () => {
    setSelectedCategory('all');
  };

  return (
    <div className="flex w-[45.691875rem] flex-col">
      {/* Header 0-52: History title + shadcn Category Dropdown */}
      <div className="flex w-[45.691875rem] flex-row items-center justify-between">
        <h1 style={HISTORY_TITLE}>History</h1>

        {/* shadcn Dropdown Menu for Category Filtering */}
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={`Filter by category, currently selected: ${activeCategoryLabel}`}
              className="flex h-[2.6875rem] min-w-[7.6875rem] cursor-pointer flex-row items-center justify-center gap-[0.5rem] rounded-[6.1875rem] bg-[#1A1A23] px-[1rem] py-[0.75rem] transition-colors hover:bg-[#252532] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span style={DROPDOWN_TEXT} className="truncate">
                {activeCategoryLabel}
              </span>
              <img
                src="/history/chevron.svg"
                alt=""
                width={12}
                height={7}
                referrerPolicy="no-referrer"
                className={`h-[0.4375rem] w-[0.75rem] flex-none transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-[13rem]">
            <DropdownMenuLabel>Filter Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={selectedCategory}
              onValueChange={(val) => setSelectedCategory(val as CategoryId)}
            >
              {CATEGORIES.map((cat) => (
                <DropdownMenuRadioItem key={cat.id} value={cat.id}>
                  {cat.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* List 84-1268: TODAY + cards with motion animation */}
      <div className="flex w-[45.691875rem] flex-col gap-[1.35rem] mt-[2rem]">
        <p className="w-[45.691875rem] text-center" style={TODAY_TEXT}>
          TODAY
        </p>

        {filteredItems.length > 0 ? (
          <div className="flex w-[45.691875rem] flex-col gap-[1.35rem]">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  <HistoryCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex w-[45.691875rem] flex-col items-center justify-center rounded-[1rem] border border-[#1F1F2B] bg-[#0E0E14] py-[4rem] text-center"
          >
            <p className="text-[1.25rem] font-semibold text-[#F0F0F7]">No recordings found</p>
            <p className="mt-[0.5rem] max-w-[24rem] text-[0.9375rem] text-[#8E8E9C]">
              No history items in {activeCategoryLabel.toLowerCase()} yet.
            </p>
            <button
              type="button"
              onClick={clearFilter}
              className="mt-[1.25rem] cursor-pointer rounded-full bg-[#1A1A23] px-[1.25rem] py-[0.625rem] text-[0.875rem] font-medium text-[#F0F0F7] transition-colors hover:bg-[#282836]"
            >
              Show all history
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
