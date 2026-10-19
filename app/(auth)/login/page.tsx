import type { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Welcome back',
  description:
    'Log in to access iconic voices in studio quality.',
};

/** Content-only — outer <main> + video live in app/(auth)/layout.tsx. */
export default function LoginPage() {
  return (
    /* Center — login form INSTANCE, 474x510, centered both axes in the 50vw column. */
    <section
      aria-labelledby="login-heading"
      className="m-auto flex w-full justify-center px-6 py-14 sm:px-10"
    >
      {/* Instance: centered via parent justify-center + mx-auto so zoom-out
          keeps it centered instead of drifting left. */}
      <div className="mx-auto flex min-h-[31.875rem] w-full max-w-[29.625rem] flex-col items-center justify-center gap-12">
        <img
          src="/figma/login-logo.svg"
          alt=""
          width={45}
          height={44}
          className="h-11 w-[2.8125rem]"
        />

        {/* Heading — 474x44, single line */}
        <h1
          id="login-heading"
          className="w-full text-center text-[2.25rem] font-extrabold leading-[2.7231rem] tracking-[-0.0675rem] text-white"
        >
          Welcome back
        </h1>

        {/* Frame 88: vertical, gap 24 */}
        <LoginForm />
      </div>
    </section>
  );
}
