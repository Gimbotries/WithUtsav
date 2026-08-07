import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import heroPortrait from '../hero-portrait.jpg';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '[data-hero="brand"]',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1
      )
        .fromTo(
          '[data-hero="line"]',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 },
          0.18
        )
        .fromTo(
          '[data-hero="copy"]',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.5
        )
        .fromTo(
          '[data-hero="cta"]',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.62
        )
        .fromTo(
          '[data-hero="image"]',
          { y: 28, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9 },
          0.25
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative bg-paper overflow-hidden min-h-[100svh] lg:min-h-[100dvh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[240px] sm:w-[320px] h-[240px] sm:h-[320px] rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-[92px] sm:pt-[108px] pb-10 sm:pb-14 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
          <div className="order-2 lg:order-1 max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left">
            <p
              data-hero="brand"
              className="font-mono-label text-coral mb-3 sm:mb-4 opacity-0 text-[12px] sm:text-[14px]"
            >
              WorkwithUtsav
            </p>

            <h1 className="display-xl font-semibold text-ink text-balance">
              <span data-hero="line" className="block opacity-0">
                Complete websites.
              </span>
              <span data-hero="line" className="block opacity-0">
                Domain to design.
              </span>
              <span data-hero="line" className="block opacity-0">
                Live in <em>48 hours.</em>
              </span>
            </h1>

            <p
              data-hero="copy"
              className="mt-4 sm:mt-5 max-w-[460px] mx-auto lg:mx-0 text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-quiet opacity-0"
            >
              From domain to hosting to going live — WorkwithUtsav builds and
              delivers your website with everything handled for you. No jargon.
              No waiting weeks.
            </p>

            <div
              data-hero="cta"
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 opacity-0"
            >
              <a href="#pricing" className="btn-primary group w-full sm:w-auto">
                Get your website
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a href="#portfolio" className="btn-outline w-full sm:w-auto">
                See our work
              </a>
            </div>
          </div>

          <div
            data-hero="image"
            className="relative order-1 lg:order-2 opacity-0 w-full max-w-[240px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px] xl:max-w-[400px] mx-auto"
          >
            <div className="rounded-morez overflow-hidden border border-black/10 bg-[#f3f3f3] shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
              <img
                src={heroPortrait}
                alt="The WorkwithUtsav team"
                className="w-full h-auto object-cover aspect-[3/4] [image-rendering:-webkit-optimize-contrast]"
                loading="eager"
                decoding="async"
                width={1400}
                height={1921}
              />
            </div>
            <div className="absolute -bottom-3 -left-2 sm:-left-4 bg-ink text-white rounded-morez px-3 sm:px-4 py-2.5 sm:py-3 shadow-lg max-w-[85%]">
              <p className="font-mono-label text-coral text-[10px] sm:text-[11px] mb-0.5">
                Delivery
              </p>
              <p className="text-xs sm:text-sm font-semibold leading-snug">
                48–72 hours, start to live
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
