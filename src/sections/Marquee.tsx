const symbols = ['❋', '❊', '❈', '✢'];
const phrases = ['FOR CLINICS', 'BOOK ONLINE', 'WHATSAPP AUTO', 'WORKWITHUTSAV'];

export default function Marquee() {
  const items = Array.from({ length: 12 }, (_, i) => ({
    text: phrases[i % phrases.length],
    symbol: symbols[i % symbols.length],
  }));

  const row = [...items, ...items];

  return (
    <section className="bg-ink text-white py-5 overflow-hidden border-y border-white/10">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {row.map((item, i) => (
          <span
            key={`${item.text}-${i}`}
            className="inline-flex items-center gap-6 px-6 text-[15px] sm:text-[18px] font-semibold tracking-tight"
          >
            <span
              className={
                i % 4 === 0
                  ? 'text-coral'
                  : i % 4 === 1
                    ? 'text-gold'
                    : i % 4 === 2
                      ? 'text-sage'
                      : 'text-mauve'
              }
            >
              {item.symbol}
            </span>
            <span>{item.text}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
