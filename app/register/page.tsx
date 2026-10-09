import type { Metadata } from 'next';
import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Create your free account',
  description:
    'Create a free account to access iconic voices in studio quality.',
};

/** Form logo mark — VECTOR 45x44, #F0F0F7. */
function FormLogo() {
  return (
    <svg
      aria-hidden="true"
      width="45"
      height="44"
      viewBox="0 0 45 44"
      className="h-11 w-[45px]"
    >
      <path
        fill="#F0F0F7"
        d="M4 2h9.6L22.5 30 31.4 2H41L26.6 42h-8.2L4 2Z"
      />
      <path
        fill="#F0F0F7"
        d="M31 30.5c2.8 0 5.4 1.1 7.3 3l2.2-2.2a13.4 13.4 0 0 0-9.5-3.9c-3 0-5.8 1-8 2.6l2.5 2.9c1.5-1.5 3.4-2.4 5.5-2.4Z"
      />
    </svg>
  );
}

/** Sidebar logo mark — VECTOR 52x52, #F0F0F7. */
function SidebarLogo() {
  return (
    <svg
      aria-hidden="true"
      width="52"
      height="52"
      viewBox="0 0 52 52"
      className="h-[52px] w-[52px]"
    >
      <path
        fill="#F0F0F7"
        d="M5 3h11L26 35.5 36 3h11L30.5 49h-9.7L5 3Z"
      />
      <circle cx="38" cy="38" r="6" fill="#F0F0F7" />
    </svg>
  );
}

/** Active home glyph — VECTOR 15x15, BLACK. */
function HomeGlyph() {
  return (
    <svg
      aria-hidden="true"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      className="h-[15px] w-[15px]"
    >
      <path
        fill="#000000"
        d="M7.5 1.2 1 6.6v7.2h4V9.4h5v4.4h4V6.6L7.5 1.2Z"
      />
    </svg>
  );
}

function SidebarIcon({ d }: { d: string }) {
  return (
    <svg
      aria-hidden="true"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const SIDEBAR_ICONS: Array<{ d: string; color: string; label: string }> = [
  {
    d: 'M6 13v9a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-9M4 11l12-7 12 7v9a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-9Z',
    color: '#EFEFF7',
    label: 'Discover',
  },
  {
    d: 'M8 10h16M8 16h16M8 22h10M5 5h22v22H5z',
    color: '#C8C8D1',
    label: 'Library',
  },
  {
    d: 'M16 4v16m0 0-6-6m6 6 6-6M5 28h22',
    color: '#C8C8D1',
    label: 'Downloads',
  },
  {
    d: 'M16 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM6 27c0-5 4.5-8 10-8s10 3 10 8',
    color: '#C8C8D1',
    label: 'Profile',
  },
];

/** Left icon rail — Frame 45: 91px column with 80x900 sidebar. */
function Sidebar() {
  return (
    <div className="hidden w-[91px] flex-none items-stretch justify-center md:flex">
      <nav
        aria-label="Primary"
        className="flex min-h-[850px] w-[80px] flex-none flex-col items-center py-8"
      >
        <SidebarLogo />

        {/* Frame 36: vertical, gap 32 */}
        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Active home — Frame 35: 47x47, #EFEFF7, radius 99, pad 16 */}
          <a
            href="/register"
            aria-current="page"
            aria-label="Home"
            className="flex h-[47px] w-[47px] items-center justify-center rounded-full bg-[#EFEFF7] p-4"
          >
            <HomeGlyph />
          </a>

          {/* Frame 30: vertical pill, gap 16, #1A1A23 */}
          <div className="flex flex-col items-center gap-4 rounded-full bg-[#1A1A23] p-2">
            {SIDEBAR_ICONS.map((icon) => (
              <a
                key={icon.label}
                href="#"
                aria-label={icon.label}
                style={{ color: icon.color }}
                className="flex h-14 w-14 items-center justify-center rounded-full p-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <SidebarIcon d={icon.d} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom avatar — Frame 42: 80x80, #1A1A23, radius 99, pad 12 */}
        <div className="mt-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1A1A23] p-3">
          <div
            aria-hidden="true"
            className="h-14 w-14 rounded-full bg-gradient-to-br from-[#4A4A5E] via-[#2E2E3E] to-[#1B1B26] ring-1 ring-white/10"
          />
        </div>
      </nav>
    </div>
  );
}

/** Right decorative panel — Group 20: 710x850, #1A1822, Group 17 176x176 #28272F. */
function DecorativePanel() {
  return (
    <aside
      aria-hidden="true"
      className="hidden w-[710px] max-w-[49.3%] flex-none items-center justify-center bg-[#1A1822] lg:flex"
    >
      <svg
        width="176"
        height="176"
        viewBox="0 0 176 176"
        className="h-44 w-44"
      >
        <rect
          x="18"
          y="18"
          width="104"
          height="104"
          rx="26"
          fill="#28272F"
          transform="rotate(-8 70 70)"
        />
        <rect
          x="54"
          y="54"
          width="104"
          height="104"
          rx="26"
          fill="#28272F"
          transform="rotate(8 106 106)"
        />
        <path d="M78 74l28 18-28 18V74Z" fill="#1A1822" />
      </svg>
    </aside>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-[850px] w-full max-w-[1440px] flex-row shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        <Sidebar />

        {/* Center — registration form INSTANCE, 474x571 */}
        <section
          aria-labelledby="register-heading"
          className="flex min-w-0 flex-1 items-center justify-center px-6 py-14 sm:px-10"
        >
          {/* Frame 89: vertical, gap 48 */}
          <div className="flex w-full max-w-[474px] flex-col items-center gap-12">
            <FormLogo />

            {/* Headings — Group 18: 474x100 */}
            <div className="flex w-full flex-col items-center gap-3">
              <h1
                id="register-heading"
                className="w-full text-center text-[36px] font-extrabold leading-[43.57px] tracking-[-1.08px] text-white"
              >
                Create your free account
              </h1>
              <p className="w-full text-center text-[14px] font-normal leading-[22.4px] text-[#DEDEE5]">
                Access the world&apos;s most iconic voices in studio quality,
                The industry standard for high-fidelity celebrity voice clones.
              </p>
            </div>

            {/* Frame 88: vertical, gap 24 */}
            <RegisterForm />

            {/* Footer — 236x19, #EFEFF7, 16px SemiBold, center */}
            <p className="text-center text-[16px] font-semibold leading-[19px] text-[#EFEFF7]">
              Already have an account?{' '}
              <a href="/login" className="text-[#EFEFF7] hover:underline">
                Log in
              </a>
            </p>
          </div>
        </section>

        <DecorativePanel />
      </div>
    </main>
  );
}
