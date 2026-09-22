import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../lib/contact';

const navLinks = [
  { label: 'Why clinics', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-white/95 backdrop-blur-xl border-b border-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-shell h-[64px] sm:h-[76px] lg:h-[88px] flex items-center justify-between gap-3">
        <a
          href="#"
          className="text-[20px] sm:text-[24px] lg:text-[28px] tracking-tight shrink-0"
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="font-semibold text-ink">Workwith</span>
          <span className="font-semibold text-coral">Utsav</span>
        </a>

        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-[15px] xl:text-[16px] font-semibold text-ink hover:text-coral transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-coral"
          >
            <Phone size={15} />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="btn-primary !text-[15px] !py-3 !px-6"
          >
            Get a quote
          </a>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-black/10 text-ink"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <Phone size={18} />
          </a>
          <button
            className="p-2 -mr-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-black/10 transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[100dvh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-5 py-6 flex flex-col gap-1 max-h-[calc(100dvh-64px)] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-lg font-semibold text-ink py-3 border-b border-black/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${PHONE_TEL}`}
            className="text-base font-semibold text-ink inline-flex items-center gap-2 py-4"
          >
            <Phone size={18} />
            {PHONE_DISPLAY}
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="btn-primary text-base mt-2 text-center w-full"
          >
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}
