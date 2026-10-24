import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import GenerateContent from '@/components/generate-content';

export const metadata: Metadata = { title: 'Generate', description: 'Generate' };

export default function GeneratePage() {
  return (
    <AppPageShell>
      <GenerateContent />
    </AppPageShell>
  );
}
