import type { ReactNode } from 'react';

/** Shared auth shell — single video panel (group-19) persists across login/register.
 *  Pages render content-only; layout owns <main> + left scroll column + right panel,
 *  so client-side nav swaps only the form, never the video. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full bg-[#07070D] text-white [color-scheme:dark] min-[1420px]:h-screen min-[1420px]:overflow-hidden">
      {/* Left — independently scrollable column (50vw on desktop). */}
      <div className="flex min-h-screen w-full min-w-0 flex-1 min-[1420px]:h-screen min-[1420px]:w-[50vw] min-[1420px]:flex-none min-[1420px]:overflow-y-auto">
        {children}
      </div>

      {/* Right video placeholder — fixed 50vw x 100vh, never scrolls, never remounts on auth nav. */}
      <aside
        aria-hidden="true"
        className="fixed right-0 top-0 hidden h-screen w-[50vw] flex-none items-center justify-center overflow-hidden bg-[#1A1922] min-[88.75rem]:flex"
      >
        <img
          src="/figma/group-19.svg"
          alt=""
          width={710}
          height={850}
          className="h-full w-full object-cover"
        />
      </aside>
    </main>
  );
}
