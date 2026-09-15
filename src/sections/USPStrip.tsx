import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const usps = [
  {
    title: 'Everything included',
    description:
      'We don’t just design a page. We buy the domain, set up hosting, build the clinic site, add Book Now, and connect WhatsApp confirmations. One package. Zero technical mess for your staff.',
    color: 'bg-coral',
  },
  {
    title: '48-hour delivery',
    description:
      'We design, build, and deliver a finished clinic website in under 48 hours. No endless revisions. No waiting weeks. Your practice, live in two days.',
    color: 'bg-gold',
  },
];

export default function USPStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-usp]',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
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
    <section ref={sectionRef} id="included" className="bg-paper py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 lg:gap-16 mb-10 sm:mb-14">
          <p className="section-label">Why clinics choose us</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            We don’t just ship sites.
            <br />
            We make going online <em>feel easy.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {usps.map((usp) => (
            <div
              key={usp.title}
              data-usp
              className="rounded-morez border border-black/10 p-6 sm:p-8 lg:p-10 opacity-0"
            >
              <span className={`inline-block w-3 h-3 rounded-full ${usp.color} mb-5 sm:mb-6`} />
              <h3 className="display-md font-semibold text-ink mb-3 sm:mb-4">
                {usp.title}
              </h3>
              <p className="text-[15px] sm:text-[17px] leading-relaxed text-quiet">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
