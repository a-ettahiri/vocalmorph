import type { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Welcome back',
  description:
    'Log in to access iconic voices in studio quality.',
};

/** Right decorative panel — fixed 50vw x 100vh, never scrolls with the form. */
function DecorativePanel() {
  return (
    <aside
      aria-hidden="true"
      className="fixed right-0 top-0 hidden h-screen w-[50vw] flex-none items-center justify-center overflow-hidden bg-[#1A1922] min-[1420px]:flex"
    >
      <img
        src="/figma/group-19.svg"
        alt=""
        width={710}
        height={850}
        className="h-full w-full object-cover"
      />
    </aside>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full bg-[#07070D] text-white [color-scheme:dark] min-[1420px]:h-screen min-[1420px]:overflow-hidden">
      {/* Left — independently scrollable column (50vw on desktop). */}
      <div className="flex min-h-screen w-full min-w-0 flex-1 min-[1420px]:h-screen min-[1420px]:w-[50vw] min-[1420px]:flex-none min-[1420px]:overflow-y-auto">
        {/* Center — login form INSTANCE, 474px wide, centered both axes in the 50vw column. */}
        <section
          aria-labelledby="login-heading"
          className="m-auto flex w-full justify-center px-6 py-14 sm:px-10"
        >
          {/* Centered via parent justify-center + mx-auto so zoom-out
              keeps it centered instead of drifting left. */}
          <div className="mx-auto flex w-full max-w-[29.625rem] flex-col items-center justify-center gap-12">
            <img
              src="/figma/login-logo.svg"
              alt=""
              width={45}
              height={44}
              className="h-11 w-[2.8125rem]"
            />

            {/* Heading — 474x44, no subtitle on this screen */}
            <h1
              id="login-heading"
              className="w-full text-center text-[2.25rem] font-extrabold leading-[2.7rem] tracking-[-0.0675rem] text-[#F0F0F7]"
            >
              Welcome back
            </h1>

            {/* Frame 88: vertical, gap 24 */}
            <LoginForm />
          </div>
        </section>
      </div>

      <DecorativePanel />
    </main>
  );
}
