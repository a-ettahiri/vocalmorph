/* Figma 641-2843 — Popup overlay, 1440x851. Card 867x620. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export const UPGRADE_OPEN_EVENT = 'vocalmorph:open-upgrade';

export function openUpgradePopup() {
  window.dispatchEvent(new CustomEvent(UPGRADE_OPEN_EVENT));
}

const PACKAGES = [
  { price: '18', credits: '1,000 credits' },
  { price: '36', credits: '2,000 credits' },
  { price: '54', credits: '3,000 credits' },
  { price: '83', credits: '5,000 credits' },
  { price: '133', credits: '8,000 credits' },
  { price: '166', credits: '10,000 credits' },
] as const;

const PAYMENTS = [
  { src: '/figma/upgrade-powered-stripe.png', alt: 'Powered by Stripe', w: '7rem' },
  { src: '/figma/upgrade-visa.png', alt: 'Visa', w: '2.8125rem' },
  { src: '/figma/upgrade-mastercard.png', alt: 'Mastercard', w: '3.1875rem' },
  { src: '/figma/upgrade-applepay.png', alt: 'Apple Pay', w: '2.9375rem' },
  { src: '/figma/upgrade-googlepay.png', alt: 'Google Pay', w: '3rem' },
  { src: '/figma/upgrade-amex.png', alt: 'Amex', w: '2.875rem' },
] as const;

/** Static card — pixel target. No animation here; motion lives in UpgradePopup. */
export function UpgradeCard({ onClose }: { onClose?: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Upgrade to Pro"
      className="relative flex-none rounded-[2rem] border-[0.125rem] border-[#25252C] bg-[#07070D] shadow-[0_0.125rem_0.75rem_rgba(0,0,0,0.25)]"
      style={{ width: '54.1875rem', height: '38.75rem' }}
    >
      {/* Close — Ellipse 7 48x48, inset 10px top/right */}
      <button
        type="button"
        aria-label="Close upgrade popup"
        onClick={onClose}
        className="absolute flex-none cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{ width: '3rem', height: '3rem', top: '0.625rem', right: '0.625rem' }}
      >
        <img src="/figma/upgrade-x.svg" alt="" width={48} height={48} className="h-[3rem] w-[3rem] flex-none" />
      </button>

      {/* Frame 191 — 728x491 content. Gaps per Figma bboxes: header45 +32+ pill35 +24+ grid262 +32+ payment61 = 491. */}
      <div className="flex flex-col" style={{ width: '45.5rem', marginLeft: '4.375rem', marginTop: '4rem' }}>
        {/* Frame 173 — member + headline */}
        <div className="flex flex-row items-start justify-between" style={{ width: '45.5rem', height: '2.8125rem' }}>
          <div className="flex flex-row items-center" style={{ width: '12.336rem', height: '2.7rem' }}>
            <img
              src="/figma/upgrade-avatar.png"
              alt=""
              width={43}
              height={43}
              className="h-[2.7rem] w-[2.7rem] flex-none rounded-full object-cover"
            />
            <div className="flex min-w-0 flex-col" style={{ marginLeft: '0.5rem', width: '9.136rem' }}>
              <div className="flex flex-row items-center" style={{ gap: '0.4rem' }}>
                <span
                  className="flex-none"
                  style={{ fontSize: '1.0125rem', fontWeight: 600, lineHeight: '1.215rem', letterSpacing: '-0.02025rem', color: '#F0F0F7' }}
                >
                  Member
                </span>
                <span
                  className="flex flex-row items-center rounded-full bg-[#1A1A23]"
                  style={{ gap: '0.2rem', paddingLeft: '0.4rem', paddingRight: '0.4rem', paddingTop: '0.15rem', paddingBottom: '0.15rem' }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: '1.05rem', color: '#F0F0F7' }}>12</span>
                  <img src="/figma/upgrade-coin-sm.svg" alt="" width={9} height={11} className="h-[0.7rem] w-[0.5625rem] flex-none" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 400, lineHeight: '0.9rem', color: '#F0F0F7' }}>Credit</span>
                </span>
              </div>
              <span style={{ fontSize: '0.7875rem', fontWeight: 500, lineHeight: '0.945rem', color: '#B3B3BD', marginTop: '0.15rem' }}>
                Trial
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end" style={{ width: '20.75rem' }}>
            <span
              style={{ fontSize: '1.0125rem', fontWeight: 600, lineHeight: '1.215rem', letterSpacing: '-0.02025rem', color: '#FFFFFF', textAlign: 'right' }}
            >
              Upgrade to Pro - One credit system, all tools
            </span>
            <span
              style={{ fontSize: '0.875rem', fontWeight: 400, lineHeight: '1.05rem', color: '#C9C9D1', textAlign: 'right', marginTop: '0.25rem' }}
            >
              Credits can be used across the entire platform
            </span>
          </div>
        </div>

        {/* Credit Packages pill bar — 728x35, 32px below header */}
        <div
          className="flex items-center justify-center bg-[#1A1A23]"
          style={{ width: '45.5rem', height: '2.1875rem', borderRadius: '6.1875rem', marginTop: '2rem' }}
        >
          <span style={{ fontSize: '1rem', fontWeight: 800, lineHeight: '1.2rem', letterSpacing: '-0.04rem', color: '#9E9EA8' }}>
            Credit Packages
          </span>
        </div>

        {/* Packages grid — 728x262, 3 cols, gap 16, 24px below pill */}
        <div className="grid" style={{ width: '45.5rem', gridTemplateColumns: 'repeat(3, 14.5rem)', gap: '1rem', marginTop: '1.5rem' }}>
          {PACKAGES.map((p) => (
            <div key={p.price} className="flex flex-col flex-none" style={{ width: '14.5rem', height: '7.6875rem' }}>
              <div
                className="flex flex-col items-center bg-[#1A1A23]"
                style={{
                  width: '14.5rem',
                  height: '5.625rem',
                  borderTopLeftRadius: '1.5rem',
                  borderTopRightRadius: '1.5rem',
                  paddingTop: '1.25rem',
                }}
              >
                <span className="flex flex-row items-end" style={{ height: '1.65rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 800, lineHeight: '1.05rem', letterSpacing: '-0.035rem', color: '#DFDFE6' }}>$</span>
                  <span style={{ fontSize: '1.375rem', fontWeight: 800, lineHeight: '1.65rem', letterSpacing: '-0.0825rem', color: '#F0F0F7' }}>{p.price}</span>
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: 300, lineHeight: '1.05rem', letterSpacing: '-0.035rem', color: '#DFDFE6', marginTop: '0.2875rem' }}>
                  {p.credits}
                </span>
              </div>
              <button
                type="button"
                className="flex cursor-pointer items-center justify-center bg-[#25252C]"
                style={{
                  width: '14.5rem',
                  height: '2.0625rem',
                  borderBottomLeftRadius: '1rem',
                  borderBottomRightRadius: '1rem',
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 800, lineHeight: '1.05rem', letterSpacing: '-0.0175rem', color: '#F0F0F7' }}>
                  Purchase
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Payment Method — 728x61, 32px below grid; label15 +16+ icons30 */}
        <div className="flex flex-col items-center" style={{ width: '45.5rem', marginTop: '2rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, lineHeight: '0.9rem', letterSpacing: '-0.015rem', color: '#C9C9D1' }}>
            Payment Method
          </span>
          <div className="flex flex-row items-center justify-center" style={{ gap: '0.25rem', marginTop: '1rem' }}>
            <img
              src={PAYMENTS[0].src}
              alt={PAYMENTS[0].alt}
              width={112}
              height={30}
              className="flex-none"
              style={{ width: PAYMENTS[0].w, height: '1.875rem' }}
            />
            <span style={{ width: '0.875rem' }} />
            {PAYMENTS.slice(1).map((m) => (
              <img
                key={m.src}
                src={m.src}
                alt={m.alt}
                width={48}
                height={30}
                className="flex-none"
                style={{ width: m.w, height: '1.875rem' }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Full-viewport overlay host — render once in RootLayout, outside AppPageShell. */
export default function UpgradePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(UPGRADE_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(UPGRADE_OPEN_EVENT, onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open ]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" role="presentation">
          {/* Blurred backdrop — fast fade first */}
          <motion.button
            type="button"
            aria-label="Close upgrade popup"
            onClick={close}
            className="absolute inset-0 cursor-default bg-[#07070D]/80 backdrop-blur-[1.875rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.09, ease: 'easeOut', delay: 0 } }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          />
          {/* Popup card — spring in after backdrop */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.09, ease: 'easeOut', delay: 0 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.08 }}
          >
            <UpgradeCard onClose={close} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
