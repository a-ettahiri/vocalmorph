import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import CookiePolicyContent from '@/components/cookie-policy-content';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How VocalMask uses cookies to deliver personalized experiences and improve AI-powered song generation.',
};

/** Canonical shell usage — same container/sidebar/right-column as privacy-policy. */
export default function CookiesPolicyPage() {
  return (
    <AppPageShell>
      <CookiePolicyContent />
    </AppPageShell>
  );
}
