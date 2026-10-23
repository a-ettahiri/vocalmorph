import LibraryContent from '@/components/library-content';

/** Isolated harness for pixel gate: 892x1540 component on shell bg. Viewport 894x744 matches baseline render bounds. */
export default function LibraryHarness() {
  return (
    <main className="flex h-[744px] w-[894px] items-start justify-center overflow-hidden bg-[#07070D]">
      {/* Lock root rem to 16px for gate: fluid clamp() would shrink to 13px at 894x744 viewport */}
      <style>{`html{font-size:16px !important}::-webkit-scrollbar{display:none}html{scrollbar-width:none}`}</style>
      <div className="w-[55.75rem] flex-none">
        <LibraryContent />
      </div>
    </main>
  );
}
