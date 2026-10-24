'use client';

import { Suspense, type ReactNode } from 'react';
import PageLoader from '@/components/page-loader';
import { useNavPending } from '@/components/app-nav-pending';

/** Content column body — swaps page content for the loader while the
 *  clicked menu route loads. TopBar/BottomBar live outside this wrapper
 *  and stay mounted. Styling identical to the previous shell div. */
export default function AppShellContent({ children }: { children: ReactNode }) {
  const { pending } = useNavPending();
  return (
    <div className="flex w-full flex-1 justify-center px-10 pb-[4rem] pt-[0.875rem]">
      {pending ? (
        <PageLoader />
      ) : (
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      )}
    </div>
  );
}
