import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, Linkedin, Twitter, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
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
        '[data-contact]',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <section ref={sectionRef} id="contact" className="bg-ink text-white py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-start">
          {/* Left — heading + details */}
          <div data-contact className="opacity-0">
            <p className="font-mono-label text-coral mb-3 sm:mb-4">Let’s gooo !!</p>
            <h2 className="display-lg font-semibold text-balance max-w-[560px]">
              Need a website?
              <br />
              Let’s <em className="!text-coral">talk.</em>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-[440px] text-[15px] sm:text-[17px] leading-relaxed text-white/65">
              Tell us about your project. We’ll get back within 24 hours with next
              steps.
            </p>

            <div className="mt-8 sm:mt-10 space-y-5">
              <a
                href="mailto:productiveabhinav@gmail.com"
                className="flex items-center gap-3 sm:gap-4 group min-w-0"
              >
                <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-coral group-hover:border-coral transition-all duration-300 shrink-0">
                  <Mail size={18} className="text-white/70 group-hover:text-white" />
                </span>
                <span className="text-sm sm:text-base text-white/90 group-hover:text-white transition-colors break-all">
                  productiveabhinav@gmail.com
                </span>
              </a>

              <a href="tel:+918700427849" className="flex items-center gap-3 sm:gap-4 group">
                <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-coral group-hover:border-coral transition-all duration-300 shrink-0">
                  <Phone size={18} className="text-white/70 group-hover:text-white" />
                </span>
                <span className="text-sm sm:text-base text-white/90 group-hover:text-white transition-colors">
                  +91 8700427849
                </span>
              </a>
            </div>

            <div className="mt-8 sm:mt-10 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-coral hover:border-coral transition-all duration-300 group"
                >
                  <social.icon
                    size={18}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right — form aligned to top with heading */}
          <div data-contact className="opacity-0" id="contact-form">
            <div className="bg-white text-ink rounded-morez p-5 sm:p-7 lg:p-9">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6">
                    <Send size={28} className="text-coral" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Message sent!</h3>
                  <p className="text-quiet">We’ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {(
                    [
                      { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                      {
                        id: 'email',
                        label: 'Email',
                        type: 'email',
                        placeholder: 'your@email.com',
                      },
                      {
                        id: 'phone',
                        label: 'Phone',
                        type: 'tel',
                        placeholder: '+1 (555) 000-0000',
                      },
                    ] as const
                  ).map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block text-sm font-medium mb-2"
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formState[field.id]}
                        onChange={handleChange}
                        required={field.id !== 'phone'}
                        className="w-full px-4 py-3 rounded-morez border border-black/10 bg-[#f7f7f7] text-sm text-ink placeholder:text-quiet/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-morez border border-black/10 bg-[#f7f7f7] text-sm text-ink placeholder:text-quiet/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-3.5">
                    Send message
                  </button>

                  <p className="text-center text-xs text-quiet mt-4">
                    Or email us at{' '}
                    <a
                      href="mailto:productiveabhinav@gmail.com"
                      className="text-coral hover:underline"
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
