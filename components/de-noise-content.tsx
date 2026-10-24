/* Figma 633:1429 — Frame 169, 890x1148.46. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
const TITLE = {
  fontSize: '2.7rem', // 43.2px
  fontWeight: 700,
  lineHeight: '3.24rem', // 51.84px
  letterSpacing: '-0.054rem', // -0.864px
  color: '#F0F0F7',
} as const;
const DRAG_TEXT = {
  fontSize: '2.25rem', // 36px
  fontWeight: 900,
  lineHeight: '3.0375rem', // 48.6px
  letterSpacing: '-0.045rem', // -0.72px
  color: '#4B4B62',
} as const;
const SUB_TEXT = {
  fontSize: '1rem', // 16px
  fontWeight: 300,
  lineHeight: '1.5rem', // 24px
  color: '#C9C9D1',
} as const;
const BTN_TEXT_DARK = {
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#07070D',
} as const;
const BTN_TEXT_LIGHT = {
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#F0F0F7',
} as const;
const FEAT_TITLE = {
  fontSize: '1.2014rem', // 19.22px
  fontWeight: 500,
  lineHeight: '1.4416rem', // 23.07px
  letterSpacing: '-0.024rem', // -0.384px
  color: '#F0F0F7',
} as const;
const FEAT_BODY = {
  fontSize: '1.0512rem', // 16.82px
  fontWeight: 300,
  lineHeight: '1.2614rem', // 20.18px
  letterSpacing: '-0.021rem', // -0.336px
  color: '#FFFFFF',
} as const;
const DURATION = {
  fontSize: '1.8rem', // 28.8px
  fontWeight: 500,
  lineHeight: '2.16rem', // 34.56px
  letterSpacing: '-0.072rem', // -1.152px
  color: '#FFFFFF',
  fontFamily: "'JetBrains Mono', monospace",
} as const;

function FeatureCard({ icon, width }: { icon: string; width: string }) {
  return (
    <div className="flex flex-row items-start" style={{ width, gap: '0.6007rem' }}>
      <img
        src={icon}
        alt=""
        width={30}
        height={30}
        className="flex-none"
        style={{ width: '1.892rem', height: '1.892rem' }}
      />
      <div className="flex flex-col" style={{ width: '14.7919rem', gap: '0.6007rem' }}>
        <p style={FEAT_TITLE}>Supported Formats</p>
        <p style={FEAT_BODY}>
          Supports speech, music, and
          <br />
          general audio in MP3, WAV,
          <br />
          or FLAC.
        </p>
      </div>
    </div>
  );
}

/* Audio row: bar byte-identical via plain <img> (public/de-noise/player.svg,
   geometry verified against Figma 629:1182-1226 bar-by-bar); download icon
   is the download-variant (light fill) of the shared 16x18 arrow. */
function HistoryRow({ duration }: { duration: string }) {
  return (
    <div className="flex w-[55.625rem] flex-row items-center" style={{ gap: '2rem' }}>
      <div className="flex w-[37.866875rem] flex-row items-center" style={{ gap: '2rem' }}>
        <img
          src="/de-noise/player.svg"
          alt=""
          width={508}
          height={99}
          className="flex-none"
          style={{ width: '31.741875rem', height: '6.17625rem' }}
        />
        <p className="w-[4.125rem] flex-none" style={DURATION}>
          {duration}
        </p>
      </div>
      <div
        className="flex flex-none items-center justify-center"
        style={{ width: '3rem', height: '3.125rem', borderRadius: '6.1875rem', background: '#1A1A23' }}
      >
        <img
          src="/de-noise/download.svg"
          alt=""
          width={16}
          height={18}
          className="flex-none"
          style={{ width: '1rem', height: '1.125rem' }}
        />
      </div>
    </div>
  );
}

export default function DeNoiseContent() {
  return (
    <div className="flex w-[55.625rem] flex-col" style={{ gap: '3.5rem' }}>
      {/* Frame 168: title + dropzone + features, gap 32 */}
      <div className="flex w-[55.625rem] flex-col" style={{ gap: '2rem' }}>
        <h1 className="w-[55.5625rem]" style={TITLE}>
          De-Noise
        </h1>
        {/* Frame 165 dropzone card: 889x447, pad 56 */}
        <div
          className="flex w-[55.5625rem] items-center justify-center bg-[#1A1A23]"
          style={{ height: '27.9375rem', borderRadius: '1.5rem', padding: '3.5rem' }}
        >
          {/* Frame 167 dashed zone: 777 wide, 4px OUTSIDE #4B4B62 dash 14/gap 10 (Figma measured), pad 32 top/bottom */}
          <div
            style={{
              position: 'relative',
              boxSizing: 'content-box',
              width: '48.5625rem',
              border: '0.25rem solid transparent',
              borderRadius: '1.5rem',
              paddingTop: '2rem',
              paddingBottom: '2rem',
            }}
          >
            {/* Pattern border overlay: rect path, dasharray 14 10, offset 4 aligns top phase */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-0.25rem',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 785 322.38'%3E%3Crect x='2' y='2' width='781' height='318.38' rx='24' fill='none' stroke='%234B4B62' stroke-width='4' stroke-dasharray='14 10' stroke-dashoffset='4'/%3E%3C/svg%3E\")",
                backgroundSize: '100% 100%',
                pointerEvents: 'none',
              }}
            />
            <div className="flex flex-col items-center" style={{ gap: '2.5rem' }}>
              {/* Frame 164 header: icon + drag + sub, pb 12 absorbs Figma slack */}
              <div
                className="flex w-[48.5625rem] flex-col items-center"
                style={{ gap: '0px', paddingBottom: '0.75rem' }}
              >
                <img
                  src="/de-noise/upload-cloud.svg"
                  alt=""
                  width={73}
                  height={51}
                  className="flex-none"
                  style={{ width: '4.5625rem', height: '3.186rem' }}
                />
                <p className="w-[48.5625rem] text-center" style={{ ...DRAG_TEXT, marginTop: '0.5rem' }}>
                  Drag your file here
                </p>
                <p className="w-[34rem] text-center" style={{ ...SUB_TEXT, marginTop: '1rem' }}>
                  Supports speech, music, and general audio in MP3, WAV, or FLAC.
                </p>
              </div>
              {/* Frame 142 buttons: 461 centered, gap 12 */}
              <div className="flex w-[28.8125rem] flex-row justify-center" style={{ gap: '0.75rem' }}>
                <div
                  className="flex flex-none flex-row items-center justify-center bg-[#F0F0F7]"
                  style={{
                    width: '14.03125rem',
                    height: '3.175rem',
                    borderRadius: '5.56875rem',
                    paddingLeft: '2.7rem',
                    paddingRight: '2.7rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    gap: '0.45rem',
                  }}
                >
                  <img
                    src="/de-noise/upload-icon.svg"
                    alt=""
                    width={20}
                    height={16}
                    className="flex-none"
                    style={{ width: '1.25rem', height: '1rem' }}
                  />
                  <span style={{ ...BTN_TEXT_DARK, whiteSpace: 'nowrap' }}>Upload Audio</span>
                </div>
                <div
                  className="flex flex-none flex-row items-center justify-center"
                  style={{
                    width: '14.03125rem',
                    height: '3.175rem',
                    borderRadius: '5.56875rem',
                    border: '0.0625rem solid #9E9EA8',
                    paddingLeft: '2.7rem',
                    paddingRight: '2.7rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    gap: '0.45rem',
                  }}
                >
                  <img
                    src="/de-noise/mic-icon.svg"
                    alt=""
                    width={16}
                    height={20}
                    className="flex-none"
                    style={{ width: '1rem', height: '1.251rem' }}
                  />
                  <span style={{ ...BTN_TEXT_LIGHT, whiteSpace: 'nowrap' }}>Record Audio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Frame 161 features: 889, gap 16 */}
        <div className="flex w-[55.5625rem] flex-row" style={{ gap: '1rem' }}>
          <FeatureCard icon="/de-noise/feature-a.svg" width="17.2844rem" />
          <FeatureCard icon="/de-noise/feature-b.svg" width="18.139rem" />
          <FeatureCard icon="/de-noise/feature-c.svg" width="18.139rem" />
        </div>
      </div>
      {/* Frame 155 history: gap 40 */}
      <div className="flex w-[55.625rem] flex-col" style={{ gap: '2.5rem' }}>
        <h2 className="w-[55.625rem]" style={TITLE}>
          History
        </h2>
        <div className="flex w-[55.625rem] flex-col" style={{ gap: '1.5rem' }}>
          <HistoryRow duration="1:22" />
          <HistoryRow duration="2:12" />
          <HistoryRow duration="0:22" />
        </div>
      </div>
    </div>
  );
}
