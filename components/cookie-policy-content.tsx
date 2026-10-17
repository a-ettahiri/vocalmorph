/* Figma 465:3819 — 775x4564.6, gap 50.4, plugin 1.3.0. Icons byte-identical via <img>. */
/* eslint-disable @next/next/no-img-element */

const H1 = {
  fontSize: '43.2px',
  fontWeight: 700,
  lineHeight: '51.84px',
  letterSpacing: '-0.864px',
  color: '#F0F0F7',
} as const;

const SUB = {
  fontSize: '21.6px',
  fontWeight: 400,
  lineHeight: '32.4px',
  letterSpacing: '-0.432px',
  color: '#DFDFE5',
} as const;

const TITLE = {
  fontSize: '28.8px',
  fontWeight: 600,
  lineHeight: '34.56px',
  letterSpacing: '-0.576px',
  color: '#F0F0F7',
} as const;

const SUBTITLE = {
  fontSize: '28.8px',
  fontWeight: 500,
  lineHeight: '34.56px',
  letterSpacing: '-0.576px',
  color: '#DFDFE5',
} as const;

const BODY = {
  fontSize: '21.6px',
  fontWeight: 400,
  lineHeight: '32.4px',
  letterSpacing: '-0.432px',
  color: '#DFDFE5',
} as const;

const LIST = {
  fontSize: '21.6px',
  fontWeight: 400,
  lineHeight: '38.88px',
  letterSpacing: '-0.432px',
  color: '#FFFFFF',
  whiteSpace: 'pre-line' as const,
};

const META = {
  fontSize: '18px',
  fontWeight: 500,
  lineHeight: '21.6px',
  letterSpacing: '-0.36px',
  color: '#9E9EA8',
} as const;

function SectionHead({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-[14.4px]">
      <img
        src={icon}
        alt=""
        width={50.4}
        height={50.4}
        className="h-[50.4px] w-[50.4px] flex-none rounded-[14.4px]"
      />
      <h2 style={TITLE}>{title}</h2>
    </div>
  );
}

export default function CookiePolicyContent() {
  return (
    <div className="flex w-[775px] flex-col gap-[50.4px]">
      {/* Frame 52 */}
      <div className="flex flex-col gap-[28.8px]">
        <h1 style={H1}>Cookie Policy</h1>
        <p style={SUB}>
          Learn how VocalMask uses cookies to enhance your experience and improve our
          AI-powered personalized children&apos;s song generation services while respecting
          your privacy.
        </p>
        <div className="flex items-center gap-[7.2px]">
          <img
            src="/figma/cookie-policy-clock.svg"
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] flex-none"
          />
          <p style={META}>Last updated:&nbsp;April 30, 2026</p>
        </div>
      </div>

      {/* Frame 56 + nested Frame 58 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead icon="/figma/cookie-policy-icon-a.svg" title="What are cookies" />
        <p style={BODY}>
          Cookies are small text files that are stored on your computer or mobile device
          when you visit a website. They help websites remember your preferences, improve
          functionality, and provide a better user experience.
        </p>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Why we use cookies</h3>
          <p style={LIST}>
            At VocalMask, cookies help us deliver personalized experiences, maintain your
            session security, and continuously improve our AI-powered song generation
            services based on user interactions.
          </p>
        </div>
      </div>

      {/* Frame 57 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-b.svg"
          title="Types of Cookies We Use"
        />
        <p style={BODY}>We use different types of cookies to provide and improve our services</p>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Essential cookies</h3>
          <p style={LIST}>
            {'User authentication and session management\nSecurity and fraud prevention\nBasic site navigation and functionality\nLoad balancing and performance'}
          </p>
        </div>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Analytics cookies</h3>
          <p style={LIST}>
            {'Usage patterns and popular features\nPerformance monitoring and optimization\nError tracking and bug identification\nService improvement insights'}
          </p>
        </div>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Functional cookies</h3>
          <p style={LIST}>
            {'Song generation preferences\nCredit balance tracking\nLanguage and display settings\nCustomized interface elements'}
          </p>
        </div>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Marketing cookies</h3>
          <p style={LIST}>
            {'Personalized content recommendations\nSocial media integration features\nNewsletter and update preferences\nAdvertising campaign tracking'}
          </p>
        </div>
      </div>

      {/* Frame 58 — Specific */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-a.svg"
          title="Specific cookies we use"
        />
        <p style={BODY}>Here are the specific cookies used on VocalMask</p>
        <div className="flex flex-col gap-[21.6px] py-[7.2px]">
          <p style={LIST}>
            {'__session: Maintains login session and user authentication\n__preferences: Stores song creation preferences and settings\n__analytics: Tracks usage patterns for service improvement\n__credits: Tracks credit balance and usage\n__marketing: Delivers personalized content and recommendations'}
          </p>
        </div>
      </div>

      {/* Frame 62 — Third-Party */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead icon="/figma/cookie-policy-icon-b.svg" title="Third-Party cookies" />
        <p style={BODY}>
          We work with trusted partners who may set cookies to provide additional
          functionality
        </p>
        <div className="flex flex-col gap-[21.6px] py-[7.2px]">
          <p style={LIST}>
            {'Google Analytics:\u00a0Helps us understand user behavior and improve our AI services.\nStripe Payment Processing:\u00a0Securely handles payment transactions and fraud prevention.\nClerk Authentication:\u00a0Manages secure user authentication and account services.'}
          </p>
        </div>
      </div>

      {/* Frame 67 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-a.svg"
          title="How cookies improve your experience"
        />
        <p style={BODY}>
          Cookies enable us to provide a more personalized and efficient service
        </p>
        <div className="flex flex-col gap-[21.6px] py-[7.2px]">
          <p style={LIST}>
            {'Personalization:\u00a0Remember your song preferences and frequently used settings\nPerformance:\u00a0Optimize loading times and enhance AI processing efficiency\nSecurity:\u00a0Maintain secure sessions and protect against unauthorized access'}
          </p>
        </div>
      </div>

      {/* Frame 60 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-b.svg"
          title="Cookie Consent & Preferences"
        />
        <p style={BODY}>We respect your choices regarding cookie usage</p>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Your choices</h3>
          <p style={LIST}>
            {'Accept or decline non-essential cookies\nModify cookie preferences anytime\nClear existing cookies from your device\nOpt-out of marketing cookies'}
          </p>
        </div>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Managing preferences</h3>
          <p style={LIST}>
            {'You can update your cookie preferences at any time through your browser settings or by contacting our support team at\u00a0support@vocalmask.com'}
          </p>
        </div>
      </div>

      {/* Frame 68 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-a.svg"
          title="Cookie Retention & Updates"
        />
        <p style={BODY}>Information about cookie duration and policy updates</p>
        <div className="flex flex-col gap-[21.6px] py-[7.2px]">
          <p style={LIST}>
            {'Session Cookies:\u00a0Automatically deleted when you close your browser\nPersistent Cookies:\u00a0Remain until expiration date or manual deletion\nPolicy Updates:\u00a0We may update this Cookie Policy to reflect changes in technology or regulations. Material changes will be communicated through email notifications and website banners.'}
          </p>
        </div>
      </div>

      {/* Frame 61 */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead
          icon="/figma/cookie-policy-icon-b.svg"
          title="Contact us about cookies"
        />
        <p style={BODY}>
          If you have questions about our cookie usage or need assistance managing your
          preferences
        </p>
        <div className="flex flex-col gap-[21.6px] pl-[14.4px]">
          <h3 style={SUBTITLE}>Response time</h3>
          <p style={LIST}>
            {'We respond to cookie-related inquiries within\u00a024 hours\u00a0and provide step-by-step guidance for managing your preferences across different devices and browsers.'}
          </p>
        </div>
        <p style={BODY} className="pl-[14.4px]">
          To exercise these rights, contact us at support@vocalmask.com
        </p>
      </div>
    </div>
  );
}
