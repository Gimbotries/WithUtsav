import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, PhoneMissed, SearchX, CalendarX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pains = [
  {
    icon: SearchX,
    title: 'Google shows the clinic. The website does not.',
    call: 'What shows up first',
    description:
      'Patients search your name, specialty, and locality — “gynecologist Bhopal”, “dentist Jogeshwari”. Your Maps pin appears. There is no site, or a weak one. They book the clinic that looks premium and has Book Now.',
    color: 'bg-coral',
    soft: 'text-coral',
  },
  {
    icon: MessageCircle,
    title: 'Booking lives on WhatsApp — by hand.',
    call: 'Reception’s extra job',
    description:
      'Every appointment is a chat. Staff copy names, guess slots, forget follow-ups during OPD. Double bookings happen. After hours, messages sit unread until morning — and the patient has already gone elsewhere.',
    color: 'bg-mauve',
    soft: 'text-mauve',
  },
  {
    icon: PhoneMissed,
    title: 'A missed call is a missed patient.',
    call: 'While you are with someone',
    description:
      'The line is busy, the receptionist is at the desk, you are in consultation. That caller needed a slot today. Without a website that books for you, they never come back.',
    color: 'bg-gold',
    soft: 'text-ink',
  },
  {
    icon: CalendarX,
    title: 'No confirmation. No-shows. Repeat calls.',
    call: 'The loop that wastes OPD time',
    description:
      'Patients are not told the booking is locked. They call again to “just confirm”, or they do not come. Your team spends the day chasing instead of seeing patients.',
    color: 'bg-sage',
    soft: 'text-sage',
  },
];

export default function PainPoints() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-pain]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why-us" className="bg-paper py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-16 mb-10 sm:mb-14">
          <p className="section-label">What clinics tell us on the call</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Patients already search for you.
            <br />
            Most clinics still <em>lose them.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {pains.map((pain) => (
            <article
              key={pain.title}
              data-pain
              className="rounded-morez border border-black/10 p-6 sm:p-8 lg:p-10 opacity-0"
            >
              <span className={`inline-flex w-10 h-10 rounded-full ${pain.color} items-center justify-center mb-5 sm:mb-6`}>
                <pain.icon size={18} className="text-white" />
              </span>
              <p className={`font-mono-label mb-2 ${pain.soft}`}>{pain.call}</p>
              <h3 className="display-md font-semibold text-ink mb-3 sm:mb-4">
                {pain.title}
              </h3>
              <p className="text-[15px] sm:text-[17px] leading-relaxed text-quiet">
                {pain.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
