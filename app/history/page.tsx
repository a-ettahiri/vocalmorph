import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import HistoryContent from '@/components/history-content';

export const metadata: Metadata = {
  title: 'History',
  description: 'Review recent generations, replay voices, and download past audio.',
};

export default function HistoryPage() {
  return (
    <AppPageShell>
      <HistoryContent />
    </AppPageShell>
  );
}
