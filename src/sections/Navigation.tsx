import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'What We Do', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-[#F4F2EE]/92 backdrop-blur-xl border-b border-[rgba(17,17,17,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl tracking-tight"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="font-medium text-ink">Workwith</span>
          <span className="font-bold text-cobalt">Utsav</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-body text-sm font-medium text-ink hover:text-cobalt transition-colors duration-200 link-underline"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#pricing');
            }}
            className="btn-primary text-sm py-2.5 px-6"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#F4F2EE]/98 backdrop-blur-xl border-b border-[rgba(17,17,17,0.06)] transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-body text-base font-medium text-ink hover:text-cobalt transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#pricing');
            }}
            className="btn-primary text-sm py-3 px-6 mt-2 text-center"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
