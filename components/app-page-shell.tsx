import type { ReactNode } from 'react';
import AppSidebar from '@/components/app-sidebar';
import BottomBar from '@/components/bottom-bar';
import TopBar from '@/components/topbar';
import AppShellContent from '@/components/app-shell-content';

/** Shared page shell — canonical structure for policy pages and all future docs.
 *  - Container: w-full max-w-[100rem] (1600px / 16) centered via parent justify-center,
 *    so ultra-wide screens get gutters instead of stretched content.
 *  - Left: sticky top-0 h-screen flex-none — hugs AppSidebar, never stretches.
 *  - Right: min-w-0 flex-1 flex-col — stretches; owns TopBar + content + BottomBar.
 *  BottomBar stays scoped inside right column (sticky bottom-0, z-[200]). */
export default function AppPageShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-screen w-full max-w-[100rem] pl-[3rem] pr-0">
        <div className="sticky top-0 h-screen flex-none">
          <AppSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <AppShellContent>{children}</AppShellContent>
          <BottomBar />
        </div>
      </div>
    </main>
  );
}
