import { UpgradeCard } from '@/components/upgrade-popup';

/** Isolated harness for pixel gate: 1440x851 overlay on shell bg.
 *  Card pinned at Figma offsets (left 286, top 116) — true centering would
 *  land on half-pixels (286.5/115.5) and shift every edge by 1px @2x. */
export default function UpgradeHarness() {
  return (
    <main className="h-[851px] w-[1440px] overflow-hidden bg-[#07070D]">
      {/* Lock root rem to 16px for gate: fluid clamp() would shrink at test viewport */}
      <style>{`html{font-size:16px !important}::-webkit-scrollbar{display:none}html{scrollbar-width:none}`}</style>
      <div className="absolute inset-0 bg-[#07070D]/80 backdrop-blur-[1.875rem]" />
      <div className="relative" style={{ paddingLeft: '17.875rem', paddingTop: '7.25rem' }}>
        <UpgradeCard />
      </div>
    </main>
  );
}
