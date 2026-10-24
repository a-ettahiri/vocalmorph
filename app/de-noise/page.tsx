import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import DeNoiseContent from '@/components/de-noise-content';

export const metadata: Metadata = { title: 'De-Noise', description: 'De-Noise' };

export default function DeNoisePage() {
  return (
    <AppPageShell>
      <DeNoiseContent />
    </AppPageShell>
  );
}
