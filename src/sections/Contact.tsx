import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, Linkedin, Twitter, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// PLACEHOLDER: Replace YOUR_FORM_ID with your actual Formspree form ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to Formspree
    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    })
      .then(() => {
        setSubmitted(true);
        setFormState({ name: '', email: '', phone: '', message: '' });
      })
      .catch(() => {
        alert('Something went wrong. Please email us directly.');
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-ink py-24 lg:py-36"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <div ref={leftRef} className="opacity-0">
            <h2
              className="font-display font-bold text-[#F4F2EE] leading-[1.0] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
            >
              Let's Talk.
            </h2>
            <p className="mt-5 font-body text-[#F4F2EE]/60 leading-relaxed text-base lg:text-lg max-w-[420px]">
              Tell us about your project. We'll get back to you within 24 hours
              with next steps.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-5">
              <a
                href="mailto:productiveabhinav@gmail.com"
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 rounded-full border border-[#F4F2EE]/20 flex items-center justify-center group-hover:bg-cobalt group-hover:border-cobalt transition-all duration-300">
                  <Mail
                    size={18}
                    className="text-[#F4F2EE]/70 group-hover:text-white transition-colors"
                  />
                </span>
                <span className="font-body text-[#F4F2EE]/90 group-hover:text-white transition-colors">
                  productiveabhinav@gmail.com
                </span>
              </a>

              <a
                href="tel:+918700427849"
                className="flex items-center gap-4 group"
              >
                <span className="w-11 h-11 rounded-full border border-[#F4F2EE]/20 flex items-center justify-center group-hover:bg-cobalt group-hover:border-cobalt transition-all duration-300">
                  <Phone
                    size={18}
                    className="text-[#F4F2EE]/70 group-hover:text-white transition-colors"
                  />
                </span>
                <span className="font-body text-[#F4F2EE]/90 group-hover:text-white transition-colors">
                  +91 8700427849
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full border border-[#F4F2EE]/20 flex items-center justify-center hover:bg-cobalt hover:border-cobalt transition-all duration-300 group"
                >
                  <social.icon
                    size={18}
                    className="text-[#F4F2EE]/70 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div ref={rightRef} className="opacity-0">
            <div className="bg-white rounded-2xl shadow-card p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-cobalt/10 flex items-center justify-center mx-auto mb-6">
                    <Send size={28} className="text-cobalt" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-ink mb-2">
                    Message Sent!
                  </h3>
                  <p className="font-body text-text-secondary">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,17,17,0.1)] bg-[#FAFAFA] font-body text-sm text-ink placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,17,17,0.1)] bg-[#FAFAFA] font-body text-sm text-ink placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,17,17,0.1)] bg-[#FAFAFA] font-body text-sm text-ink placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-body text-sm font-medium text-ink mb-2"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(17,17,17,0.1)] bg-[#FAFAFA] font-body text-sm text-ink placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-cobalt/30 focus:border-cobalt transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-3.5">
                    Send Message
                  </button>

                  <p className="text-center font-body text-xs text-text-secondary/70 mt-4">
                    Or email us directly at{' '}
                    <a
                      href="mailto:productiveabhinav@gmail.com"
                      className="text-cobalt hover:underline"
                    >
                      productiveabhinav@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
