/** Fixed member footer — Figma Cookie Policy Page Frame 42 (453:3459).
 *  225x64.8, bg #1A1A23, radius 89.1. Inner Frame 40 is 203.4 wide, i.e.
 *  10.8px inset on BOTH sides (225 - 203.4 = 21.6 / 2). The 3-dots pill
 *  (sidebar-more.svg, 453:3465 GROUP 79.2x28.8, pill #25252C + 3 dots
 *  #DFDFE6) hugged the right edge when the trailing inset was missing.
 *  Fix: symmetric pl + pr of 10.8px = 0.675rem (px/16). Extracted verbatim
 *  from components/app-sidebar.tsx lines 132-157; no other changes. */

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
