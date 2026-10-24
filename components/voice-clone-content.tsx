/* Figma 633:2003 — Frame 157, 958x1155.46. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
/* Ink nudge: browser Inter glyphs rasterize ~1px high vs Figma server render
   (virtual-shift test: dy=-2@2x improves every text region). Transparent-box
   text only — boxes stay, only ink moves. Shapes/borders untouched. */
const INK = {
  position: 'relative',
  top: '0.0625rem', // 1px
} as const;
const TITLE_36 = {
  ...INK,
  fontSize: '2.25rem', // 36px
  fontWeight: 900,
  lineHeight: '3.0375rem', // 48.6px
  letterSpacing: '-0.09rem', // -1.44px
  color: '#FFFFFF',
} as const;
const BODY_22 = {
  ...INK,
  fontSize: '1.375rem', // 22px
  fontWeight: 400,
  lineHeight: '2.0625rem', // 33px
  letterSpacing: '0rem',
  color: '#F0F0F7',
} as const;
const CHIP_TEXT = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 500,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.02rem', // -0.32px
  color: '#C9C9D1',
  whiteSpace: 'nowrap',
} as const;
const DRAG_TITLE = {
  ...INK,
  fontSize: '1.625rem', // 26px
  fontWeight: 700,
  lineHeight: '2.19375rem', // 35.1px
  letterSpacing: '-0.0325rem', // -0.52px
  color: '#4B4B62',
  textAlign: 'center',
} as const;
const SUPPORTS = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 300,
  lineHeight: '1.5rem', // 24px
  letterSpacing: '0rem',
  color: '#C9C9D1',
  textAlign: 'center',
} as const;
const RECORD_TEXT = {
  ...INK,
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#F0F0F7',
  whiteSpace: 'nowrap',
} as const;
const GENERATE_TEXT = {
  ...INK,
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#07070D',
  whiteSpace: 'nowrap',
} as const;
const COST_A = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 500,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.02rem', // -0.32px
  color: '#FFFFFF',
} as const;
const COST_B = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 700,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.02rem', // -0.32px
  color: '#FFFFFF',
} as const;
const HISTORY_TITLE = {
  ...INK,
  fontSize: '2.7rem', // 43.2px
  fontWeight: 700,
  lineHeight: '3.24rem', // 51.84px
  letterSpacing: '-0.054rem', // -0.864px
  color: '#F0F0F7',
} as const;
const DURATION = {
  ...INK,
  fontSize: '1.8rem', // 28.8px
  fontWeight: 500,
  lineHeight: '2.16rem', // 34.56px
  letterSpacing: '-0.072rem', // -1.152px
  color: '#FFFFFF',
  fontFamily: "'JetBrains Mono', monospace",
} as const;

function Chip({ icon, iconW, iconH, label }: { icon: string; iconW: string; iconH: string; label: string }) {
  return (
    <div
      className="flex flex-none flex-row items-center"
      style={{
        gap: '0.45rem', // 7.2px
        border: '0.0625rem solid #C9C9D1',
        borderRadius: '5.56875rem', // 89.1px
        paddingLeft: '1rem', // 16px
        paddingRight: '1rem',
        paddingTop: '0.75rem', // 12px
        paddingBottom: '0.75rem',
      }}
    >
      <img src={icon} alt="" width={16} height={16} className="flex-none" style={{ width: iconW, height: iconH }} />
      <span style={CHIP_TEXT}>{label}</span>
    </div>
  );
}

/* Audio row: bar byte-identical via plain <img> (public/de-noise/player.svg);
   download icon is the download-variant (light fill) of the shared 16x18 arrow.
   Reused verbatim from de-noise (same 507.87x98.82 player, same 28.8px Mono duration). */
function HistoryRow({ duration }: { duration: string }) {
  return (
    <div className="flex w-[59.875rem] flex-row items-center" style={{ gap: '2rem' }}>
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

export default function VoiceCloneContent() {
  return (
    <div className="flex w-[59.875rem] flex-col" style={{ gap: '3.5rem' }}>
      {/* Frame 156: editor row, gap 20 */}
      <div className="flex w-[59.875rem] flex-row" style={{ gap: '1.25rem' }}>
        {/* Frame 144: left editor, gap 24, pad L0 R24 T16 B16 */}
        <div
          className="flex flex-col"
          style={{ width: '38.375rem', gap: '1.5rem', paddingLeft: '0rem', paddingRight: '1.5rem', paddingTop: '1rem', paddingBottom: '1rem' }}
        >
          <h1 className="w-[36.875rem]" style={TITLE_36}>
            Type your text
          </h1>
          <p className="w-[36.875rem]" style={BODY_22}>
            [thoughtful] What if you could acquire a store that’s not
            <br />
            just built… but already validated by the market?
            <br />
            [excited] What you’re looking at here is a fully
            <br />
            operational business with a proven product, consistent
            <br />
            traffic, and a foundation designed for scalability.
            <br />
            [emphatic] Over the past weeks, this store has
            <br />
            demonstrated real demand, with customers actively
            <br />
            engaging and converting. [confident] The system
            <br />
            behind it is simple but effective — a tested product, a
            <br />
            clean funnel, and a marketing approach that can be
            <br />
            expanded without complexity.
          </p>
          <h2 className="w-[38.375rem]" style={TITLE_36}>
            Get started with
          </h2>
          {/* Frame 147: chips, wrap, gap 12, counter CENTER */}
          <div className="flex w-[36.875rem] flex-row flex-wrap items-center" style={{ gap: '0.75rem' }}>
            <Chip icon="/voice-clone/chip-magic.svg" iconW="1rem" iconH="1rem" label="Examine AI tech" />
            <Chip icon="/voice-clone/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
            <Chip icon="/voice-clone/chip-chat.svg" iconW="1rem" iconH="1rem" label="Recall memories" />
            <Chip icon="/voice-clone/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
            <Chip icon="/voice-clone/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
          </div>
        </div>
        {/* Frame 141: right clone panel, gap 24, pad T16 B24 */}
        <div className="flex flex-col" style={{ width: '20.25rem', gap: '1.5rem', paddingTop: '1rem', paddingBottom: '1.5rem' }}>
          <h1 className="w-[20.25rem]" style={TITLE_36}>
            Voice clone
          </h1>
          {/* Frame 165: upload card, 324 wide, bg #1A1A23, 4px OUTSIDE #4B4B62 dashed 14/gap 10
              (baseline measured, JSON omits dash), r24, pad 12. Content-box + margin -4px
              reproduces symmetric OUTSIDE overflow (render 630-962). */}
          <div
            className="flex items-center justify-center bg-[#1A1A23]"
            style={{
              position: 'relative',
              boxSizing: 'content-box',
              width: '18.75rem', // 300px content; +24 pad +8 border = 332 total
              border: '0.25rem solid transparent',
              borderRadius: '1.5rem',
              padding: '0.75rem',
              marginLeft: '-0.25rem', // OUTSIDE stroke extends 4px left of column
              marginTop: '-0.25rem', // OUTSIDE stroke extends 4px above frame top
              marginBottom: '-0.25rem', // flow ignores OUTSIDE stroke: cancel bottom border width
            }}
          >
            {/* Dashed border overlay: rect path, dasharray 14 10, offset 4 aligns top phase */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '-0.25rem',
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 332 300.91'%3E%3Crect x='2' y='2' width='328' height='296.91' rx='24' fill='none' stroke='%234B4B62' stroke-width='4' stroke-dasharray='14 10' stroke-dashoffset='4'/%3E%3C/svg%3E\")",
                backgroundSize: '100% 100%',
                pointerEvents: 'none',
              }}
            />
            {/* Frame 167: inner, 300 wide, gap 28, pad T12 B12 */}
            <div className="flex w-[18.75rem] flex-col items-center" style={{ gap: '1.75rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
              {/* Frame 164: header, gap 20, pb 12 */}
              <div className="flex w-[18.75rem] flex-col items-center" style={{ gap: '1.25rem', paddingBottom: '0.75rem' }}>
                {/* Frame 163: cloud + drag, gap 12 */}
                <div className="flex w-[18.75rem] flex-col items-center" style={{ gap: '0.75rem' }}>
                  <img
                    src="/voice-clone/upload-cloud.svg"
                    alt=""
                    width={56}
                    height={39}
                    className="flex-none"
                    style={{ width: '3.5rem', height: '2.444375rem' }}
                  />
                  <p className="w-[18.75rem]" style={DRAG_TITLE}>
                    Click or Drag file here
                  </p>
                </div>
                <p className="w-[18.75rem]" style={SUPPORTS}>
                  Supports speech, music, and general audio in MP3, WAV, or FLAC.
                </p>
              </div>
              {/* Frame 142: record row */}
              <div className="flex w-[18.75rem] flex-col" style={{ gap: '0.75rem' }}>
                <div
                  className="flex flex-row items-center justify-center"
                  style={{
                    width: '18.75rem',
                    height: '3.175rem',
                    border: '0.0625rem solid #9E9EA8',
                    borderRadius: '5.56875rem',
                    paddingLeft: '2.7rem',
                    paddingRight: '2.7rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    gap: '0.45rem',
                  }}
                >
                  <img src="/voice-clone/mic.svg" alt="" width={16} height={21} className="flex-none" style={{ width: '1rem', height: '1.25125rem' }} />
                  <span style={RECORD_TEXT}>Record Audio</span>
                </div>
              </div>
            </div>
          </div>
          {/* Frame 140 > Frame 138: generate + cost, gap 18 */}
          <div className="flex w-[20.25rem] flex-col" style={{ gap: '1.125rem' }}>
            <div
              className="flex flex-row items-center justify-center bg-[#F0F0F7]"
              style={{
                width: '20.25rem',
                height: '3.175rem',
                borderRadius: '5.56875rem',
                paddingLeft: '2.7rem',
                paddingRight: '2.7rem',
                paddingTop: '0.9rem',
                paddingBottom: '0.9rem',
                gap: '0.45rem',
              }}
            >
              <span style={GENERATE_TEXT}>Generate</span>
            </div>
            <div className="flex w-[20.25rem] flex-row items-center justify-start" style={{ gap: '0.5rem' }}>
              <p>
                <span style={COST_A}>{'Total Cost:  '}</span>
                <span style={COST_B}>8 Credits</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Frame 155: history, gap 40 */}
      <div className="flex w-[59.875rem] flex-col" style={{ gap: '2.5rem' }}>
        <h2 className="w-[59.875rem]" style={HISTORY_TITLE}>
          History
        </h2>
        <div className="flex w-[59.875rem] flex-col" style={{ gap: '1.5rem' }}>
          <HistoryRow duration="1:22" />
          <HistoryRow duration="2:12" />
          <HistoryRow duration="0:22" />
        </div>
      </div>
    </div>
  );
}
