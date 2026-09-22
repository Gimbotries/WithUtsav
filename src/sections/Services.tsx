import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Clinic website',
    description:
      'A professional practice site — assembled, tested, and delivered ready to convert searches into appointments. Built for doctors, not generic businesses.',
    accent: 'text-coral',
    bar: 'bg-coral',
  },
  {
    title: 'Found when they search',
    description:
      'Your name, specialty, and locality — so the clinic shows up, and the website is the next click. Maps plus a live site patients actually trust.',
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
    title: 'Booking & WhatsApp',
    description:
      'Online Book Now, plus WhatsApp automation: patients confirm a slot and receive a booking message automatically. Reception stops copy-pasting chats.',
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
      <div className="section-shell">
        <div className="max-w-[720px] xl:max-w-[780px] mb-10 sm:mb-14 lg:mb-16">
          <p className="section-label mb-3 sm:mb-4">What we do best</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Built for clinics,
            <br />
            <em>not for everyone.</em>
          </h2>
          <p className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] xl:text-[18px] leading-relaxed text-quiet">
            From a clean practice page to payments, logins, and WhatsApp booking —
            we handle the full stack so your online presence matches the care you
            give in the room.
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
              <p className="text-[15px] sm:text-[16px] xl:text-[17px] leading-relaxed text-quiet mb-5 sm:mb-6">
                {service.description}
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink link-underline"
              >
                Get a quote
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
