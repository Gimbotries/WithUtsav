import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: 'Lavadany.com',
    caption: 'Custom e-commerce design & build',
    image: '/portfolio-lavadany.jpg',
    url: 'https://lavadany.com',
  },
  {
    name: 'devaidehidande.com',
    caption: 'Brand website with custom interactions',
    image: '/portfolio-devaide.jpg',
    url: 'https://devaidehidande.com',
  },
  {
    name: 'jhdsplumbing.co.uk',
    caption: 'Local trade business website',
    image: '/portfolio-jhds.jpg',
    url: 'https://jhdsplumbing.co.uk',
  },
  {
    name: 'millerelectrical.net',
    caption: 'Service-based business site',
    image: '/portfolio-miller.jpg',
    url: 'https://millerelectrical.net',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: i * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
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
      id="portfolio"
      className="bg-paper py-24 lg:py-36"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 lg:mb-20">
          <p className="section-label mb-4">OUR WORK</p>
          <h2
            className="font-display font-bold text-ink leading-[1.0] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            Sites Built to Perform.
          </h2>
          <p className="mt-4 font-body text-text-secondary leading-relaxed max-w-[540px] text-base lg:text-lg">
            Every site is designed for your business goals — whether that's
            selling products, booking clients, or building trust.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <a
              key={project.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-2xl shadow-card overflow-hidden card-hover opacity-0"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.name} - ${project.caption}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold text-xl lg:text-[22px] text-ink mb-1">
                      {project.name}
                    </h3>
                    <p className="font-body text-sm text-text-secondary">
                      {project.caption}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-cobalt mt-1 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
                <span className="inline-flex items-center mt-4 font-body text-sm font-medium text-cobalt link-underline">
                  Visit Site
                  <ArrowUpRight size={14} className="ml-1" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
