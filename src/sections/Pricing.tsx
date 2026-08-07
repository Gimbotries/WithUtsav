import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

type Region = 'intl' | 'india';

const packages = [
  {
    name: 'Simple',
    price: { intl: '$500', india: '₹15,000' },
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
  },
  {
    name: 'Elaborate',
    price: { intl: '$1,000', india: '₹30,000' },
    description: 'For businesses that need functionality, not just a static page.',
    features: [
      'Everything in the Simple package, PLUS:',
      'Payment gateway integration',
      'User login / authentication system',
      'AI integration (chatbots, automation)',
      'Custom backend / database functionality',
      'Priority support',
      'Delivered in 48 hours',
    ],
    recommended: true,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [region, setRegion] = useState<Region>('india');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-price]',
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
    <section ref={sectionRef} id="pricing" className="bg-paper py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-[720px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          <p className="section-label mb-3 sm:mb-4">Pricing</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Simple, transparent
            <br />
            <em>pricing.</em>
          </h2>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-quiet">
            No hidden fees. No surprises. Everything you need to go live.
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="inline-flex p-1 rounded-full border border-black/15 bg-[#f7f7f7] w-full max-w-[360px] sm:w-auto sm:max-w-none">
            <button
              type="button"
              onClick={() => setRegion('india')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                region === 'india'
                  ? 'bg-ink text-white'
                  : 'text-quiet hover:text-ink'
              }`}
            >
              India · INR
            </button>
            <button
              type="button"
              onClick={() => setRegion('intl')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                region === 'intl'
                  ? 'bg-ink text-white'
                  : 'text-quiet hover:text-ink'
              }`}
            >
              International · USD
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-7 max-w-[920px] mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              data-price
              className={`relative bg-white rounded-morez border p-6 sm:p-8 lg:p-10 opacity-0 ${
                pkg.recommended
                  ? 'border-coral shadow-[0_20px_50px_rgba(235,95,105,0.12)]'
                  : 'border-black/10'
              }`}
            >
              {pkg.recommended && (
                <div className="absolute -top-3 left-6 sm:left-8">
                  <span className="bg-coral text-white font-mono text-[11px] font-semibold uppercase tracking-[0.06em] px-3 py-1.5 rounded-full">
                    Most popular
                  </span>
                </div>
              )}

              <p className="font-mono-label text-quiet mb-3">{pkg.name}</p>

              <div className="mb-3">
                <span className="text-[40px] sm:text-[48px] lg:text-[56px] font-semibold tracking-tight text-ink leading-none">
                  {pkg.price[region]}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-quiet mb-6 sm:mb-8">
                {pkg.description}
              </p>

              <ul className="space-y-3 sm:space-y-3.5 mb-8 sm:mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-coral" strokeWidth={2.5} />
                    </span>
                    <span className="text-sm text-ink leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`block w-full text-center py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  pkg.recommended
                    ? 'bg-coral text-white hover:shadow-[0_12px_28px_rgba(235,95,105,0.35)] hover:-translate-y-0.5'
                    : 'border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white hover:-translate-y-0.5'
                }`}
              >
                Go Live Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
