'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

/** Route-pending flag that survives across per-page shells.
 *  Sidebar sets it on menu click; the shell's content area swaps to the
 *  loader while the next page loads. Clears on pathname change (plus a
 *  safety timeout in case navigation fails). */
const NavPendingContext = createContext<{
  pending: boolean;
  startPending: () => void;
}>({ pending: false, startPending: () => {} });

export function NavPendingProvider({ children }: { children: ReactNode }) {
  const [pending, setPending] = useState(false);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPending(false);
  }, [pathname]);

  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => setPending(false), 8000);
    return () => clearTimeout(t);
  }, [pending]);

  const startPending = useCallback(() => setPending(true), []);

  return (
    <NavPendingContext.Provider value={{ pending, startPending }}>
      {children}
    </NavPendingContext.Provider>
  );
}

export function useNavPending() {
  return useContext(NavPendingContext);
}
