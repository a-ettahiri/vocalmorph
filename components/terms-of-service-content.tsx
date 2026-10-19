/* Figma 468:4107 — 775x6434.8, gap 50.4, plugin 1.3.0. Icons byte-identical via <img>. */
/* eslint-disable @next/next/no-img-element */

const H1 = {
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '3.24rem',
  letterSpacing: '-0.054rem',
  color: '#F0F0F7',
} as const;

const SUB = {
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: '2.025rem',
  letterSpacing: '-0.027rem',
  color: '#DFDFE5',
} as const;

const TITLE = {
  fontSize: '1.8rem',
  fontWeight: 600,
  lineHeight: '2.16rem',
  letterSpacing: '-0.036rem',
  color: '#F0F0F7',
} as const;

const SUBTITLE = {
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: '2.16rem',
  letterSpacing: '-0.036rem',
  color: '#DFDFE5',
} as const;

const BODY = {
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: '2.025rem',
  letterSpacing: '-0.027rem',
  color: '#DFDFE5',
} as const;

const LIST = {
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: '2.43rem',
  letterSpacing: '-0.027rem',
  color: '#FFFFFF',
  whiteSpace: 'pre-line' as const,
};

const META = {
  fontSize: '1.125rem',
  fontWeight: 500,
  lineHeight: '1.35rem',
  letterSpacing: '-0.0225rem',
  color: '#9E9EA8',
} as const;

function SectionHead({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-[0.9rem]">
      <img
        src={icon}
        alt=""
        width={50.4}
        height={50.4}
        className="h-[3.15rem] w-[3.15rem] flex-none rounded-[0.9rem]"
      />
      <h2 style={TITLE}>{title}</h2>
    </div>
  );
}

export default function TermsOfServiceContent() {
  return (
    <div className="flex w-[48.4375rem] flex-col gap-[3.15rem]">
      {/* Frame 52 */}
      <div className="flex flex-col gap-[1.8rem]">
        <h1 style={H1}>Terms of Service</h1>
        <p style={SUB}>
          Please read these terms carefully before using VocalMask. By accessing
          our AI-powered personalized children&apos;s song generation services,
          you agree to be bound by these terms.
        </p>
        <div className="flex items-center gap-[0.45rem]">
          <img
            src="/figma/terms-of-service-clock.svg"
            alt=""
            width={18}
            height={18}
            className="h-[1.125rem] w-[1.125rem] flex-none"
          />
          <p style={META}>Last updated:&nbsp;April 30, 2026</p>
        </div>
      </div>

      {/* Frame 56 — Agreement to Terms */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="Agreement to Terms" />
        <p style={BODY}>
          By accessing and using VocalMask (vocalmask.com), you accept and agree
          to be bound by the terms and conditions of this agreement. If you do
          not agree to abide by these terms, please do not use this service.
          {'\n'}These terms constitute a legally binding agreement between you
          and VocalMask. We reserve the right to modify these terms at any time,
          and such modifications will be effective immediately upon posting.
        </p>
      </div>

      {/* Frame 69 — Service description */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-b.svg" title="Service description" />
        <p style={BODY}>
          VocalMask provides AI-powered personalized children&apos;s song
          generation services, including
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Standard mode</h3>
          <p style={LIST}>
            {'Quick 3-step song creation\nBasic personalization options\n1 credit per song\nDual-version generation'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Premium mode</h3>
          <p style={LIST}>
            {'Advanced 6-step wizard\nDetailed personalization\nCustom lyrics editing\n3 credits per song'}
          </p>
        </div>
      </div>

      {/* Frame 57 — User Accounts & Eligibility */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="User Accounts & Eligibility" />
        <p style={BODY}>
          To access our services, you must create an account and meet the
          following requirements
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Account requirements</h3>
          <p style={LIST}>
            {'Age Requirement:\u00a0You must be at least 18 years old or have parental consent\nAccurate Information:\u00a0Provide truthful and complete registration information\nAccount Security:\u00a0Maintain the confidentiality of your login credentials\nAccount Responsibility:\u00a0You are responsible for all activities under your account'}
          </p>
        </div>
      </div>

      {/* Frame 70 — Payment Terms & Credits */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-b.svg" title="Payment Terms & Credits" />
        <p style={BODY}>
          Our services operate on a credit-based system with the following terms
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Credit system</h3>
          <p style={LIST}>
            {'Premium mode: 3 credits per song\nNew users receive 3 free credits\nFirst regeneration is free\nAdditional lyrics regenerations: 1 credit each'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Payment terms</h3>
          <p style={LIST}>
            {'All payments processed securely through Stripe\nPrices subject to change with 30 days notice\nAll sales are final unless otherwise stated\nCredits do not expire'}
          </p>
        </div>
      </div>

      {/* Frame 71 — Intellectual Property & Usage rights */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="Intellectual Property & Usage rights" />
        <p style={BODY}>Understanding ownership and usage rights</p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Your rights</h3>
          <p style={LIST}>
            {'You retain ownership of input information\nFull rights to generated songs\nCommercial use of your songs allowed\nNo restrictions on sharing or distribution'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Our rights</h3>
          <p style={LIST}>
            {'License to process your information\nAI technology remains our property\nRight to improve our algorithms\nService features and methods protected'}
          </p>
        </div>
      </div>

      {/* Frame 72 — Acceptable Use Policy */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-b.svg" title="Acceptable Use Policy" />
        <p style={BODY}>
          Users agree to use our services responsibly and lawfully
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Prohibited activities</h3>
          <p style={LIST}>
            {'Creating inappropriate content for children\nViolating intellectual property rights of others\nAttempting to reverse engineer our AI technology\nUsing the service for bulk commercial processing without authorization\nCreating deceptive or harmful content\nViolating any applicable laws or regulations'}
          </p>
        </div>
        <p style={BODY}>
          Violations may result in immediate account suspension or termination.
        </p>
      </div>

      {/* Frame 73 — Privacy & Data handling */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="Privacy & Data handling" />
        <p style={BODY}>
          Your privacy is important to us. Here&apos;s how we handle your data
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <p style={LIST}>
            {"Data Collection:\u00a0We collect only necessary information to provide our services\nData Protection:\u00a0Industry-standard security measures protect your information\nChildren's Privacy:\u00a0We do not collect data directly from children under 13"}
          </p>
        </div>
        <p style={BODY}>
          For complete details, please review our&nbsp;Privacy Policy
        </p>
      </div>

      {/* Frame 74 — Service Availability & Limitations */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-b.svg" title="Service Availability & Limitations" />
        <p style={BODY}>
          Please be aware of the following service limitations
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Service availability</h3>
          <p style={LIST}>
            {'Services provided "as is" without guarantees\nWe may experience occasional downtime for maintenance\nProcessing times may vary based on server load\nSome features may be limited or unavailable in certain regions'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Limitation of liability</h3>
          <p style={BODY}>
            VocalMask shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from your use of the service.
          </p>
        </div>
      </div>

      {/* Frame 62 — Service Modifications & Updates */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="Service Modifications & Updates" />
        <p style={BODY}>
          We reserve the right to modify our services and these terms
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <p style={LIST}>
            {'Service Changes:\u00a0We may add, modify, or discontinue features with reasonable notice to users.\nTerms Updates:\u00a0Material changes to terms will be communicated via email and website notifications.\nPricing Changes:\u00a0Price modifications will include 30 days advance notice to existing users.'}
          </p>
        </div>
      </div>

      {/* Frame 60 — Termination */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-b.svg" title="Termination" />
        <p style={BODY}>Account termination conditions and procedures</p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Grounds for termination</h3>
          <p style={LIST}>
            {'Violation of these terms\nIllegal or harmful activities\nFraudulent payment activities\nAbuse of service or other users'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Upon termination</h3>
          <p style={LIST}>
            {'Immediate loss of service access\nData retained for legal purposes\nUnused credits become void\nOutstanding obligations remain'}
          </p>
        </div>
      </div>

      {/* Frame 61 — Contact & Dispute Resolution */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/terms-of-service-icon-a.svg" title="Contact & Dispute Resolution" />
        <p style={BODY}>
          For questions, concerns, or disputes regarding these terms
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Response commitment</h3>
          <p style={LIST}>
            {'General inquiries: Within 24 hours\nTechnical issues: Within 12 hours\nBilling concerns: Within 6 hours\nLegal matters: Within 48 hours'}
          </p>
        </div>
        <p style={BODY}>Contact us at support@vocalmask.com</p>
        <p style={BODY}>
          These terms are governed by the laws of the jurisdiction where
          VocalMask operates. Any disputes will be resolved through binding
          arbitration.
        </p>
      </div>
    </div>
  );
}
