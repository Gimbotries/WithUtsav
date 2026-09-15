import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Reception used to spend half the morning answering the same three questions — timings, address, “do you take appointments?” Now most people just book from the site. We still get WhatsApp messages, but they’re usually about something specific, not basic info.',
    name: 'Dr. Vaidehi Dande',
    role: 'Paediatric practice, Mumbai',
    site: 'drvaidehidande.com',
    url: 'https://drvaidehidande.com',
    soft: 'bg-[#f1f7f1]',
  },
  {
    quote:
      'I didn’t want a flashy brochure. I needed something patients could open on their phone between OPD hours and actually book. Utsav kept it simple — Book Appointment sits on the homepage, no hunting. That alone cut a lot of back-and-forth on WhatsApp.',
    name: 'Priya M.',
    role: 'Front desk lead, dental clinic · West Mumbai',
    site: null,
    url: null,
    soft: 'bg-[#faf4f6]',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-testimonial]',
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
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#f7f7f7] py-14 sm:py-20 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mb-10 sm:mb-14">
          <p className="section-label mb-3 sm:mb-4">From clinic owners</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            What changed after
            <br />
            the site went <em>live.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-testimonial
              className={`rounded-morez border border-black/8 p-6 sm:p-8 opacity-0 ${item.soft}`}
            >
              {item.site && item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] sm:text-[13px] text-quiet hover:text-ink transition-colors"
                >
                  {item.site}
                </a>
              ) : (
                <p className="font-mono text-[12px] sm:text-[13px] text-quiet">
                  Dental clinic site
                </p>
              )}

              <p className="mt-5 text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-ink mb-6">
                “{item.quote}”
              </p>

              <div>
                <p className="font-semibold text-ink">{item.name}</p>
                <p className="text-sm text-quiet mt-0.5">{item.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
