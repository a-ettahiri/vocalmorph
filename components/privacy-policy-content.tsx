/* Figma 410:1608 — 775x5072.4, gap 50.4, plugin 1.3.0. Icons byte-identical via <img>. */
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

const LIST_MEDIUM = {
  fontSize: '1.35rem',
  fontWeight: 500,
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

export default function PrivacyPolicyContent() {
  return (
    <div className="flex w-[48.4375rem] flex-col gap-[3.15rem]">
      {/* Frame 52 */}
      <div className="flex flex-col gap-[1.8rem]">
        <h1 style={H1}>Privacy Policy</h1>
        <p style={SUB}>
          At VocalMask we respect your privacy and are committed to protecting your
          personal data. This policy explains how we handle your information when you
          use our AI-powered personalized children&apos;s song generation services.
        </p>
        <div className="flex items-center gap-[0.45rem]">
          <img
            src="/figma/privacy-policy-clock.svg"
            alt=""
            width={18}
            height={18}
            className="h-[1.125rem] w-[1.125rem] flex-none"
          />
          <p style={META}>Last updated:&nbsp;April 30, 2026</p>
        </div>
      </div>

      {/* Frame 56 — Introduction */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/privacy-policy-icon-a.svg" title="Introduction" />
        <p style={BODY}>
          Welcome to VocalMask (vocalmask.com). We are committed to protecting your
          privacy and ensuring the security of your personal information. This privacy
          policy explains how we collect, use, store, and protect your data when you use
          our AI-powered personalized children&apos;s song generation services.
        </p>
        <p style={BODY}>
          By using our services, you agree to the collection and use of information in
          accordance with this policy. We will only use your information as described in
          this Privacy Policy.
        </p>
      </div>

      {/* Frame 57 — Information we collect */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-b.svg"
          title="Information we collect"
        />
        <p style={BODY}>
          We collect different types of information to provide and improve our services
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Personal information</h3>
          <p style={LIST}>
            {'Name and email address (for account creation via Clerk)\nPayment information (processed securely by Stripe)\nProfile information and preferences'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Content data</h3>
          <p style={LIST}>
            {"Children's information you provide for song personalization\nGenerated songs and lyrics\nCustom prompts and song preferences\nSong likes and interaction data"}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Usage data</h3>
          <p style={LIST}>
            {'Device information and browser data\nUsage patterns and feature interactions\nIP addresses and location data\nCredits usage and purchase history'}
          </p>
        </div>
      </div>

      {/* Frame 58 — How we use your information */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-a.svg"
          title="How we use your information"
        />
        <p style={BODY}>We use your information for the following purposes</p>
        <div className="flex flex-col gap-[1.35rem] py-[0.45rem]">
          <p style={LIST}>
            {"Service Provision:\u00a0To generate personalized children's songs, process your requests, and deliver high-quality musical content\nAccount Management:\u00a0To create and manage your account, handle authentication, and track your credits\nPayment Processing:\u00a0To handle payments, prevent fraud, and manage billing for credits\nCommunication:\u00a0To send service updates, respond to support requests, and provide customer assistance\nService Improvement:\u00a0To analyze usage patterns, improve our AI models, and enhance user experience"}
          </p>
        </div>
      </div>

      {/* Frame 60 — Data Security & Storage */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-b.svg"
          title="Data Security & Storage"
        />
        <p style={BODY}>
          Your data security is our top priority. We implement comprehensive security
          measures
        </p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Security measures</h3>
          <p style={LIST}>
            {'SSL/TLS encryption for all data transfer\nSecure cloud storage with encryption\nRegular security audits and updates\nAccess controls and authentication'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Data retention</h3>
          <p style={LIST}>
            {'Songs stored permanently for your access\nGenerated content available in your library\nAccount data retained while active\nSecure deletion upon request'}
          </p>
        </div>
      </div>

      {/* Frame 61 — Your privacy rights */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-a.svg"
          title="Your privacy rights"
        />
        <p style={BODY}>You have the following rights regarding your personal data</p>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Access & Control</h3>
          <p style={LIST}>
            {'Access your personal data\nCorrect inaccurate information\nDelete your account and data\nExport your data'}
          </p>
        </div>
        <div className="flex flex-col gap-[1.35rem] pl-[0.9rem]">
          <h3 style={SUBTITLE}>Processing rights</h3>
          <p style={LIST}>
            {'Restrict data processing\nObject to data processing\nWithdraw consent anytime\nLodge complaints with authorities'}
          </p>
        </div>
        <p style={BODY} className="pl-[0.9rem]">
          To exercise these rights, contact us at support@vocalmask.com
        </p>
      </div>

      {/* Frame 62 — Third-Party services */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-b.svg"
          title="Third-Party services"
        />
        <p style={BODY}>
          We work with trusted third-party services to provide our platform
        </p>
        <div className="flex flex-col gap-[1.35rem] py-[0.45rem]">
          <p style={LIST}>
            {'Payment Processing:\u00a0We use Stripe for secure payment processing. They handle all payment data according to PCI DSS standards.\nCloud Services:\u00a0We use Cloudinary for secure media storage and processing of songs and cover images.\nAuthentication:\u00a0We use Clerk for secure user authentication and account management.\nAI Services:\u00a0We use Replicate API and SunoAPI for AI-powered song generation and processing.'}
          </p>
        </div>
      </div>

      {/* Frame 63 — Children's Privacy */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead
          icon="/figma/privacy-policy-icon-a.svg"
          title="Children's Privacy"
        />
        <p style={BODY}>
          Our service creates personalized songs for children, but is designed for use
          by adults (parents/guardians)
        </p>
        <div className="flex flex-col gap-[1.35rem] py-[0.45rem]">
          <p style={LIST_MEDIUM}>
            {"We do not knowingly collect data directly from children under 13\nParents/guardians must provide any information about children\nChildren's information is used solely for song personalization\nWe do not share children's information with third parties for marketing\nParents can request deletion of their children's information at any time"}
          </p>
        </div>
      </div>

      {/* Frame 64 — Policy updates */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/privacy-policy-icon-b.svg" title="Policy updates" />
        <p style={BODY}>
          We may update this Privacy Policy to reflect changes in our practices or
          legal requirements
        </p>
        <div className="flex flex-col gap-[1.35rem] py-[0.45rem]">
          <p style={LIST_MEDIUM}>
            {'We will notify you of material changes via email or website notice\nUpdated policies take effect 30 days after notification\nContinued use of our service constitutes acceptance\nPrevious versions are archived for reference'}
          </p>
        </div>
      </div>

      {/* Frame 66 — Contact us */}
      <div className="flex flex-col gap-[1.35rem]">
        <SectionHead icon="/figma/privacy-policy-icon-a.svg" title="Contact us" />
        <p style={BODY}>
          If you have any questions about this Privacy Policy or our data practices,
          please contact us. Visit the Support page.
        </p>
      </div>
    </div>
  );
}
