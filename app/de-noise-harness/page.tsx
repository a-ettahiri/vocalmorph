import DeNoiseContent from '@/components/de-noise-content';

/** Isolated harness for pixel gate: 890x744 component on shell bg. Viewport 890x744 matches baseline render bounds. */
export default function DeNoiseHarness() {
  return (
    <main className="flex h-[46.5rem] w-[55.625rem] items-start justify-center overflow-hidden bg-[#07070D]">
      {/* Lock root rem to 16px for gate: fluid clamp() would shrink to 13px at 890x744 viewport */}
      <style>{`html{font-size:16px !important}::-webkit-scrollbar{display:none}html{scrollbar-width:none}`}</style>
      <div className="w-[55.625rem] flex-none">
        <DeNoiseContent />
      </div>
    </main>
  );
}
