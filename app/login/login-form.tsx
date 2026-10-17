'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'error';

export default function LoginForm() {
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
    console.log('[login stub] email continue:', value);
  }

  function handleGoogle() {
    // UI-only stub.
    console.log('[login stub] continue with google');
  }

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Google button — Frame 82: 474x46, pad 12/16, gap 8, radius 99, 1px #9E9EA8 */}
      <button
        type="button"
        onClick={handleGoogle}
        className="flex h-[2.875rem] min-h-[44px] w-full items-center justify-center gap-2 rounded-[6.1875rem] border border-[#9E9EA8] bg-transparent px-4 py-3 text-left transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <img
          src="/figma/login-google-g.svg"
          alt=""
          width={22}
          height={22}
          className="h-[1.375rem] w-[1.375rem] flex-none"
        />
        <span className="text-[1.125rem] font-medium leading-none text-[#EFEFF7]">
          Continue with Google
        </span>
      </button>

      {/* Divider — Frame 84: 474x19, gap 19, 210px lines #B3B3BC */}
      <div className="flex h-[1.1875rem] w-full items-center gap-[1.1875rem]" aria-hidden="true">
        <span className="h-px w-full max-w-[13.125rem] flex-1 bg-[#B3B3BC]" />
        <span className="text-[1rem] font-medium leading-none text-[#B3B3BC]">
          or
        </span>
        <span className="h-px w-full max-w-[13.125rem] flex-1 bg-[#B3B3BC]" />
      </div>

      {/* Frame 87: vertical, gap 16 */}
      <div className="flex w-full flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
          {/* Email input — Frame 85: 474x51, #1A1A23, radius 16, pad 16 */}
          <label htmlFor="login-email" className="sr-only">
            Email address
          </label>
          <input
            id="login-email"
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
            aria-describedby={status === 'error' ? 'login-email-error' : undefined}
            className="h-[3.1875rem] min-h-[44px] w-full rounded-2xl border border-transparent bg-[#1A1A23] px-4 text-[1rem] font-medium tracking-[0.03rem] text-[#EFEFF7] placeholder:text-[#B3B3BC] focus:border-[#9E9EA8] focus:outline-none"
          />
          {status === 'error' && (
            <p id="login-email-error" role="alert" className="-mt-2 text-[0.875rem] font-medium text-[#FF8A8A]">
              Please enter a valid email address.
            </p>
          )}

          {/* Continue — Frame 35: 474x51, #EFEFF7, radius 89.1 */}
          <button
            type="submit"
            className="flex h-[3.1875rem] min-h-[44px] w-full items-center justify-center rounded-[5.5688rem] bg-[#EFEFF7] px-[2.7rem] py-[0.9rem] text-center text-[1.125rem] font-semibold leading-none text-[#07070D] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Continue
          </button>
        </form>

        {/* Legal — 474x17, #C8C8D1, 14px, center */}
        <p className="w-full text-center text-[0.875rem] font-semibold leading-[1.0625rem] tracking-[-0.0438rem] text-[#C8C8D1]">
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
