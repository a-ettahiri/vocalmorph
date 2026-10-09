'use client';

import { useState, type FormEvent } from 'react';

/** Google "G" mark — devicon:google palette from Figma (22x22). */
function GoogleMark() {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className="h-[22px] w-[22px] flex-none"
    >
      {/* white backing plate */}
      <path
        fill="#FFFFFF"
        d="M11 4.06c2.35 0 3.97.99 4.88 1.82l3.28-3.2C17.18 1.02 14.4 0 11 0 6.7 0 2.93 2.45.9 5.97l3.84 2.98C5.62 6.36 8.04 4.06 11 4.06Z"
      />
      {/* red */}
      <path
        fill="#E33629"
        d="M21.68 11.19c0-.74-.06-1.45-.18-2.14H11v4.06h5.98a5.13 5.13 0 0 1-2.23 3.37v2.79h3.61c2.11-1.95 3.32-4.82 3.32-8.08Z"
      />
      {/* green */}
      <path
        fill="#319F43"
        d="M11 22c3 0 5.51-1 7.35-2.69l-3.61-2.79c-1 .67-2.27 1.07-3.74 1.07-2.88 0-5.33-1.95-6.2-4.58H.85v2.87A11 11 0 0 0 11 22Z"
      />
      {/* yellow */}
      <path
        fill="#F8BD00"
        d="M4.8 13.01a6.66 6.66 0 0 1 0-4.02V6.12H.85a11 11 0 0 0 0 9.76l3.95-2.87Z"
      />
      {/* blue */}
      <path
        fill="#587DBD"
        d="M11 4.06c1.63 0 3.08.56 4.23 1.66l3.18-3.1C16.49 1.05 14.03 0 11 0 6.7 0 2.93 2.45.9 5.97l3.84 2.98C5.62 6.36 8.04 4.06 11 4.06Z"
      />
    </svg>
  );
}

type Status = 'idle' | 'error';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setStatus('error');
      return;
    }
    setStatus('idle');
    // UI-only stub: no backend in this release.
    console.log('[register stub] email continue:', value);
  }

  function handleGoogle() {
    // UI-only stub.
    console.log('[register stub] continue with google');
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Google button — Frame 82: 474x46, pad 12/16, gap 8, radius 99, 1px #9E9EA8 */}
      <button
        type="button"
        onClick={handleGoogle}
        className="flex h-[46px] w-full items-center justify-center gap-2 rounded-[99px] border border-[#9E9EA8] bg-transparent px-4 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <GoogleMark />
        <span className="text-[18px] font-medium leading-none text-[#EFEFF7]">
          Continue with Google
        </span>
      </button>

      {/* Divider — Frame 84: 474x19, gap 19, 210px lines #B3B3BC */}
      <div className="flex h-[19px] w-full items-center gap-[19px]" aria-hidden="true">
        <span className="h-px w-full max-w-[210px] flex-1 bg-[#B3B3BC]" />
        <span className="text-[16px] font-medium leading-none text-[#B3B3BC]">
          or
        </span>
        <span className="h-px w-full max-w-[210px] flex-1 bg-[#B3B3BC]" />
      </div>

      {/* Frame 87: vertical, gap 16 */}
      <div className="flex w-full flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
          {/* Email input — Frame 85: 474x51, #1A1A23, radius 16, pad 16 */}
          <label htmlFor="register-email" className="sr-only">
            Email address
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status !== 'idle') setStatus('idle');
            }}
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? 'register-email-error' : undefined}
            className="h-[51px] w-full rounded-2xl border border-transparent bg-[#1A1A23] px-4 text-[16px] font-medium tracking-[0.48px] text-[#EFEFF7] placeholder:text-[#B3B3BC] focus:border-[#9E9EA8] focus:outline-none"
          />
          {status === 'error' && (
            <p id="register-email-error" role="alert" className="-mt-2 text-[14px] font-medium text-[#FF8A8A]">
              Please enter a valid email address.
            </p>
          )}

          {/* Continue — Frame 35: 474x51, #EFEFF7, radius 89.1 */}
          <button
            type="submit"
            className="flex h-[51px] w-full items-center justify-center rounded-[89.1px] bg-[#EFEFF7] px-[43.2px] py-[14.4px] text-center text-[18px] font-semibold leading-none text-[#07070D] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Continue
          </button>
        </form>

        {/* Legal — 474x17, #C8C8D1, 14px SemiBold, ls -0.7, center */}
        <p className="w-full text-center text-[14px] font-semibold leading-[17px] tracking-[-0.7px] text-[#C8C8D1]">
          By continuing, you agree to the app{' '}
          <a href="#" className="text-[#C8C8D1] hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#C8C8D1] hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
