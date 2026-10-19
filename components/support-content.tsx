/* Figma 491:734 — 775x1272.2, gap 50.4, plugin ground truth saas_app_20261016-124120.zip. Icons byte-identical via <img>. */
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

const BODY = {
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: '2.025rem',
  letterSpacing: '-0.027rem',
  color: '#DFDFE5',
} as const;

/* Figma 491:745 override style 2 — email address segment is bold #F0F0F7. */
const EMAIL_BOLD = {
  fontSize: '1.35rem',
  fontWeight: 700,
  lineHeight: '2.025rem',
  letterSpacing: '-0.027rem',
  color: '#F0F0F7',
} as const;

const LABEL = {
  fontSize: '1.25rem',
  fontWeight: 300,
  lineHeight: '1.875rem',
  letterSpacing: '-0.025rem',
  color: '#DFDFE5',
} as const;

const SEND = {
  fontSize: '1.375rem',
  fontWeight: 700,
  lineHeight: '1.65rem',
  letterSpacing: '-0.0275rem',
  color: '#07070D',
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
      className="flex w-[41.375rem] flex-col"
      style={{ gap: `${gap}px` }}
    >
      <p style={LABEL}>{label}</p>
      <div
        aria-hidden="true"
        style={{ height: `${boxHeight}px` }}
        className="w-[41.375rem] rounded-[0.75rem] bg-[#1A1A23] px-[1rem] py-[0.75rem]"
      />
    </div>
  );
}

export default function SupportContent() {
  return (
    <div className="flex w-[48.4375rem] flex-col gap-[3.15rem]">
      {/* Frame 52 */}
      <div className="flex flex-col gap-[1.8rem]">
        <h1 style={H1}>How Can We Help</h1>
        <p style={SUB}>
          We&apos;re here to assist you with any questions about VocalMask.
          Send us a message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      {/* Frame 61 — Email support */}
      <div className="flex flex-col gap-[1.35rem]">
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
      <div className="flex flex-col gap-[3.125rem]">
        <div className="flex flex-col gap-[1.35rem]">
          <SectionHead
            icon="/figma/support-icon-b.svg"
            title="Send us a message"
          />
          <p style={BODY}>
            Fill out the form below and we&apos;ll get back to you shortly
          </p>
        </div>

        {/* Frame 80 — form 662x683 gap 24 */}
        <div className="flex w-[41.375rem] flex-col gap-[1.5rem]">
          <div className="flex w-[41.375rem] flex-col">
            <Field label="Full name" boxHeight={63} gap={4} />
            <Field label="Email" boxHeight={63} gap={8} />
            <Field label="Subject" boxHeight={63} gap={8} />
            <Field label="Message" boxHeight={217} gap={8} />
          </div>

          {/* Frame 35 — Send button 662x57 */}
          <div className="flex h-[3.5625rem] w-[41.375rem] items-center justify-center gap-[1rem] rounded-[5.56875rem] bg-[#F0F0F7] px-[2.7rem] py-[1.25rem]">
            <p style={SEND}>Send</p>
          </div>
        </div>
      </div>
    </div>
  );
}
