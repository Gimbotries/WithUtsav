import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const packages = [
  {
    name: 'Simple',
    price: '$500',
    description: 'Perfect for businesses that need a great-looking site live fast.',
    features: [
      'Static website / landing page',
      'Fully responsive, professional design',
      'Domain purchased & set up for you',
      'Hosting fully included & configured',
      'Delivered in 48 hours',
      'Everything included — no hidden fees',
    ],
    recommended: false,
    cta: 'Get Started',
  },
  {
    name: 'Elaborate',
    price: '$1000',
    description: 'For businesses that need functionality, not just a static page.',
    features: [
      'Everything in the $500 package, PLUS:',
      'Payment gateway integration',
      'User login / authentication system',
      'AI integration (chatbots, automation)',
      'Custom backend / database functionality',
      'Priority support',
      'Delivered in 48 hours',
    ],
    recommended: true,
    cta: 'Get Started',
  },
];

export default function Pricing() {
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
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-paper py-24 lg:py-36"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 lg:mb-20">
          <p className="section-label mb-4">PRICING</p>
          <h2
            className="font-display font-bold text-ink leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Simple, Transparent Pricing.
          </h2>
          <p className="mt-4 font-body text-text-secondary leading-relaxed text-base lg:text-lg max-w-[500px] mx-auto">
            No hidden fees. No surprises. Everything you need to go live.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-[900px] mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative bg-white rounded-2xl shadow-card p-8 lg:p-10 card-hover opacity-0 ${
                pkg.recommended ? 'ring-2 ring-cobalt' : ''
              }`}
            >
              {/* Recommended Badge */}
              {pkg.recommended && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="bg-cobalt text-white font-body text-[11px] font-semibold uppercase tracking-[0.06em] px-5 py-1.5 rounded-b-xl">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Package Name */}
              <p className="font-display font-semibold text-lg text-ink mb-1">
                {pkg.name}
              </p>

              {/* Price */}
              <div className="mt-3 mb-4">
                <span
                  className="font-display font-bold text-ink tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(40px, 4vw, 56px)' }}
                >
                  {pkg.price}
                </span>
              </div>

              {/* Description */}
              <p className="font-body text-text-secondary text-sm leading-relaxed mb-8">
                {pkg.description}
              </p>

              {/* Features */}
              <ul className="space-y-3.5 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-cobalt/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-cobalt" strokeWidth={2.5} />
                    </span>
                    <span className="font-body text-sm text-ink leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block w-full text-center py-3.5 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                  pkg.recommended
                    ? 'bg-cobalt text-white hover:shadow-[0_12px_32px_rgba(47,107,255,0.35)] hover:-translate-y-0.5'
                    : 'border-2 border-cobalt text-cobalt hover:bg-cobalt hover:text-white hover:-translate-y-0.5'
                }`}
              >
                {pkg.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
