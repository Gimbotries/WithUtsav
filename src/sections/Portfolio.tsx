import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Lavadany',
    urlLabel: 'lavadany.com',
    caption: 'Custom e-commerce design & build',
    logo: '/logos/lavadany.png',
    preview: '/preview-lavadany.jpg',
    url: 'https://lavadany.com',
    tint: 'bg-[#f3f7fb]',
    logoClass: 'w-[78%] max-w-[300px] h-auto',
    accent: 'text-sky',
    ring: 'group-hover:ring-sky/40',
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
  {
    name: 'Dr. Vaidehi Dande',
    urlLabel: 'drvaidehidande.com',
    caption: 'Professional practice website',
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
    name: 'Miller Electrical',
    urlLabel: 'millerelectrical.net',
    caption: 'Service-based business site',
    logo: '/logos/millerelectrical.png',
    preview: '/preview-miller.jpg',
    url: 'https://millerelectrical.net',
    tint: 'bg-[#f2f6fb]',
    logoClass: 'w-[82%] max-w-[340px] h-auto',
    accent: 'text-sky',
    ring: 'group-hover:ring-sky/40',
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
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 lg:gap-6 mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-[640px]">
            <p className="section-label mb-3 sm:mb-4">Sites we made</p>
            <h2 className="display-lg font-semibold text-ink text-balance">
              Real projects.
              <br />
              Real businesses. <em>Live.</em>
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] sm:text-[16px] leading-relaxed text-quiet">
            Hover a logo to preview the live homepage — then visit the site and
            see it for yourself.
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
                  {/* Logo default */}
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

                  {/* Live homepage screenshot on hover */}
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
