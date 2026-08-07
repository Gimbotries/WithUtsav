import { useEffect, useRef, useState } from 'react';

const INTERACTIVE =
  'a, button, input, textarea, select, label, [role="button"], [data-no-cursor-cta]';

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return true;
  return Boolean(target.closest(INTERACTIVE));
}

function isFormStarted() {
  const name = (document.getElementById('name') as HTMLInputElement | null)?.value?.trim();
  const email = (document.getElementById('email') as HTMLInputElement | null)?.value?.trim();
  const message = (document.getElementById('message') as HTMLTextAreaElement | null)?.value?.trim();
  return Boolean(name || email || message);
}

export default function CursorCTA() {
  const pillRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const awaitingForm = useRef(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('Go Live Now');

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (pillRef.current) {
        // Sit centered below the cursor
        pillRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, 18px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      const overInteractive = isInteractiveTarget(e.target);
      setVisible(!overInteractive);
    };

    const onLeave = () => {
      setVisible(false);
    };

    const onClick = (e: MouseEvent) => {
      if (isInteractiveTarget(e.target)) return;
      awaitingForm.current = true;
      setLabel('Fill the form');
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        document.getElementById('name')?.focus({ preventScroll: true });
      }, 700);
    };

    const contact = document.getElementById('contact');
    let observer: IntersectionObserver | null = null;
    if (contact) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!awaitingForm.current) return;
          // Left the contact section without starting the form
          if (!entry.isIntersecting && !isFormStarted()) {
            awaitingForm.current = false;
            setLabel('Go Live Now');
          }
        },
        { threshold: 0.28 }
      );
      observer.observe(contact);
    }

    const onScrollCheck = () => {
      if (!awaitingForm.current) return;
      const el = document.getElementById('contact');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.2;
      if (!inView && !isFormStarted()) {
        awaitingForm.current = false;
        setLabel('Go Live Now');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('click', onClick);
    window.addEventListener('scroll', onScrollCheck, { passive: true });

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScrollCheck);
      observer?.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={pillRef}
      aria-hidden
      className={`pointer-events-none fixed top-0 left-0 z-[9998] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="relative flex items-center gap-2 rounded-full bg-coral text-white pl-3.5 pr-4 py-2 shadow-[0_12px_30px_rgba(235,95,105,0.4)] rotate-[-4deg]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="font-semibold text-[13px] tracking-tight whitespace-nowrap">
          {label}
        </span>
        <span className="text-[11px] leading-none">✦</span>
      </div>
    </div>
  );
}
