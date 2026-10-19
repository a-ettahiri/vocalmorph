import TopBar from '@/components/topbar';

/** Isolated harness for pixel gate: 1078x99 CSS to match Figma 453:3469. */
export default function TopBarHarness() {
  return (
    <main className="flex min-h-screen w-full items-start justify-center bg-black">
      <div className="w-[67.375rem] flex-none">
        <TopBar />
      </div>
    </main>
  );
}
