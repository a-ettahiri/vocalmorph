import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Create your free account',
  description:
    'Create a free account to access iconic voices in studio quality.',
};

/** Content-only — outer <main> + video live in app/(auth)/layout.tsx. */
export default function RegisterPage() {
  return (
    /* Center — registration form INSTANCE, 474x571, centered both axes in the 50vw column. */
    <section
      aria-labelledby="register-heading"
      className="m-auto flex w-full justify-center px-6 py-14 sm:px-10"
    >
      {/* Centered via parent justify-center + mx-auto so zoom-out
          keeps it centered instead of drifting left. */}
      <div className="mx-auto flex w-full max-w-[29.625rem] flex-col items-center justify-center gap-12">
        <img
          src="/figma/form-logo.svg"
          alt=""
          width={45}
          height={44}
          className="h-11 w-[2.8125rem]"
        />

        {/* Headings — Group 18: 474x100 */}
        <div className="flex w-full flex-col items-center gap-3">
          <h1
            id="register-heading"
            className="w-full text-center text-[2.25rem] font-extrabold leading-[2.7231rem] tracking-[-0.0675rem] text-white"
          >
            Create your free account
          </h1>
          <p className="w-full text-center text-[0.875rem] font-normal leading-[1.4rem] text-[#DEDEE5]">
            Access the world&apos;s most iconic voices in studio quality,
            The industry standard for high-fidelity celebrity voice clones.
          </p>
        </div>

        {/* Frame 88: vertical, gap 24 */}
        <RegisterForm />

        {/* Footer — 236x19, #EFEFF7, 16px SemiBold, center */}
        <p className="text-center text-[1rem] font-semibold leading-[1.1875rem] text-[#EFEFF7]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#EFEFF7] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
