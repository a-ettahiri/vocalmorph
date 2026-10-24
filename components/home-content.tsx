/* Figma 547:3636 — Frame 123, 898x1445. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
const GREETING = {
  fontSize: '2.7rem', // 43.2px
  fontWeight: 500,
  lineHeight: '3.24rem', // 51.84px
  letterSpacing: '-0.108rem', // -1.728px
  color: '#F0F0F7',
} as const;
const BTN_TEXT = {
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#07070D',
} as const;
const SECTION_TITLE = {
  fontSize: '1.8rem', // 28.8px
  fontWeight: 600,
  lineHeight: '2.16rem', // 34.56px
  letterSpacing: '-0.036rem', // -0.576px
  color: '#F0F0F7',
} as const;
const CARD_NAME = {
  fontSize: '1rem', // 16px
  fontWeight: 500,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.04rem', // -0.64px
  color: '#F0F0F7',
} as const;
const CARD_ROLE = {
  fontSize: '0.875rem', // 14px
  fontWeight: 400,
  lineHeight: '1.05rem', // 16.8px
  letterSpacing: '-0.035rem', // -0.56px
  color: '#C9C9D1',
} as const;
const CTA_TITLE = {
  fontSize: '2rem', // 32px
  fontWeight: 700,
  lineHeight: '2.4rem', // 38.4px
  letterSpacing: '-0.08rem', // -1.28px
  color: '#FFFFFF',
} as const;
const CTA_SUB = {
  fontSize: '1rem', // 16px
  fontWeight: 500,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.03rem', // -0.48px
  color: '#FFFFFF',
} as const;

/* Frame 121 + Rectangle 73 gradient: stops 0.043269 → rgba(51,51,51,0),
   0.802885 → #07070D, rendered transparent-top → dark-bottom (180deg) per design. */
const FADE_BG =
  'linear-gradient(180deg, rgba(51, 51, 51, 0) 4.33%, #07070D 80.29%)';

/* Rectangle 73 progressive blur: 5 masked backdrop layers, 10px at the
   bottom ramping to 2px at the top (strongest where the tint is opaque). */
const BLUR_LAYERS = [
  { blur: 10, mask: 'linear-gradient(0deg, black 0%, black 14%, transparent 24%)' },
  { blur: 8, mask: 'linear-gradient(0deg, transparent 12%, black 22%, black 34%, transparent 44%)' },
  { blur: 6, mask: 'linear-gradient(0deg, transparent 32%, black 42%, black 54%, transparent 64%)' },
  { blur: 4, mask: 'linear-gradient(0deg, transparent 52%, black 62%, black 74%, transparent 84%)' },
  { blur: 2, mask: 'linear-gradient(0deg, transparent 72%, black 82%, black 100%)' },
] as const;

const CARDS = [
  { name: 'Steve Jobs', role: 'Entrepreneur' },
  { name: 'Donald Trump', role: 'Entrepreneur' },
  { name: 'Taylor swift', role: 'Singer' },
  { name: 'Elon Musk', role: 'Entrepreneur' },
];

function VoiceCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex w-[13rem] flex-col" style={{ gap: '0.375rem' }}>
      <div
        className="h-[17.25rem] w-[13rem] bg-[#202122]"
        style={{ borderRadius: '0.375rem' }}
      />
      <div className="flex w-[13rem] flex-col">
        <p style={CARD_NAME}>{name}</p>
        <p style={CARD_ROLE}>{role}</p>
      </div>
    </div>
  );
}

function CardRow() {
  return (
    <div className="flex flex-row" style={{ gap: '1.25rem' }}>
      {CARDS.map((c) => (
        <VoiceCard key={c.name} name={c.name} role={c.role} />
      ))}
    </div>
  );
}

export default function HomeContent() {
  return (
    <div className="flex w-[56.125rem] flex-col" style={{ gap: '1.25rem' }}>
      {/* Group 26 hero: 892x311 */}
      <div className="flex w-[55.75rem] flex-col">
        <p style={GREETING}>Good evening</p>
        {/* greeting bottom 289 → cards top 309 = 20px */}
        <div className="flex w-[55.75rem] flex-row" style={{ marginTop: '1.25rem', marginLeft: '0.1875rem', gap: '1.1875rem' }}>
          <div
            className="relative bg-[#25252C]"
            style={{ width: '27.25rem', height: '14.9375rem', borderRadius: '2rem' }}
          >
            <div
              className="absolute flex flex-row items-center bg-[#F0F0F7]"
              style={{
                left: '0.75rem',
                bottom: '0.75rem',
                width: '13.95rem',
                height: '2.875rem',
                borderRadius: '5.5688rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                gap: '0.45rem',
              }}
            >
              <span style={BTN_TEXT}>Start Voice Cloning</span>
              <img
                src="/home/arrow-clone.svg"
                alt=""
                width={20}
                height={20}
                className="h-[1.25rem] w-[1.25rem] flex-none"
              />
            </div>
          </div>
          <div
            className="relative bg-[#25252C]"
            style={{ width: '27.125rem', height: '14.9375rem', borderRadius: '2rem' }}
          >
            <div
              className="absolute flex flex-row items-center bg-[#F0F0F7]"
              style={{
                left: '0.75rem',
                bottom: '0.75rem',
                width: '12.8875rem',
                height: '2.875rem',
                borderRadius: '5.5688rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
                gap: '0.45rem',
              }}
            >
              <span style={BTN_TEXT}>Create Voiceover</span>
              <img
                src="/home/arrow-voiceover.svg"
                alt=""
                width={20}
                height={20}
                className="h-[1.25rem] w-[1.25rem] flex-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* popular section: 898x1114, gap 16px */}
      <div className="flex w-[56.125rem] flex-col" style={{ gap: '1rem' }}>
        {/* Frame 51 header: 898x73, content vertically centered */}
        <div className="flex h-[4.5625rem] w-[56.125rem] flex-row items-center" style={{ gap: '0.9rem' }}>
          <img
            src="/home/popular-badge.svg"
            alt=""
            width={51}
            height={51}
            className="h-[3.15rem] w-[3.15rem] flex-none"
          />
          <p className="flex-1" style={SECTION_TITLE}>
            Popular
          </p>
        </div>

        {/* Group 25 overlap: 898x1025 — grid + banner + CTA */}
        <div className="relative w-[56.125rem]" style={{ height: '64.0625rem' }}>
          {/* Frame 121 grid: 891x1001, offset x+3px, gap 24px */}
          <div
            className="flex w-[55.6875rem] flex-col"
            style={{ marginLeft: '0.1875rem', gap: '1.5rem', background: FADE_BG }}
          >
            <CardRow />
            <CardRow />
            <CardRow />
          </div>
          {/* Rectangle 73 banner: 898x478.67, offset top 546px.
              Progressive blur (2→10px bottom→top) + progressive tint. */}
          <div
            className="absolute left-0 w-[56.125rem]"
            style={{ top: '34.125rem', height: '29.9169rem' }}
          >
            {BLUR_LAYERS.map((l) => (
              <div
                key={l.blur}
                className="absolute inset-0"
                style={{
                  backdropFilter: `blur(${l.blur}px)`,
                  WebkitBackdropFilter: `blur(${l.blur}px)`,
                  maskImage: l.mask,
                  WebkitMaskImage: l.mask,
                }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{ background: FADE_BG }}
            />
          </div>
          {/* Frame 122 CTA: 698x144, bottom-anchored, centered */}
          <div
            className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center"
            style={{ width: '43.6389rem', gap: '1.25rem' }}
          >
            <p className="text-center" style={CTA_TITLE}>
              Access all 282 voices.
            </p>
            <p className="text-center" style={CTA_SUB}>
              Explore our full library of high-fidelity voices and find the
              perfect personality for your next project.
            </p>
            <div
              className="flex flex-row items-center justify-center bg-[#F0F0F7]"
              style={{
                width: '11.7rem',
                height: '2.875rem',
                borderRadius: '5.5688rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
              }}
            >
              <span style={BTN_TEXT}>Go to Library</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
