import type { Metadata } from 'next';
import RegisterForm from './register-form';

export const metadata: Metadata = {
  title: 'Create your free account',
  description:
    'Create a free account to access iconic voices in studio quality.',
};

/** Right video placeholder — fixed 50vw x 100vh, never scrolls with the form. */
function DecorativePanel() {
  return (
    <aside
      aria-hidden="true"
      className="fixed right-0 top-0 hidden h-screen w-[50vw] flex-none items-center justify-center overflow-hidden bg-[#1A1922] min-[1420px]:flex"
    >
      <img
        src="/figma/group-20.svg"
        alt=""
        width={710}
        height={850}
        className="h-full w-full object-cover"
      />
    </aside>
  );
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full bg-[#07070D] text-white [color-scheme:dark] min-[1420px]:h-screen min-[1420px]:overflow-hidden">
      {/* Left — independently scrollable column (50vw on desktop). */}
      <div className="flex min-h-screen w-full min-w-0 flex-1 min-[1420px]:h-screen min-[1420px]:w-[50vw] min-[1420px]:flex-none min-[1420px]:overflow-y-auto">
        {/* Center — registration form INSTANCE, 474x571, centered both axes in the 50vw column. */}
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
              <a href="/login" className="text-[#EFEFF7] hover:underline">
                Log in
              </a>
            </p>
          </div>
        </section>
      </div>

      <DecorativePanel />
    </main>
  );
}
