"use client";

import { useCallback, useEffect, useState } from "react";

/** Shared bottom bar — rebuilt from Framelink export ground truth.
 *  Figma Group 16 453:3475 (1096.2x98.1), plugin v1.3.0, imageScale 2.
 *  - 453:3476 Rectangle 26 (1096x64): GRADIENT_LINEAR #07070D 0% stop 0%
 *    opacity → 100% stop 80% opacity @0.3 fill-opacity (effective 0→24%),
 *    BACKGROUND_BLUR radius 13.5 rendered as a smooth progressive ramp
 *    (feathered overlapping layers — hard bands cause visible steps).
 *  - 453:3477 Frame 36 (64.13px): circle #F0F0F7, outside stroke #07070D
 *    7.2, radius 89.1; arrow is byte-identical export art served from
 *    public/figma/bottombar-arrow.svg via plain <img> (no hand-drawn paths).
 *  Placement: sticky bottom of the right content column (never over sidebar),
 *  z-[200] above TopBar. Button shows on any scroll, stays visible. */
const BLUR_STEPS = [1.69, 3.38, 5.06, 6.75, 8.44, 10.13, 11.81, 13.5];
const FEATHER = 20;

export default function BottomBar({ threshold = 80 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > threshold);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  const toTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="pointer-events-none sticky bottom-0 z-[200] flex h-[6.13rem] w-full items-stretch justify-center">
      {/* overlay — exact export tokens, blur ramped smoothly top→bottom */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[4rem]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070D]/0 to-[#07070D]/80 opacity-30" />
        {BLUR_STEPS.map((blur, i) => {
          const start = (i / BLUR_STEPS.length) * 100;
          const mask = `linear-gradient(to bottom, transparent ${start}%, black ${start + FEATHER}%)`;
          return (
            <div
              key={blur}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          );
        })}
      </div>
      {/* go-up button — top-right of group, flush right */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Go to top"
        tabIndex={visible ? 0 : -1}
        className={`pointer-events-auto absolute top-0 right-6 flex h-[4rem] w-[4rem] flex-none cursor-pointer items-center justify-center rounded-full border-[0.45rem] border-[#07070D] bg-[#F0F0F7] transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <img
          src="/figma/bottombar-arrow.svg"
          alt=""
          width={25}
          height={25}
          className="h-[1.575rem] w-[1.575rem] flex-none"
        />
      </button>
    </div>
  );
}
