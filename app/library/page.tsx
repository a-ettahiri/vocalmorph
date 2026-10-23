import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import LibraryContent from '@/components/library-content';

export const metadata: Metadata = { title: 'Library', description: 'Library' };

export default function LibraryPage() {
  return (
    <AppPageShell>
      <LibraryContent />
    </AppPageShell>
  );
}
