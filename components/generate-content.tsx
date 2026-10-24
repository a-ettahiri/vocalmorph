/* Figma 595:6380 — Frame 157, 958x1155.46. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
/* Ink nudge: browser Inter glyphs rasterize ~1px high vs Figma server render
   (proven on voice-clone 633:2003). Transparent-box text only — boxes stay,
   only ink moves. Shapes/borders untouched. */
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
const NAME_24 = {
  ...INK,
  fontSize: '1.5rem', // 24px
  fontWeight: 700,
  lineHeight: '1.8rem', // 28.8px
  letterSpacing: '-0.06rem', // -0.96px
  color: '#FFFFFF',
} as const;
const ROLE_18 = {
  ...INK,
  fontSize: '1.125rem', // 18px
  fontWeight: 300,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#DFDFE6',
} as const;
const LABEL_24 = {
  ...INK,
  fontSize: '1.5rem', // 24px
  fontWeight: 600,
  lineHeight: '1.8rem', // 28.8px
  letterSpacing: '-0.06rem', // -0.96px
  color: '#FFFFFF',
} as const;
const CREATIVE_16 = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 400,
  lineHeight: '1.2rem', // 19.2px
  letterSpacing: '-0.04rem', // -0.64px
  color: '#FFFFFF',
} as const;
const BTN_18_DARK = {
  ...INK,
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#07070D',
  whiteSpace: 'nowrap',
} as const;
const BTN_18_LIGHT = {
  ...INK,
  fontSize: '1.125rem', // 18px
  fontWeight: 700,
  lineHeight: '1.35rem', // 21.6px
  letterSpacing: '-0.0225rem', // -0.36px
  color: '#F0F0F7',
  whiteSpace: 'nowrap',
} as const;
const COST_16 = {
  ...INK,
  fontSize: '1rem', // 16px
  fontWeight: 400,
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

/* Audio row: player + duration + trash circle. Player bar and circle art reused
   verbatim from de-noise (same 507.87x98.82 player, same 48x50 #1A1A23 circle,
   same 16x18 glyph) — proven <1% on voice-clone. */
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

export default function GenerateContent() {
  return (
    <div className="flex w-[59.875rem] flex-col" style={{ gap: '3.5rem' }}>
      {/* Frame 145: top row, gap 20 */}
      <div className="flex w-[59.875rem] flex-row" style={{ gap: '1.25rem' }}>
        {/* Frame 144: left editor, gap 24, pad R24 T16 B16 */}
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
            <Chip icon="/generate/chip-magic.svg" iconW="1rem" iconH="1rem" label="Examine AI tech" />
            <Chip icon="/generate/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
            <Chip icon="/generate/chip-chat.svg" iconW="1rem" iconH="1rem" label="Recall memories" />
            <Chip icon="/generate/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
            <Chip icon="/generate/chip-voice.svg" iconW="1.125rem" iconH="0.96875rem" label="Discover your voice" />
          </div>
        </div>
        {/* Frame 141: right settings, gap 32, pad T24 B24 */}
        <div className="flex flex-col" style={{ width: '20.25rem', gap: '2rem', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
          {/* Frame 134: voice header, gap 12, pad T12 B12, center */}
          <div className="flex w-[20.25rem] flex-row items-center" style={{ gap: '0.75rem', paddingTop: '0.75rem', paddingBottom: '0.75rem' }}>
            <img
              src="/generate/avatar.png"
              alt=""
              width={80}
              height={80}
              className="flex-none rounded-full object-cover"
              style={{ width: '5rem', height: '5rem', borderRadius: '6.1875rem' }}
            />
            <div className="flex flex-col items-start justify-center" style={{ width: '7.125rem', gap: '0.5rem' }}>
              <p className="w-[7.125rem]" style={NAME_24}>
                Elon Musk
              </p>
              <p className="w-[6.625rem]" style={ROLE_18}>
                Entrepreneur
              </p>
            </div>
          </div>
          {/* Frame 140: controls, gap 40 */}
          <div className="flex w-[20.25rem] flex-col" style={{ gap: '2.5rem' }}>
            {/* Frame 137: stability + creative, gap 16 */}
            <div className="flex w-[20.25rem] flex-col" style={{ gap: '1rem' }}>
              <div className="flex w-[20.25rem] flex-row items-end justify-between">
                <p style={LABEL_24}>Stability</p>
                <img src="/generate/info.svg" alt="" width={20} height={20} className="flex-none" style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <div className="flex w-[20.25rem] flex-col" style={{ gap: '0.75rem' }}>
                <p className="w-[20.25rem]" style={CREATIVE_16}>
                  Creative
                </p>
                {/* Group 27: byte-identical export slider track + knob */}
                <img src="/generate/slider.svg" alt="" width={321} height={14} style={{ width: '20.0625rem', height: '0.875rem' }} />
              </div>
            </div>
            {/* Toggle row: space-between, center */}
            <div className="flex w-[20.25rem] flex-row items-center justify-between">
              <p style={LABEL_24}>Allow Variation</p>
              {/* Toggle On: 42.075x25.575 r82.5 #34C759, knob 22.275 white right */}
              <div
                className="flex flex-none flex-row items-center justify-end"
                style={{
                  width: '2.6296875rem', // 42.075px
                  height: '1.5984375rem', // 25.575px
                  borderRadius: '5.15625rem', // 82.5px
                  background: '#34C759',
                  paddingRight: '0.103125rem', // (42.075-22.275-2*0.825)/16 ≈ knob inset
                }}
              >
                <div
                  style={{
                    width: '1.3921875rem', // 22.275px
                    height: '1.3921875rem',
                    borderRadius: '5.15625rem',
                    background: '#FFFFFF',
                    boxShadow:
                      '0 0.1546875rem 0.0515625rem rgba(0,0,0,0.06), 0 0.1546875rem 0.4125rem rgba(0,0,0,0.15), 0 0 0 0.0515625rem rgba(0,0,0,0.04)',
                  }}
                />
              </div>
            </div>
            {/* Frame 138: buttons + cost, gap 18 */}
            <div className="flex w-[20.25rem] flex-col" style={{ gap: '1.125rem' }}>
              <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                <div
                  className="flex flex-row items-center justify-center bg-[#F0F0F7]"
                  style={{
                    width: '20.25rem',
                    height: '3.175rem', // 50.8px
                    borderRadius: '5.56875rem',
                    paddingLeft: '2.7rem',
                    paddingRight: '2.7rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    gap: '0.45rem',
                  }}
                >
                  <span style={BTN_18_DARK}>Generate</span>
                </div>
                <div
                  className="flex flex-row items-center justify-center"
                  style={{
                    width: '20.25rem',
                    height: '3.175rem',
                    borderRadius: '5.56875rem',
                    border: '0.0625rem solid #9E9EA8',
                    background: '#07070D',
                    paddingLeft: '2.7rem',
                    paddingRight: '2.7rem',
                    paddingTop: '0.9rem',
                    paddingBottom: '0.9rem',
                    gap: '0.45rem',
                  }}
                >
                  <span style={BTN_18_LIGHT}>Change Voice</span>
                </div>
              </div>
              <div className="flex w-[20.25rem] flex-row items-center justify-center" style={{ gap: '0.5rem' }}>
                <p className="w-[20.25rem]" style={COST_16}>
                  Total Cost: 8 Credits
                </p>
              </div>
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
