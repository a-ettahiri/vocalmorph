import VoiceCloneContent from '@/components/voice-clone-content';

/** Isolated harness for pixel gate: 958x744 component on shell bg. Viewport 958x744 matches baseline frame width. */
export default function VoiceCloneHarness() {
  return (
    <main className="flex h-[46.5rem] w-[59.875rem] items-start justify-center overflow-hidden bg-[#07070D]">
      {/* Lock root rem to 16px for gate: fluid clamp() would shrink to 13px at 958x744 viewport */}
      <style>{`html{font-size:16px !important}::-webkit-scrollbar{display:none}html{scrollbar-width:none}`}</style>
      <div className="w-[59.875rem] flex-none">
        <VoiceCloneContent />
      </div>
    </main>
  );
}
