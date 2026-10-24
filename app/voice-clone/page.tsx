import type { Metadata } from 'next';
import AppPageShell from '@/components/app-page-shell';
import VoiceCloneContent from '@/components/voice-clone-content';

export const metadata: Metadata = { title: 'Voice Clone', description: 'Voice Clone' };

export default function VoiceClonePage() {
  return (
    <AppPageShell>
      <VoiceCloneContent />
    </AppPageShell>
  );
}
