/* Figma 539:2309 — Frame 117, 776x1663.6. Icons/players byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
const NAME = {
  fontSize: '3.5rem',
  fontWeight: 900,
  lineHeight: '4.725rem',
  letterSpacing: '-0.02em',
  color: '#FFFFFF',
} as const;
const BTN = {
  fontSize: '1.125rem',
  fontWeight: 700,
  lineHeight: '1.35rem',
  letterSpacing: '-0.02em',
} as const;
const SECTION_TITLE = {
  fontSize: '1.8rem',
  fontWeight: 600,
  lineHeight: '2.16rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;
const BODY = {
  fontSize: '1.35rem',
  fontWeight: 400,
  lineHeight: '2.025rem',
  letterSpacing: '-0.02em',
  color: '#DFDFE5',
} as const;
const QUOTE = {
  fontSize: '1.35rem',
  fontWeight: 600,
  lineHeight: '2.025rem',
  letterSpacing: '-0.02em',
  color: '#FFFFFF',
} as const;
const CARD_NAME = {
  fontSize: '1.15rem',
  fontWeight: 500,
  lineHeight: '1.38rem',
  letterSpacing: '-0.04em',
  color: '#F0F0F7',
} as const;
const CARD_ROLE = {
  fontSize: '1.00625rem',
  fontWeight: 400,
  lineHeight: '1.2075rem',
  letterSpacing: '-0.04em',
  color: '#C9C9D1',
} as const;
function SectionHead({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex h-[4.5625rem] items-center">
      <img
        src={icon}
        alt=""
        width={50}
        height={50}
        className="h-[3.15rem] w-[3.15rem] flex-none"
      />
      <h2 className="ml-[0.9rem]" style={SECTION_TITLE}>
        {title}
      </h2>
    </div>
  );
}
function SimilarCard() {
  return (
    <div className="flex w-[15rem] flex-col">
      <div className="h-[19.8375rem] w-[15rem] bg-[#202122]" style={{ borderRadius: '0.43125rem' }} />
      <p className="mt-[0.43125rem]" style={CARD_NAME}>
        Elon Musk
      </p>
      <p style={CARD_ROLE}>Entrepreneur</p>
    </div>
  );
}
export default function PersonaContent() {
  return (
    <div className="flex w-[48.5rem] flex-col">
      {/* Header 0-240 */}
      <div className="flex h-[15rem] flex-row">
        <img
          src="/persona/avatar.png"
          alt="Elon Musk"
          width={240}
          height={240}
          className="h-[15rem] w-[15rem] flex-none rounded-full object-cover"
        />
        <div className="ml-[2rem] w-[29rem] flex-none">
          <h1 className="mt-[3.63125rem]" style={NAME}>
            Elon Musk
          </h1>
          <div className="mt-[2rem] flex flex-row gap-[0.75rem]">
            <button
              type="button"
              className="flex h-[3.175rem] w-[11.7rem] items-center justify-center rounded-full bg-[#F0F0F7]"
            >
              <span style={{ ...BTN, color: '#07070D' }}>Use voice</span>
            </button>
            <button
              type="button"
              className="flex h-[3.175rem] w-[11.7rem] items-center justify-center rounded-full border border-[#9E9EA8] bg-[#07070D]"
            >
              <span style={{ ...BTN, color: '#F0F0F7' }}>Browse others</span>
            </button>
          </div>
        </div>
      </div>
      {/* About 280-457 */}
      <div className="mt-[2.5rem]">
        <SectionHead icon="/persona/about-icon.svg" title="About Elon Musk" />
        <p className="mt-[0.5rem] w-[48.4375rem]" style={BODY}>
          This is a great start! Your dark mode foundation looks very clean, and that custom audio component you designed is awesome, the pink gradient gives it a really modern, vibrant feel that pops perfectly against the dark background.
        </p>
      </div>
      {/* Voice Samples 489-1117.6 */}
      <div className="mt-[2rem]">
        <SectionHead icon="/persona/samples-icon.svg" title="Voice Samples" />
        <p className="mt-[0.5rem]" style={BODY}>
          Sample scripts below were written for this preset. Audio is generated with Vocal Mask&rsquo;s persona engine (reference sample + your text).
        </p>
        <p className="mt-[2rem]" style={BODY}>
          Sample 1
        </p>
        <p style={QUOTE}>“I&rsquo;m not just a director; I&rsquo;m a storyteller with a flair for the dramatic.”</p>
        <button type="button" className="mt-[1.25rem] block w-[35.26875rem]">
          <img
            src="/persona/player1.svg"
            alt=""
            width={564}
            height={110}
            className="h-[6.8625rem] w-[35.26875rem]"
          />
        </button>
        <p className="mt-[2rem]" style={BODY}>
          Sample 2
        </p>
        <p style={QUOTE}>“I always say, if you&rsquo;re not willing to take risks, you&rsquo;re just not watching a good movie.”</p>
        <button type="button" className="mt-[1.25rem] block w-[35.26875rem]">
          <img
            src="/persona/player2.svg"
            alt=""
            width={564}
            height={110}
            className="h-[6.8625rem] w-[35.26875rem]"
          />
        </button>
      </div>
      {/* Similar 1149.6-1663.6 */}
      <div className="mt-[2rem]">
        <SectionHead icon="/persona/similar-icon.svg" title="Similar" />
        <p className="mt-[0.5rem]" style={BODY}>
          Explore similar voices to this one
        </p>
        <div className="mt-[2rem] flex flex-row gap-[1.125rem]">
          <SimilarCard />
          <SimilarCard />
          <SimilarCard />
        </div>
      </div>
    </div>
  );
}
