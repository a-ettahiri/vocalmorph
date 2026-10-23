/** TEMPORARY preview — compressed rail 1:1 of Figma Frame 45 (355:813).
 *  Outer Frame 45: 91x1024 HORIZONTAL counter CENTER. Inner Sidebar 80x1024,
 *  py 32, space-between (gap 358). Top Frame 38: 56 wide, gap 40.
 *  Frame 67: logo 52x52 + Frame 36, gap 48. Frame 36: generate 47x47 (corner 99,
 *  #F0F0F7) + Frame 30, gap 32. Frame 30: 5 rows, gap 16. History active
 *  Frame 27: 52x49.2 corner 99 #1A1A23. Bottom Frame 42: 80x80 corner 99
 *  #1A1A23, avatar 56x56 centered (12px insets). Assets byte-identical from
 *  public/figma/sidebar-*. Logo mark cropped from sidebar-rail-icons.svg
 *  (whole-file, overflow-hidden) — no hand-drawn vectors. */
const RAIL_NAV = [
  { label: 'Home', href: '/', icon: '/figma/sidebar-home.svg' },
  { label: 'Search', href: '/search', icon: '/figma/sidebar-search.svg' },
  { label: 'Library', href: '/library', icon: '/figma/sidebar-library.svg' },
  { label: 'History', href: '/history', icon: '/figma/sidebar-history.svg', active: true },
  { label: 'Support', href: '/support', icon: '/figma/sidebar-support.svg' },
] as const;

export default function AppSidebarRail({ active = 'History' }: { active?: string }) {
  return (
    <aside
      aria-label="Primary compressed"
      className="flex h-screen w-[5.6875rem] flex-none items-center justify-center overflow-hidden"
    >
      {/* Sidebar — 80x1024, py 32, space-between */}
      <div className="flex h-full w-[5rem] flex-none flex-col items-start justify-between py-[2rem]">
        {/* Frame 38 — 56 wide top stack */}
        <div className="flex w-[3.5rem] flex-col">
          {/* Logo mark 52x52 — top of rail-icons strip, cropped (bytes identical) */}
          <div className="h-[3.25rem] w-[3.25rem] flex-none overflow-hidden">
            <img
              src="/figma/sidebar-rail-icons.svg"
              alt="VocalMorph"
              width={56}
              height={517}
              className="h-[32.3125rem] w-[3.5rem] max-w-none flex-none"
            />
          </div>

          {/* Frame 36 — generate + nav, gap 32, mt 48 (Frame 67 gap) */}
          <div className="mt-[3rem] flex w-[3.5rem] flex-col items-center">
            {/* Generate 47x47 circle */}
            <a
              href="/generate"
              aria-label="Generate"
              className="flex h-[2.9375rem] w-[2.9375rem] flex-none items-center justify-center rounded-full bg-[#F0F0F7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <img
                src="/figma/sidebar-generate.svg"
                alt=""
                width={15}
                height={15}
                className="h-[0.9375rem] w-[0.9375rem] flex-none"
              />
            </a>

            {/* Frame 30 — nav rows, gap 16, mt 32 */}
            <nav aria-label="Pages" className="mt-[2rem] flex flex-col items-center gap-[1rem]">
              {RAIL_NAV.map((item) =>
                (('active' in item && item.active) || active === item.label) ? (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-current="page"
                    aria-label={item.label}
                    className="flex h-[3.0749rem] w-[3.25rem] flex-none items-center justify-center rounded-full bg-[#1A1A23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-[2rem] w-[2rem] flex-none"
                    />
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="flex h-[3.5rem] w-[3.5rem] flex-none items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <img
                      src={item.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="h-[2rem] w-[2rem] flex-none"
                    />
                  </a>
                ),
              )}
            </nav>
          </div>
        </div>

        {/* Frame 50/42 — 80x80 avatar footer, corner 99 #1A1A23 */}
        <div className="flex h-[5rem] w-[5rem] flex-none items-center justify-center rounded-full bg-[#1A1A23]">
          <img
            src="/figma/sidebar-avatar.png"
            alt=""
            width={56}
            height={56}
            className="h-[3.5rem] w-[3.5rem] flex-none rounded-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
}
