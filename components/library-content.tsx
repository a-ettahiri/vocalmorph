'use client';

/* Figma 537:2006 — Frame 109, 892x1540 (55.75rem x 96.25rem). Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const TITLE = {
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '3.24rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;

const SEARCH_TEXT = {
  fontSize: '1.25rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  letterSpacing: '-0.04em',
} as const;

const RESULT_TEXT = {
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.2rem',
  letterSpacing: '-0.04em',
  color: '#9E9EA8',
} as const;

const DROPDOWN_TEXT = {
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: '1.2rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;

const CARD_NAME = {
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.2rem',
  letterSpacing: '-0.04em',
  color: '#F0F0F7',
} as const;

const CARD_ROLE = {
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.05rem',
  letterSpacing: '-0.04em',
  color: '#C9C9D1',
} as const;

interface Persona {
  id: string;
  name: string;
  role: string;
  category: 'business' | 'politician' | 'artist' | 'singer' | 'science';
  image: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'politician', label: 'Politician' },
  { id: 'artist', label: 'Artist' },
  { id: 'business', label: 'Business Men' },
  { id: 'singer', label: 'Singer' },
  { id: 'science', label: 'Science & Tech' },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

// 16 cards matching Figma 537:2006 library grid, filled with images
const PERSONAS: Persona[] = [
  {
    id: '1',
    name: 'Steve Jobs',
    role: 'Entrepreneur',
    category: 'business',
    image: '/personas/steve-jobs.jpg',
  },
  {
    id: '2',
    name: 'Donald Trump',
    role: 'Politician',
    category: 'politician',
    image: '/personas/donald-trump.jpg',
  },
  {
    id: '3',
    name: 'Taylor swift',
    role: 'Singer',
    category: 'singer',
    image: '/personas/taylor-swift.jpg',
  },
  {
    id: '4',
    name: 'Elon Musk',
    role: 'Entrepreneur',
    category: 'business',
    image: '/figma/persona-elon-musk.png',
  },
  {
    id: '5',
    name: 'Billie Eilish',
    role: 'Singer',
    category: 'singer',
    image: '/personas/billie-eilish.jpg',
  },
  {
    id: '6',
    name: 'Albert Einstein',
    role: 'Scientist',
    category: 'science',
    image: '/personas/albert-einstein.jpg',
  },
  {
    id: '7',
    name: 'Barack Obama',
    role: 'Politician',
    category: 'politician',
    image: '/persona/avatar.png',
  },
  {
    id: '8',
    name: 'Leonardo DiCaprio',
    role: 'Artist',
    category: 'artist',
    image: '/generate/avatar.png',
  },
  {
    id: '9',
    name: 'Steve Jobs',
    role: 'Entrepreneur',
    category: 'business',
    image: '/personas/steve-jobs.jpg',
  },
  {
    id: '10',
    name: 'Donald Trump',
    role: 'Politician',
    category: 'politician',
    image: '/personas/donald-trump.jpg',
  },
  {
    id: '11',
    name: 'Taylor swift',
    role: 'Singer',
    category: 'singer',
    image: '/personas/taylor-swift.jpg',
  },
  {
    id: '12',
    name: 'Elon Musk',
    role: 'Entrepreneur',
    category: 'business',
    image: '/figma/persona-elon-musk.png',
  },
  {
    id: '13',
    name: 'Billie Eilish',
    role: 'Singer',
    category: 'singer',
    image: '/personas/billie-eilish.jpg',
  },
  {
    id: '14',
    name: 'Albert Einstein',
    role: 'Scientist',
    category: 'science',
    image: '/personas/albert-einstein.jpg',
  },
  {
    id: '15',
    name: 'Keanu Reeves',
    role: 'Artist',
    category: 'artist',
    image: '/generate/avatar.png',
  },
  {
    id: '16',
    name: 'Morgan Freeman',
    role: 'Artist',
    category: 'artist',
    image: '/figma/persona-539-2309.png',
  },
];

function LibraryCard({ persona }: { persona: Persona }) {
  return (
    <Link
      href="/persona"
      className="group flex w-full max-w-[13rem] flex-col gap-[0.5rem] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <div
        className="relative h-[17.25rem] w-full max-w-[13rem] bg-[#202122] overflow-hidden rounded-[0.375rem] transition-all duration-300 group-hover:ring-1 group-hover:ring-white/30"
      >
        <img
          src={persona.image}
          alt={persona.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex w-full flex-col">
        <p style={CARD_NAME} className="transition-colors group-hover:text-white">
          {persona.name}
        </p>
        <p style={CARD_ROLE}>{persona.role}</p>
      </div>
    </Link>
  );
}

export default function LibraryContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filtered personas
  const filteredPersonas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return PERSONAS.filter((persona) => {
      const matchesCategory =
        selectedCategory === 'all' || persona.category === selectedCategory;

      const matchesQuery =
        !query ||
        persona.name.toLowerCase().includes(query) ||
        persona.role.toLowerCase().includes(query) ||
        persona.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const activeCategoryLabel =
    selectedCategory === 'all'
      ? 'Category'
      : CATEGORIES.find((c) => c.id === selectedCategory)?.label || 'Category';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="flex w-[55.75rem] flex-col">
      <h1 style={TITLE}>Library</h1>

      {/* Frame 108: toolbar + grid, gap 2rem frame-relative */}
      <div className="flex w-[55.75rem] flex-col gap-[2rem] mt-[3.5rem]">
        {/* Frame 107 toolbar 892x48 */}
        <div className="flex w-[55.75rem] flex-row items-center justify-between">
          {/* Search Input Bar */}
          <div
            className="flex h-[3rem] w-[34.375rem] flex-row items-center gap-[0.75rem] rounded-[6.1875rem] bg-[#1C1C1C] px-[1rem] transition-colors focus-within:ring-1 focus-within:ring-white/30"
          >
            <img
              src="/library/search.svg"
              alt=""
              width={24}
              height={24}
              referrerPolicy="no-referrer"
              className="h-[1.5rem] w-[1.5rem] flex-none opacity-80"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              aria-label="Search personas"
              className="w-full bg-transparent text-[#F0F0F7] placeholder-[#676773] outline-none"
              style={SEARCH_TEXT}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="flex h-[1.5rem] w-[1.5rem] flex-none items-center justify-center rounded-full text-[#676773] hover:text-[#F0F0F7] transition-colors"
              >
                <X className="h-[1.125rem] w-[1.125rem]" />
              </button>
            )}
          </div>

          {/* Right Toolbar: Result count + shadcn DropdownMenu Category filter */}
          <div
            className="flex flex-row items-center gap-[0.9375rem] mt-[0.3125rem]"
          >
            <span style={RESULT_TEXT}>
              {filteredPersonas.length} {filteredPersonas.length === 1 ? 'result' : 'results'}
            </span>

            {/* shadcn Dropdown Menu */}
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
                    src="/library/chevron.svg"
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
                <DropdownMenuLabel>Category</DropdownMenuLabel>
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
        </div>

        {/* Frame 121 grid 892x1352: pure Tailwind CSS grid using rem resolution minmax(13rem, 1fr) with auto-fill to maintain strict column positions */}
        {filteredPersonas.length > 0 ? (
          <div
            className="grid w-[55.75rem] grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] gap-x-[1.25rem] gap-y-[1.5rem]"
          >
            <AnimatePresence>
              {filteredPersonas.map((persona) => (
                <motion.div
                  key={persona.id}
                  layout
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  whileHover={{ y: -4 }}
                  className="w-full max-w-[13rem]"
                >
                  <LibraryCard persona={persona} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex w-[55.75rem] flex-col items-center justify-center rounded-[1rem] border border-[#1F1F2B] bg-[#0E0E14] py-[4rem] text-center"
          >
            <p className="text-[1.25rem] font-semibold text-[#F0F0F7]">No personas found</p>
            <p className="mt-[0.5rem] max-w-[24rem] text-[0.9375rem] text-[#8E8E9C]">
              {searchQuery
                ? `No personas match "${searchQuery}" in ${activeCategoryLabel.toLowerCase()}.`
                : 'No personas in this category yet.'}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-[1.25rem] cursor-pointer rounded-full bg-[#1A1A23] px-[1.25rem] py-[0.625rem] text-[0.875rem] font-medium text-[#F0F0F7] transition-colors hover:bg-[#282836]"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
