import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const floatingPills = [
  { label: 'Design', top: '15%', left: '-8%', delay: 0.7 },
  { label: 'Domain + Hosting', top: '65%', right: '-12%', delay: 0.85 },
  { label: '48–72h Delivery', bottom: '5%', left: '5%', delay: 1.0 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline words animation
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
          0.2
        );
      }

      // Subheadline
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.5
      );

      // CTA buttons
      tl.fromTo(
        ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.7
      );

      // Hero image
      tl.fromTo(
        imageRef.current,
        { y: 70, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.1 },
        0.25
      );

      // Floating pills
      pillsRef.current.forEach((pill, i) => {
        if (pill) {
          const isLeft = i !== 1;
          tl.fromTo(
            pill,
            { x: isLeft ? -40 : 40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' },
            0.8 + i * 0.12
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] bg-paper flex items-center overflow-hidden"
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-8 pt-[100px] pb-16 lg:pb-0">
        <div className="grid lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">
          {/* Left Content */}
          <div className="relative z-10 order-2 lg:order-1">
            <h1
              ref={headlineRef}
              className="font-display font-bold text-ink leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(42px, 6.5vw, 84px)' }}
            >
              <span className="word inline-block">A</span>{' '}
              <span className="word inline-block">Complete</span>{' '}
              <span className="word inline-block">Web</span>{' '}
              <span className="word inline-block">Design</span>{' '}
              <span className="word inline-block text-cobalt">Package.</span>
            </h1>

            <p
              ref={subRef}
              className="mt-6 lg:mt-8 font-body text-text-secondary leading-relaxed max-w-[480px]"
              style={{ fontSize: 'clamp(15px, 1.2vw, 18px)' }}
            >
              From domain to design to going live — WorkwithUtsav builds and
              delivers your website in under 48 hours, with everything handled
              for you.
            </p>

            <div ref={ctaRef} className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a href="#pricing" className="btn-primary group">
                Get Your Website
                <ArrowRight
                  size={18}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#portfolio"
                className="font-body text-sm font-medium text-ink hover:text-cobalt transition-colors link-underline py-2"
              >
                See Our Work
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-[280px] sm:w-[340px] lg:w-[420px] xl:w-[460px]"
            >
              <div className="rounded-3xl overflow-hidden shadow-card">
                <img
                  src="/hero-portrait.jpg"
                  alt="Professional web designer at WorkwithUtsav"
                  className="w-full h-auto object-cover aspect-[3/4]"
                  loading="eager"
                />
              </div>

              {/* Floating Pills */}
              {floatingPills.map((pill, i) => (
                <div
                  key={pill.label}
                  ref={(el) => { pillsRef.current[i] = el; }}
                  className="absolute bg-white rounded-full shadow-card px-4 py-2.5 flex items-center gap-2"
                  style={{
                    top: pill.top,
                    left: pill.left,
                    right: pill.right,
                    bottom: pill.bottom,
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cobalt flex-shrink-0" />
                  <span className="font-body text-sm font-medium text-ink whitespace-nowrap">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
