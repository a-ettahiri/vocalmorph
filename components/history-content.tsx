/* Figma 593:4624 — Frame 133, 731.07x1268. Players/icons/thumb byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
const HISTORY_TITLE = {
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '3.24rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;
const DROPDOWN_TEXT = {
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: '1.2rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;
const TODAY_TEXT = {
  fontSize: '1.25rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  letterSpacing: '-0.04em',
  color: '#C9C9D1',
} as const;
const CARD_TITLE = {
  fontSize: '2.7rem',
  fontWeight: 800,
  lineHeight: '3.24rem',
  letterSpacing: '-0.04em',
  color: '#FFFFFF',
} as const;
const DURATION = {
  fontSize: '1.8rem',
  fontWeight: 500,
  lineHeight: '2.16rem',
  letterSpacing: '-0.04em',
  color: '#FFFFFF',
  fontFamily: "'JetBrains Mono', monospace",
} as const;
const DOWNLOAD_TEXT = {
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: '1.35rem',
  letterSpacing: '-0.02em',
  color: '#07070D',
} as const;

function HistoryCard({
  title,
  duration,
  player,
}: {
  title: string;
  duration: string;
  player: string;
}) {
  return (
    <div
      className="flex w-[45.691875rem] flex-col bg-[#1A1A23]"
      style={{
        borderRadius: '0.375rem',
        padding: '0.675rem',
        gap: '1rem',
      }}
    >
      <div className="flex w-[44.341875rem] flex-row items-center" style={{ gap: '1.35rem' }}>
        <img
          src="/history/thumb.png"
          alt=""
          width={180}
          height={180}
          className="h-[11.25rem] w-[11.25rem] flex-none object-cover"
          style={{ borderRadius: '0.25rem' }}
        />
        <div className="flex w-[31.741875rem] flex-col" style={{ gap: '0.875rem' }}>
          <div
            className="flex w-[31.741875rem] flex-row items-baseline justify-between"
            style={{ paddingLeft: '0.675rem', paddingRight: '0.675rem' }}
          >
            <p style={CARD_TITLE}>{title}</p>
            <p style={DURATION}>{duration}</p>
          </div>
          <img
            src={player}
            alt=""
            width={508}
            height={99}
            className="h-[6.17625rem] w-[31.741875rem] flex-none"
          />
        </div>
      </div>
      <div
        className="flex w-[44.341875rem] flex-row items-center justify-center bg-[#F0F0F7]"
        style={{
          borderRadius: '5.56875rem',
          gap: '0.5rem',
          paddingLeft: '2.7rem',
          paddingRight: '2.7rem',
          paddingTop: '0.9rem',
          paddingBottom: '0.9rem',
        }}
      >
        <img
          src="/history/download.svg"
          alt=""
          width={16}
          height={18}
          className="h-[1.125rem] w-[1rem] flex-none"
        />
        <span style={DOWNLOAD_TEXT}>Download</span>
      </div>
    </div>
  );
}

export default function HistoryContent() {
  return (
    <div className="flex w-[45.691875rem] flex-col">
      {/* Header 0-52 */}
      <div className="flex w-[45.691875rem] flex-row items-center justify-between">
        <h1 style={HISTORY_TITLE}>History</h1>
        <div
          className="flex flex-row items-center justify-center bg-[#1A1A23]"
          style={{
            borderRadius: '6.1875rem',
            gap: '0.5rem',
            width: '7.6875rem',
            height: '2.6875rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
          }}
        >
          <span style={DROPDOWN_TEXT}>Category</span>
          <img
            src="/history/chevron.svg"
            alt=""
            width={12}
            height={7}
            className="h-[0.4375rem] w-[0.75rem] flex-none"
          />
        </div>
      </div>
      {/* List 84-1268: TODAY + 4 cards, gaps 2rem / 1.35rem frame-relative */}
      <div className="flex w-[45.691875rem] flex-col" style={{ marginTop: '2rem', gap: '1.35rem' }}>
        <p className="w-[45.691875rem] text-center" style={TODAY_TEXT}>
          TODAY
        </p>
        <HistoryCard title="Elon Musk" duration="1:22" player="/history/player.svg" />
        <HistoryCard title="Steve Jobs" duration="2:03" player="/history/player2.svg" />
        <HistoryCard title="Steve Jobs" duration="2:03" player="/history/player2.svg" />
        <HistoryCard title="Steve Jobs" duration="2:03" player="/history/player2.svg" />
      </div>
    </div>
  );
}
