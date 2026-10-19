/** Shared top bar — 1:1 of Figma navbar 453:3469 (1078x99).
 *  BG: #07070D @60% + background-blur 9. Pill 453:3471: 150.16x49.5,
 *  #1A1A23, radius 89.1, pad 14.4/7.2, gap 3.6. Byte-identical coin
 *  from public/figma/topbar-coin.svg via plain <img>. */
export default function TopBar() {
  return (
    <header className="sticky top-0 z-[100] flex h-[6.1875rem] w-full flex-none items-center justify-end bg-[#07070D]/60 px-[3rem] backdrop-blur-[0.5625rem]">
      <div className="flex h-[3.09375rem] w-[9.3855rem] flex-none items-center gap-[0.225rem] rounded-full bg-[#1A1A23] px-[0.9rem] py-[0.45rem]">
        <span className="text-[1.8rem] font-semibold leading-[2.16rem] tracking-[-0.036rem] text-[#F0F0F7]">
          12
        </span>
        <img
          src="/figma/topbar-coin.svg"
          alt=""
          width={26}
          height={28}
          className="h-[1.7804rem] w-[1.6038rem] flex-none"
        />
        <span className="text-[1.35rem] font-normal leading-[1.62rem] tracking-[-0.027rem] text-[#F0F0F7]">
          Credit
        </span>
      </div>
    </header>
  );
}
