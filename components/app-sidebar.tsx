'use client';
/** Shared app sidebar — 1:1 of Figma Cookie Policy Page Frame 46 (453:3415).
 *  Inner Frame 44: 225px wide, 850 tall, pt/pb 28.8. Byte-identical SVGs
 *  from public/figma/sidebar-*. Active row: History (#1A1A23 pill).
 *  Frame 45 (vis=false rail) is contamination — never wired here. */
import Link from 'next/link';
import { openUpgradePopup } from '@/components/upgrade-popup';

const NAV = [
  { label: 'Home', href: '/', icon: '/figma/sidebar-home.svg', active: false, textClass: 'font-bold text-[#F0F0F7]' },
  { label: 'Search', href: '/search', icon: '/figma/sidebar-search.svg', active: false, textClass: 'font-medium text-[#C9C9D1]' },
  { label: 'Library', href: '/library', icon: '/figma/sidebar-library.svg', active: false, textClass: 'font-medium text-[#C9C9D1]' },
  { label: 'History', href: '/history', icon: '/figma/sidebar-history.svg', active: true, textClass: 'font-medium text-[#F0F0F7]' },
  { label: 'Support', href: '/support', icon: '/figma/sidebar-support.svg', active: false, textClass: 'font-medium text-[#C9C9D1]' },
] as const;

export default function AppSidebar({ active = 'History' }: { active?: string }) {
  return (
    <aside
      aria-label="Primary"
      className="flex h-screen w-[16.625rem] flex-none items-stretch justify-start overflow-hidden"
    >
      {/* Frame 44 — 225px column, space-between, py 28.8 */}
      <div className="flex w-[14.0625rem] flex-none flex-col justify-between py-[1.8rem]">
        {/* Top — logo + generate + nav */}
        <div className="flex w-[11.7rem] flex-col">
          <img
            src="/figma/sidebar-logo.svg"
            alt="VocalMorph"
            width={119}
            height={42}
            className="h-[2.625rem] w-[7.4375rem] flex-none"
          />

          {/* Frame 36 — nav stack, gap 28.8, mt 36 */}
          <div className="mt-[2.25rem] flex flex-col gap-[1.8rem]">
            {/* Generate pill — 187.2x50.8, bg #F0F0F7, radius 89.1 */}
            <Link
              href="/generate"
              className="flex h-[3.175rem] w-[11.7rem] flex-none items-center justify-center gap-[0.45rem] rounded-full bg-[#F0F0F7] px-[2.7rem] py-[0.9rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <img
                src="/figma/sidebar-generate.svg"
                alt=""
                width={14}
                height={14}
                className="h-[0.84375rem] w-[0.84375rem] flex-none"
              />
              <span className="text-[1.125rem] font-bold leading-[1.35rem] tracking-[-0.0225rem] text-[#07070D]">
                Generate
              </span>
            </Link>

            {/* Frame 30 — page links, gap 14.4 */}
            <nav aria-label="Pages" className="flex flex-col gap-[0.9rem]">
              {NAV.map((item) =>
                item.active || active === item.label ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current="page"
                    className="flex h-[2.7675rem] w-[8.7625rem] flex-none items-center rounded-full bg-[#1A1A23] pl-[0.675rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      width={26}
                      height={26}
                      className="h-auto w-[1.575rem] flex-none"
                    />
                    <span
                      className={`ml-[0.9rem] text-[1.125rem] leading-[1.35rem] tracking-[-0.0225rem] ${item.textClass}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex min-h-[2.925rem] flex-none items-center pl-[0.675rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      width={26}
                      height={26}
                      className="h-auto w-[1.575rem] flex-none"
                    />
                    <span
                      className={`ml-[0.9rem] text-[1.125rem] leading-[1.35rem] tracking-[-0.0225rem] ${item.textClass}`}
                    >
                      {item.label}
                    </span>
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>

        {/* Bottom — Frame 47: pro card + member footer */}
        <div className="flex w-[14.0625rem] flex-col">
          {/* Group 10 — 225x129.6: art (IMAGE fill, CROP, transform
              [[0.9094516,0,~0],[0,0.34922943,0.19610037]]) + button.
              Crop window u[0,0.909] v[0.196,0.545] stretched to 225x86.4:
              img 15.4625rem sq. offset top -3.03125rem. */}
          <div className="relative w-[14.0625rem]">
            <div className="relative h-[5.4rem] w-[14.0625rem] overflow-hidden rounded-t-[1.5rem]">
              <img
                src="/figma/sidebar-pro-bg.png"
                alt=""
                width={746}
                height={384}
                className="absolute left-0 top-[-3.0322rem] h-[15.4625rem] w-[15.4625rem] max-w-none flex-none"
              />
            </div>
            <img
              src="/figma/sidebar-pro-crown.svg"
              alt=""
              width={36}
              height={36}
              className="absolute left-[0.9rem] top-[0.9rem] h-[2.25rem] w-[2.25rem]"
            />
            <button
              type="button"
              onClick={openUpgradePopup}
              className="flex h-[2.7rem] w-[14.0625rem] flex-none cursor-pointer items-center justify-center rounded-b-[1.5rem] bg-[#25252C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="text-[1.0125rem] font-semibold leading-[1.215rem] tracking-[-0.02025rem] text-[#F0F0F7]">
                Upgrade to Pro
              </span>
            </button>
          </div>

          {/* Frame 42 — member footer, 225x64.8, bg #1A1A23, radius 89.1.
              Inner Frame 40 is 203.4 wide: 0.675rem inset on BOTH sides. */}
          <div className="mt-[0.9rem] flex h-[4.05rem] w-[14.0625rem] flex-none items-center rounded-full bg-[#1A1A23] pl-[0.675rem] pr-[0.675rem]">
            <img
              src="/figma/sidebar-avatar.png"
              alt=""
              width={43}
              height={43}
              className="h-[2.7rem] w-[2.7rem] flex-none rounded-full object-cover"
            />
            <div className="ml-[0.675rem] flex min-w-0 flex-col">
              <span className="truncate text-[1.0125rem] font-semibold leading-[1.215rem] text-[#F0F0F7]">
                Member
              </span>
              <span className="text-[0.7875rem] font-medium leading-[0.945rem] text-[#B3B3BD]">
                Trial
              </span>
            </div>
            <img
              src="/figma/sidebar-more.svg"
              alt=""
              width={79}
              height={29}
              className="ml-auto h-[1.8rem] w-[4.95rem] flex-none"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
