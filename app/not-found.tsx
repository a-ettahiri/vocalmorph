import type { Metadata } from 'next';
import Link from 'next/link';
import AppPageShell from '@/components/app-page-shell';

export const metadata: Metadata = { title: 'Page Not Found' };

/* 404 — Figma 1348:562 not-found, content 1350:944 450px centered in app shell.
 * Transcribed verbatim: title Inter-Bold 24 ls -0.48 lh 28.8 #9E9EA8,
 * button 239x60.8 #F0F0F7 radius 89.1, text Inter-Bold 18 ls -0.36 #07070D,
 * illustration byte-identical public/figma/not-found-illustration.svg via plain <img>. */
export default function NotFound() {
  return (
    <AppPageShell>
      <section className="mx-auto flex w-full max-w-[28.125rem] flex-1 flex-col items-center justify-center py-[2rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/not-found-illustration.svg"
          alt="404 illustration"
          width={387}
          height={359}
          className="h-auto w-[24.1875rem] max-w-full"
          draggable={false}
        />
        <h1 className="mt-[2rem] w-full text-center text-[1.5rem] font-bold leading-[1.8rem] tracking-[-0.03rem] text-[#9E9EA8]">
          Page not found
        </h1>
        <Link
          href="/"
          className="mt-[0.75rem] flex h-[3.8rem] w-[14.9375rem] items-center justify-center rounded-[5.56875rem] bg-[#F0F0F7] px-[2.7rem] py-[0.9rem] text-center text-[1.125rem] font-bold leading-[1.35rem] tracking-[-0.0225rem] text-[#07070D] transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </section>
    </AppPageShell>
  );
}
