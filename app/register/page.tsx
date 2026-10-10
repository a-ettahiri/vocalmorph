import type { Metadata } from 'next';
import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Create your free account',
  description:
    'Create a free account to access iconic voices in studio quality.',
};

/** Right decorative panel — Group 20 verbatim Figma export, 710x850. */
function DecorativePanel() {
  return (
    <aside
      aria-hidden="true"
      className="hidden w-[710px] max-w-[49.3%] flex-none items-center justify-center bg-[#1A1922] lg:flex"
    >
      <img
        src="/figma/group-20.svg"
        alt=""
        width={710}
        height={850}
        className="h-[850px] w-[710px] max-w-none"
      />
    </aside>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full justify-center bg-[#07070D] text-white [color-scheme:dark]">
      <div className="flex min-h-[850px] w-full max-w-[1440px] flex-row shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
        {/* Center — registration form INSTANCE, 474x571 */}
        <section
          aria-labelledby="register-heading"
          className="flex min-w-0 flex-1 items-center justify-center px-6 py-14 sm:px-10 lg:justify-start lg:pl-[142px]"
        >
          {/* Frame 89: vertical, gap 48 */}
          <div className="flex w-full max-w-[474px] flex-col items-center gap-12">
            <img
              src="/figma/form-logo.svg"
              alt=""
              width={45}
              height={44}
              className="h-11 w-[45px]"
            />

            {/* Headings — Group 18: 474x100 */}
            <div className="flex w-full flex-col items-center gap-3">
              <h1
                id="register-heading"
                className="w-full text-center text-[36px] font-extrabold leading-[43.57px] tracking-[-1.08px] text-white"
              >
                Create your free account
              </h1>
              <p className="w-full text-center text-[14px] font-normal leading-[22.4px] text-[#DEDEE5]">
                Access the world&apos;s most iconic voices in studio quality,
                The industry standard for high-fidelity celebrity voice clones.
              </p>
            </div>

            {/* Frame 88: vertical, gap 24 */}
            <RegisterForm />

            {/* Footer — 236x19, #EFEFF7, 16px SemiBold, center */}
            <p className="text-center text-[16px] font-semibold leading-[19px] text-[#EFEFF7]">
              Already have an account?{' '}
              <a href="/login" className="text-[#EFEFF7] hover:underline">
                Log in
              </a>
            </p>
          </div>
        </section>

        <DecorativePanel />
      </div>
    </main>
  );
}
