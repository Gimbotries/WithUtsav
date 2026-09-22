import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Dr. Vaidehi Dande',
    urlLabel: 'drvaidehidande.com',
    caption: 'Paediatric clinic, Mumbai · Make an Appointment on the homepage',
    logo: '/logos/drvaidehidande.svg',
    preview: '/preview-drvaidehidande.jpg',
    url: 'https://drvaidehidande.com',
    tint: 'bg-[#f3f8f4]',
    logoClass: 'w-[72%] max-w-[280px] h-auto',
    accent: 'text-sage',
    ring: 'group-hover:ring-sage/50',
    labelClass: 'text-quiet',
  },
  {
    name: 'Tru Smile Dental',
    urlLabel: 'trusmiledentist.in',
    caption: 'Dental clinic, Jogeshwari West, Mumbai · Direct Book Appointment',
    logo: '/logos/trusmile.png',
    preview: '/preview-trusmile.jpg',
    url: 'https://trusmiledentist.in',
    tint: 'bg-[#f7f4f6]',
    logoClass: 'w-[82%] max-w-[320px] h-auto',
    accent: 'text-[#c2185b]',
    ring: 'group-hover:ring-[#c2185b]/35',
    labelClass: 'text-quiet',
  },
  {
    name: 'Dr. Richa Samadhiya',
    urlLabel: 'drrichasamadhiya.com',
    caption: 'Gynecologist & IVF, Bhopal · Book Your Consultation',
    logo: '/logos/drricha.png',
    preview: '/preview-drricha.jpg',
    url: 'https://drrichasamadhiya.com',
    tint: 'bg-[#faf5f8]',
    logoClass: 'w-[92%] max-w-[380px] h-auto',
    accent: 'text-mauve',
    ring: 'group-hover:ring-mauve/40',
    labelClass: 'text-quiet',
  },
  {
    name: 'Dr. Disha Baxi · Skintimacy',
    urlLabel: 'drdishabaxi.com',
    caption: 'Dermatology clinic, Indore · Book Appointment on the homepage',
    logo: '/logos/drdisha.png',
    preview: '/preview-drdisha.jpg',
    url: 'https://drdishabaxi.com',
    tint: 'bg-[#f3f8f4]',
    logoClass: 'w-[78%] max-w-[300px] h-auto',
    accent: 'text-sage',
    ring: 'group-hover:ring-sage/50',
    labelClass: 'text-quiet',
  },
  {
    name: 'The Rubh',
    urlLabel: 'therubh.com',
    caption: 'Brand website with custom interactions',
    logo: '/logos/therubh.png',
    preview: '/preview-therubh.jpg',
    url: 'https://therubh.com',
    tint: 'bg-[#faf6f2]',
    logoClass: 'w-[58%] max-w-[220px] h-auto',
    accent: 'text-[#9a3b3b]',
    ring: 'group-hover:ring-[#9a3b3b]/35',
    labelClass: 'text-quiet',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-project]',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
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
    <section ref={sectionRef} id="portfolio" className="bg-paper py-14 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-6 mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-[640px] xl:max-w-[700px]">
            <p className="section-label mb-3 sm:mb-4">Live clinic websites</p>
            <h2 className="display-lg font-semibold text-ink text-balance">
              This is how a clinic
              <br />
              should look <em>online.</em>
            </h2>
          </div>
          <p className="max-w-[380px] xl:max-w-[460px] text-[15px] sm:text-[16px] xl:text-[17px] leading-relaxed text-quiet">
            Hover a logo to preview the live homepage — each of these has a clear
            Book Now path. Then open the site yourself.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-7">
          {projects.map((project) => (
            <a
              key={project.urlLabel}
              data-project
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block opacity-0"
            >
              <div
                className={`relative rounded-morez overflow-hidden border border-black/10 ring-0 transition-all duration-300 ${project.tint} ${project.ring} group-hover:ring-4`}
              >
                <div className="aspect-[16/10] relative">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 sm:p-8 transition-opacity duration-300 group-hover:opacity-0 group-hover:pointer-events-none">
                    <img
                      src={project.logo}
                      alt={`${project.name} logo`}
                      className={project.logoClass}
                    />
                    <p className={`font-mono text-[12px] sm:text-[13px] ${project.labelClass}`}>
                      {project.urlLabel}
                    </p>
                  </div>

                  <div className="absolute inset-0 opacity-0 scale-[1.02] transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
                    <img
                      src={project.preview}
                      alt={`${project.name} homepage`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-white font-semibold text-sm sm:text-base">
                          View live site
                        </p>
                        <p className="text-white/75 text-xs font-mono">
                          {project.urlLabel}
                        </p>
                      </div>
                      <span className="w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight size={20} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 sm:mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-ink">
                    {project.name}
                  </h3>
                  <p className="mt-1 text-sm text-quiet">{project.caption}</p>
                </div>
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 shrink-0 transition-all duration-300 group-hover:bg-ink group-hover:border-ink group-hover:text-white ${project.accent}`}
                >
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
