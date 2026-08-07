import { Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'What We Do', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Our Work', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-paper border-t border-[rgba(17,17,17,0.06)]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-14 lg:py-16">
        {/* Main Footer Row */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-10">
          {/* Logo + Tagline */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block font-display text-xl tracking-tight mb-4"
            >
              <span className="font-medium text-ink">Workwith</span>
              <span className="font-bold text-cobalt">Utsav</span>
            </a>
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-[260px]">
              Complete web design packages. Delivered in 48 hours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
              Quick Links
            </p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="font-body text-sm text-ink hover:text-cobalt transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-text-secondary mb-4">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-[rgba(17,17,17,0.1)] flex items-center justify-center hover:bg-cobalt hover:border-cobalt transition-all duration-300 group"
                >
                  <social.icon
                    size={16}
                    className="text-ink/60 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(17,17,17,0.08)] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-text-secondary">
              © 2026 WorkwithUtsav. All rights reserved.
            </p>
            <p className="font-body text-xs text-text-secondary/60">
              Designed with care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
