/** Fixed member footer — 1:1 of Figma Frame 42 (225 × 64.8, bg #1A1A23, radius 89.1).
 *  Inner Frame 40 is 203.4 wide: 10.8px (0.675rem) inset on BOTH sides.
 *  Fix: symmetric pl + pr so the 3-dots circle no longer hugs the right edge.
 *  Extracted from components/app-sidebar.tsx — drop-in snippet.
 */

export default function MemberFooter() {
  return (
    <div className="mt-[0.9rem] flex h-[4.05rem] w-[14.0625rem] flex-none items-center rounded-full bg-[#1A1A23] pl-[0.675rem] pr-[0.675rem]">
      <img
        src="/figma/sidebar-avatar.png"
        alt=""
        width={43}
        height={43}
        className="h-[2.7rem] w-[2.7rem] flex-none rounded-full object-cover"
      />
      <div className="ml-[0.675rem] flex min-w-0 flex-col">
        <span className="truncate text-[1.0125rem] font-semibold leading-[1.215rem] text-[#F0F0F7]">
          Member
        </span>
        <span className="text-[0.7875rem] font-medium leading-[0.945rem] text-[#B3B3BD]">
          Trial
        </span>
      </div>
      <img
        src="/figma/sidebar-more.svg"
        alt=""
        width={79}
        height={29}
        className="ml-auto h-[1.8rem] w-[4.95rem] flex-none"
      />
    </div>
  );
}
