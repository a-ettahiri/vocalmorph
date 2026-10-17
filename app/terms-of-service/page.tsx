import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import TermsOfServiceContent from '@/components/terms-of-service-content';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing VocalMask AI-powered personalized song generation services.',
};

/** Canonical template — mirrors privacy-policy page, content component swapped. */
export default function TermsOfServicePage() {
  return (
    <AppPageShell>
      <TermsOfServiceContent />
    </AppPageShell>
  );
}
