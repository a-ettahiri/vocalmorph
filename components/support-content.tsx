/* Figma 491:734 — 775x1272.2, gap 50.4, plugin ground truth saas_app_20261016-124120.zip. Icons byte-identical via <img>. */
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

const BODY = {
  fontSize: '21.6px',
  fontWeight: 400,
  lineHeight: '32.4px',
  letterSpacing: '-0.432px',
  color: '#DFDFE5',
} as const;

/* Figma 491:745 override style 2 — email address segment is bold #F0F0F7. */
const EMAIL_BOLD = {
  fontSize: '21.6px',
  fontWeight: 700,
  lineHeight: '32.4px',
  letterSpacing: '-0.432px',
  color: '#F0F0F7',
} as const;

const LABEL = {
  fontSize: '20px',
  fontWeight: 300,
  lineHeight: '30px',
  letterSpacing: '-0.4px',
  color: '#DFDFE5',
} as const;

const SEND = {
  fontSize: '22px',
  fontWeight: 700,
  lineHeight: '26.4px',
  letterSpacing: '-0.44px',
  color: '#07070D',
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

/* Per-field label/box gap verbatim from Figma: Full name (493:823) gap 4, Email/Subject/Message gap 8. */
function Field({
  label,
  boxHeight,
  gap,
}: {
  label: string;
  boxHeight: number;
  gap: number;
}) {
  return (
    <div
      className="flex w-[662px] flex-col"
      style={{ gap: `${gap}px` }}
    >
      <p style={LABEL}>{label}</p>
      <div
        aria-hidden="true"
        style={{ height: `${boxHeight}px` }}
        className="w-[662px] rounded-[12px] bg-[#1A1A23] px-[16px] py-[12px]"
      />
    </div>
  );
}

export default function SupportContent() {
  return (
    <div className="flex w-[775px] flex-col gap-[50.4px]">
      {/* Frame 52 */}
      <div className="flex flex-col gap-[28.8px]">
        <h1 style={H1}>How Can We Help</h1>
        <p style={SUB}>
          We&apos;re here to assist you with any questions about VocalMask.
          Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Frame 61 — Email support */}
      <div className="flex flex-col gap-[21.6px]">
        <SectionHead icon="/figma/support-icon-a.svg" title="Email support" />
        <p style={BODY}>
          For questions, concerns, or disputes regarding these
          terms,&nbsp;We typically respond within 24 hours
        </p>
        <p>
          <span style={BODY}>Contact us at </span>
          <span style={EMAIL_BOLD}>support@vocalmask.com</span>
        </p>
      </div>

      {/* Frame 79 — Send us a message + form */}
      <div className="flex flex-col gap-[50px]">
        <div className="flex flex-col gap-[21.6px]">
          <SectionHead
            icon="/figma/support-icon-b.svg"
            title="Send us a message"
          />
          <p style={BODY}>
            Fill out the form below and we&apos;ll get back to you shortly
          </p>
        </div>

        {/* Frame 80 — form 662x683 gap 24 */}
        <div className="flex w-[662px] flex-col gap-[24px]">
          <div className="flex w-[662px] flex-col">
            <Field label="Full name" boxHeight={63} gap={4} />
            <Field label="Email" boxHeight={63} gap={8} />
            <Field label="Subject" boxHeight={63} gap={8} />
            <Field label="Message" boxHeight={217} gap={8} />
          </div>

          {/* Frame 35 — Send button 662x57 */}
          <div className="flex h-[57px] w-[662px] items-center justify-center gap-[16px] rounded-[89.1px] bg-[#F0F0F7] px-[43.2px] py-[20px]">
            <p style={SEND}>Send</p>
          </div>
        </div>
      </div>
    </div>
  );
}
