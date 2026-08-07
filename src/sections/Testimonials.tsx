import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'They took Lavadany from idea to a live storefront in two days. Domain, hosting, design — everything was handled. Our first sales started the same week we launched.',
    name: 'Anya Mehra',
    role: 'Founder, Lavadany',
    site: 'lavadany.com',
    url: 'https://lavadany.com',
    accent: 'bg-coral',
    soft: 'bg-[#fff1f2]',
  },
  {
    quote:
      'WorkwithUtsav understood the vibe we wanted for Therubh immediately. The site feels premium, loads fast, and finally matches how we talk about the brand.',
    name: 'Rohan Kapoor',
    role: 'Creative Director, Therubh',
    site: 'therubh.com',
    url: 'https://therubh.com',
    accent: 'bg-mauve',
    soft: 'bg-[#f7f0f8]',
  },
  {
    quote:
      'Patients now find us online without confusion. The site is clean, trustworthy, and easy to navigate — exactly what a medical practice needs. Delivered ahead of schedule.',
    name: 'Dr. Vaidehi Dande',
    role: 'Clinic Principal',
    site: 'drvaidehidande.com',
    url: 'https://drvaidehidande.com',
    accent: 'bg-sage',
    soft: 'bg-[#f1f7f1]',
  },
  {
    quote:
      'As a trade business, we needed something that works on phones when customers call. Miller Electrical’s new site books enquiries properly and looks sharp. Worth every rupee.',
    name: 'James Miller',
    role: 'Owner, Miller Electrical',
    site: 'millerelectrical.net',
    url: 'https://millerelectrical.net',
    accent: 'bg-sky',
    soft: 'bg-[#eef5fa]',
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
          <p className="section-label mb-3 sm:mb-4">Testimonials</p>
          <h2 className="display-lg font-semibold text-ink text-balance">
            Loved by the
            <br />
            businesses we <em>built for.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {testimonials.map((item) => (
            <article
              key={item.site}
              data-testimonial
              className={`rounded-morez border border-black/8 p-6 sm:p-8 opacity-0 ${item.soft}`}
            >
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`w-10 h-10 rounded-full ${item.accent} text-white flex items-center justify-center`}
                >
                  <Quote size={18} />
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] sm:text-[13px] text-quiet hover:text-ink transition-colors"
                >
                  {item.site}
                </a>
              </div>

              <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-relaxed text-ink mb-6">
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
