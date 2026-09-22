import type { ReactNode } from 'react';

const slots = [
  { time: '10:00 AM', state: 'busy' },
  { time: '10:30 AM', state: 'open' },
  { time: '11:00 AM', state: 'pick' },
  { time: '11:30 AM', state: 'open' },
  { time: '4:00 PM', state: 'open' },
  { time: '5:30 PM', state: 'busy' },
];

export default function ProductDemos() {
  return (
    <section id="how-it-works" className="bg-[#f7f7f7] py-12 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div className="max-w-[760px] xl:max-w-[800px] mb-8 sm:mb-14">
          <p className="section-label mb-3 sm:mb-4">How patients find and book you</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Search. Book. WhatsApp.
            <br />
            <em>No receptionist required.</em>
          </h2>
          <p className="mt-4 sm:mt-5 text-[14px] sm:text-[17px] xl:text-[18px] leading-relaxed text-quiet">
            This is the flow we set up for clinics — so when someone types your name
            or specialty in your city, they land on your site, take a slot, and get
            a WhatsApp confirmation automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          <SearchDemo />
          <BookingDemo />
          <WhatsAppDemo />
        </div>
      </div>
    </section>
  );
}

function DemoChrome({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-white rounded-morez border border-black/8 overflow-hidden flex flex-col min-h-0 sm:min-h-[460px] lg:min-h-[500px]">
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4">
        <p className="font-mono-label text-coral mb-2 text-[11px] sm:text-[14px]">{label}</p>
        <h3 className="text-lg sm:text-xl lg:text-[22px] xl:text-[24px] font-semibold text-ink leading-snug">
          {title}
        </h3>
      </div>
      <div className="px-3 sm:px-5 pb-4 sm:pb-5 flex-1">{children}</div>
    </article>
  );
}

function SearchDemo() {
  return (
    <DemoChrome
      label="01 · Local search"
      title="Their name and specialty, in their city."
    >
      <div className="rounded-morez border border-black/10 bg-[#f7f7f7] p-3 sm:p-4 h-full">
        <div className="bg-white rounded-full border border-black/10 px-4 py-2.5 flex items-center gap-3 shadow-sm">
          <SearchGlyph />
          <p className="text-[13px] sm:text-sm text-ink font-medium overflow-hidden whitespace-nowrap">
            <span className="demo-type">gynecologist near Bhopal</span>
          </p>
        </div>

        <div className="mt-4 space-y-3">
          <div className="demo-result demo-result-1 bg-white rounded-xl border border-black/8 p-3.5">
            <p className="text-[11px] text-quiet font-mono">Maps · Bhopal</p>
            <p className="text-sm font-semibold text-ink mt-1">
              Dr. Meera Clinic
            </p>
            <p className="text-xs text-quiet mt-0.5">
              Gynecologist · Shahpura · Open now
            </p>
            <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-sage/30 to-sky/20 relative overflow-hidden">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-coral demo-pin" />
            </div>
          </div>

          <div className="demo-result demo-result-2 bg-white rounded-xl border border-coral/30 p-3.5 ring-2 ring-coral/15">
            <p className="text-[11px] text-coral font-mono">Website · Book Now</p>
            <p className="text-sm font-semibold text-ink mt-1">
              drmeeraclinic.com
            </p>
            <p className="text-xs text-quiet mt-0.5">
              Official site · Appointments online
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-ink">
                Your clinic, first.
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide bg-coral text-white px-2.5 py-1 rounded-full">
                Book
              </span>
            </div>
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function BookingDemo() {
  return (
    <DemoChrome
      label="02 · Online booking"
      title="A slot in seconds. No phone tag."
    >
      <div className="rounded-morez border border-black/10 bg-[#fbfbfb] p-3 sm:p-4 h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-quiet">Dr. Meera Clinic</p>
            <p className="text-sm font-semibold text-ink">Consultation</p>
          </div>
          <p className="text-xs font-mono text-quiet">Tue, 16 Sep</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {slots.map((slot) => (
            <div
              key={slot.time}
              className={`demo-slot demo-slot-${slot.state} rounded-xl border px-3 py-3 text-center text-sm font-semibold ${
                slot.state === 'busy'
                  ? 'border-black/8 text-quiet/40 bg-black/[0.03] line-through'
                  : slot.state === 'pick'
                    ? 'border-coral bg-coral text-white'
                    : 'border-black/10 text-ink bg-white'
              }`}
            >
              {slot.time}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="demo-book-btn mt-4 w-full rounded-full bg-ink text-white text-sm font-semibold py-3"
        >
          Confirm 11:00 AM
        </button>
        <p className="mt-3 text-center text-xs text-quiet">
          Instant hold on the calendar — reception only handles exceptions.
        </p>
      </div>
    </DemoChrome>
  );
}

function WhatsAppDemo() {
  return (
    <DemoChrome
      label="03 · WhatsApp"
      title="Booked? They are told automatically."
    >
      <div className="rounded-morez overflow-hidden border border-black/10 h-full flex flex-col bg-[#efeae2]">
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-xs font-bold">
            MC
          </span>
          <div>
            <p className="text-sm font-semibold leading-tight">Dr. Meera Clinic</p>
            <p className="text-[11px] text-white/70">online</p>
          </div>
        </div>

        <div className="flex-1 p-3 space-y-2 min-h-[220px] sm:min-h-[260px]">
          <div className="demo-wa demo-wa-1 max-w-[88%] ml-auto bg-[#d9fdd3] rounded-lg rounded-tr-sm px-3 py-2 text-[13px] text-ink shadow-sm">
            Hello, I need a gynecology consult this week.
          </div>
          <div className="demo-wa demo-wa-2 max-w-[88%] bg-white rounded-lg rounded-tl-sm px-3 py-2 text-[13px] text-ink shadow-sm">
            We have 11:00 AM tomorrow. Reply 1 to book.
          </div>
          <div className="demo-wa demo-wa-3 max-w-[88%] ml-auto bg-[#d9fdd3] rounded-lg rounded-tr-sm px-3 py-2 text-[13px] text-ink shadow-sm">
            1
          </div>
          <div className="demo-wa demo-wa-4 max-w-[92%] bg-white rounded-lg rounded-tl-sm px-3 py-2 text-[13px] text-ink shadow-sm">
            <p className="font-semibold text-[#075E54] mb-1">Booking confirmed</p>
            <p>Tue, 11:00 AM · Dr. Meera</p>
            <p className="text-[12px] text-quiet mt-1">
              Shahpura, Bhopal. Please arrive 10 minutes early.
            </p>
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}

function SearchGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="#5c5c5c" strokeWidth="2" />
      <path d="M20 20L16.5 16.5" stroke="#5c5c5c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
