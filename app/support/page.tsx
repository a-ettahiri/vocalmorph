import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import SupportContent from '@/components/support-content';

export const metadata: Metadata = {
  title: 'Support',
  description:
    'Contact VocalMask support for questions about AI-powered song generation services.',
};

/** Canonical template — mirrors privacy-policy page, content component swapped. */
export default function SupportPage() {
  return (
    <AppPageShell>
      <SupportContent />
    </AppPageShell>
  );
}
