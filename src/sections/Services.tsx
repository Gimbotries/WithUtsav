import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Website creation',
    description:
      'Custom sites built for your business — assembled, tested, polished, and delivered ready to perform.',
    accent: 'text-coral',
    bar: 'bg-coral',
  },
  {
    title: 'Design that sticks',
    description:
      'Clean, professional visuals that look sharp on every screen and stay on-brand from first click to contact.',
    accent: 'text-mauve',
    bar: 'bg-mauve',
  },
  {
    title: 'Domain + hosting',
    description:
      'We purchase the domain, configure hosting, and get everything live so you never touch the technical mess.',
    accent: 'text-sky',
    bar: 'bg-sky',
  },
  {
    title: 'Payments & logins',
    description:
      'Need checkouts, auth, or AI features? The elaborate package covers the functionality behind a static page.',
    accent: 'text-sage',
    bar: 'bg-sage',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-service]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-[#f7f7f7] py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[720px] mb-10 sm:mb-14 lg:mb-16">
          <p className="section-label mb-3 sm:mb-4">What we do best</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Services,
            <br />
            <em>built around you.</em>
          </h2>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-quiet">
            From a clean landing page to a site with payments and logins — we
            handle the full stack so your online presence matches your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              data-service
              className="group bg-white rounded-morez border border-black/8 p-6 sm:p-7 lg:p-9 opacity-0 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className={`h-1.5 w-12 rounded-full ${service.bar} mb-5 sm:mb-7`} />
              <h3 className={`text-xl sm:text-2xl lg:text-[28px] font-semibold mb-3 ${service.accent}`}>
                {service.title}
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-quiet mb-5 sm:mb-6">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink link-underline"
              >
                Discover
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
