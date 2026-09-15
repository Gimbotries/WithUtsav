import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Instagram, Linkedin, Twitter, Send } from 'lucide-react';
import {
  EMAIL,
  PHONE_DISPLAY,
  PHONE_TEL,
  quoteMailto,
} from '../lib/contact';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
];

const emptyForm = {
  name: '',
  clinic: '',
  email: '',
  phone: '',
  city: '',
  specialty: '',
  message: '',
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState(emptyForm);
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = quoteMailto(formState);
    setSubmitted(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section ref={sectionRef} id="contact" className="bg-ink text-white py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-start">
          <div data-contact className="opacity-0">
            <p className="font-mono-label text-coral mb-3 sm:mb-4">Let’s gooo !!</p>
            <h2 className="display-lg font-semibold text-balance max-w-[560px]">
              Need a clinic website?
              <br />
              Let’s <em className="!text-coral">talk.</em>
            </h2>
            <p className="mt-4 sm:mt-5 max-w-[440px] text-[15px] sm:text-[17px] leading-relaxed text-white/65">
              Submit the form and your mail app opens with our address and your
              details already filled. Click send. Or call us now.
            </p>

            <div className="mt-8 sm:mt-10 space-y-5">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 sm:gap-4 group min-w-0"
              >
                <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-coral group-hover:border-coral transition-all duration-300 shrink-0">
                  <Mail size={18} className="text-white/70 group-hover:text-white" />
                </span>
                <span className="text-sm sm:text-base text-white/90 group-hover:text-white transition-colors break-all">
                  {EMAIL}
                </span>
              </a>

              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-3 sm:gap-4 group">
                <span className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-coral group-hover:border-coral transition-all duration-300 shrink-0">
                  <Phone size={18} className="text-white/70 group-hover:text-white" />
                </span>
                <span className="text-sm sm:text-base text-white/90 group-hover:text-white transition-colors">
                  {PHONE_DISPLAY}
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

          <div data-contact className="opacity-0" id="contact-form">
            <div className="bg-white text-ink rounded-morez p-5 sm:p-7 lg:p-9">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6">
                    <Send size={28} className="text-coral" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Your email is ready</h3>
                  <p className="text-quiet max-w-[320px] mx-auto">
                    If your mail app opened, just hit send. If it didn’t, email us
                    at {EMAIL}.
                  </p>
                  <button
                    type="button"
                    className="btn-outline mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      window.location.href = quoteMailto(formState);
                    }}
                  >
                    Open mail app again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(
                      [
                        { id: 'name', label: 'Your name', type: 'text', placeholder: 'Dr. / Clinic manager' },
                        { id: 'clinic', label: 'Clinic name', type: 'text', placeholder: 'Your practice' },
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                        { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+91' },
                        { id: 'city', label: 'City', type: 'text', placeholder: 'Mumbai, Bhopal…' },
                        { id: 'specialty', label: 'Specialty', type: 'text', placeholder: 'Dental, gynae, derma…' },
                      ] as const
                    ).map((field) => (
                      <div key={field.id} className={field.id === 'email' || field.id === 'clinic' ? 'sm:col-span-1' : ''}>
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
                          required={field.id === 'name' || field.id === 'email' || field.id === 'clinic'}
                          className="w-full px-4 py-3 rounded-morez border border-black/10 bg-[#f7f7f7] text-sm text-ink placeholder:text-quiet/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all"
                          placeholder={field.placeholder}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      What do you need?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-morez border border-black/10 bg-[#f7f7f7] text-sm text-ink placeholder:text-quiet/50 focus:outline-none focus:ring-2 focus:ring-coral/30 focus:border-coral transition-all resize-none"
                      placeholder="Website, booking, WhatsApp…"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full py-3.5">
                    Get a quote · Open email
                  </button>

                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-quiet hover:text-ink"
                  >
                    <Phone size={15} />
                    Or call {PHONE_DISPLAY}
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
