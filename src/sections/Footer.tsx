import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../lib/contact';

const footerLinks = [
  { label: 'Why clinics', href: '#why-us' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
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
      <div className="section-shell py-12 sm:py-14 lg:py-16">
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
              Complete clinic websites with booking and WhatsApp. Delivered in 48
              hours.
            </p>
            <p className="mt-4 text-sm font-semibold text-ink">
              <a href={`tel:${PHONE_TEL}`} className="hover:text-coral">
                {PHONE_DISPLAY}
              </a>
            </p>
            <p className="mt-1 text-sm text-quiet">
              <a href={`mailto:${EMAIL}`} className="hover:text-coral">
                {EMAIL}
              </a>
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
            Built for clinics
          </p>
        </div>
      </div>
    </footer>
  );
}
