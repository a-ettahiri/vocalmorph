import type { Metadata } from 'next';
import AppSidebar from '@/components/app-sidebar';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How VocalMask uses cookies to deliver personalized experiences and improve AI-powered song generation.',
};

/** Visual-check route for the shared sidebar (Frame 46).
 *  Right column is a lightweight stub of the real 775px content —
 *  full 4564px transcription is a follow-up task. */
export default function CookiesPolicyPage() {
  return (
    <main className="flex min-h-screen w-full bg-[#07070D] px-[3rem] text-white [color-scheme:dark]">
      <div className="sticky top-0 h-screen flex-none">
        <AppSidebar />
      </div>

      {/* Right column — navbar stub + content stub */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* navbar stub (453:3469, bg #07070D) */}
        <header className="flex h-[6.1875rem] flex-none items-center justify-end pr-10">
          <div className="flex items-center gap-2">
            <span className="text-[2rem] font-semibold text-white">12</span>
            <span className="text-[1.625rem] text-white">Credit</span>
          </div>
        </header>

        {/* Content stub — 775px article, real Figma copy */}
        <article className="w-full max-w-[48.4375rem] px-10 pb-24">
          <h1 className="text-[2.25rem] font-extrabold leading-[3.25rem] tracking-[-0.0675rem] text-white">
            Privacy Policy
          </h1>
          <p className="mt-6 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
            At VocalMask we respect your privacy and are committed to
            protecting your personal data. This policy explains how we handle
            your information when you use our AI-powered personalized
            children&apos;s song generation services.
          </p>
          <p className="mt-6 text-[0.875rem] text-[#B3B3BD]">
            Last updated: April 30, 2026
          </p>

          <section className="mt-12">
            <h2 className="text-[1.5rem] font-bold text-white">
              What are cookies
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              Welcome to VocalMask (vocalmask.com). We are committed to
              protecting your privacy and ensuring the security of your
              personal information. This privacy policy explains how we
              collect, use, store, and protect your data when you use our
              AI-powered personalized children&apos;s song generation
              services.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.5rem] font-bold text-white">
              Why we use cookies
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              At VocalMask, cookies help us deliver personalized experiences,
              maintain your session security, and continuously improve our
              AI-powered song generation services based on user interactions.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.5rem] font-bold text-white">
              Types of Cookies We Use
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              We use different types of cookies to provide and improve our
              services.
            </p>
            <h3 className="mt-6 text-[1.125rem] font-semibold text-white">
              Essential cookies
            </h3>
            <p className="mt-2 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              User authentication and session management, security and fraud
              prevention, basic site navigation and functionality, load
              balancing and performance.
            </p>
            <h3 className="mt-6 text-[1.125rem] font-semibold text-white">
              Analytics cookies
            </h3>
            <p className="mt-2 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              Usage patterns and popular features, performance monitoring and
              optimization, error tracking and bug identification, service
              improvement insights.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-[1.5rem] font-bold text-white">
              Contact us about cookies
            </h2>
            <p className="mt-4 text-[1rem] leading-[1.5rem] text-[#DEDEE5]">
              If you have questions about our cookie usage, contact us at
              support@vocalmask.com. We respond to cookie-related inquiries
              within 24 hours.
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
