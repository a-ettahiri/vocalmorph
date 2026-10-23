import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import PersonaContent from '@/components/persona-content';

export const metadata: Metadata = {
  title: 'Persona',
  description:
    'Preview the persona voice, listen to samples, and choose to use it or browse others.',
};

/** Canonical shell usage — same container/sidebar/right-column as policy pages. */
export default function PersonaPage() {
  return (
    <AppPageShell>
      <PersonaContent />
    </AppPageShell>
  );
}
