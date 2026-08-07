import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const usps = [
  {
    icon: Zap,
    title: 'Everything Included',
    description:
      "We don't just design your site. We buy your domain, set up your hosting, build your website, and hand you a fully live product. One package, zero hassle.",
  },
  {
    icon: Clock,
    title: '48-Hour Delivery',
    description:
      'We design, build, and deliver your finished website in under 48 hours. No endless revisions. No waiting weeks. Your site, live in two days.',
  },
];

export default function USPStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // Icon pulse
          const icon = card.querySelector('.icon-wrapper');
          if (icon) {
            gsap.fromTo(
              icon,
              { scale: 0.7 },
              {
                scale: 1,
                duration: 0.6,
                delay: i * 0.15 + 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="bg-ink py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <p className="section-label text-cobalt mb-10">WHY CHOOSE US</p>

        {/* USP Cards */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0"
            >
              <div className="icon-wrapper w-14 h-14 rounded-full bg-cobalt/15 flex items-center justify-center mb-6">
                <usp.icon size={28} className="text-cobalt" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-semibold text-2xl lg:text-3xl text-[#F4F2EE] mb-4">
                {usp.title}
              </h3>
              <p className="font-body text-[#F4F2EE]/70 leading-relaxed text-base">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
