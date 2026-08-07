import { Instagram, Linkedin, Twitter } from 'lucide-react';

const footerLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-paper border-t border-black/10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16 mb-10 sm:mb-12">
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block text-xl sm:text-2xl tracking-tight mb-4"
            >
              <span className="font-semibold text-ink">Workwith</span>
              <span className="font-semibold text-coral">Utsav</span>
            </a>
            <p className="text-sm text-quiet leading-relaxed max-w-[280px]">
              Complete web design packages. Delivered in 48 hours.
            </p>
          </div>

          <div>
            <p className="font-mono-label text-quiet mb-4">Quick links</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm text-ink hover:text-coral transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-quiet mb-4">Follow</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-coral hover:border-coral transition-all duration-300 group"
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

        <div className="border-t border-black/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-quiet">
            © 2026 WorkwithUtsav. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-quiet/70 uppercase tracking-wider">
            Made to ship fast
          </p>
        </div>
      </div>
    </footer>
  );
}
