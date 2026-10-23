/* Figma 537:2006 — Frame 109, 892x1540. Icons byte-identical via plain <img>. */
/* eslint-disable @next/next/no-img-element */
const TITLE = {
  fontSize: '2.7rem',
  fontWeight: 700,
  lineHeight: '3.24rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;
const SEARCH_TEXT = {
  fontSize: '1.25rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
  letterSpacing: '-0.04em',
  color: '#676773',
} as const;
const RESULT_TEXT = {
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.2rem',
  letterSpacing: '-0.04em',
  color: '#9E9EA8',
} as const;
const DROPDOWN_TEXT = {
  fontSize: '1rem',
  fontWeight: 700,
  lineHeight: '1.2rem',
  letterSpacing: '-0.02em',
  color: '#F0F0F7',
} as const;
const CARD_NAME = {
  fontSize: '1rem',
  fontWeight: 500,
  lineHeight: '1.2rem',
  letterSpacing: '-0.04em',
  color: '#F0F0F7',
} as const;
const CARD_ROLE = {
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.05rem',
  letterSpacing: '-0.04em',
  color: '#C9C9D1',
} as const;

// Figma 537:2006 dropdown text is "Category" (characters field).
const CARDS = [
  { name: 'Steve Jobs', role: 'Entrepreneur' },
  { name: 'Donald Trump', role: 'Entrepreneur' },
  { name: 'Taylor swift', role: 'Singer' },
  { name: 'Elon Musk', role: 'Entrepreneur' },
  { name: 'Steve Jobs', role: 'Entrepreneur' },
  { name: 'Donald Trump', role: 'Entrepreneur' },
  { name: 'Taylor swift', role: 'Singer' },
  { name: 'Elon Musk', role: 'Entrepreneur' },
  { name: 'Steve Jobs', role: 'Entrepreneur' },
  { name: 'Donald Trump', role: 'Entrepreneur' },
  { name: 'Taylor swift', role: 'Singer' },
  { name: 'Elon Musk', role: 'Entrepreneur' },
  { name: 'Steve Jobs', role: 'Entrepreneur' },
  { name: 'Donald Trump', role: 'Entrepreneur' },
  { name: 'Taylor swift', role: 'Singer' },
  { name: 'Elon Musk', role: 'Entrepreneur' },
];

function LibraryCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="flex w-[13rem] flex-col" style={{ gap: '0.5rem' }}>
      <div className="h-[17.25rem] w-[13rem] bg-[#202122]" style={{ borderRadius: '0.375rem' }} />
      <div className="flex w-[13rem] flex-col">
        <p style={CARD_NAME}>{name}</p>
        <p style={CARD_ROLE}>{role}</p>
      </div>
    </div>
  );
}

export default function LibraryContent() {
  return (
    <div className="flex w-[55.75rem] flex-col">
      <h1 style={TITLE}>Library</h1>
      {/* Frame 108: toolbar + grid, gap 2rem frame-relative */}
      <div className="flex w-[55.75rem] flex-col" style={{ marginTop: '3.5rem', gap: '2rem' }}>
        {/* Frame 107 toolbar 892x48 */}
        <div className="flex w-[55.75rem] flex-row items-center justify-between">
          <div
            className="flex flex-row items-center bg-[#1C1C1C]"
            style={{
              borderRadius: '6.1875rem',
              gap: '0.75rem',
              width: '34.375rem',
              height: '3rem',
              paddingLeft: '0.75rem',
              paddingRight: '0.75rem',
            }}
          >
            <img
              src="/library/search.svg"
              alt=""
              width={24}
              height={24}
              className="h-[1.5rem] w-[1.5rem] flex-none"
            />
            <span style={SEARCH_TEXT}>Search</span>
          </div>
          <div
            className="flex flex-row items-center"
            style={{ gap: '0.9375rem', marginTop: '0.3125rem' }}
          >
            <span style={RESULT_TEXT}>127 result</span>
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
                src="/library/chevron.svg"
                alt=""
                width={12}
                height={7}
                className="h-[0.4375rem] w-[0.75rem] flex-none"
              />
            </div>
          </div>
        </div>
        {/* Frame 121 grid 892x1352, gap 1.5rem rows / 1.25rem cols */}
        <div
          className="grid w-[55.75rem]"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))',
            columnGap: '1.25rem',
            rowGap: '1.5rem',
          }}
        >
          {CARDS.map((c, i) => (
            <LibraryCard key={i} name={c.name} role={c.role} />
          ))}
        </div>
      </div>
    </div>
  );
}
