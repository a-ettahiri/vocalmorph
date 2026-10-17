import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import PrivacyPolicyContent from '@/components/privacy-policy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How VocalMask collects, uses, and protects your data across AI-powered song generation.',
};

/** Canonical template — all other pages copy this structure:
 *  AppPageShell (max-w-[100rem] container, fixed sidebar, stretch right). */
export default function PrivacyPolicyPage() {
  return (
    <AppPageShell>
      <PrivacyPolicyContent />
    </AppPageShell>
  );
}
