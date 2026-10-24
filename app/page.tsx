import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import HomeContent from '@/components/home-content';

export const metadata: Metadata = { title: 'Home', description: 'Home' };

export default function HomePage() {
  return (
    <AppPageShell>
      <HomeContent />
    </AppPageShell>
  );
}
